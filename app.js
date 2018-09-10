const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');

//Load Routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

//Passport config
require('./config/passport')(passport);

//DB CONFIG
const db = require('./config/database');

//connect to mongoose
//*local connection
//use promise to connect and catch an err
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));



//handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static folder (public)
app.use(express.static(path.join(__dirname, 'public')));

//method-override middleware
/*
in form:
for action="", make format like this:
action = "/ideas/{{idea.id}}?_method=PUT"
**also, add hidden input
ex. <input type = "hidden" name = "_method" value = "PUT"
*/
app.use(methodOverride('_method'));

//Express Session Middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//Use Passport Middleware AFTER EXPRESS MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash middleware
app.use(flash());

//global variables for flash/session
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})

const port = process.env.PORT || 5000; //add process.env.PORT for heroku 

/*middleware HOW IT WORKS
app.use(function(req, res, next) {
  //console.log(Date.now());
  req.name = 'Will Pittman';
  next();
});*/

//index route
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', {
    title: title
  });
});

//About route

app.get('/about', (req, res) => {
  res.render('about')
});

//Use routes
app.use('/ideas', ideas);
app.use('/users', users);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});