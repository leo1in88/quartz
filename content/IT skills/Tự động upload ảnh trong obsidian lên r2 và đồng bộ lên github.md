Ta cần các file sau.
file .vbs để ẩn bảng terminal 
[runobsidian.vbs](https://drive.ttfy.cc/20260418153921_runobsidian.vbs)
file .bat để gọi lệnh .py đồng thời gọi các lệnh pull và push github
[Obsidian.bat](https://drive.ttfy.cc/20260418153922_Obsidian.bat)
Và file .py với nội dung sau để thực thi
```
import os
import re
import boto3
import mimetypes
import datetime  
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
FILE_EXTS = ['json', 'bat', 'sh', 'py', 'js', 'pdf', 'zip']
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