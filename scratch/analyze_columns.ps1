Add-Type -AssemblyName System.Drawing
$filePath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\assets\iadapta_logo.png'
$bmp = New-Object System.Drawing.Bitmap($filePath)

# We analyze from x=0 to x=1500 to see where the logo mark ends and text begins
for ($x = 100; $x -lt 1500; $x += 50) {
    $nonAlphaCount = 0
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.A -gt 0) {
            $nonAlphaCount++
        }
    }
    Write-Output "Column X=$x : Non-Transparent Pixels = $nonAlphaCount"
}
$bmp.Dispose()
