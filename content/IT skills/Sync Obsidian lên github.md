Cần file .bat để khởi động obsidian và chạy các lệnh python sau đó, cần file vbs để ẩn tiến trình chạy terminal của file .bat 
[Obsidian.bat](https://drive.ttfy.cc/20260421152949_Obsidian.bat)

[runobsidian.vbs](https://drive.ttfy.cc/20260421152948_runobsidian.vbs)

File python để upload ảnh lên r2 đồng thời edit lại link trong note.
```
import os
import re
import boto3
import mimetypes
import datetime  # <--- CHÍNH LÀ DÒNG NÀY CÒN THIẾU
from urllib.parse import quote
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
# --- 1. CAU HINH R2 (Giu nguyen) ---
R2_ACCOUNT_ID = "R2_ACCOUNT_ID"
R2_ACCESS_KEY = "R2_ACCESS_KEY"
R2_SECRET_KEY = "R2_SECRET_KEY"
R2_BUCKET_NAME = "drive"
R2_PUBLIC_URL = "https://drive.ttfy.cc"

# --- 2. CAU HINH VAULT (chu y doi dau / cho dong bo) ---
MY_VAULT = "E:\Obsidian\Learningnewthings" 

# --- 3. PHAN LOAI FILE ---
IMAGE_EXTS = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg']
FILE_EXTS = ['json', 'bat', 'sh', 'py', 'js', 'pdf', 'zip', 'vbs']
ALL_EXTS = IMAGE_EXTS + FILE_EXTS

EXT_PATTERN = '|'.join(ALL_EXTS)
REGEX_LINKS = rf'!?\[\[(.*?\.({EXT_PATTERN}))\]\]|!?\[.*?\]\((.*?\.({EXT_PATTERN}))\)'

file_map = {}

s3_client = boto3.client(
    service_name="s3",
    endpoint_url=f"https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com",
    aws_access_key_id=R2_ACCESS_KEY,
    aws_secret_access_key=R2_SECRET_KEY,
    region_name="auto",
)

def upload_and_cleanup(local_path, file_name_r2):
    """Upload len R2 voi ten moi va xoa file local"""
    try:
        ctype, _ = mimetypes.guess_type(local_path)
        ctype = ctype or 'application/octet-stream'
        
        # Upload voi Key la ten da co timestamp
        s3_client.upload_file(local_path, R2_BUCKET_NAME, file_name_r2, ExtraArgs={'ContentType': ctype})
        
        os.remove(local_path) 
        print(f"   [DELETED] {os.path.basename(local_path)} -> {file_name_r2}")
        return True
    except Exception as e:
        print(f"   [ERROR] Khong the upload {file_name_r2}: {e}")
        return False

def process_note(note_path):
    try:
        with open(note_path, 'r', encoding='utf-8') as f:
            content = f.read()

        matches = re.findall(REGEX_LINKS, content)
        found_links = list(set([m[0] if m[0] else m[2] for m in matches]))
        
        has_changed = False
        for link in found_links:
            if link.startswith('http'): continue
            
            file_name_original = os.path.basename(link)
            ext = file_name_original.split('.')[-1].lower()
            
            if file_name_original in file_map:
                full_path = Path(file_map[file_name_original])
                
                if full_path.exists() and full_path.is_file():
                    # TAO TEN FILE MOI VOI TIMESTAMP (Tranh trung lap)
                    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
                    # Thay dau cach bang dau gach duoi cho "sach" ten file tren cloud
                    clean_name = file_name_original.replace(" ", "_")
                    file_name_r2 = f"{timestamp}_{clean_name}"
                    
                    print(f"-> Processing: {file_name_original}")
                    
                    if upload_and_cleanup(str(full_path), file_name_r2):
                        # Ma hoa URL de link khong bi gay (cho dau cach, ky tu la)
                        encoded_name = quote(file_name_r2)
                        online_url = f"{R2_PUBLIC_URL}/{encoded_name}"
                        
                        # Xac dinh hien thi anh (!) hay link file
                        prefix = "!" if ext in IMAGE_EXTS else ""
                        new_markdown_link = f"{prefix}[{file_name_original}]({online_url})"
                        
                        # Thay the moi loai syntax cu
                        content = re.sub(rf'!?\[\[{re.escape(link)}\]\]', new_markdown_link, content)
                        content = re.sub(rf'!?\[.*?\]\({re.escape(link)}\)', new_markdown_link, content)
                        
                        has_changed = True

        if has_changed:
            with open(note_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"[DONE] Updated: {os.path.basename(note_path)}")
            
    except Exception as e:
        print(f"Loi tai file {note_path}: {e}")

def main():
    # Lap ban do file de tim anh o moi thu muc
    for root, _, files in os.walk(MY_VAULT):
        for file in files:
            file_map[file] = os.path.join(root, file)

    all_notes = [os.path.join(r, f) for r, _, fs in os.walk(MY_VAULT) for f in fs if f.endswith(".md")]
    
    with ThreadPoolExecutor(max_workers=5) as executor:
        for note in all_notes:
            executor.submit(process_note, note)

if __name__ == "__main__":
    main()
```
trên mac os thì dùng hammerspoon hành động mỗi lần bật và tắt obsidian.
**Bước 1: Chỉnh lại file `.sh` thành 2 phần** Vì Hammerspoon có thể nhận biết lúc nào app **Mở** và lúc nào app **Đóng**, chúng ta nên tách script ra. Bạn hãy sửa file `/Users/destiny/Documents/Mvault/obsidian_sync.sh` thành:

Bash

```
#!/bin/bash
VAULT_PATH="/Users/destiny/Documents/Mvault"
PYTHON_SCRIPT="/Users/destiny/Documents/obsidian_sync.py"

case $1 in
  "pull")
    cd "$VAULT_PATH" && /usr/bin/git pull origin main
    ;;
  "push")
    python3.12 "$PYTHON_SCRIPT"
    cd "$VAULT_PATH" && /usr/bin/git add . && /usr/bin/git commit -m "Auto sync: $(date)" && /usr/bin/git push origin main
    ;;
esac
```

**Bước 2: Thêm code vào `init.lua` của Hammerspoon** Mở file cấu hình Hammerspoon của bạn và thêm đoạn mã sau:

Lua

```
-- Bo theo doi su kien mo/dong app
local function obsidianWatcher(appName, eventType, appObject)
    if (appName == "Obsidian") then
        if (eventType == hs.application.watcher.launched) then
            -- Khi mo Obsidian: Thuc hien Pull
            hs.execute("sh /Users/destiny/Documents/Mvault/obsidian_sync.sh pull &")
        elseif (eventType == hs.application.watcher.terminated) then
            -- Khi dong Obsidian: Thuc hien Sync Python va Push
            hs.execute("sh /Users/destiny/Documents/Mvault/obsidian_sync.sh push &")
        end
    end
end

local appWatcher = hs.application.watcher.new(obsidianWatcher)
appWatcher:start()
```

### Khi trên github đã có repo obsidian ta sync những thư mục cần thiết qua 1 repo khác để pulish thành dạng blog online:
## Tự động hóa hoàn toàn bằng GitHub Actions (Khuyên dùng)

Bạn sẽ thiết lập để mỗi khi bạn đẩy (push) nội dung mới lên `my-obsidian-vault`, GitHub sẽ tự động "copy" chúng sang thư mục `content` của repo `quartz`.

**Các bước thực hiện:**

1. **Tạo Personal Access Token (PAT):**
    
    - Vào GitHub Settings của bạn > **Developer settings** > **Personal access tokens** > **Tokens (classic)**.
        
    - Chọn **Generate new token**. Đặt tên là "Quartz_Sync", tích chọn quyền `repo`.
        
    - **Lưu lại mã token này ngay lập tức** vì nó sẽ biến mất sau khi bạn đóng trang.
        
2. **Thêm Secret vào repo `my-obsidian-vault`:**
    
    - Vào repo `my-obsidian-vault` trên GitHub.
        
    - Chọn **Settings** > **Secrets and variables** > **Actions** > **New repository secret**.
        
    - Name: `QUARTZ_TOKEN`.
        
    - Secret: Dán mã token bạn vừa lưu ở bước 1 vào.
        
3. **Tạo file Workflow trong `my-obsidian-vault`:**
    
    - Trong repo vault, tạo thư mục `.github/workflows/` (nếu chưa có).
        
    - Tạo file mới tên là `sync-to-quartz.yml` với nội dung sau:
```
name: Sync Selected Folders to Quartz
on:
  push:
    branches:
      - main
jobs:
  repo-sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Vault
        uses: actions/checkout@v4

      - name: Prepare Selected Content
        run: |
          # 1. Tao mot thu muc tam thoi de chua nhung gi muon public
          mkdir staging
          
          # 2. Copy file index.md (Bat buoc phai co de lam trang chu)
          cp index.md staging/ || true
          
          # 3. Liet ke cac folder ban muon cho len blog o day
          # Thay "Folder1", "Folder2" bang ten folder that cua ban
          cp -r "Kien-thuc" staging/ || echo "Folder khong ton tai"
          cp -r "Chia-se" staging/ || echo "Folder khong ton tai"
          
          # 4. Neu ban co file le muon cho len thi dung lenh cp binh thuong
          # cp "file-le.md" staging/

      - name: Pushes to Quartz repo
        uses: cpina/github-action-push-to-another-repository@main
        env:
          API_TOKEN_GITHUB: ${{ secrets.QUARTZ_TOKEN }}
        with:
          # Luu y: Bay gio chung ta day tu thu muc 'staging' chu khong phai '.'
          source-directory: 'staging'
          destination-github-username: 'leo1in88'
          destination-repository-name: 'quartz'
          user-email: your-email@gmail.com
          target-branch: v4
          target-directory: 'content'
          create-target-directory: true
```