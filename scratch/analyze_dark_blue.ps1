Add-Type -AssemblyName System.Drawing
$filePath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\scratch\house_only.png'
$bmp = New-Object System.Drawing.Bitmap($filePath)

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $p = $bmp.GetPixel($x, $y)
        # Check if the pixel is dark blue (R < 70, G < 70, B < 100)
        if ($p.R -lt 70 -and $p.G -lt 70 -and $p.B -lt 100) {
            Write-Output "Dark blue pixel at X=$x, Y=$y : R=$($p.R) G=$($p.G) B=$($p.B)"
        }
    }
}
$bmp.Dispose()
