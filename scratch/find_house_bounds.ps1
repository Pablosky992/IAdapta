Add-Type -AssemblyName System.Drawing
$filePath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\assets\iadapta_logo.png'
$bmp = New-Object System.Drawing.Bitmap($filePath)

$minX = $bmp.Width
$maxX = 0
$minY = 300  # We only care about upper graphic
$maxY = 0

for ($y = 80; $y -lt 480; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.R -lt 200 -or $p.G -lt 180 -or $p.B -lt 160) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
$bmp.Dispose()

Write-Output "House bounds in Y=80 to 480: X=$minX to $maxX, Y=$minY to $maxY. Width=$($maxX - $minX), Height=$($maxY - $minY)"
