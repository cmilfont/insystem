const path = require( 'path' );
const bodyParser = require( 'body-parser' );
const logger = require( 'morgan' );
const cookieParser = require( 'cookie-parser' );
const expressSession = require( 'express-session' );
const connectFlash = require( 'connect-flash' );
const favicon = require( 'serve-favicon' );

module.exports = (express, app) => {
  app.use(express.static(path.resolve(path.join('client', 'build'))));
  app.use(logger('combined'));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
  app.use(connectFlash());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
};
