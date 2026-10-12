---
source: https://www.reddit.com/r/ObsidianMD/comments/1qk6gkk/claude_code_bot_in_my_vault_just_wowed_me/
author:
  - "[[LifeBandit666]]"
description:
tags:
  - clippings
  - reddit
---
My vault lives in my NAS and I sync my phone using Syncthing.

I recently put Claude Code in a VM and mounted my Obsidian Vault to the VM, and out CC in the Vault.

I had it organise my 400 odd notes and it did an ok job, but I read beforehand the concept of having and Inbox folder for daily use and then a wider vault, so I got it to make that too.

I had this idea that I would make daily notes, voice notes and a folder for just dumping ideas (called brain dump) and periodically have Claude organise them. In the process I would train Claude on my needs. So that's what I've been doing. I've been taking my training notes from work and speaking them into the inbox where a Python Script sees them and transcribe them, then have Claude put them in a work folder for me. It's been taking my daily notes, pulling the links and notes and then putting my Todo lists that I've missed in my nite for the next day. I've also been making detailed notes on processes for work, which have been filed away.

All good.

The I had an idea for using Obsidian for the game Arc Raiders. I pulled my phone out and spoke the idea in: make a file that is filled with the materials I need in the game, then get Claude to research the materials and find the best places for finding them. Then use the notes when I play.

Claude read it and filed it.

Today I have moved away from the Terminal for interacting with CC. I had Claude AI generate a python script that watches a folder called AI inside my vault. When a file changes it launches Claude Code to read the file, do the things and output to a second file.

Place it on the VM and test. "Clear my inbox" outputs what it has done (the training).

Then I told it to make a Gaming folder in my Hobbies folder and create a file called Arc Raiders Materials, simple stuff I could do myself but testing. Done.

The I filled the file with the Mats I need in the game in a list and told CC in the file to generate a new file with places to find the materials and rank it by ease. I threw a couple of blueprints in for fun and went to run a bath.

Got in the bath and opened Obsidian on my phone to find, not only a table with the materials ranked by ease of finding, but instructions on farming routes, online blueprint resources and notes on the best ways to kill the Arc I need materials from.

So that's my wall of text on how I am now interacting with Claude Code inside my Vault.

Bonus: I just found out that if I turn on Tailscale on my phone, Obsidian syncs outside the house, so now I can interact with my Local Only Claude Code from anywhere

---

## Comments

> **Tru3Magic** • [18 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o14cjhr/) •
> 
> How did you setup your Local Claude Code? How much juice does it need to run?
> 
> > **Trosso** • [7 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o14oez6/) •
> > 
> > You can run it in the Claude app btw
> > 
> > **LifeBandit666** • [8 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o14d7fy/) •
> > 
> > It's a debian VM with my Obsidian folder mounted. Literally just installed Claude Code on it and created a basic CLAUDE.md in the root of the Obsidian folder where I told it about my Vault.
> > 
> > I have no clue how much juice it takes to run, it runs in my Proxmox cluster on a mini PC which has a 14tb hdd plugged into it
> > 
> > > **ArugulaBackground577** • [12 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o159cie/) •
> > > 
> > > Does that use Anthropic's cloud model, so your notes are open to them? Just confirming.
> > > 
> > > > **Far\_Note6719** • [23 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o15cl96/) •
> > > > 
> > > > His notes? No, their notes now. 
> > 
> > **Deep\_Image\_5037** • [1 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o14pd7t/) •
> > 
> > What are the specs on the pc? Is it just a basic pc with a big hdd?
> > 
> > > **LifeBandit666** • [1 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o14q21z/) •
> > > 
> > > Yeah man, i3 minipc, £50 on ebay. Runs this VM and my Arrr stack. HDD is on my other one (I have 2) using Open Media Vault as a NAS

