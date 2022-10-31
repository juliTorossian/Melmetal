const express    = require("express");
const morgan     = require("morgan");
const path       = require('path');

const app = express();

// Config
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Middlewares
app.use(morgan('dev'));

// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
app.use(express.json({limit: "50mb", extended: true}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))

// Variables globales

// Rutas
// app.use(require('./routes/index.js'));
app.use('/dummy', require('./routes/dummy.js'));
app.use('/pdf', require('./routes/pdf.js'));
app.use('/', require('./routes/index.js'));

// Archivos Publicos
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar
app.listen(app.get('port'), () => {
    console.log("Server iniciado en: " +app.get('port'));
});