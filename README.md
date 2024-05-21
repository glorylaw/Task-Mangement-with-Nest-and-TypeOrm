## Instructions to set up
Ensure to set up the database.The database in use is postgres.Depending on the name and password of your local postgres database,update these information in the
/src/app.module file.Update the username and password to your local postgres username and password.

Once the above is done,create a database in your pgadmin or any sql query interface with the name task-management

## Installation

```bash
$ yarn install
```

## Running the app

```bash


# watch mode
$ yarn start:dev


```

Once the above is done and your app is running,Here is the postman documentation to test each of the endpoints provided.The link is 
https://documenter.getpostman.com/view/28086042/2sA3Qngtff

You can sign up and signin.Once logged in,to test the task routes you must put the access token in the bearer token authorization header to be authorized to carry out all actions in the task management system 