> **Dioxic** • [34 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o14viry/) •
> 
> I’m legitimately not trying to be an a\*\*hole here, just trying to understand the utility / what I’m missing. You’re essentially just using it as a custodian, right? Or move things around and label them? And then create summary documents?
> 
> This is a general comment not directed at OP, but more for the broader community. I’m not debating the utility of OPs use cases in any way, but I’m still waiting to see the use case of AI + PKM that is life changing. I feel like a lot of folks are talking about using AI to just shuffle things around and then they feel productive or like they did something… are new connections being made leading to more novel insights? Are more pieces being written, or some other benchmark of productivity?
> 
> > **ajarvis30** • [8 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o15r5jl/) •
> > 
> > I'm on the same page. This post seems like it was tailor-made for me. I love Obsidian, play Arc Raiders, and Claude is my go-to agent for trying to figure out the AI hype. Despite all that, I'm getting next to nothing out of this. Maybe I lack the vision, but I feel like the vast majority of AI anecdotes that are supposed to wow me just seem like marginally more efficient versions of a short Google sesh. No offense to OP, your setup sounds stellar, and the most impressive thing here is the curiosity it takes to figure any of this out. Just not for me. Anyways, this rock isn't going to live under itself.
> > 
> > > **monsters\_from\_the\_id** • [5 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o1620mn/) •
> > > 
> > > \> Anyways, this rock isn't going to live under itself.
> > > 
> > > Thanks for this <3
> > > 
> > > > **hudimudi** • [1 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o16ouln/) •
> > > > 
> > > > What does that even mean?
> 
> **ameyxd-github** • [13 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o154j15/) •
> 
> I genuinely think using any type of AI - note taking, summarization etc. is counterproductive to the idea of having a second brain in obsidian unless you simply want it as a custodian of info.
> 
> Like the whole point of typing things out is to remember. When was the last time you read a whole summary document anyway?
> 
> **webtron18** • [4 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o15ol2b/) •
> 
> I’ve been using this setup for about 6 months now and love it. Sure sure my notes are Anthropics now but I have a sanitized vault and personal separate just in case. Claude does a lot of custodial work like you said with tagging and linking, but it does a lot more. I have a folder of notes about homeschooling like techniques that work with my kids, state laws, and general schedules. I then have it generate a lesson plan for each day for each kid based on what we do last week and what the overall goals are for each of them. Saves me literally hours of work. I also use it to develop personal apps by tracking project plans I create with it and design strategies. It will help me code them based on these notes and I sell it for like $1M/day (/s). It can also sludge through all my daily notes and condense them into articulate review sessions and track habits. Basically I think if I hired a human assistant that was 10yo and had a photographic memory what would I have it do.
> 
> My only major rule is that I cannot have a system that relies on Claude. At anytime I can turn off Claude and still function (albeit) a lot slower.
> 
> **Lizreu** • [2 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o16ev7p/) •
> 
> Lots of people don’t use Obsidian as a “second brain”. Some of us just use it as an alternative to jotting ideas down or keeping track of some important information. I have pretty bad ADHD so no amount of writing things down will make me remember it when I need it. I use Obsidian primarily as a store of information. Automating this goes a long way.
> 
> **Key-Hair7591** • [1 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o155gqg/) •
> 
> I can't speak for anyone else and I have yet to do this in Obsidian, but I feel like the biggest utility is capturing random thoughts and then making connections between thoughts and getting feedback based on a persona or a stated goal.
> 
> I haven't made the move in Obsidian yet because I'm trying to be very careful about how and if I open up my vault. I have Claude code running in a container with access outside of the container to specific folders. Those specific folders will be a certain class of note that Claude will have access to.
> 
> Also thinking about how I'll leverage an MCP integration to do this. I definitely don't think you should just mindlessly dump things into Claude; you should be thoughtful about it but just organizing your thoughts alone is probably worth its weight in gold.
> 
> **pageofswrds** • [0 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o15pdwf/) •
> 
> Try programming with it. It. Is. Nuts.
> 
> **blackshadow** • [0 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o1633tp/) •
> 
> I’m using cursor and obsidian to assist with my postgrad studies.
> 
> The game changer for me is loading all my study notes and reading materials into obsidian then have cursor (usually claude or Gemini) extract all the key concepts from a week of uni materials into concise notes that are cross linked.
> 
> Instead of having walls of dense text to wade through I’m presented with concise notes to read (and approve before being added to my vault).
> 
> When working on assessments I search through the my notes for appropriate concepts and then can easily access related content via the links.
> 
> It’s a game changer for me.

