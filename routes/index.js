const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'});
var express = require('express');
var router = express.Router();
var sdk = require("@ory/client");


var ory = new sdk.FrontendApi(
    new sdk.Configuration({
      basePath:
          process.env.ORY_SDK_URL || "https://playground.projects.oryapis.com",
          // "https://playground.projects.oryapis.com",
    }),
)
/* GET home page. */
router.get('/', function(req, res, next) {
    ory.toSession({ cookie: req.header("cookie") })
    .then(({ data: session }) => {
        res.render("index", {
            title: "Express",
            // Our identity is stored in the session along with other useful information.
            identity: session.identity,
        })
    })
    .catch(() => {
        // If logged out, send to login page
        res.redirect("login")
    });
});

router.get('/login', function(req, res, next) {
    res.render('auth/login');
});

router.get('/register', function(req, res, next) {
    res.render('auth/register');
});

module.exports = router;
