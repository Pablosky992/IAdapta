Add-Type -AssemblyName System.Drawing
$filePath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\scratch\house_only.png'
$bmp = New-Object System.Drawing.Bitmap($filePath)
$pixel = $bmp.GetPixel(0, 0)
Write-Output "Color at 0,0: A=$($pixel.A) R=$($pixel.R) G=$($pixel.G) B=$($pixel.B)"
Write-Output "Dimensions: Width=$($bmp.Width) Height=$($bmp.Height)"
$bmp.Dispose()
