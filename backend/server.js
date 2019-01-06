const express =  require('express');
const logger =  require('morgan');
const mongoose =  require('mongoose');

const Comment = require('./models/comment');

const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
app.set('port', process.env.PORT || 3001);

// db config
mongoose.connect("mongodb://localhost:27017/comments", { useNewUrlParser: true });
const db = mongoose.connection;

// mongo error or success message
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', () => { console.log("Successfully connected to DataBase") });

app.use(express.json());

// set the route path & initialize the API
router.get('/', (req, res) => {
   res.json({ message: 'Hello World' });
});

router.get('/comments', (req, res) => {
   Comment.find((err, comments) => {
      if (err) 
         return  res.json({success: false, error: err});
      return  res.json({success: true, data: comments});
   });
});

router.post('/comments', (req, res) => {
   const {author, text} = req.body;
   const comment = new Comment();
   if(!author) {
      return  res.json({
         success: false,
         error: 'You must provide an author'
      });
   }
   if (!text) {
      return  res.json({
         success: false,
         error: 'You must provide a comment'
      });
   }
   comment.author = author;
   comment.text = text;
   comment.save(err => {
      if (err)
         return  res.json({success: false, error: err});
      return  res.json({success: true});
   });
});

// Use our router configuration when we call /api
app.use('/api', router);

// start listening on our port
const server = app.listen(app.get('port'), () => {
   console.log(`Express server is listening on port ${server.address().port}`);
 });