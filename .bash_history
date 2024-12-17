cd Backendframe
npm install
sudo apt update
sudo apt install nodejs npm
node -v
npm -v
npm install
npm install -g pm2
pm2 start server.js
sudo apt update
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
sudo systemctl restart nginx
sudo systemctl status nginx
sudo nano /etc/nginx/sites-available/default
sudo systemctl restart nginx
node server.js
sudo lsof -i :3000
sudo kill -9 17693
sudo lsof -i :3000
sudo kill -9 17693
sudo lsof -i :3000
sudo kill -9 17903
sudo lsof -i :3000
sudo kill -9 17949
sudo lsof -i :3000
sudo kill -9 17988
sudo lsof -i 3000
node server.js
sudo lsof -i :3000
sudo kill -9 18080
node server.js
sudo lsof -i :3000
sudo kill -9 18146
sudo lsof -i :3000
sudo kill -9 18173
sudo lsof -i :3000
sudo kill -9 18200
sudo lsof -i :3000
sudo kill -9 18277
sudo kill -9 18227
sudo lsof -i :3000
sudo kill -9 18254
sudo lsof -i :3000
sudo reboot
cd Backendframe
sudo lsof -i :3000
node server.js
sudo nano /etc/nginx/sites-available/default
node server.js
sudo systemctl restart nginx
node server.js
sudo systemctl status mongod
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo apt install -y mongodb-org
sudo rm /etc/apt/sources.list.d/mongodb-org-6.0.list
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo nano /etc/apt/apt.conf.d/99allow-insecure-repos
sudo apt update
sudo apt install -y mongodb-org
wget https://repo.mongodb.org/apt/ubuntu/pool/multiverse/m/mongodb-org/mongodb-org-server_4.4.10_amd64.deb
wget https://repo.mongodb.org/apt/ubuntu/pool/multiverse/m/mongodb-org/mongodb-org-server_4.4.18_amd64.deb
cat /etc/lsb-release
sudo apt-get install gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc |    sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg    --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl status mongod
sudo systemctl enable mongod
sudo systemctl status mongod
node server.js
sudo systemctl status mongod
node server.js
ps aux | grep node
kill -9 4368
ps aux | grep node
kill -9 4496
ps aux | grep node
pm2 list
pm2 stop all
pm2 list
pm2 save
pm2 save --force
forever list
forever stopall
systemctl list-units --type=service
sudo systemctl stop node-app.service
ps aux | grep node
ps aux | grep node | grep -v grep | awk '{print $2}' | xargs kill -9
ps aux | grep node
systemctl list-units --type=service | grep node
sudo systemctl stop kmod-static-nodes.service
sudo systemctl disable kmod-static-nodes.service
node server.js
nohup node server.js &
logout
npm install pm2 -g
pm2 restart server.js
pm2 list
cd Backendframe
pm2 restart server.js
pm2 list
pm2 start root/Backendframe/server.js
node server.js
pm2 restart node server.js
pm2 list
pm2 restart server.js
pm2 start server.js --name server
pm2 list
pm2 restart server
sudo cat /etc/nginx/sites-available/default
sudo nano /etc/nginx/sites-available/default
sudo systemctl reload nginx
sudo cat /etc/nginx/sites-available/default
sudo nano /etc/nginx/sites-available/default
sudo systemctl reload nginx
node server.js
sudo tail -n 50 /var/log/nginx/error.log
pm2 start server.js --name server
sudo netstat -tuln | grep 3000
sudo cat /etc/nginx/sites-available/default
sudo nano /etc/nginx/sites-available/default
sudo systemctl reload nginx
sudo nano /etc/nginx/sites-available/default
sudo systemctl reload nginx
node server.js
sudo systemctl status nginx
pm2 logs server
sudo rm -rf /var/cache/nginx/*
pm2 restart server
sudo systemctl restart nginx
cd Backendframe
cd ..
cd Runmind
list
ls
sudo systemctl status nginx
exit
