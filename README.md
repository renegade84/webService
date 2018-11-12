# webService
A small web service to search a bunch of twitter tweets.

## Data setup.
The 'chelsea_twitter.json' file given has dates which will not import into mongodb properly.
Place the 'fileFix.py' file, located in the 'assets' directory, in the same directory as the
'chelsea_twitter.json' file and run it.
It should output a file named 'fixed.json' which has the date fields fixed and ready for import.

To import the data into your mongodb instance,

mongoimport --db [your db name (I used the name 'challenge')] --collection tweets --file [path to fixed.json]

once that has run successfully, the data should be good to go.

## Program setup.
The file 'src/util/dbConfig.js' contains the configuration for the mongodb the program will connect to.
I used a mongodb instance running on my local machine using the default port.  You will also have to edit
the 'dbName' field to match the name of the db that you imported the data into in the 'Data setup' section.

## Running the program.
To run the program, run the command 'npm run start' or 'yarn run start' depending on what package manager you have installed on your machine.
I use yarn.

## Available APIs
route used to find singe tweets by tweet_id:  
localhost:3000/tweets/tweet  
Query parameter: id


route used to find tweets based on user name:  
localhost:3000/tweets/user  
Query parameter: name

route used to find tweets based on dates:  
localhost:3000/tweets/dates  
Query parameters: start, end

route used to find tweets based on counts:  
localhost:3000/tweets/counts  
Query parameter: value

route used to find tweets based on text content:  
localhost:3000/tweets/text  
Query parameters: text, search  
Note that text is for exact match and search is for ...search

route used to get user information:  
localhost:3000/users  
Query parameter: name  
Returns user information given the users name

## Example api calls
GET http://localhost:3000/tweets/tweet?id=777855263890178048

GET http://localhost:3000/tweets/user?name=Deplorable Nate&limit=2

GET http://localhost:3000/users?name=GIULIO BASE

GET http://localhost:3000/tweets/counts?value=1000

GET http://localhost:3000/tweets/dates?start=2016-09-17T00:00:27.000Z&end=2016-09-17T00:00:52.000Z

GET http://localhost:3000/tweets/text?search=CNN would be
