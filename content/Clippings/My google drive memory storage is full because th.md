---
source: https://gemini.google.com/app/8d4297901d0b0e18
author:
  - "[[Gemini]]"
description: Meet Gemini, Google’s AI assistant. Get help with writing, planning, brainstorming, and more. Experience the power of generative AI.
tags:
  - clippings
  - gemini
---
My google drive memory storage is full because there are many photos and video in google photo. I want to batch move some photos and videos in google photo A to google photo B (for this account I bought a larger capacity package). Please guide me to handle this problem.

---

To move a large volume of photos and videos from one Google account to another without manually downloading and re-uploading every file, the **Partner Sharing** method is the most efficient. This method creates a direct link between the two accounts and allows you to "copy" the entire library in the background.

## Method 1: Partner Sharing (Recommended)

This is the fastest "batch" method. It allows Account B to see all photos from Account A and save them to its own storage with a single click.

### Step 1: Send the Invite (from Account A)

1. Open [Google Photos](https://photos.google.com/) on your computer or the mobile app while logged into **Account A**.
2. Go to **Settings** (gear icon) and select **Partner sharing**.
3. Click **Get started** and enter the email address for **Account B**.
4. Choose to share **All photos** and click **Next** > **Send invitation**.

### Step 2: Accept and Save (from Account B)

1. Log into **Account B** and open Google Photos.
2. Go to the **Sharing** tab and open the invitation from Account A.
3. Click **Accept**.
4. **Crucial Step:** Once accepted, click **Turn on auto save** (or go to Partner Sharing settings in Account B).
5. Select **Save all photos** to your library.

> \[!IMPORTANT\] **Wait for the transfer:** Google will now begin copying the files in the background. This can take several hours (or days) depending on your library size. You can check the progress by looking at the main Photos timeline in Account B; the photos will slowly start appearing there.

### Step 3: Freeing Up Space in Account A

Once you have confirmed that the photos are visible in the main library of **Account B**, you can delete them from **Account A**.

- When Account A deletes a photo, the copy in Account B remains (because you chose "Save all photos").
- The storage count will then shift from Account A to Account B.

---

## Method 2: Google Takeout (Complete Manual Migration)

If you want a physical backup or if Partner Sharing feels too automated, use **Google Takeout** to export your data.

| Feature | Partner Sharing | Google Takeout |
| --- | --- | --- |
| **Speed** | Fast (Cloud-to-Cloud) | Slow (Download then Upload) |
| **Effort** | Low (Automatic) | High (Manual ZIP handling) |
| **Metadata** | Preserves all dates/locations | Sometimes requires tools to fix JSON data |
| **Limit** | Entire Library | Entire Library or Specific Albums |

**How to use Takeout:**

1. Go to [takeout.google.com](https://takeout.google.com/) while logged into **Account A**.
2. Deselect everything except **Google Photos**.
3. Click **Next step** and choose **Link via email** as the delivery method.
4. Once you receive the email, download the ZIP files to your computer.
5. Log into **Account B** and drag-and-drop the extracted folders into the Google Photos browser window.

---

## Pro-Tips for Batch Moving

- **Un-Archive First:** Partner Sharing does **not** share photos that are currently in your "Archive" folder. Move them back to your main library in Account A before starting if you want them transferred.
- **Check Storage Quota:** Before deleting anything from Account A, go to [google.com/settings/storage](https://www.google.com/search?q=https://google.com/settings/storage) on Account B to ensure the "Photos" bar is actually increasing, confirming the files are now being counted there.
- **Album Metadata:** Partner sharing moves the photos, but it does **not** move your organized Albums. You will need to re-share specific albums manually if you want to keep those structures.

[Google Photos Partner Sharing walkthrough](https://www.youtube.com/watch?v=-BrWt-_dro0)

This video provides a visual walkthrough of the Partner Sharing interface on both mobile and desktop to help you navigate the menus correctly.

**Would you like me to explain how to move specific Albums across so you don't lose your organization?**