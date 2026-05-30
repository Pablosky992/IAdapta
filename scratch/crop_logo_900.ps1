Add-Type -AssemblyName System.Drawing
$srcPath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\assets\iadapta_logo.png'
$destPath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\scratch\cropped_logo_900.png'

$srcBmp = New-Object System.Drawing.Bitmap($srcPath)
$rect = New-Object System.Drawing.Rectangle(0, 0, 900, 900)
$destBmp = $srcBmp.Clone($rect, $srcBmp.PixelFormat)

$destBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$destBmp.Dispose()
$srcBmp.Dispose()

Write-Output "Image cropped and saved to $destPath"
