import sys, os 

os.system("""CLIENT_NAME='"""+sys.argv[1]+"""'
cd /etc/openvpn/easy-rsa/ || return
./easyrsa --batch revoke $CLIENT_NAME
./easyrsa gen-crl
sudo rm -f /etc/openvpn/crl.pem
cp /etc/openvpn/easy-rsa/pki/crl.pem /etc/openvpn/crl.pem
chmod 644 /etc/openvpn/crl.pem
sudo rm -r /etc/openvpn/clients/$CLIENT_NAME
sudo rm /root/clients/$CLIENT_NAME.ovpn

clear
history -c""")