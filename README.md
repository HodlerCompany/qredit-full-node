Adding a Forging Delegate to the Network
Using the desktop wallet and our new address that we just set up, we will register as a delegate and set up a new node so we are forging external to our seed node. This section requires some command-line experience.
Register as a Delegate
 
In the wallet you want to register as a delegate, click on the Menu Icon (3 vertical dots at the top-right).
 
Then choose the “Register Delegate” option.
 
Enter your desired delegate name, and input your passphrase. You can then submit that transaction to the network.
 
Reload your desktop wallet and you will see your wallet is now a delegate.
Voting for your new Delegate
Because we’re in an auto-forging state, we don’t need to vote for ourselves. That being said, it’s worth doing anyway.
 
In the new Delegate Wallet, go to the Votes tab and click on the “Vote” button.
 
Find yourself in the delegate list and enter your passphrase. You can then press “Next” and send the transaction.
 
You will then see information about yourself in the Votes tab.
 
You will also see your Delegate showing in the Explorer Delegate Monitor.
Setup a New Forging Node
You will need a new machine ready for us to setup. To make it easier, we will use ARKCommander to setup all dependencies then overwrite with our bridgechain configuration.
Download and run ARKCommander
wget http://ark.io/ARKcommander.sh && bash ARKcommander.sh
Enter your user password to gain root privileges if/when asked.
 
Your system will then update ready for a node. This can take a while but if you find there’s no response, you can restart this process and try again.
 
Once finished, reboot your machine with sudo reboot
SSH back into your delegate machine and run ARKcommander
bash ARKcommander.sh
 
Once started, press “1” and Enter to install Ark Node. This ensures we have all the dependencies we need for the node installed. Once finished, input “Y” to setup logrotate and press Enter to continue.
 
Input an empty secret if asked, and “Y” then Enter to apply config. Press Enter again to go back to the main menu. Then input “0” and press Enter a final time to Exit the ARKCommander.
There will now be the MainNet Node setup in ~/ark-node.
Remove the current ark-node
rm -rf ~/ark-node/
Copy Node files from Qredit.io
wget https://qredit.io/downloads/qredit-full-node
Note: You will have to change the username and IP to the auto-forging node you’re copying from. You will also have to change the path you’re copying from if you chose to install the bridgechain somewhere different.
Navigate to the Node folder
cd ~/qredit-full-node
Update the config file in an editor of your choice
nano ~/qredit-full-node/config.Qredit.json
•	Change port to 4101
•	Change db.database to ark_bridgechain
•	Check the peers.list already has the IP for your Seed node (see below image) 
Seed node: 185.85.18.192
•	Change forging.secret to ["YOUR PASSPHRASE"]
 
List of Peers for Delegate Node (only using Seed Node).
Remove packaged files (which were installed on seed node)
rm -rf package-lock.json node_modules/
Re-install local dependencies for the Node
npm install libpq
npm install secp256k1
npm install bindings
npm install
Create Postgres Database for our Bridgechain to use
createdb ark_bridgechain
Run the Node (in the Background)
forever start app.js --genesis genesisBlock.Qredit.json --config config.Qredit.json
Run the Node (in the foreground)
node app.js --genesis genesisBlock.Qredit.json --config config.Qredit.json
Note: This is a 1 line command so copy / paste the whole section.
 
You will begin to start the sync between nodes.

The delegate node has now started forging blocks.
