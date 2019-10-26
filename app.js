const express = require('express');
const expressLayout = require('express-ejs-layouts');
const index = require('./controllers/index');
const users = require('./controllers/users');
const path = require('path');
const bodyParser = require('body-parser');
const admin = require('./controllers/admin');
const manager = require('./controllers/manager');
const expSession = require('express-session');
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');
const app = express();

// EJS
app.use(expressLayout);
app.set('view engine', 'ejs');
app.set("layout extractScripts", true)


app.use(bodyParser.urlencoded({extended:true}));
// Set Static Path
app.use(express.static(path.join(__dirname, 'public')))

app.use(expSession({secret:'my top secret value', saveUninitialized:true, resave: false}));

gulp.task('compile-scss', function() {
    return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write(Paths.HERE))
      .pipe(gulp.dest(Paths.CSS));
  });
  
  gulp.task('watch', function() {
    gulp.watch(Paths.SCSS, ['compile-scss']);
  });
  
  gulp.task('open', function() {
    gulp.src('examples/dashboard.html')
      .pipe(open());
  });
  
  gulp.task('open-app', ['open', 'watch']);

// Routes
app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);
app.use('/manager', manager);
//app.use('/seller', seller);

app.listen(8000, console.log('Server started on port 8000...')); 