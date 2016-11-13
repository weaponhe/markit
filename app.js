var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  passport = require('passport'),
  GitHubStrategy = require('passport-github2').Strategy,
  GitHubApi = require("github");

//development variable setting
var GITHUB_CLIENT_ID = "b21159b60dc743233a34",
  GITHUB_CLIENT_SECRET = "d75300f9e1f44e245a53e03fbf8400aeb713da85",
  GITHUB_CALLBACK_URL = "http://127.0.0.1:3000/auth/github/callback"
//production variable setting
if (process.env.NODE_ENV === 'production') {
  GITHUB_CLIENT_ID = "9ce08a4dafad4dc158eb"
  GITHUB_CLIENT_SECRET = "8f141d112d4cf8179f8410a4306ad754ff2fd1f9"
  GITHUB_CALLBACK_URL = "http://121.42.214.145:3000/auth/github/callback"
}

var github = new GitHubApi({
  debug: true,
  protocol: "https",
  host: "api.github.com",
  headers: {
    "user-agent": "My-Cool-GitHub-App"
  },
  Promise: require('bluebird'),
  followRedirects: false,
  timeout: 5000
});

var token = '';
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: GITHUB_CALLBACK_URL
}, function (accessToken, refreshToken, profile, done) {
  token = accessToken;
  github.authenticate({
    type: "oauth",
    token: token
  });
  return done(null, profile);
}));

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'));
  }
);

app.get('/auth/github',
  passport.authenticate('github', {scope: ["repo", "user"]}),
  function (req, res) {
  }
);

app.get('/auth/github/callback',
  passport.authenticate('github', {failureRedirect: '/login'}),
  function (req, res) {
    console.log("asdasd")
    res.redirect('/?token=' + token + '&username=' + req.user.username);
  }
);

app.get('/logout', ensureAuthenticated, function (req, res) {
  req.logout();
  res.redirect('/');
});

app.listen(3000);


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/github')
}
