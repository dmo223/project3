# CSE264 Project 3: Making a Blackjack 21 Game using HTML/CSS/DOM
## Due: Thursday, November 14, 2019 at 11:59 PM

In this assignment, you will use HTML, CSS, and JavaScript on the Frontend to create a playable blackjack 21 game.

All the code and packages you need is in this GitHub Classroom repo. Do not install any other packages (unless given premission by the instructor)

### REST API for Cards
You will use the [Deck of Card API](http://deckofcardsapi.com/) as a was to create a Deck of Cards, take cards out of that deck, and manage the hands of the player and the dealer.

### Blackjack Game
Blackjack is a simple card game between a dealer and a player. The goals is to get 21 points, without going over 21 (busting). A player wins if they:
* get 21 points on the player's first two cards (called a "blackjack" or "natural"), without a dealer blackjack;
* reach a final score higher than the dealer without exceeding 21
* let the dealer draw additional cards until their hand exceeds 21 ("busted").

The game goes as followes:
* Both the dealer and the player get two cards from the deck. The first card from the dealer is visible to the player, the second is not.
* The player goes first, and is allowed to ask for another card (Hit), or end their turn (Stay). If the player goes over 21, the game is over and the dealer wins.
* Next the dealer gets to go. They flip their hidden card and must get new cards until they have atleast 17 points. Then they stop once they reach or go beyond 17. If they go over 21, the player wins.
* If nether the player nor dealer go over 21, then whoever has the most points wins. If they have the same points, the game is a tie.

Number cards are worth the number listed on the card. Face cards (King, Queen, Jack) are worth 10 points. And Aces are worth 11 or 1 points (use the value that ensures you do not go over 21).

### Frontend layout
Your page should have a green (card table green) background. At the top will be the 

### Frontend Testing
You will also need to test all the routes listed above, using similar AJAX requests you used in Project 1. You must test all routes for both success and failure (return the correct error code). A basic index.pug page with some buttons have been created for you in this project. The code in /public/javascripts/main.js will fire when pressing these buttons. Feel free to add new buttons to create more events, or test other behaviour. Write comments in main.js to describe your tests and what expected output is. 

### Install and Run
You must have node.js running on your machine. Once you have cloned this project you can run `npm install` to install all the packages for this project. Then running `npm run dev` will run the dev version of this code, which will run this project with nodemon. Nodemon auto-restarts the node server every time you make a change to a file. Very helpful when you are writing and testing code.

### .env and MongoDB
You need to have a MongoDB server running before launching your API. You can
download MongoDB [here](https://www.mongodb.com/download-center/community), or install it via a package manager.
Windows users, read [Install MongoDB on Windows](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/).

You can also use
[MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or [Compose](https://www.compose.io/) instead of downloading and installing MongoDB locally. 

Which ever you do, you will need to cretae a .env from the .env.example 
You can do this by `cp .env.example .env`

The store your MongoDB URI connection in your  `.env` file.

**Note:** Never ever store real credentials in `.env.example` or anywhere that is not `.env` as you may push these changes to your git repo.

### Get Hosted MongoDB Atlas

From [https://github.com/sahat/hackathon-starter#deployment](https://github.com/sahat/hackathon-starter#deployment)

- Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Click the green **Get started free** button
- Fill in your information then hit **Get started free**
- You will be redirected to Create New Cluster page.
- Select a **Cloud Provider and Region** (such as AWS and a free tier region)
- Select cluster Tier to **Free Shared Clusters**
- Give Cluster a name (default: Cluster0)
- Click on green **:zap:Create Cluster button**
- Now, to access your database you need to create a DB user. To create a new MongoDB user, from the **Clusters view**, select the **Security tab**
- Under the **MongoDB Users** tab, click on **+Add New User**
- Fill in a username and password and give it either **Atlas Admin** User Privilege
- Next, you will need to create an IP address whitelist and obtain the connection URI.  In the Clusters view, under the cluster details (i.e. SANDBOX - Cluster0), click on the **CONNECT** button.
- Under section **(1) Check the IP Whitelist**, click on **ALLOW ACCESS FROM ANYWHERE**. The form will add a field with `0.0.0.0/0`.  Click **SAVE** to save the `0.0.0.0/0` whitelist.
- Under section **(2) Choose a connection method**, click on **Connect Your Application**
- In the new screen, select **Node.js** as Driver and version **2.2.12 or later**. _*WARNING*_: Do not pick 3.0 or later since connect-mongo can't handle mongodb+srv:// connection strings.
- Finally, copy the URI connection string and replace the URI in MONGODB_URI of `.env.example` with this URI string.  Make sure to replace the <PASSWORD> with the db User password that you created under the Security tab.
- Note that after some of the steps in the Atlas UI, you may see a banner stating `We are deploying your changes`.  You will need to wait for the deployment to finish before using the DB in your application.


**Note:** As an alternative to MongoDB Atlas, there is also [Compose](https://www.compose.io/).

### Grading
* **80 Points** - REST API works as descibed in this README. All routes and search works as expected. All inputs are validated and correct errors are returned to client
* **15 Points** - Frontend Test covers all routes and search functionality.
* **5 Points** - Backend and Frontend code is well commented and easy to read/follow.

* If code doesn't run/compile you can get no more than a 65. But please write comments and a README to explain what you were trying to do. 


