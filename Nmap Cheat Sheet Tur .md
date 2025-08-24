
## Türkçe Versiyon

```markdown
# Nmap Cheat Sheet 2025
*Ağ Tarama ve Keşif için Tam Kılavuz*

## Hedef Belirleme

| Anahtar | Örnek | Açıklama |
|---------|-------|----------|
| (yok) | `nmap 192.168.1.1` | Tek IP tara |
| (yok) | `nmap 192.168.1.1 192.168.2.1` | Belirli IP'leri tara |
| (yok) | `nmap 192.168.1.1-254` | Aralık tara |
| (yok) | `nmap scanme.nmap.org` | Domain tara |
| (yok) | `nmap 192.168.1.0/24` | CIDR notasyonu ile tara |
| `-iL` | `nmap -iL targets.txt` | Dosyadan hedefleri tara |
| `-iR` | `nmap -iR 100` | Rastgele 100 host tara |
| `--exclude` | `nmap --exclude 192.168.1.1` | Listelenen hostları hariç tut |

## Tarama Teknikleri

| Anahtar | Örnek | Açıklama |
|---------|-------|----------|
| `-sS` | `nmap 192.168.1.1 -sS` | TCP SYN port taraması (Varsayılan) |
| `-sT` | `nmap 192.168.1.1 -sT` | TCP connect port taraması |
| `-sU` | `nmap 192.168.1.1 -sU` | UDP port taraması |
| `-sA` | `nmap 192.168.1.1 -sA` | TCP ACK port taraması |
| `-sW` | `nmap 192.168.1.1 -sW` | TCP Window port taraması |
| `-sM` | `nmap 192.168.1.1 -sM` | TCP Maimon port taraması |

## Host Keşfi

| Anahtar | Örnek | Açıklama |
|---------|-------|----------|
| `-sL` | `nmap 192.168.1.1-3 -sL` | Sadece hedefleri listele |
| `-sn` | `nmap 192.168.1.1/24 -sn` | Sadece host keşfi |
| `-Pn` | `nmap 192.168.1.1-5 -Pn` | Sadece port taraması (keşif yok) |
| `-PS` | `nmap 192.168.1.1-5 -PS22-25,80` | TCP SYN keşfi |
| `-PA` | `nmap 192.168.1.1-5 -PA22-25,80` | TCP ACK keşfi |
| `-PU` | `nmap 192.168.1.1-5 -PU53` | UDP keşfi |
| `-PR` | `nmap 192.168.1.1/24 -PR` | Yerel ağda ARP keşfi |
| `-n` | `nmap 192.168.1.1 -n` | DNS çözümleme yapma |

## Port Belirleme

| Anahtar | Örnek | Açıklama |
|---------|-------|----------|
| `-p` | `nmap 192.168.1.1 -p 21` | Belirli portu tara |
| `-p` | `nmap 192.168.1.1 -p 21-100` | Port aralığı |
| `-p` | `nmap 192.168.1.1 -p U:53,T:21-25,80` | Çoklu TCP ve UDP portları |
| `-p` | `nmap 192.168.1.1 -p-` | Tüm portları tara |
| `-p` | `nmap 192.168.1.1 -p http,https` | Servis adı ile tara |
| `-F` | `nmap 192.168.1.1 -F` | Hızlı port taraması (100 port) |
| `--top-ports` | `nmap 192.168.1.1 --top-ports 2000` | İlk x portu tara |

## Servis ve Versiyon Tespiti

| Anahtar | Örnek | Açıklama |
|---------|-------|----------|
| `-sV` | `nmap 192.168.1.1 -sV` | Servis versiyon tespiti |
| `-sV --version-intensity` | `nmap 192.168.1.1 -sV --version-intensity 8` | Yoğunluk seviyesi 0-9 |
| `-sV --version-light` | `nmap 192.168.1.1 -sV --version-light` | Hafif mod (daha hızlı) |
| `-sV --version-all` | `nmap 192.168.1.1 -sV --version-all` | Yoğunluk seviyesi 9 (daha yavaş) |
| `-A` | `nmap 192.168.1.1 -A` | OS tespiti, versiyon tespiti, script taraması ve traceroute etkinleştir |

## İşletim Sistemi Tespiti

| Anahtar | Örnek | Açıklama |
|---------|-------|----------|
| `-O` | `nmap 192.168.1.1 -O` | İşletim sistemi tespiti |
| `-O --osscan-limit` | `nmap 192.168.1.1 -O --osscan-limit` | OS tespitini sınırla |
| `-O --osscan-guess` | `nmap 192.168.1.1 -O --osscan-guess` | Agresif tahmin |
| `-O --max-os-tries` | `nmap 192.168.1.1 -O --max-os-tries 1` | Maksimum OS tespit denemesi |

## Zamanlama ve Performans

| Anahtar | Örnek | Açıklama |
|---------|-------|----------|
| `-T0` | `nmap 192.168.1.1 -T0` | Paranoyak (IDS atlatma) |
| `-T1` | `nmap 192.168.1.1 -T1` | Gizli (IDS atlatma) |
| `-T2` | `nmap 192.168.1.1 -T2` | Kibar (daha yavaş) |
| `-T3` | `nmap 192.168.1.1 -T3` | Normal (varsayılan) |
| `-T4` | `nmap 192.168.1.1 -T4` | Agresif (daha hızlı) |
| `-T5` | `nmap 192.168.1.1 -T5` | Çılgın (çok hızlı) |

## NSE Scriptleri

| Anahtar | Örnek | Açıklama |
|---------|-------|----------|
| `-sC` | `nmap 192.168.1.1 -sC` | Varsayılan NSE scriptleri ile tara |
| `--script` | `nmap 192.168.1.1 --script=banner` | Tek script |
| `--script` | `nmap 192.168.1.1 --script=http*` | Joker karakterli scriptler |
| `--script` | `nmap 192.168.1.1 --script=http,banner` | Çoklu scriptler |
| `--script` | `nmap 192.168.1.1 --script "not intrusive"` | İstilacı scriptleri hariç tut |
| `--script-args` | `nmap --script snmp-sysdescr --script-args snmpcommunity=admin 192.168.1.1` | Argümanlı script |

## Güvenlik Duvarı/IDS Atlatma

| Anahtar | Örnek | Açıklama |
|---------|-------|----------|
| `-f` | `nmap 192.168.1.1 -f` | Paketleri parçala |
| `-D` | `nmap -D 192.168.1.101,192.168.1.102,192.168.1.103,192.168.1.23 192.168.1.1` | Decoy (yalancı) tarama |
| `-S` | `nmap -S www.microsoft.com www.facebook.com` | Kaynak adresi spoof et |
| `-g` | `nmap -g 53 192.168.1.1` | Belirli kaynak port kullan |
| `--proxies` | `nmap --proxies http://192.168.1.1:8080 192.168.1.1` | Proxy kullan |
| `--data-length` | `nmap --data-length 200 192.168.1.1` | Rastgele veri ekle |

