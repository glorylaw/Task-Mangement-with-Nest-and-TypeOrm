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

Once the above is done and your app is running,Here is the postman documentation to test each of the endpoints provided.I could not provide a postman doc because of some postman error,but the below documentation will direct you on how to go about testing

SignUp: The url is http://localhost:3000/auth/signin This is a post request
the body is {
    "username":"flexer",
    "password":"Lawfrancise123#"
}

SignIn:The Url is http://localhost:3000/auth/signin this is a Post request
the body is {
    "username":"flexer",
    "password":"Lawfrancise123#"
}

GetAllTask: The url is http://localhost:3000/tasks

CreateNewTask:The url is http://localhost:3000/tasks this is a Post request
the body is {
    "title":"Run",
    "description":"Fast running for two weeks"
}
 
GetTaskById: The url is http://localhost:3000/tasks/f06dddd6-95b1-4edb-b527-8a2bf07eaf2e the id field can change depending on the task id you want to change. This is a get request

DeleteTask: The url is http://localhost:3000/tasks/f06dddd6-95b1-4edb-b527-8a2bf07eaf2e the id should be replaced with the id of task you create.This is a Delete request


UpdateStatus:The url is http://localhost:3000/tasks/18ecfe62-e645-4757-b09e-89e33bee9edc/status the id should be replaced with the id of task you create.This is a Patch request
the body is {
    "status":"IN_PROGRESS"
}

You can sign up and signin.Once logged in,to test the task routes you must put the access token in the bearer token authorization header to be authorized to carry out all actions in the task management system 
