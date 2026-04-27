Cần file .bat để khởi động obsidian và chạy các lệnh python sau đó, cần file vbs để ẩn tiến trình chạy terminal của file .bat 
[Obsidian.bat](https://drive.ttfy.cc/20260421152949_Obsidian.bat)

[runobsidian.vbs](https://drive.ttfy.cc/20260421152948_runobsidian.vbs)

-----------
Cập nhật trên window ta sử dụng Phần mềm Autohotkey trải nghiệm như hammerspoon trên Mac os.
Sử dụng **AutoHotkey (AHK)** là giải pháp tối ưu nhất trên Windows để có được trải nghiệm mượt mà giống như Hammerspoon trên macOS. AHK sẽ chạy ngầm và "canh" sự kiện của hệ thống, giúp bạn không cần quan tâm đến việc mở Obsidian bằng cách nào (Web Clipper, shortcut, hay mở trực tiếp file `.md`).
Dưới đây là hướng dẫn chi tiết để thiết lập "bộ canh cửa" này:
### Bước 1: Cài đặt AutoHotkey

1. Truy cập trang chủ [AutoHotkey](https://www.autohotkey.com/) và tải bản **v2.0** (phiên bản mới nhất và ổn định nhất).
2. Tiến hành cài đặt như một phần mềm bình thường.
---
### Bước 2: Tạo script "Obsidian Watcher"
Bạn hãy tạo một file mới tên là `ObsidianSync.ahk` (ví dụ lưu tại `E:\Obsidian\ObsidianSync.ahk`) với nội dung sau. Lưu ý tôi đã viết chú thích không dấu theo yêu cầu của bạn:
AutoHotkey

```
#Requires AutoHotkey v2.0
#SingleInstance Force

; --- CAU HINH DUONG DAN ---
; Thay doi duong dan dung voi may cua ban
global vaultPath := "E:\Obsidian\Learningnewthings"
global pythonScript := "E:\Obsidian\obsidian_sync.py"
global logFile := "E:\Obsidian\log.txt"

; Thong bao script da bat dau chay ngam
TrayTip "Obsidian Watcher", "Dang theo doi Obsidian...", 1

Loop {
    ; 1. Doi den khi Obsidian.exe xuat hien
    ProcessWait "Obsidian.exe"
    
    ; 2. Khi Obsidian vua mo: Thuc hien Pull tu GitHub
    ; Dung RunWait de dam bao lenh chay an (Hide)
    RunWait 'cmd /c "cd /d ' vaultPath ' && git pull origin main >> ' logFile ' 2>&1"', , "Hide"
    
    ; 3. Doi cho den khi Obsidian.exe dong han
    ProcessWaitClose "Obsidian.exe"
    
    ; 4. Sau khi dong: Chay Python sync R2
    RunWait 'python "' pythonScript '" >> "' logFile '" 2>&1', , "Hide"
    
    ; 5. Thuc hien Push len GitHub
    RunWait 'cmd /c "cd /d ' vaultPath ' && git add . && git commit -m "Auto sync Windows: %A_Now%" && git push origin main >> ' logFile ' 2>&1"', , "Hide"
    
    ; Thong bao da dong bo xong (Hien thi trong 2 giay)
    TrayTip "Obsidian Sync", "Da dong bo xong len GitHub va R2!", 1
}
```
---
### Bước 3: Kích hoạt Web Clipper thông qua AHK
Vì AHK đã "canh" tiến trình `Obsidian.exe`, khi Web Clipper gửi lệnh mở Obsidian, AHK sẽ ngay lập tức nhận ra và thực hiện lệnh `git pull` trước khi bạn kịp bắt đầu lưu clip.
**Để script này luôn chạy cùng máy tính:**
1. Nhấn **Windows + R**, gõ `shell:startup` và nhấn Enter.
    
2. Tạo một **Shortcut** của file `ObsidianSync.ahk` vào thư mục này.
    
3. Từ giờ, mỗi khi bạn bật máy, "người gác cổng" AHK sẽ tự động làm việc.
## File .py dùng cho Mac os: 
```
import os
import re
import boto3
import mimetypes
import datetime  # <--- CHÍNH LÀ DÒNG NÀY CÒN THIẾU
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
        print(f"   [DELETED] {os.path.basename(local_path)} -> {file_name_r2}")
        return True

    except Exception as e:

        print(f"   [ERROR] Khong the upload {file_name_r2}: {e}")

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
## File python để upload ảnh lên r2 đồng thời edit lại link trong note. Sau đó đồng bộ vào folder icloud (dùng cho máy window)
```
import os
import re
import boto3
import mimetypes
import datetime
import shutil  # <--- THEM THU VIEN NAY
from urllib.parse import quote
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

# --- 1. CAU HINH R2 (Giu nguyen) ---
R2_ACCOUNT_ID = "R2_ACCOUNT_ID"
R2_ACCESS_KEY = "R2_ACCESS_KEY"
R2_SECRET_KEY = "R2_SECRET_KEY"
R2_BUCKET_NAME = "drive"
R2_PUBLIC_URL = "https://drive.ttfy.cc"

# --- 2. CAU HINH VAULT VA DESTINATION ---
MY_VAULT = r"E:\Obsidian\Learningnewthings" 
SYNC_DEST = r"E:\iCloudDrive\iCloud~md~obsidian\Learningnewthings"  # <--- DUONG DAN THU MUC DICH

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
        
        s3_client.upload_file(local_path, R2_BUCKET_NAME, file_name_r2, ExtraArgs={'ContentType': ctype})
        
        os.remove(local_path) 
        print(f"    [DELETED] {os.path.basename(local_path)} -> {file_name_r2}")
        return True
    except Exception as e:
        print(f"    [ERROR] Khong the upload {file_name_r2}: {e}")
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
                    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
                    clean_name = file_name_original.replace(" ", "_")
                    file_name_r2 = f"{timestamp}_{clean_name}"
                    
                    print(f"-> Processing: {file_name_original}")
                    
                    if upload_and_cleanup(str(full_path), file_name_r2):
                        encoded_name = quote(file_name_r2)
                        online_url = f"{R2_PUBLIC_URL}/{encoded_name}"
                        
                        prefix = "!" if ext in IMAGE_EXTS else ""
                        new_markdown_link = f"{prefix}[{file_name_original}]({online_url})"
                        
                        content = re.sub(rf'!?\[\[{re.escape(link)}\]\]', new_markdown_link, content)
                        content = re.sub(rf'!?\[.*?\]\({re.escape(link)}\)', new_markdown_link, content)
                        
                        has_changed = True

        if has_changed:
            with open(note_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"[DONE] Updated: {os.path.basename(note_path)}")
            
    except Exception as e:
        print(f"Loi tai file {note_path}: {e}")

def sync_vault():
    """Copy toan bo thu muc sang vung dich, ghi de neu da ton tai"""
    print(f"\n--- DANG BAT DA DONG BO SANG {SYNC_DEST} ---")
    try:
        # Neu thu muc dich da ton tai, shutil.copytree voi dirs_exist_ok se ghi de file trung ten
        # Neu muon xoa sach thu muc dich truoc khi copy thi dung shutil.rmtree(SYNC_DEST) truoc
        shutil.copytree(MY_VAULT, SYNC_DEST, dirs_exist_ok=True)
        print(f"[SUCCESS] Da dong bo toan bo vault sang {SYNC_DEST}")
    except Exception as e:
        print(f"[ERROR] Khong the dong bo: {e}")

def main():
    # Lap ban do file de tim anh o moi thu muc
    for root, _, files in os.walk(MY_VAULT):
        for file in files:
            file_map[file] = os.path.join(root, file)

    all_notes = [os.path.join(r, f) for r, _, fs in os.walk(MY_VAULT) for f in fs if f.endswith(".md")]
    
    # Thuc hien xu ly upload va cleanup regex
    with ThreadPoolExecutor(max_workers=5) as executor:
        for note in all_notes:
            executor.submit(process_note, note)
    
    # Sau khi tat ca cac thread da xong, tien hanh sync folder
    sync_vault()

if __name__ == "__main__":
    main()
```
## Trên mac os thì dùng hammerspoon hành động mỗi lần bật và tắt obsidian.
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