
# Online Contact Manager

This is a react.js application to manage contacts. The contacts are stored in a postgresql database and are displayed on a map. 

## Contact visibility and users

There are two different user roles. As admin you are able to  add, update und delete contacts. As normal user you only can see the public stored contacts. 
Contacts can be stored as private and as public. Public contacts are visible for all users. Private contacts are only visible for admin users. 

# Database

The postgresql database should have two tables ("users" and "contacts"):

 - users (username varchar  primary key, password varchar, isadmin bool)
 - contacts (forename varchar, name varchar, street varchar, postId int, town varchar, country varchar, id int  primary key,     	    isprivate bool, latitude varchar, longitude varchar);

## Deployment

The easiest way is using docker-compose:

 1. clone repository
 2. run "docker-compose up" 
 3. visit http://localhost:8081 in your webbrowser

Alternatively you can build the application manually:

 1. setup a postgresql database 
 2. create tables mentioned in "Database" section
 3. edit database settings in *.js modules
 4. cd to "webdev_rest" directory and run "node index.js"
 5. cd to root directory of cloned repository and run "npm start"
