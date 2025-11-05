# Build Assets

This directory contains icons and assets needed for building the application installers.

## Required Icons

Before building distributable packages, you need to add the following icon files to this directory:

### macOS
- **icon.icns** - macOS application icon
  - Must be 1024x1024px
  - Can be created from a PNG using online tools or:
    ```bash
    # Using iconutil (macOS only)
    mkdir icon.iconset
    sips -z 16 16     icon.png --out icon.iconset/icon_16x16.png
    sips -z 32 32     icon.png --out icon.iconset/icon_16x16@2x.png
    sips -z 32 32     icon.png --out icon.iconset/icon_32x32.png
    sips -z 64 64     icon.png --out icon.iconset/icon_32x32@2x.png
    sips -z 128 128   icon.png --out icon.iconset/icon_128x128.png
    sips -z 256 256   icon.png --out icon.iconset/icon_128x128@2x.png
    sips -z 256 256   icon.png --out icon.iconset/icon_256x256.png
    sips -z 512 512   icon.png --out icon.iconset/icon_256x256@2x.png
    sips -z 512 512   icon.png --out icon.iconset/icon_512x512.png
    sips -z 1024 1024 icon.png --out icon.iconset/icon_512x512@2x.png
    iconutil -c icns icon.iconset
    rm -rf icon.iconset
    ```

### Windows
- **icon.ico** - Windows application icon
  - Must contain multiple sizes: 16x16, 32x32, 48x48, 64x64, 128x128, 256x256
  - Can be created from a PNG using online tools like:
    - https://convertico.com/
    - https://icoconvert.com/

### Linux
- **icon.png** - Linux application icon
  - Recommended: 512x512px or 1024x1024px
  - PNG format with transparency

## Creating Icons from SVG

If you have an SVG icon (like `public/icon.svg`), you can:

1. **Online Tools:**
   - Use CloudConvert: https://cloudconvert.com/svg-to-png
   - Convert to PNG at 1024x1024px
   - Then convert PNG to .icns (macOS) and .ico (Windows)

2. **Using ImageMagick:**
   ```bash
   # Convert SVG to PNG
   convert -background none -resize 1024x1024 public/icon.svg build/icon.png

   # Create Windows .ico
   convert build/icon.png -define icon:auto-resize=256,128,64,48,32,16 build/icon.ico
   ```

3. **Quick Icons for Testing:**
   For testing, you can use placeholder icons:
   - Create a 1024x1024 PNG with any image editor
   - Use the conversion methods above

## Default Icon Warning

If you don't provide custom icons, electron-builder will use default Electron icons. Your app will still work, but won't have a branded appearance.

## Recommended Tools

- **macOS**: `iconutil` (built-in) or https://cloudconvert.com
- **Windows**: https://convertico.com or ImageMagick
- **Linux**: Any PNG (GIMP, Photoshop, Figma, etc.)
- **All platforms**: https://www.electron.build/icons (comprehensive guide)