> **tashmoo** • [3 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o14ge9c/) •
> 
> Pretty interested in you setup as a total noob . İ wpuld be grardful if you xan give us a how to video or smt if you can find time
> 
> > **LifeBandit666** • [5 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o14ivn1/) •
> > 
> > It's literally just talking to Claude AI on my phone at work spit balling ideas.
> > 
> > 1- have a computer always running with your Obsidian Vault files in it 2- Install Claude Code on it 3- put a file in your vault called CLAUDE and put your prompt in there 4- Give Claude AI the idea to interact with Claude Code in your vault by having a python script watch files. Mine has an AI folder with 3 files called Inbox, Status and Output
> > 
> > Ai/Inbox is where I tell Claude Code what to do
> > 
> > Ai/Status is whether it's running or done
> > 
> > Ai/Output is where Claude Code responds
> > 
> > That's it.
> > 
> > My Vault has an Inbox folder which has 3 more folders Daily Notes, Voice Notes and Brain Dump.
> > 
> > I made a simple Daily Note Template and started using it daily.
> > 
> > Voice Notes I pointed an app called Voice Recorder at on my phone and had Claude generate a python script in the actual Vault on my computer that uses Google Cloud to transcribe any recordings.
> > 
> > Brain Dump is complete files I make on my phone.
> > 
> > Claude Code organised my mess of random notes in my Vault. I went in and cleaned them up and added to them.
> > 
> > Now I just have Claude Code move the files out of the Inbox to the rest of the Vault and make a new Daily Note for the next day.
> > 
> > Syncthing to sync my phone with my Vault when I get home (or through Tailscale outside the Home)
> > 
> > I just tell Claude Code to do things one thing at a time for a but, and when it's done say "now generate/add that flow to a note to yourself in the Inbox folder (wider vault, this AI folder idea is new tonight) and next time I ask it remembers the last time, so it's additional stuff, like" If in my daily Note I say something needs to be done by a date, add it to my daily notes until that date. If I say it is to be done ON a date, add it to the daily note for that day"
> > 
> > > **Trick-Chocolate7330** • [2 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o150917/) •
> > > 
> > > The only thing I'm having a little bit of trouble understanding is how you set up the inbox outbox system. So if I understand you correctly, you like write a note in the inbox, which is basically like a letter to Claude Claude, so you're just sending it a prompt. And so you might say something like, create a note with all the best places to farm batteries in our graders. And then you have a Python script which somehow tells Claude Claude to process that prompt and output it to a different markdown file in a different folder. I like to understand a little bit better how that Python code works because I've been interacting with Claude Claude either through the desktop app or through the VS Code plugin and I wasn't aware that you could have a Python script call Claude Claude. I know that you can use the API, but then you have to pay for it. So could you say a little more about how that Python script is calling Claude Claude without using either a terminal that you have to open or the desktop app or like VS Code with a plugin?
> > > 
> > > > **cointoss3** • [2 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o15lkko/) •
> > > > 
> > > > Oh shit. The first part of this is an interesting idea.
> > > > 
> > > > **LifeBandit666** • [1 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o16ph44/) •
> > > > 
> > > > Yeah you've nailed it.
> > > > 
> > > > The inbox is like typing in the terminal and the output is what Claude you say back in the terminal.
> > > > 
> > > > Honestly no idea what's in that python script, Claude AI made it in when I asked it to on Claude Desktop. It told me where to put it and what to put in the terminal to get it to work. The mind fuck for me was that this took me like half an hour to set up and get working.
> > > > 
> > > > Essentially the python script watches the AI folder for changes to the inbox file, calls up Claude Code and inputs the contents into it then changes Status to say it's working. When it's done it puts the response into Output and changes Status again.
> > > > 
> > > > For me this means I can use my vault on my phone all day at work making notes, drafting ideas and saving links into MY inbox and type "organise my Inbox" in that file and come home.
> > > > 
> > > > My phone hits the WiFi and that all gets organised and I get a new daily note for tomorrow that has all the stuff I missed today in it.
> > > > 
> > > > > **Trick-Chocolate7330** • [1 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o16r0kk/) •
> > > > > 
> > > > > Would you mind asking Claude do a brief description of what’s in the script that I can give to mine to figure it out.

