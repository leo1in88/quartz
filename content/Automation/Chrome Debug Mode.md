## Chrome Debug Mode — Your Automation's Window to the World

Your automation system needs to control a web browser. But it doesn't launch its own browser from scratch — it connects to one that's already running. This is called **Chrome Debug Mode** (technically, the Chrome DevTools Protocol or CDP).

**Why not just launch a new browser?**

Because marketplace websites require you to be logged in. If your automation launched a fresh browser every time, it would need to log in every time. By connecting to your existing browser (where you're already logged in), the automation can start working immediately.

**How to start Chrome in debug mode:**

Tell your AI: 
`"Help me create a script or shortcut that launches Chrome with remote debugging enabled on port 9222. It should use a separate profile directory so it doesn't interfere with my normal Chrome."`

The key flags are:

- Remote debugging on port 9222
    
- A dedicated user data directory (so your automation has its own bookmarks, cookies, etc.)
    
- A separate profile that won't mess with your everyday browsing
    

**On Mac,** this typically means launching Chrome from the terminal with special flags.

**On Windows,** you create a shortcut with the flags added to the target path.

**Testing the connection:**

Once Chrome is running in debug mode, open a new tab and go to: [http://localhost:9222/json/version](http://localhost:9222/json/version)

If you see a JSON response with browser version info, you're connected. If you see nothing, Chrome isn't in debug mode yet — check the flags.

Your automation system will probe this endpoint before every upload. If Chrome isn't available, it won't attempt a blind upload — it'll wait until the browser is ready.

**Important: Log in to your marketplace in this debug Chrome.** Navigate to your marketplace's upload page (like merch.amazon.com for Amazon Merch), log in, and make sure you're fully authenticated. Your automation will use this session.