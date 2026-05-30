Add-Type -AssemblyName System.Drawing
$filePath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\scratch\house_only.png'
$bmp = New-Object System.Drawing.Bitmap($filePath)

$hasTransparent = $false
$colors = @{}
$sampleCount = 0

# Check edges (top, bottom, left, right)
for ($x = 0; $x -lt $bmp.Width; $x += 10) {
    # Top edge
    $p = $bmp.GetPixel($x, 0)
    if ($p.A -lt 255) { $hasTransparent = $true }
    $key = "$($p.R),$($p.G),$($p.B)"
    $colors[$key] = ($colors[$key] + 1)
    
    # Bottom edge
    $p = $bmp.GetPixel($x, $bmp.Height - 1)
    if ($p.A -lt 255) { $hasTransparent = $true }
    $key = "$($p.R),$($p.G),$($p.B)"
    $colors[$key] = ($colors[$key] + 1)
}

for ($y = 0; $y -lt $bmp.Height; $y += 10) {
    # Left edge
    $p = $bmp.GetPixel(0, $y)
    if ($p.A -lt 255) { $hasTransparent = $true }
    $key = "$($p.R),$($p.G),$($p.B)"
    $colors[$key] = ($colors[$key] + 1)
    
    # Right edge
    $p = $bmp.GetPixel($bmp.Width - 1, $y)
    if ($p.A -lt 255) { $hasTransparent = $true }
    $key = "$($p.R),$($p.G),$($p.B)"
    $colors[$key] = ($colors[$key] + 1)
}

$bmp.Dispose()

Write-Output "Has Transparent Pixels: $hasTransparent"
Write-Output "Distinct edge colors sample count: $($colors.Count)"
# Print top 10 colors
$topColors = $colors.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 10
foreach ($tc in $topColors) {
    Write-Output "Color $($tc.Key) - Count: $($tc.Value)"
}