## Çıktı Seçenekleri

| Anahtar | Örnek | Açıklama |
|---------|-------|----------|
| `-oN` | `nmap 192.168.1.1 -oN normal.file` | Normal çıktı |
| `-oX` | `nmap 192.168.1.1 -oX xml.file` | XML çıktı |
| `-oG` | `nmap 192.168.1.1 -oG grep.file` | Grep uyumlu çıktı |
| `-oA` | `nmap 192.168.1.1 -oA results` | Tüm formatlarda çıktı |
| `-v` | `nmap 192.168.1.1 -v` | Detay seviyesini artır |
| `--open` | `nmap 192.168.1.1 --open` | Sadece açık portları göster |

## Kullanışlı Örnekler

```bash
# Web sunucusu keşfi
nmap -p80 -sV -oG - --open 192.168.1.1/24 | grep open

# Rastgele web sunucuları
nmap -n -Pn -p 80 --open -sV -vvv --script banner,http-title -iR 1000

# DNS brute force
nmap -Pn --script=dns-brute domain.com

# SMB keşfi
nmap -n -Pn -vv -O -sV --script smb-enum*,smb-ls,smb-mbenum,smb-os-discovery,smb-s*,smb-vuln*,smbv2* -vv 192.168.1.1

# XSS tespiti
nmap -p80 --script http-unsafe-output-escaping scanme.nmap.org

# SQL injection kontrolü
nmap -p80 --script http-sql-injection scanme.nmap.org
