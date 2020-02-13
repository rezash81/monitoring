const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
/////
const rainStationRouter = require('./routes2/rainStationRoutes');
const rainValuesRouter = require('./routes2/rainValuesRoutes');
const rainTotalsMonthsRouter = require('./routes2/rainTotalsMonthsRoutes');

const viewRouter2 = require('./routes2/viewRoutes');
var  mcache = require('memory-cache');
var flatCache = require('flat-cache')

const app = express();

app.set('view engine', 'pug');
/////app.set('views', path.join(__dirname, 'views'));
/////
app.set('views', path.join(__dirname, 'views2'));

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
/////app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log("from test middleware: ");
  console.log(req.cookies);
  next();
});

///// configure cache middleware
let memCache = new mcache.Cache();
let cacheMiddleWare = (duration) => {
    return (req, res, next) => {
        let key =  '__express__' + req.originalUrl || req.url
        let cacheContent = memCache.get(key);
        if(cacheContent){
            res.send( cacheContent );
            return
        }else{
            res.sendResponse = res.send
            res.send = (body) => {
                memCache.put(key,body,duration*1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}



/////load new cache :
console.log("////////loading the rainStattions cache/////////////");
let rainStationsCache = flatCache.load("rainStationsCache", path.resolve("./cache"));
let rainStationsFlatCacheMiddleWare = (req, res, next) => {
  let key = "__express__" + req.originalUrl || req.url;
  let cacheContent = rainStationsCache.getKey(key);
  //console.log("key :::::::::::: ");
  //console.log(key);
  //console.log("casheeeed:::::");
  //console.log(cacheContent);
  if (cacheContent) {
    console.log("*******************rainStattions cached happened**********************");
    res.send(cacheContent);
    return;
  } else {
    console.log("%%%%%%%%%%%%%%%%%%%rainStattions cached DID NOT happend %%%%%%%%%%%%%%%");
    res.sendResponse = res.send;
    res.send = body => {
      rainStationsCache.setKey(key, body);
      rainStationsCache.save(true);
      res.sendResponse(body);
    };
    next();
  }
};


/////load new cache :
console.log("////////loading the rainValues cache/////////////");
let rainValuesCache = flatCache.load("rainValuesCache", path.resolve("./cache"));
let rainValuesFlatCacheMiddleWare = (req, res, next) => {
  let key = "__express__" + req.originalUrl || req.url;
  let cacheContent = rainValuesCache.getKey(key);
  //console.log("key :::::::::::: ");
  //console.log(key);
  //console.log("casheeeed:::::");
  //console.log(cacheContent);
  if (cacheContent) {
    console.log("*******************rainValues cached happened**********************");
    res.send(cacheContent);
    return;
  } else {
    console.log("%%%%%%%%%%%%%%%%%%%rainValues cached DID NOT happend %%%%%%%%%%%%%%%");
    res.sendResponse = res.send;
    res.send = body => {
      rainValuesCache.setKey(key, body);
      rainValuesCache.save(true);
      res.sendResponse(body);
    };
    next();
  }
};


/////load new cache :
console.log("////////loading the rainTotalsMonths cache/////////////");
let rainTotalsMonthsCache = flatCache.load("rainTotalsMonthsCache", path.resolve("./cache"));
let rainTotalsMonthsFlatCacheMiddleWare = (req, res, next) => {
  let key = "__express__" + req.originalUrl || req.url;
  let cacheContent = rainTotalsMonthsCache.getKey(key);
  //console.log("key :::::::::::: ");
  //console.log(key);
  //console.log("casheeeed:::::");
  //console.log(cacheContent);
  if (cacheContent) {
    console.log("*******************rainTotalsMonths cached happened**********************");
    res.send(cacheContent);
    return;
  } else {
    console.log("%%%%%%%%%%%%%%%%%%%rainTotalsMonths cached DID NOT happend %%%%%%%%%%%%%%%");
    res.sendResponse = res.send;
    res.send = body => {
      rainTotalsMonthsCache.setKey(key, body);
      rainTotalsMonthsCache.save(true);
      res.sendResponse(body);
    };
    next();
  }
};

/////how to use:
/////     app.get('/products', flatCacheMiddleware, function(req, res){


// 3) ROUTES
/////app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
/////
app.use('/', viewRouter2);
//app.use('/',flatCacheMiddleware, viewRouter2);

//app.use('/api/rainstations',cacheMiddleWare(30), rainStationRouter);//with memory cache

//app.use('/api/rainstations', rainStationRouter);//without cache
app.use('/api/rainstations',rainStationsFlatCacheMiddleWare, rainStationRouter);//without cache

//app.use('/api/rainvalues', rainValuesRouter);//without flat cache
app.use('/api/rainvalues',rainValuesFlatCacheMiddleWare, rainValuesRouter);//with flat cache

//app.use('/api/raintotalsmonths', rainTotalsMonthsRouter);//without flat cache
app.use('/api/raintotalsmonths',rainTotalsMonthsFlatCacheMiddleWare, rainTotalsMonthsRouter);//with flat cache


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
