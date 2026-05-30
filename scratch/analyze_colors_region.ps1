Add-Type -AssemblyName System.Drawing
$filePath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\assets\iadapta_logo.png'
$bmp = New-Object System.Drawing.Bitmap($filePath)

$bg = $bmp.GetPixel(0,0)
$colors = @{}

for ($y = 80; $y -lt 480; $y++) {
    for ($x = 70; $x -lt 900; $x++) {
        $p = $bmp.GetPixel($x, $y)
        # If it's not background
        if ($p.R -lt 200 -or $p.G -lt 180 -or $p.B -lt 160) {
            $key = "$($p.R),$($p.G),$($p.B)"
            $colors[$key] = ($colors[$key] + 1)
        }
    }
}
$bmp.Dispose()

Write-Output "Unique foreground colors: $($colors.Count)"
$topColors = $colors.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 20
foreach ($tc in $topColors) {
    Write-Output "Color $($tc.Key) - Count: $($tc.Value)"
}
