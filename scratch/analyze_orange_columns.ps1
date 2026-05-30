Add-Type -AssemblyName System.Drawing
$filePath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\assets\iadapta_logo.png'
$bmp = New-Object System.Drawing.Bitmap($filePath)

# Scan columns from X=50 to X=1500 to find the gap between house outline and letters
for ($x = 100; $x -lt 1500; $x += 50) {
    $orangeCount = 0
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.R -gt 180 -and $pixel.G -gt 50 -and $pixel.G -lt 160 -and $pixel.B -lt 120) {
            $orangeCount++
        }
    }
    Write-Output "Column X=$x : Orange Pixels = $orangeCount"
}
$bmp.Dispose()
