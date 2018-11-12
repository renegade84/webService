import { Router } from 'express';
import * as tweetController from '../controllers/tweetController.js'
const tweets = new Router();

//I added sub routes to handle each type of query. It's not necessary for such a small project.
//For a larger project however, I feel its necessary.  It helps with both organization, as well as debugging.

//route used to find singe tweets.
tweets.route('/tweet').get(tweetController.getTweetById);

//route used to find tweets based on user information
tweets.route('/user').get(tweetController.findTweetsByUser);

//route used to find tweets based on dates
tweets.route('/dates').get(tweetController.findTweetsBetweenDates);

//route used to find tweets based on counts
tweets.route('/counts').get(tweetController.findTweetsWithCountGreaterThan);

//route used to find tweets based on text content
tweets.route('/text').get(tweetController.findTweetsByString);


export default tweets;