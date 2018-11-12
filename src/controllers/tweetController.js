import _ from 'lodash';
import Database from '../util/database.js';
import {config} from "../util/dbConfig.js";

//while implementing my own pagination feature, I stumbled across this package. I decided to use it, since there is no point in reinventing the wheel!
const MongoPaging = require('mongo-cursor-pagination');
var Long = require('mongodb').Long;

const cName = 'tweets';
const limit = 25; //sane lower limit!

//The controllers contain both the business logic and the data access layers.  Here is where you can do most, if not all, of your error handling.
//I have done some basic error handling here, but more could be done if needed.

export function findTweetsByString(req, res, next) {
  if (!_.isUndefined(req.query.search && _.isUndefined(req.query.text))){
    console.log(req.query.search);
    runSearch(req, res, next, req.query.search, {text: true});
  } else if (!_.isUndefined(req.query.text) && _.isUndefined(req.query.search)){
    runQuery(req, res, next, {text: req.query.text});
  } else if (!_.isUndefined(req.query.search) && !_.isUndefined(req.query.text)){
    res.send('You can either search, or look for an exact match, but not both! Try again.')
  } else {
    res.send("You didn't use the right query parameters.  If you want to find tweets that match your text exactly, use the 'text' parameter.  If you want to do a search the tweets that include your text, use the 'search' parameter.")
  }

}

export function findTweetsByUser(req, res, next) {
  if (!_.isUndefined(req.query.name)){
    runQuery(req, res, next, {user_name: req.query.name});
  } else {
    res.send("You didn't use the right query parameters. Use the 'name' parameter.")
  }

}

export function findTweetsBetweenDates(req, res, next) {
  if (!_.isUndefined(req.query.start) && !_.isUndefined(req.query.end)){
    const startDate = new Date(req.query.start);
    const endDate = new Date(req.query.end);
    runQuery(req, res, next, {created_at: {$gt: startDate}, created_at: {$lt: endDate}});
  } else {
    res.send("You didn't use the right query parameters.  To find tweets between two dates, you need to use the 'start' parameter for the start date, and the 'end' parameter for the end date")
  }
}

export function findTweetsWithCountGreaterThan(req, res, next) {
  if (!_.isUndefined(req.query.value)){
    runQuery(req, res, next, {retweet_count: {$gt: parseInt(req.query.value, 10)}})
  } else {
    res.send("You didn't use the right query parameters.  To find tweets with a re-tweet count greater than a value, you need to use the 'value' parameter.")
  }

}

export function getTweetById(req, res, next) {
  if (!_.isUndefined(req.query.id)) {
    runQuery(req, res, next, {tweet_id: Long.fromString(req.query.id)});
  } else {
    res.send("You didn't use the right query parameters. To find a tweet by its tweet_id, you need to use the 'id' parameter.")
  }
}

//the functions below are the main data handling parts.  I'm on the fence as to whether or not these functions should be moved to the database class.
//they are strongly coupled to the database, but they are also strongly coupled to the request/response functionality... I would be interested to hear what you think!

/**
 * runs the given query and uses the res param to return the result.  The result includes pagination information.
 * @param req
 * @param res
 * @param next
 * @param query
 */
function runQuery(req, res, next, query) {
  const connection = new Database(config.url, config.dbName);
  connection.connect().then(async (db) => {
    try {
      const result = await MongoPaging.findWithReq(req, db.collection(cName), {
        query: query,
        limit: limit
      });
      res.json(result);
      connection.close();
    } catch (e) {
      next(e);
      connection.close();
    }
  });
}

/**
 * Runs a search for the given text in the given fields.  Returns results with a search score.
 * @param req
 * @param res
 * @param next
 * @param searchString
 * @param searchFields
 */
function runSearch(req, res, next, searchString, searchFields){
  const connection = new Database(config.url, config.dbName);
  connection.connect().then(async (db) => {
    try {
      const indexMap = {};
      _.each(Object.keys(searchFields), (searchField) => {
        const obj = {};
        obj[searchField] = 'text';
        _.assign(indexMap, obj);
      });
      await db.collection(cName).ensureIndex(indexMap);
      const result = await MongoPaging.search(db.collection(cName), searchString, {
        fields: searchFields,
        limit: limit
      });
      res.json(result);
      connection.close();
    } catch (e){
      next(e);
      connection.close();
    }
  })
}