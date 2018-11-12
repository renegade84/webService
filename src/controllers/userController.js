import _ from 'lodash';
import Database from '../util/database.js';
import {config} from "../util/dbConfig.js";

//this only returns data specific to the user. It doesn't need to be paginated since it should only ever send back one item.

export function getUserByName(req, res) {
  if (!_.isUndefined(req.query.name)) {
    const connection = new Database(config.url, config.dbName);
    connection.connect().then((db) => {
      db.collection('tweets').findOne({user_name: req.query.name}, {
        projection: {
          _id: 0,
          user_name: 1,
          screen_name: 1
        }
      }).then(
        (result) => {
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(result));
        }
      );

      connection.close();
    }, (error) => {
      console.log(error);
      connection.close();
    });
  } else {
    res.send("You didn't use the right query parameters. To find a user by name, you need to use the 'name' parameter. ")
  }
}