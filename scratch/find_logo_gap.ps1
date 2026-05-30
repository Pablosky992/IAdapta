Add-Type -AssemblyName System.Drawing
$filePath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\assets\iadapta_logo.png'
$bmp = New-Object System.Drawing.Bitmap($filePath)

$bg = $bmp.GetPixel(0,0)

# We search in X=70 to 900, Y=350 to 550 for a row with minimum foreground pixels
for ($y = 350; $y -lt 550; $y++) {
    $fgCount = 0
    for ($x = 70; $x -lt 900; $x++) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.R -lt 200 -or $p.G -lt 180 -or $p.B -lt 160) {
            $fgCount++
        }
    }
    Write-Output "Row Y=$y : Foreground Pixels = $fgCount"
}
$bmp.Dispose()
