Add-Type -AssemblyName System.Drawing

$logoPath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\assets\iadapta_logo.png'
$outputPath = 'c:\Users\narci\Desktop\antigravity\web IAdapta\assets\iadapta_brand_icon.png'

Write-Output "Loading logo from $logoPath"
$srcBmp = New-Object System.Drawing.Bitmap($logoPath)

# Crop the house region (X=70, Y=80, Width=760, Height=335)
$rect = New-Object System.Drawing.Rectangle(70, 80, 760, 335)
$cropBmp = $srcBmp.Clone($rect, $srcBmp.PixelFormat)

# Process cropBmp to make its cream background transparent using soft chroma-keying
Write-Output "Processing transparency..."
$transBmp = New-Object System.Drawing.Bitmap($cropBmp.Width, $cropBmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Ref cream color: R=239, G=233, B=221
$refR = 239
$refG = 233
$refB = 221
$minDist = 18
$maxDist = 40

for ($y = 0; $y -lt $cropBmp.Height; $y++) {
    for ($x = 0; $x -lt $cropBmp.Width; $x++) {
        $p = $cropBmp.GetPixel($x, $y)
        
        $diffR = $p.R - $refR
        $diffG = $p.G - $refG
        $diffB = $p.B - $refB
        $dist = [Math]::Sqrt($diffR*$diffR + $diffG*$diffG + $diffB*$diffB)
        
        if ($dist -lt $minDist) {
            $transBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($dist -gt $maxDist) {
            $transBmp.SetPixel($x, $y, $p)
        } else {
            $alphaFactor = ($dist - $minDist) / ($maxDist - $minDist)
            $alpha = [int]($p.A * $alphaFactor)
            if ($alpha -gt 255) { $alpha = 255 }
            if ($alpha -lt 0) { $alpha = 0 }
            
            $newColor = [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B)
            $transBmp.SetPixel($x, $y, $newColor)
        }
    }
}

# Create the 512x512 canvas filled with solid #F2F0E9 (R=242, G=240, B=233)
Write-Output "Creating 512x512 brand icon canvas..."
$finalBmp = New-Object System.Drawing.Bitmap(512, 512, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($finalBmp)

$g.Clear([System.Drawing.Color]::FromArgb(242, 240, 233))

# High-quality settings
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Centered size of the house outline (Width=420, Height=185)
$destWidth = 420
$destHeight = 185
$destX = [int]((512 - $destWidth) / 2)
$destY = [int]((512 - $destHeight) / 2)

$destRect = New-Object System.Drawing.Rectangle($destX, $destY, $destWidth, $destHeight)
$g.DrawImage($transBmp, $destRect)

$g.Dispose()

# Save final image
$finalBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Cleanup
$transBmp.Dispose()
$cropBmp.Dispose()
$finalBmp.Dispose()
$srcBmp.Dispose()

Write-Output "Successfully saved square brand icon to $outputPath"
