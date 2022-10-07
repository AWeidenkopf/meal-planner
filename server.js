// import npm packages
import 'dotenv/config.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import createError from 'http-errors'
import session from 'express-session'
import logger from 'morgan'
import methodOverride from 'method-override'
import passport from 'passport'
import multer from 'multer'
import flash from 'connect-flash'


// import custom middleware
import { passDataToView } from './middleware/middleware.js'

// connect to MongoDB with mongoose
import './config/database.js'

// load passport
import './config/passport.js'

// import routes
import { router as indexRouter, router } from './routes/index.js'
import { router as authRouter } from './routes/auth.js'
import { router as recipesRouter } from './routes/recipes.js'
import { router as ingredientsRouter } from './routes/ingredients.js'
import { router as calendarRouter } from './routes/calendar.js'
// import { router as fileUploadRouter } from './routes/fileupload.js'

// create the express app
const app = express()

// view engine setup
app.set(
  'views',
  path.join(path.dirname(fileURLToPath(import.meta.url)), 'views')
)
app.set('view engine', 'ejs')

// basic middleware
app.use(methodOverride('_method'))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
  )
)


// session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'lax',
    },
  })
)

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// upload-image session
app.use('/assets/images', express.static('assets/images'))

app.use(session({
  secret: 'imagesupload',
  cookie: { maxAge: 60000 },
  saveUninitialized: false,
  resave: false
}))

app.use(flash())

// custom middleware
app.use(passDataToView)

// router middleware
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/recipes', recipesRouter)
app.use('/ingredients', ingredientsRouter)
app.use('/calendar', calendarRouter)
// app.use('/fileupload', fileUploadRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error', {
    title: `🎊 ${err.status || 500} Error`,
    user: req.user ? req.user : null,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
  })
})

export { app, multer }
