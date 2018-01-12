global.NODE_ENV    = process.env.NODE_ENV || 'development';
const PORT         = process.env.PORT || 3000;
const config       = require('./config');
const morgan       = require('morgan');
const path         = require('path');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const cluster      = require('cluster');
const numCPUs      = require('os').cpus().length;
const express      = require('express');
const app          = express();

mongoose.Promise = require('bluebird');

app.use((req, res, next)=> {
  res.setHeader('X-Powered-By', 'pickyDude')
  next()
})

if(NODE_ENV == 'production'){
  app.get('*.js', (req, res, next)=> {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
  });

  app.get('*.css', (req, res, next)=> {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/css');
    next();
  });
}

app.get('/fonts*', (req, res)=>{
  res.sendFile(`${__dirname}/node_modules/materialize-css/dist/${req.url}`);
})

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cookieParser(config[NODE_ENV].cookieSecret))

app.use(express.static(path.join(__dirname, 'public')))

mongoose.connect(config[NODE_ENV].db)

const database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'))

database.once('open', ()=>{
  app.use('/todos', require('./app/features/todos/router'))
  app.get('*', (req, res)=> res.sendFile(`${__dirname}/public/index.html`))

  if(NODE_ENV == 'production'){
    if (cluster.isMaster) {
      console.log(`Master ${process.pid} is running`);
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (deadWorker, code, signal) => {
        console.log(`worker ${deadWorker.process.pid} died.`);
        if(signal != 'SIGINT'){
          let worker = cluster.fork();
          console.log(`worker ${worker.process.pid} born.`);
        }
      })
    } else {
     app.listen(PORT, ()=> console.log(`Worker ${process.pid} started`))
   }
  }else{
    app.listen(PORT, ()=> console.log(`Express listen on ${PORT} port!`))
  }
})
