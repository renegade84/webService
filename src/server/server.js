import Express from 'express';  //I chose to use Expressjs because I really like the simplicity of it.  It also allows you to quickly spin up an api service.
import bodyParser from 'body-parser';
import tweets from '../routes/tweets.js';
import users from '../routes/users.js';

const app = new Express();
const port = 3000;

app.use(bodyParser.json());

//We have a base route for each object type that we are querying.
//This lets us break up the controllers into more manageable chunks.

app.use('/tweets', tweets);
app.use('/users', users);

//start app
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

export default app;