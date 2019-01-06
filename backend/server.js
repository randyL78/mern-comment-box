const express =  require('express');
const bodyParser =  require('body-parser');
const logger =  require('morgan');
const mongoose =  require('mongoose');

const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;

// db config
mongoose.connect("mongodb://localhost:27017/comments", { useNewUrlParser: true });
const db = mongoose.connection;

// mongo error or success message
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', () => { console.log("Successfully connected to DataBase") });

// set our port to either a predetermined port number if you have set it up, or 3001
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

// set the route path & initialize the API
router.get('/', (req, res) => {
   res.json({ message: 'Hello World' });
});

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));