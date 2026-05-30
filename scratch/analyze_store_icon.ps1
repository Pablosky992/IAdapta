Add-Type -AssemblyName System.Drawing
$filePath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\store_icon.png'
$bmp = New-Object System.Drawing.Bitmap($filePath)

$hasTransparent = $false
$colors = @{}

for ($x = 0; $x -lt $bmp.Width; $x += 5) {
    for ($y = 0; $y -lt $bmp.Height; $y += 5) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.A -lt 255) { $hasTransparent = $true }
        $key = "$($p.R),$($p.G),$($p.B)"
        $colors[$key] = ($colors[$key] + 1)
    }
}
$bmp.Dispose()

Write-Output "Store Icon:"
Write-Output "Has Transparent Pixels: $hasTransparent"
Write-Output "Distinct colors: $($colors.Count)"
$topColors = $colors.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 5
foreach ($tc in $topColors) {
    Write-Output "Color $($tc.Key) - Count: $($tc.Value)"
}
