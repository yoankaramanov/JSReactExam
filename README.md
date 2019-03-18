# Game Stats

## Introduction

###  Game Stats  is a Web Application, created with ReactJS and using MongoDB as database.It is made as a project for the ReactJS courese exam in SoftUni.

## Description

The project resembles an information website where the theme is games. Much like "Metacritic.com" and "HowLongToBeat.com" it displays various games with details and statistics about them for those who are interested. Two types of roles are implemented in this project: admin , user(regular user with no admin rights). Depending on the role you can have access to different parts and functionalities. Users: can just read static information on the home page and review a selected game in details. Admins: including the regular users rights they can create, edit and delete games wich show on the home page(just for logged in users).  

 ## Strucutre
 3 main parts:
 * public 
 * private
 * administrative
 
 
  The public part is visible just for non-authentication:
*	Home page background with no functionality
*	Home button leading nowhere yet
*	Login button ( leading to login form)
*	Register button ( leading to registration form)

 The private part is available to registered users only:
*	Home page is now a list of games
  
*	Games can be reviewed in detail by having a details button(leads to details page)
*	Logout button
  

 The administrative part is available to users with the role “Admin”:
*	Create game button on navbar(leads to create game form)
*	Delete button on each game in the Home page list(deletes the game from DB)
*	Edit button on each game in the Home page list(leads to edit game form and updates the changes on the current game after submit)

Two users are manually seeded into the database:
*	Admin(with admin rights): Email: admin@admin.com Name: Admin Password: 12345678
*	User(regular user): Email: user@user.com Name: User Password: 123123

## Installation 

### Server: “Server” folder 
  #### Install dependencies: *npm install* , start the client: *node index* (port: 5000).

### Client: “Client/games” folder (React web app)
  #### Install dependencies: *npm install* , start the client: *npm start* (port: 3000).
  







