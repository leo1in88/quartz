---
title: GPU passthrough to LXCs beats VMs in Proxmox, and it's way simpler than you'd think
source: https://www.xda-developers.com/gpu-passthrough-to-lxcs-beats-vms/
author:
  - "[[Ayush Pande]]"
published: 2026-03-26
created: 2026-03-26
description: There's no point in wasting GPU resources on VMs when LXCs can share the same card
tags:
  - clippings
  - proxmox
  - gpu
---
Although virtual machines and containers work in entirely different ways, you might want to use both in your home lab. After all, virtual machines have better isolation provisions, making them ideal for dev tasks, nested containerization setups, makeshift storage servers, and other resource-heavy tasks where you need superior security provisions. Unfortunately, their resource-hogging tendencies make them less than ideal for minor self-hosting tasks, and that’s where lightweight containers come into the equation.

Better yet, Proxmox natively supports LXCs, and you can even rely on community templates to spin up different services and distros inside containers. But unless you’re using your virtual machines for dev tasks or hosting private gaming clouds (which work surprisingly well, believe it or not), it’s a good idea to stick with Linux containers if you want to harness your graphics card in self-hosted apps.

## Unlike VMs, multiple LXCs can share the same graphics card simultaneously

### There are workarounds for VMs, but they’re not very accessible

If you’re attempting to harness your graphics card on a virtual machine, you’ll have to blacklist it on the host machine and configure different variables to ensure only that specific VM can access it. But since [GPU passthrough](https://www.xda-developers.com/running-proxmox-vms-with-gpu-passthrough-is-much-easier/) assigns the entire physical card to your virtual machine, you can’t use it on anything else until you close said VM. This exclusive access makes virtual machines a bit of a pain when you want to use the same GPU on different systems simultaneously.

Technically, there are ways to solve this problem, but they’re too expensive (and somewhat tedious) to configure. Unless you’ve got the right enterprise hardware, you can remove vGPUs and SR-IOV-based sharing provisions out of the equation. Other than that, your only choice is to grab multiple graphics cards and hook them up to different VMs – which is far from realistic for most home labbers (including yours truly).

### With the right permissions, you can have a bunch of LXCs powered by a single GPU

![Benchmarking Ollama LLMs](https://static0.xdaimages.com/wordpress/wp-content/uploads/wm/2026/03/ollama-lxc-gtx-1080-19.jpg?q=49&fit=crop&w=825&dpr=2)

LXCs, on the other hand, share the kernel resources with the underlying Proxmox server. So, you don’t need to set up exclusive access on them when configuring GPU passthrough. As long as you’ve configured GPU drivers on the host system, LXCs can directly access them when you give them the right permissions. The best part? Since there’s no exclusive GPU lock mechanism on LXCs, you can use the same graphics card with multiple containers without looking into expensive workarounds.

Throw in the lightweight nature of LXCs, and they’re perfect for self-hosting GPU-powered services. For example, if you’ve got Jellyfin and [Ollama instances](https://www.xda-developers.com/i-ran-local-llms-on-a-dead-gpu-and-the-results-surprised-me/) deployed on a server with a single GPU (or even an iGPU), you can let both FOSS utilities harness your graphics card’s processing capabilities in parallel tasks.

## Passing a GPU to LXCs is fairly straightforward

### Especially compared to PCI passthrough on VMs

Compared to configuring GPU passthrough on VMs manually, LXCs have a simple procedure. First, you’ll have to ensure the host machine has the proper drivers installed, and this process depends entirely on your GPU manufacturer. In most cases, it’s identical to setting up your GPU on a CLI Debian distro. But if you’re using an old and discontinued graphics card as I do, you’ll want to select the correct drivers from your manufacturer. You might also need the *build-essential*, *make*, and *software-properties-common* packages set up before you install the GPU drivers, so feel free to use the APT package manager to install them.

Once that’s done, you’ll need the device number associated with your GPU components. I’ve got Nvidia graphics cards, and the command for checking the GPU details is *ls -l /dev/nvidia\** for Team Green’s offerings. You can add these variables using the Resources tab on your LXC, but I prefer passing the GPU via config files. On the Proxmox node, you can find these files inside the */etc/pve/lxc* directory, and the number associated with each *.conf* document will correspond to the ID of your LXCs. For my Nvidia-powered rig, I tend to add the following lines at the bottom of the file, but you might want to change the number after the lxc.cgroup2.devices.allow: c argument to match the GPU components from the output of the *ls -l /dev/nvidia\** command.

```
lxc.cgroup2.devices.allow: c 195:* rwm
lxc.cgroup2.devices.allow: c 235:* rwm
lxc.cgroup2.devices.allow: c 237:* rwm
lxc.mount.entry: /dev/nvidia0 dev/nvidia0 none bind,optional,create=file
lxc.mount.entry: /dev/nvidiactl dev/nvidiactl none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-uvm dev/nvidia-uvm none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-uvm-tools dev/nvidia-uvm-tools none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-modeset dev/nvidia-modeset none bind,optional,create=file
```

Then, you can just install the graphics card on the LXC the same way as you did on the host. Just remember to add the - *\-no-kernel-modules* parameter at the end when you’re on Nvidia cards; otherwise, the installation process will fail. If you’ve followed everything correctly, the LXC should be able to detect your GPU.

## Switching between GPU passthrough on LXCs and VMs is a hassle

### But it’s still doable if you’re willing to modify config files time and again

![Downloading Steam games on a Proxmox-powered Windows 11 VM](https://static0.xdaimages.com/wordpress/wp-content/uploads/wm/2026/02/proxmox-windows-11-gaming-1.jpg?q=49&fit=crop&w=825&dpr=2)

Let’s say you’ve got a bunch of LXCs accessing a graphics card, but you also want to use it occasionally in a VM or two. Although simultaneous access is out of the question, you can manually tweak the config files every time you need to switch your GPU passthrough setup from a VM to your LXC collection. I configured the GPU passthrough for my [dev VM](https://www.xda-developers.com/i-built-my-perfect-windows-dev-environment-inside-a-vm/) after already using my GTX 1080 with my LXCs, which caused the virtual machine to instantly recognize the graphics card and prevented the containers from accessing it.

The only tweak I need to pull off when I want to restore GPU access back to my LXCs is getting rid of the contents of the */etc/modprobe.d/vfio.conf* file. I typically leave the VFIO modules and other settings be, but you might also want to remove the variables responsible for blacklisting the graphics card on the host from the */etc/modprobe.d/blacklist.conf* file.