const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const { error } = require('console');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const subcategoryRouter = require('./routes/subcategoryRoute');
const lessonRouter = require('./routes/lessonRoute');
const lessondetailsRouter = require('./routes/lessondetailsRoute');
const searchRouter = require('./routes/searchRoute');
const bookingRouter = require('./routes/bookingRoute');
const authRouter = require('./routes/authRoute');
const registerRouter = require('./routes/registerRoute');
const logoutRouter = require('./routes/logoutRoute');
const confirmRouter = require('./routes/confirmRoute');
const profileRouter = require('./routes/profileRoute');
const forgotRouter = require('./routes/forgotRoute');

app.use(session({
  secret: process.env.SESSION_SECRET || 'talentSTREET',
  resave: false,
  saveUninitialized: false,
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/subcategory', subcategoryRouter);
app.use('/lesson', lessonRouter);
app.use('/lessondetails', lessondetailsRouter);
app.use('/review', lessondetailsRouter);
app.use('/search', searchRouter);
app.use('/booking', bookingRouter);
app.use('/login', authRouter);
app.use('/forgot-password', forgotRouter);
app.use('/logout', logoutRouter);
app.use('/signup', registerRouter);
app.use('/confirmbooking', confirmRouter);
app.use('/profile', profileRouter);


app.set("view engine", "ejs");
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  const isLoggedIn = req.session.user;
  res.render('index.ejs', { isLoggedIn });
});



mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/talentstreet');


const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.use(express.static(path.join(__dirname + '/public')));

app.use((req, res) => {
  res.status(404);
  res.send('<h1>Error, 404 not found</h1>')
});
