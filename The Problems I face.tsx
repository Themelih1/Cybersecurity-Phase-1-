09.08.25 I had to try starting nmap on my line but First one my computer did not solve all of line then I had to been stopping nmap function. Probably on my line There was  many mac address as online. or There was a firewall. 
Then My wifi connection and other my device (smartphone etc.) suddenly cutted to all of wifi connection. But There was very interesting things that On my iphone could not to connection internet. when I was opened to VPN my iphone could to connect to internet.
Then I have started to research all of problem. and then I thought I have decied to change to my local ip adress. I used to 
sudo dhclient -r wlan0  
sudo dhclient wlan0
but not worked
During an nmap scan on my local network, my Linux laptop and some other devices lost Wi-Fi connection.
Checking logs with sudo journalctl -f, I saw messages like:
wlan0: RF-kill switch turned on
wlan0: blocked by rfkill
sudo rfkill unblock all


After this, all affected devices reconnected to the network.
Finally, I renewed my IP address with sudo dhclient -r wlan0 && sudo dhclient wlan0 to ensure a fresh connection.
