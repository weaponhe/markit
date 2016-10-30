var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');
var GitHubApi = require("github");
var github = new GitHubApi({
  debug: true,
  protocol: "https",
  host: "api.github.com", // should be api.github.com for GitHub
  // pathPrefix: "/", // for some GHEs; none for GitHub
  headers: {
    "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
  },
  Promise: require('bluebird'),
  followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
  timeout: 5000
});
var GitHubStrategy = require('passport-github2').Strategy;

var GITHUB_CLIENT_ID = "b21159b60dc743233a34";
var GITHUB_CLIENT_SECRET = "d75300f9e1f44e245a53e03fbf8400aeb713da85";
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
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
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
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/user', function (req, res) {
  // console.log(req.user);
  res.json(req.user);
});

app.get('/logout', ensureAuthenticated, function (req, res) {
  req.logout();
  res.json({success: true});
});


app.post('/sync', ensureAuthenticated, function (req, res) {
  // console.log('!! ', req.user)
  var owner = req.user.username;
  var repo = 'test';
  var path = 'o0509sasd16.txt';
  // github.repos.createFile({
  //   owner: owner,
  //   repo: repo,
  //   path: path,
  //   message: 'asasdasdasd',
  //   content: new Buffer("Hello World").toString('base64')
  // });
  // github.repos.getContent({
  //   owner: owner,
  //   repo: repo,
  //   path: path,
  // }, function (err, response) {
  //   console.log('========================')
  //   console.log(response.sha)
  //   console.log('========================')
  // });
  // github.repos.updateFile({
  //   owner: owner,
  //   repo: repo,
  //   path: path,
  //   message: 'asasdasdasd',
  //   content: new Buffer("Hello Vuejs!").toString('base64')
  // });
  github.repos.getPaths({
    owner: owner,
    repo: repo
  }, function (err, response) {
    console.log('========================')
    console.log(response)
    console.log('========================')
  });
  res.json({success: true});
});

app.get('/auth/github',
  passport.authenticate('github', {scope: ["repo", "user"]}),
  function (req, res) {
  }
);

app.get('/auth/github/callback',
  passport.authenticate('github', {failureRedirect: '/login'}),
  function (req, res) {
    res.redirect('http://127.0.0.1:8080/?token=' + token+'&username='+req.user.username);
  }
);
// var options = {
//   hostname: 'api.github.com',
//   port: 80,
//   path: '/repos/twbs/bootstrap',
//   method: 'GET'
// };
// app.get('/github', function (req, res) {
//   github.authenticate({
//     type: "oauth",
//     token: token
//   });
//   console.log(token);
//   github.repos.createFile({
//     owner: 'yumjs',
//     repo: 'test',
//     path: 'abc.txt',
//     // name:'abc.txt',
//     message: 'asasdasdasd',
//     content: new Buffer("Hello World").toString('base64')
//   }, function (err, result) {
//     if (err) {
//       console.log('!!!!!!!!!!!!!!!!!');
//       console.log(err);
//       console.log('!!!!!!!!!!!!!!!!!');
//     }
//     console.log('======================');
//     console.log(result);
//     console.log('======================');
//   });
//   res.redirect('/');
// });

app.listen(3000);


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}
