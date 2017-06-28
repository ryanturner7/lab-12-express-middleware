# Lab - 12 Express & middleware

In this application, the user is able to create, read, update and of course, destroy various shark objects.

This applications dependencies consist of;
-express
-mongoose
-body-parser
-dotenv
-cors
-morgan

In order to start mongoose, you must run the command, npm run start-db.

# routes

-POST - sends a request to the database to create a shark object, which is composed of 4 properties which include the shark type, length, width, and toothCount.

-GET - sends a request to the database to find a shark object with a specified ID

-PUT - sends a request to the database to find and update a shark with the specified ID.

-DELETE - sends a request to the database to find and delete a shark with the specified ID.
