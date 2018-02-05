var _ = require('lodash');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const formData = require('express-form-data');
var jwt = require('jsonwebtoken');

var passport = require('passport');
var passportJWT = require('passport-jwt');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

const multipartyOptions = {
  autoFiles: true
};
const SERVER_PORT = 3030;
const INCORRECT_LOGIN_MESSAGE = 'Username and password do not match';

const users = [
  {
    id: 1,
    username: 'rajkovukovic',
    password: 'password1',
    email:    'rajkovukovic@gmail.com',
    role:     'admin',
    photoURL: 'https://lh4.googleusercontent.com/-Pm5RXu2Zan8/AAAAAAAAAAI/AAAAAAAAJ08/iCqFtxK47CU/photo.jpg',
  },
  {
    id: 2,
    username: 'test',
    password: 'test1234',
    email:    'test@gmail.com',
    role:     'admin',
    photoURL: '',
  }
];

// TODO: add https support
// TODO: limiting number of requests

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'ndfsehuihfgeiyt34578ytfh9e4hf89es89dj3quI*()U#(&*$Y%RY#*Ho';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

var app = express();
app.use(cors());
app.use(passport.initialize());

// parse a data with connect-multiparty. 
app.use(formData.parse(multipartyOptions));
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.json({message: 'Express is up!'});
});

app.post('/login', function(req, res) {
  var user;
  if(req.body.login && req.body.password){
    var login = req.body.login;
    var password = req.body.password;
  }
  console.log(req.body);
  console.log({
    action:   'login',
    login:    req.body.login,
    password: req.body.password,
  })
  // usually this would be a database call:
  var user = users[_.findIndex(users, {username: login})] || users[_.findIndex(users, {email: login})];
  if(!user){
    res.status(401).json({message: INCORRECT_LOGIN_MESSAGE});
  }
  else if (user.password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {id: user.id};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({
      success: true,
      token:   token,
      user:    {
        ...user,
        password: undefined,
      }
    });
  } else {
    res.status(401).json({message: INCORRECT_LOGIN_MESSAGE});
  }
});

app.get('/auth', passport.authenticate('jwt', { session: false }), function(req, res){
  res.json({
    user: {
      ...req.user,
      password: undefined,
    }
  });
});

app.get('/secret', passport.authenticate('jwt', { session: false }), function(req, res){
  console.log (req.user);
  res.json({message: 'Success! You can not see this without a token'});
});

app.get('/secretDebug',
  function(req, res, next){
    console.log(req.get('Authorization'));
    next();
  }, function(req, res){
    res.json('debugging');
});

app.listen(SERVER_PORT, function() {
  console.log('Express running on port ' + SERVER_PORT);
});