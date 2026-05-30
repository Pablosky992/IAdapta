Add-Type -AssemblyName System.Drawing
$srcPath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\assets\iadapta_logo.png'
$destPath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\scratch\house_only.png'

$srcBmp = New-Object System.Drawing.Bitmap($srcPath)
# Crop region (X=70, Y=80, Width=830, Height=400)
$rect = New-Object System.Drawing.Rectangle(70, 80, 830, 400)
$destBmp = $srcBmp.Clone($rect, $srcBmp.PixelFormat)

$destBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$destBmp.Dispose()
$srcBmp.Dispose()

Write-Output "Image cropped and saved to $destPath"
