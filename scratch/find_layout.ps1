Add-Type -AssemblyName System.Drawing
$filePath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\assets\iadapta_logo.png'
$bmp = New-Object System.Drawing.Bitmap($filePath)

$bg = $bmp.GetPixel(0, 0)

function IsForeground($pixel, $bg) {
    $diffR = [Math]::Abs($pixel.R - $bg.R)
    $diffG = [Math]::Abs($pixel.G - $bg.G)
    $diffB = [Math]::Abs($pixel.B - $bg.B)
    return ($diffR -gt 15 -or $diffG -gt 15 -or $diffB -gt 15)
}

for ($x = 100; $x -lt 2100; $x += 100) {
    $minY = $bmp.Height
    $maxY = 0
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        if (IsForeground ($bmp.GetPixel($x, $y)) $bg) {
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
    if ($minY -le $maxY) {
        Write-Output "Column X=$x : Y range is $minY to $maxY (Height=$($maxY - $minY))"
    } else {
        Write-Output "Column X=$x : Blank"
    }
}
$bmp.Dispose()
