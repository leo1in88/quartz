[ ] **Run the following commands in a terminal window**
# install ethtool
sudo apt install ethtool -y
# list network devices
ip addr
[ ] **Continue with the following commands to check if the device supports WOL**
# replace enp6s0 ** with the device name to test
sudo ethtool enp6s0

[ ] **If it contains a g it supports WOL, continue with the following commands**
# enable wol on the device
sudo ethtool -s vmbr0 wol g
# edit the network interfaces configuration
sudo nano /etc/network/interfaces
[ ] **Paste the following below the iface line for the network device**
ethernet-wol g

_NOTE: If the WOL flag doesn't stick with the configuration above, replace the "ethernet-wol g" value in /etc/network/interfaces with "post-up /usr/sbin/ethtool -s_ enp6s0 _wol g", replacing_ enp6s0 _with the name of the interface._

---
in modem Mirotik:
tool → script → source
/tool wol mac=0a:e0:af:ae:00:7c interface=ether2
/tool wol mac=0A-E0-AF-A4-47-E2 interface=ether2
Sometimes interface is ether1 or ether3. plz check with “ip addr” , enp6s0 nằm ở dòng thứ mấy.