```
args=[
    '--start-maximized',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--ignore-gpu-blocklist',
    
    # Đo hoa (Su dang SwiftShader cho ca WebGL va Vulkan)
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--use-vulkan=swiftshader', # Đa fix theo gop y cua ban
    '--enable-webgl',
    '--enable-webgl2',
    '--enable-features=Vulkan',
    
    '--disable-software-rasterizer=false'
]
```