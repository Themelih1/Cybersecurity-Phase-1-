# Nmap Cheat Sheet 2025
*Complete Guide to Network Scanning and Enumeration*

## Target Specification

| Switch | Example | Description |
|--------|---------|-------------|
| (none) | `nmap 192.168.1.1` | Scan a single IP |
| (none) | `nmap 192.168.1.1 192.168.2.1` | Scan specific IPs |
| (none) | `nmap 192.168.1.1-254` | Scan a range |
| (none) | `nmap scanme.nmap.org` | Scan a domain |
| (none) | `nmap 192.168.1.0/24` | Scan using CIDR notation |
| `-iL` | `nmap -iL targets.txt` | Scan targets from a file |
| `-iR` | `nmap -iR 100` | Scan 100 random hosts |
| `--exclude` | `nmap --exclude 192.168.1.1` | Exclude listed hosts |

## Scan Techniques

| Switch | Example | Description |
|--------|---------|-------------|
| `-sS` | `nmap 192.168.1.1 -sS` | TCP SYN port scan (Default) |
| `-sT` | `nmap 192.168.1.1 -sT` | TCP connect port scan |
| `-sU` | `nmap 192.168.1.1 -sU` | UDP port scan |
| `-sA` | `nmap 192.168.1.1 -sA` | TCP ACK port scan |
| `-sW` | `nmap 192.168.1.1 -sW` | TCP Window port scan |
| `-sM` | `nmap 192.168.1.1 -sM` | TCP Maimon port scan |

## Host Discovery

| Switch | Example | Description |
|--------|---------|-------------|
| `-sL` | `nmap 192.168.1.1-3 -sL` | List targets only |
| `-sn` | `nmap 192.168.1.1/24 -sn` | Host discovery only |
| `-Pn` | `nmap 192.168.1.1-5 -Pn` | Port scan only (no discovery) |
| `-PS` | `nmap 192.168.1.1-5 -PS22-25,80` | TCP SYN discovery |
| `-PA` | `nmap 192.168.1.1-5 -PA22-25,80` | TCP ACK discovery |
| `-PU` | `nmap 192.168.1.1-5 -PU53` | UDP discovery |
| `-PR` | `nmap 192.168.1.1/24 -PR` | ARP discovery on local network |
| `-n` | `nmap 192.168.1.1 -n` | Never do DNS resolution |

## Port Specification

| Switch | Example | Description |
|--------|---------|-------------|
| `-p` | `nmap 192.168.1.1 -p 21` | Scan specific port |
| `-p` | `nmap 192.168.1.1 -p 21-100` | Port range |
| `-p` | `nmap 192.168.1.1 -p U:53,T:21-25,80` | Multiple TCP and UDP ports |
| `-p` | `nmap 192.168.1.1 -p-` | Scan all ports |
| `-p` | `nmap 192.168.1.1 -p http,https` | Scan by service name |
| `-F` | `nmap 192.168.1.1 -F` | Fast port scan (100 ports) |
| `--top-ports` | `nmap 192.168.1.1 --top-ports 2000` | Scan top x ports |

## Service and Version Detection

| Switch | Example | Description |
|--------|---------|-------------|
| `-sV` | `nmap 192.168.1.1 -sV` | Service version detection |
| `-sV --version-intensity` | `nmap 192.168.1.1 -sV --version-intensity 8` | Intensity level 0-9 |
| `-sV --version-light` | `nmap 192.168.1.1 -sV --version-light` | Light mode (faster) |
| `-sV --version-all` | `nmap 192.168.1.1 -sV --version-all` | Intensity level 9 (slower) |
| `-A` | `nmap 192.168.1.1 -A` | Enable OS detection, version detection, script scanning, and traceroute |

## OS Detection

| Switch | Example | Description |
|--------|---------|-------------|
| `-O` | `nmap 192.168.1.1 -O` | OS detection |
| `-O --osscan-limit` | `nmap 192.168.1.1 -O --osscan-limit` | Limit OS detection |
| `-O --osscan-guess` | `nmap 192.168.1.1 -O --osscan-guess` | Guess aggressively |
| `-O --max-os-tries` | `nmap 192.168.1.1 -O --max-os-tries 1` | Set max OS detection tries |

## Timing and Performance

| Switch | Example | Description |
|--------|---------|-------------|
| `-T0` | `nmap 192.168.1.1 -T0` | Paranoid (IDS evasion) |
| `-T1` | `nmap 192.168.1.1 -T1` | Sneaky (IDS evasion) |
| `-T2` | `nmap 192.168.1.1 -T2` | Polite (slower) |
| `-T3` | `nmap 192.168.1.1 -T3` | Normal (default) |
| `-T4` | `nmap 192.168.1.1 -T4` | Aggressive (faster) |
| `-T5` | `nmap 192.168.1.1 -T5` | Insane (very fast) |

## NSE Scripts

| Switch | Example | Description |
|--------|---------|-------------|
| `-sC` | `nmap 192.168.1.1 -sC` | Scan with default NSE scripts |
| `--script` | `nmap 192.168.1.1 --script=banner` | Single script |
| `--script` | `nmap 192.168.1.1 --script=http*` | Wildcard scripts |
| `--script` | `nmap 192.168.1.1 --script=http,banner` | Multiple scripts |
| `--script` | `nmap 192.168.1.1 --script "not intrusive"` | Exclude intrusive scripts |
| `--script-args` | `nmap --script snmp-sysdescr --script-args snmpcommunity=admin 192.168.1.1` | Script with arguments |

## Firewall/IDS Evasion

| Switch | Example | Description |
|--------|---------|-------------|
| `-f` | `nmap 192.168.1.1 -f` | Fragment packets |
| `-D` | `nmap -D 192.168.1.101,192.168.1.102,192.168.1.103,192.168.1.23 192.168.1.1` | Decoy scan |
| `-S` | `nmap -S www.microsoft.com www.facebook.com` | Spoof source address |
| `-g` | `nmap -g 53 192.168.1.1` | Use given source port |
| `--proxies` | `nmap --proxies http://192.168.1.1:8080 192.168.1.1` | Use proxies |
| `--data-length` | `nmap --data-length 200 192.168.1.1` | Append random data |

## Output Options

| Switch | Example | Description |
|--------|---------|-------------|
| `-oN` | `nmap 192.168.1.1 -oN normal.file` | Normal output |
| `-oX` | `nmap 192.168.1.1 -oX xml.file` | XML output |
| `-oG` | `nmap 192.168.1.1 -oG grep.file` | Grepable output |
| `-oA` | `nmap 192.168.1.1 -oA results` | All formats output |
| `-v` | `nmap 192.168.1.1 -v` | Increase verbosity |
| `--open` | `nmap 192.168.1.1 --open` | Only show open ports |

## Useful Examples

```bash
# Web server discovery
nmap -p80 -sV -oG - --open 192.168.1.1/24 | grep open

# Random web servers
nmap -n -Pn -p 80 --open -sV -vvv --script banner,http-title -iR 1000

# DNS brute force
nmap -Pn --script=dns-brute domain.com

# SMB enumeration
nmap -n -Pn -vv -O -sV --script smb-enum*,smb-ls,smb-mbenum,smb-os-discovery,smb-s*,smb-vuln*,smbv2* -vv 192.168.1.1

# XSS detection
nmap -p80 --script http-unsafe-output-escaping scanme.nmap.org

# SQL injection check
nmap -p80 --script http-sql-injection scanme.nmap.org
