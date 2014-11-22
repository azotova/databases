CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
createdAt varchar(50),
objectId varchar(50),
roomname varchar(50),
messageText varchar (1000),
updatedAt varchar (1000),
username varchar(50),
ID int(11) NOT NULL auto_increment, PRIMARY KEY (ID)
);

CREATE TABLE users (
username varchar(50),
ID int(11) NOT NULL auto_increment, PRIMARY KEY (ID)
);

CREATE TABLE rooms (
roomname varchar(50),
ID int(11) NOT NULL auto_increment, PRIMARY KEY (ID)
);


/* Create other tables and define schemas for them here! */

/* There is a problem. I want unique IDs of my rooms 
and users in the messages table. Good link:
http://www.w3schools.com/sql/sql_foreignkey.asp

Should use drop to delete old tables.
*/


/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/

