---
title: "Little Snitch for Linux"
source: "https://obdev.at/products/littlesnitch-linux/index.html"
author:
published:
created: 2026-04-09
description: "Discover powerful applications such as Little Snitch Mini, Little Snitch, LaunchBar and Micro Snitch."
tags:
  - "clippings"
  - "linux"
---
![Little Snitch for Linux](https://obdev.at/Images/littlesnitch-linux/littlesnitch-linux-dark.png)

## Getting started

Once installed, open the user interface by running `littlesnitch` in a terminal, or go straight to `http://localhost:3031/`. You can bookmark that URL, or install it as a Progressive Web App. Any Chromium-based browser supports this natively, and Firefox users can do the same with the Progressive Web Apps extension.

### Watching your connections

The connections view is where most of the action is. It lists current and past network activity by application, shows you what's being blocked by your rules and blocklists, and tracks data volumes and traffic history. Sorting by last activity, data volume, or name, and filtering the list to what's relevant, makes it easy to spot anything unexpected. Blocking a connection takes a single click.

The traffic diagram at the bottom shows data volume over time. You can drag to select a time range, which zooms in and filters the connection list to show only activity from that period.

### Keeping blocklists

![](https://obdev.at/Images/littlesnitch-linux/blocklists-dark.png)

Blocklists let you cut off whole categories of unwanted traffic at once. Little Snitch downloads them from remote sources and keeps them current automatically. It accepts lists in several common formats: one domain per line, one hostname per line, `/etc/hosts` style (IP address followed by hostname), and CIDR network ranges. Wildcard formats, regex or glob patterns, and URL-based formats are not supported. When you have a choice, prefer domain-based lists over host-based ones, they're handled more efficiently. Well known brands are Hagezi, Peter Lowe, Steven Black and oisd.nl, just to give you a starting point.

One thing to be aware of: the `.lsrules` format from Little Snitch on macOS is not compatible with the Linux version.

### Writing your own rules

![](https://obdev.at/Images/littlesnitch-linux/rules-dark.png)

Blocklists work at the domain level, but rules let you go further. A rule can target a specific process, match particular ports or protocols, and be as broad or narrow as you need. The rules view lets you sort and filter them so you can stay on top of things as the list grows.

## Securing access

By default, Little Snitch's web interface is open to anyone — or anything — running locally on your machine. A misbehaving or malicious application could, in principle, add and remove rules, tamper with blocklists, or turn the filter off entirely.

If that concerns you, Little Snitch can be configured to require authentication. See the Advanced configuration section below for details.

## Under the hood

Little Snitch hooks into the Linux network stack using [eBPF](https://ebpf.io/), a mechanism that lets programs observe and intercept what's happening in the kernel. An eBPF program watches outgoing connections and feeds data to a daemon, which tracks statistics, preconditions your rules, and serves the web UI.

The source code for the eBPF program and the web UI is on [GitHub](https://github.com/obdev/littlesnitch-linux).

## Advanced configuration

The UI deliberately exposes only the most common settings. Anything more technical can be configured through plain text files, which take effect after restarting the `littlesnitch` daemon.

The default configuration lives in `/var/lib/littlesnitch/config/`. Don't edit those files directly — copy whichever one you want to change into `/var/lib/littlesnitch/overrides/config/` and edit it there. Little Snitch will always prefer the override.

The files you're most likely to care about:

- **`web_ui.toml`** — network address, port, TLS, and authentication. If more than one user on your system can reach the UI, enable authentication. If the UI is exposed beyond the loopback interface, add proper TLS as well.
- **`main.toml`** — what to do when a connection matches nothing. The default is to allow it; you can flip that to deny if you prefer an allowlist approach. But be careful! It's easy to lock yourself out of the computer!
- **`executables.toml`** — a set of heuristics for grouping applications sensibly. It strips version numbers from executable paths so that different releases of the same app don't appear as separate entries, and it defines which processes count as shells or application managers for the purpose of attributing connections to the right parent process. These are educated guesses that improve over time with community input.

Both the eBPF program and the web UI can be swapped out for your own builds if you want to go that far. Source code for both is on GitHub. Again, Little Snitch prefers the version in `overrides`.

## A word on limitations

Little Snitch for Linux is built for privacy, not security, and that distinction matters. The macOS version can make stronger guarantees because it can have more complexity. On Linux, the foundation is eBPF, which is powerful but bounded: it has strict limits on storage size and program complexity. Under heavy traffic, cache tables can overflow, which makes it impossible to reliably tie every network packet to a process or a DNS name. And reconstructing which hostname was originally looked up for a given IP address requires heuristics rather than certainty. The macOS version uses deep packet inspection to do this more reliably. That's not an option here.

For keeping tabs on what your software is up to and blocking legitimate software from phoning home, Little Snitch for Linux works well. For hardening a system against a determined adversary, it's not the right tool.

## License

Little Snitch for Linux has three components. The eBPF kernel program and the web UI are both released under the GNU General Public License version 2 and available on [GitHub](https://github.com/obdev/littlesnitch-linux). The daemon (`littlesnitch --daemon`) is [proprietary, but free to use and redistribute.](https://obdev.at/products/littlesnitch-linux/license.html)