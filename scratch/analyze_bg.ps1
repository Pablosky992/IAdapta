Add-Type -AssemblyName System.Drawing
$filePath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\assets\iadapta_logo.png'
$bmp = New-Object System.Drawing.Bitmap($filePath)

# Get background color at (0,0)
$bgColor = $bmp.GetPixel(0, 0)
Write-Output "Background Color: R=$($bgColor.R), G=$($bgColor.G), B=$($bgColor.B), A=$($bgColor.A)"

# Helper function to check if a pixel is different from background (with a small tolerance)
function IsForeground($pixel, $bg) {
    $diffR = [Math]::Abs($pixel.R - $bg.R)
    $diffG = [Math]::Abs($pixel.G - $bg.G)
    $diffB = [Math]::Abs($pixel.B - $bg.B)
    return ($diffR -gt 10 -or $diffG -gt 10 -or $diffB -gt 10)
}

# Scan columns from X=100 to X=2000
for ($x = 100; $x -lt 2100; $x += 100) {
    $fgCount = 0
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $pixel = $bmp.GetPixel($x, $y)
        if (IsForeground $pixel $bgColor) {
            $fgCount++
        }
    }
    Write-Output "Column X=$x : Foreground Pixels = $fgCount"
}
$bmp.Dispose()
