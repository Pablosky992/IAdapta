Add-Type -AssemblyName System.Drawing
$filePath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\assets\iadapta_logo.png'
$bmp = New-Object System.Drawing.Bitmap($filePath)

for ($y = 80; $y -lt 480; $y++) {
    for ($x = 70; $x -lt 900; $x++) {
        $p = $bmp.GetPixel($x, $y)
        # Check if the pixel is blue (foreground, R is low, B is higher than R)
        if ($p.R -lt 100 -and $p.B -gt 120 -and $p.G -lt 100) {
            Write-Output "Blue pixel at X=$x, Y=$y : R=$($p.R) G=$($p.G) B=$($p.B)"
        }
    }
}
$bmp.Dispose()
