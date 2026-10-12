![Pasted image 20260224201129.png](https://drive.ttfy.cc/20260418111018_Pasted_image_20260224201129.png)![Pasted image 20260224201228.png](https://drive.ttfy.cc/20260418111015_Pasted_image_20260224201228.png)
đoạn code:
`/ip firewall nat`
`add chain=srcnat \`
    `src-address=100.100.10.2 \`
    `dst-address=10.100.100.0/24 \`
    `action=masquerade`
`/ip firewall mangle`
`add chain=prerouting \`
    `src-address=100.100.10.2 \`
    `action=accept \`
    `comment="Bypass routing-mark for internal WireGuard VPN"`