//I was originally going to require the API calls to contain the mongodb configuration.  While that approach would be more challenging and potentially more flexible,
//I decided to have a central config for the sake of simplicity.  Its also really weird to have to us post methods to get data...

export const config = {
  url: 'mongodb://localhost:27017',
  dbName: 'challenge'
};