> **willitexplode** • [5 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o14x5aw/) •
> 
> I’ve been using CC for maybe 9 months or so as my in-Vault personal assistant. Best tip I can give is to give it a skill to write your preferences to a file in a deterministic manner (ie “preferences.md”), to vocalize your preferences, and to include “read preferences.md” in your Claude.md file. It benefits from tuning and refining over time (to your system, not mine) and has become wildly effective for me.
> 
> As an example, I’ve had CC as my sous chef in the kitchen for months now. I’m just now finishing up some final touches, but as of now it manages all my recipe files (yaml tags, templates, etc, so I can spit anything at it and I’ll get a recipe out that fits my system), and collaborates with me on meal planning and prepping in accordance with my preferences, restrictions, and macro goals. It also knows my ingredients and fridge inventory, and will prioritize expiring and fresh items. It does one week at a time, 3 meals a day plus snacks and other items I keep prepped (pickles, ferments, soda syrups, etc).
> 
> Once the meal is planned, I get a prep plan optimized for batching and efficiency—Ie if it can be made or prepped in advanced it is, and when I’m already in the kitchen, which adds up in savings—black beans in the instant pot Monday night for Wednesday dinner, for example. It also helps me meet certain goals like making one pickle every week or adding 2 items to freezer—it’ll calculate and build it all in with impressive synergy.
> 
> That’s all deterministic from prompting, scripts, and rules files. I also has all the features of Claude and MCPs, so we can chat and think and troubleshoot and code too. This past weekend we coded a supabase and vercel website for my meal planning which my partner can access and interact with… all recipes and plans there, with a kanban board and drag and drop functionality, just on a website CC and I whipped up in a few hours. He makes whatever changes he wants to the meal plan, it saves, plops back down into obsidian, then I have CC spit out final meal/prep plans. After eating we can rate and upload photos for the future. If something sucks, CC will know (YAML tag) and probably not suggest it unless we request it in the future. The pictures pop up in the kanban cards for the online interface.
> 
> Btw this all lives in obsidian… CC just runs a script to sync recipes and plans with the supabase when partner makes changes, and runs locally otherwise.
> 
> It’s been amazing. My cognitive load gets to go into hunting for recipes I’ll love, and then I get to kinda sit back and rediscover them a bit when they’re well suited.
> 
> Anywho, meet the tip of the iceberg. You can do a lot. Hope that’s a little inspo.
> 
> > **kirbence** • [3 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o15f883/) •
> > 
> > Hey [u/willitexplode](https://www.reddit.com/user/willitexplode/). We are completely on the same page. I too use it for food inventory management, recipe management, and nutritional logging. One of my favorite things is to give Claude a receipt and it automatically populates my inventory. I just have to mark things as used up and if it is a staple it ends up in my Grocery list. It is completely full of utility. The nutritional logging is easier than any nutritional app I've ever used. Biggest issue is accurate nutrition information but once correct it's so simple.
> > 
> > I'm also doing something similar to the OP, by being able to use voice notes that automatically add items to my food log through an API call. Pretty cool that I don't have to rely on MyFitnessPal or other tools. I control my data and it is information that I don't care if Anthropic is aware of it.

> **nwl0581** • [3 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o14xzxn/) •
> 
> Just for my understanding, you feed all you’re notes into anthropoics LLM, right? Or is there a way to use Claude locally?
> 
> > **LifeBandit666** • [1 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o16pwqe/) •
> > 
> > Yes Claude Code lives on a local machine but of course it uses Anthropic's servers to run. I'm sure it's possible with a local only LLM too I just haven't looked into running one of those yet

> **ArtBox1622** • [1 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o14qrec/) •
> 
> Gemini-scribe plugin does this out of the box and has a great agent in the app. I too am converting Obsidian into my second-brain with so much ease. House maintenance info, Investing info, Travel projects it does it all and organizes it. All that's left is email/calendar integration which are nightmares on their own.
> 
> Glad you are enjoying the productivity boost
> 
> > **LifeBandit666** • [3 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o14rv0i/) •
> > 
> > Nice, I didn't know about this Plugin. I'm testing Gemini and Claude subscriptions this month and have Gemini CLI running as a Home Assistant bot.
> > 
> > Honestly though Claude is blowing Gemini out of the water in my testing this month. The number of fuck ups Gemini has made compared to Claude with my setups...
> > 
> > I'm fine with it looking at files and telling me what they say (is the front room light on) but not managing my 2nd brain.
> > 
> > I literally gave Gemini the task of organising the brain for my Home Assistant bot and it totally fucked it (it's another Obsidian Vault BTW) and I had to have Claude rebuild it...

> **Worldly-Plate5770** • [\-4 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o14wkkt/) •
> 
> "Claude... Just wowed me" brother, I've got just the th thing for you. [https://www.youtube.com/watch?v=sJNK4VKeoBM](https://www.youtube.com/watch?v=sJNK4VKeoBM)

> **shawnist1** • [0 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o14y9jv/) •
> 
> Have you thought about an MCP for access to your vault and then just using the Claude app on your phone connected to the MCP? You will need a way to search and traverse the vault (I use a vector store with pointers to file paths).

> **pageofswrds** • [0 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o15pbvr/) •
> 
> I haven't used it in obsidian yet, but I've been using it for programming. And let me tell you - it is genuinely, fundamentally, life-altering for SWE. I'm not at all surprised you're getting good results with it here. (Did you know it can even look at and evaluate images??)

> **astrae\_research** • [1 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o14o0ye/) •
> 
> Thank you for the setup writeup! I was wondering what do you use for voice notes taking and transcribing?
> 
> > **LifeBandit666** • [2 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o14ptxl/) •
> > 
> > This is honestly the weakest point of the setup. Claude AI made me a python script that checks for files in the Voice Notes folder and uses Google TTS to transcribe and summarise it.
> > 
> > I have an app [https://f-droid.org/packages/org.fossify.voicerecorder/](https://f-droid.org/packages/org.fossify.voicerecorder/) that I've pointed at the Voice Notes folder on my phone in the Obsidian app.
> > 
> > When I get home my phone syncs with Syncthing and hits my actual Vault on my NAS. The python script sees the voice notes, transcribe and summarises into a summaries folder in markdown format and deletes the voice notes.
> > 
> > Google TTS butchers my Yorkshire accent!
> > 
> > I have considered using the built in voice recorder and adding notes to the same file, and having Claude have a go with both to make a richer note tbh
> > 
> > > **Trick-Chocolate7330** • [0 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o150ukw/) •
> > > 
> > > I have a similar setup on iPhone. I use an app called Just Press Record, which automatically uploads it to my iCloud folder, and then I have a Python script which sends the recording to Whisper, which is the best available TTS by far, and the costs for using it to transcribe notes are marginal, maybe a couple of dollars a month at most for recording a lot of notes. And then I have the same Python script put the output in my Obsidian Vault. So you might look around for an application that automatically uploads whatever recordings you make to a cloud like iCloud or Dropbox or Google Drive and use a similar process to what I do. That ensures that I don't need to wait for my Obsidian Vault on my phone to sync anything to get the transcription processed. If you DM me, I'd be happy to share the Python code with you. It's got some extra functions where it automatically titles the note and adds the date and like groups multiple recordings in the same note for a day unless I tell it not to so it is responsive to voice commands like I can tell it new note or to title the note in a particular way. And all that's just handled by saying to the GPT if the transcription from Whisper comes back and the first words are new note, make it into a new note. If the first words that come back are title, title the note, whatever follows, and so on.

> **tomByrer** • [1 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o14tox1/) •
> 
> */takes notes*

> **Milo\_za** • [1 points](https://reddit.com/r/ObsidianMD/comments/1qk6gkk/comment/o158ki3/) •
> 
> Awesome setup! I would love to see the scripts :)  
> Mind sharing them?