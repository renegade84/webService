//for this project I chose to use MongoDb.  The given data looked like it could be imported strait into the database using mongoimport
//I found out during testing that I was wrong... see fileFix.py for more detail.

const MongoClient = require('mongodb').MongoClient;

export default class Database {
  constructor(url, databaseName){
    this.url = url;
    this.dbName = databaseName;
  }

  connect(){
    console.log('Attempting to connect to database ' + this.dbName + ' using url ' + this.url);
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url, {useNewUrlParser: true}).then(
        (client) => {
          this.db = client;
          resolve(client.db(this.dbName))
        }, (error) => {
          reject(error);
        }
      )
    })
  }

  close(){
    this.db.close();
  }
}