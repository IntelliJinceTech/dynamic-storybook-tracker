//https://www.youtube.com/watch?v=p6nwq0JTau4
// 5:15:47
const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')

//  load config
dotenv.config({ path: './config/config.env' })

//  passport config
require('./config/passport')(passport)

connectDB()

const app = express()

//  Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//  Handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

//  Session Middleware
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
    })
)

//  Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//  Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//  ROUTES
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 8888

app.listen(
    PORT,
    console.log(
        `Server running in to ${process.env.NODE_ENV} mode on port ${PORT}`
    )
)
