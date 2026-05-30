Add-Type -AssemblyName System.Drawing
$filePath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\assets\iadapta_logo.png'
$bmp = New-Object System.Drawing.Bitmap($filePath)

# We look at X=700 to 950, Y=80 to 415.
# Let's print foreground pixels (orange/coral) to see the shape.
for ($y = 80; $y -lt 415; $y += 5) {
    $line = ""
    for ($x = 700; $x -lt 950; $x += 5) {
        $p = $bmp.GetPixel($x, $y)
        # If orange/coral (R is high, G is low-med, B is low)
        if ($p.R -gt 150 -and $p.G -lt 150 -and $p.B -lt 100) {
            $line += "#"
        } else {
            $line += "."
        }
    }
    if ($line.Contains("#")) {
        Write-Output "Y=$y : $line"
    }
}
$bmp.Dispose()
