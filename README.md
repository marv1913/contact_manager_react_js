# Online Contact Manager

This is a react.js application to manage contacts. The contacts are stored in a postgresql database and are displayed on a map. 

# Database
The postgresql database should have two tables ("users" and "contacts").

## Deployment

The easiest way is using docker-compose.

## Contact visibility and users

There are two different user roles. As admin you are able to  add, update und delete contacts. As normal user you only can see the public stored contacts. 
Contacts can be stored as private and as public. Public contacts are visible for all users. Private contacts are only visible for admin users. 

