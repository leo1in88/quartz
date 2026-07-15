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
### Bước 3: Kích hoạt Web Clipper thông qua AHK
Vì AHK đã "canh" tiến trình `Obsidian.exe`, khi Web Clipper gửi lệnh mở Obsidian, AHK sẽ ngay lập tức nhận ra và thực hiện lệnh `git pull` trước khi bạn kịp bắt đầu lưu clip.
**Để script này luôn chạy cùng máy tính:**
1. Nhấn **Windows + R**, gõ `shell:startup` và nhấn Enter.
2. Tạo một **Shortcut** của file `ObsidianSync.ahk` vào thư mục này.
3. Từ giờ, mỗi khi bạn bật máy, "người gác cổng" AHK sẽ tự động làm việc
AutoHotkey

```
#Requires AutoHotkey v2.0
#SingleInstance Force

; --- CAU HINH DUONG DAN ---
global vaultPath    := "G:\Obsidian\Learningnewthings"
global pythonScript := "G:\Obsidian\obsidian_sync.py"

TrayTip "Obsidian Watcher", "AHK dang quan ly: Chay Python -> Git Push", 1

Loop {
    global vaultPath, pythonScript

    ; 1. Doi den khi Obsidian.exe xuat hien
    ProcessWait "Obsidian.exe"
    
    ; 2. Doi cho den khi Obsidian.exe dong han (Da bo hoan toan cac buoc Sync In)
    ProcessWaitClose "Obsidian.exe"
    
    ; --- BAT DAU QUY TRINH SAU KHI DONG APP ---
    TrayTip "Obsidian Sync", "Dang xu ly du lieu...", 1

    ; 3. CHAY PYTHON TRUOC - Xu ly lam sach du lieu
    RunWait 'cmd /c python "' pythonScript '"', , "Hide"
    
    ; 4. GIT PUSH VÀO CUỐI PHIÊN - Chi thuc hien add, commit va push
    gitPushCmd := Format('cmd /c "cd /d "{1}" && git add . && git commit -m "Auto sync (Cleaned): {2}" && git push origin main"', vaultPath, A_Now)
    RunWait gitPushCmd, , "Hide"
    
    TrayTip "Obsidian Sync", "Moi thu da duoc lam sach va push len GitHub!", 1
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
## File python để upload ảnh lên r2 đồng thời edit lại link trong note.  (dùng cho máy window)
```
import os
import re
import boto3
import mimetypes
import datetime
from urllib.parse import quote
from pathlib import Path

# --- 1. CAU HINH R2 (LUU Y: HAY DOI KEY SAU KHI XONG DE BAO MAT) ---
R2_ACCOUNT_ID = "aa5d1765ecaeb453d7403a2079dbd0e6"
R2_ACCESS_KEY = "1e77ba49108e93876682253d26b3e124"
R2_SECRET_KEY = "4557bd1a1db6fdab68763697d1d3db1f2348199879c45cb6726c8a9a7709ba24"
R2_BUCKET_NAME = "drive"
R2_PUBLIC_URL = "https://drive.ttfy.cc"

# --- 2. CAU HINH VAULT ---
MY_VAULT = r"E:\Obsidian\Learningnewthings"

# --- 3. REGEX & CONFIG ---
IMAGE_EXTS = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg']
FILE_EXTS = ['json', 'bat', 'sh', 'py', 'js', 'pdf', 'zip', 'vbs']
ALL_EXTS = IMAGE_EXTS + FILE_EXTS
EXT_PATTERN = '|'.join(ALL_EXTS)
# Regex nay bat ca [[file.png]] va [text](file.png)
REGEX_LINKS = rf'!?\[\[(.*?\.({EXT_PATTERN}))\]\]|!?\[.*?\]\((.*?\.({EXT_PATTERN}))\)'

s3_client = boto3.client(
    service_name="s3",
    endpoint_url=f"https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com",
    aws_access_key_id=R2_ACCESS_KEY,
    aws_secret_access_key=R2_SECRET_KEY,
    region_name="auto",
)

def main():
    print(f"--- Bat dau xu ly Vault: {datetime.datetime.now()} ---")
    
    # Buoc 1: Lap ban do file ton tai trong Vault
    file_map = {}
    for root, _, files in os.walk(MY_VAULT):
        for file in files:
            # Uu tien file o thu muc sau hon neu trung ten
            file_map[file] = os.path.join(root, file)

    all_notes = []
    for root, _, files in os.walk(MY_VAULT):
        for file in files:
            if file.endswith(".md"):
                all_notes.append(os.path.join(root, file))

    # Buoc 2: Tim tat ca cac link file can upload trong tat ca ghi chu
    links_to_upload = {} # {file_name_original: online_url}
    files_to_delete = set()

    for note_path in all_notes:
        with open(note_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        matches = re.findall(REGEX_LINKS, content)
        for m in matches:
            link = m[0] if m[0] else m[2]
            if link.startswith('http'): continue
            
            file_name = os.path.basename(link)
            if file_name in file_map and file_name not in links_to_upload:
                local_path = file_map[file_name]
                
                # Tao ten file duy nhat tren R2
                timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
                clean_name = file_name.replace(" ", "_")
                file_name_r2 = f"{timestamp}_{clean_name}"
                
                # Upload len R2
                try:
                    ctype, _ = mimetypes.guess_type(local_path)
                    ctype = ctype or 'application/octet-stream'
                    s3_client.upload_file(local_path, R2_BUCKET_NAME, file_name_r2, ExtraArgs={'ContentType': ctype})
                    
                    online_url = f"{R2_PUBLIC_URL}/{quote(file_name_r2)}"
                    links_to_upload[file_name] = (online_url, file_name_r2)
                    files_to_delete.add(local_path)
                    print(f"   [UPLOADED] {file_name} -> {file_name_r2}")
                except Exception as e:
                    print(f"   [ERROR] Khong the upload {file_name}: {e}")

    # Buoc 3: Quay lai cap nhat tat ca ghi chu voi link moi
    for note_path in all_notes:
        with open(note_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        has_changed = False
        for original_name, (online_url, _) in links_to_upload.items():
            ext = original_name.split('.')[-1].lower()
            prefix = "!" if ext in IMAGE_EXTS else ""
            new_link = f"{prefix}[{original_name}]({online_url})"
            
            # Thay the Wikilink: [[file.png]]
            pattern_wiki = rf'!?\[\[{re.escape(original_name)}\]\]'
            if re.search(pattern_wiki, content):
                content = re.sub(pattern_wiki, new_link, content)
                has_changed = True
            
            # Thay the Markdown link: [anything](file.png)
            pattern_md = rf'!?\[.*?\]\({re.escape(original_name)}\)'
            if re.search(pattern_md, content):
                content = re.sub(pattern_md, new_link, content)
                has_changed = True

        if has_changed:
            with open(note_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"   [UPDATED] {os.path.basename(note_path)}")

    # Buoc 4: Xoa file local sau khi tat ca ghi chu da duoc cap nhat
    for f_path in files_to_delete:
        try:
            if os.path.exists(f_path):
                os.remove(f_path)
                print(f"   [CLEANED] {os.path.basename(f_path)}")
        except Exception as e:
            print(f"   [ERROR] Khong the xoa {f_path}: {e}")

    print("--- Hoan tat quy trinh ---")

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