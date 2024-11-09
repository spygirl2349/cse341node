//****part 1
// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//     res.send("Hello");
// });

// app.listen(process.env.PORT || 3000, () => {
//     console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
// });


// ****part 2
// const express = require('express');
// const app = express();
// const router = express.Router();

// router.get('/home', (req, res) => {
//     res.send('Hello World, This is home router');
// });

// router.get('/profile', (req, res) => {
//     res.send('Hello World, This is profile router');
// });

// router.get('/login', (req, res) => {
//     res.send('Hello World, This is login router');
// });

// router.get('/logout', (req, res) => {
//     res.send('Hello World, This is logout router');
// });

// app.use('/', router);

// app.listen(process.env.PORT || 3000, () => {
//     console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
// });

// *** Application Middleware 
// const express = require('express');
// const app = express();

// app.use((req, res, next) => {
//     console.log('Time:', Date.now());
//     next();
// });

// app.listen(process.env.port || 3000);

// console.log('Web Server is listening at port ' + (process.env.port || 3000));

// // *** Router Middleware
// const express = require('express');
// const app = express();
// const router = express.Router();

// router.use((req, res, next) => {
//     console.log('Time:', Date.now());
//     next();
// });

// router.get('/home', (req, res) => {
//     res.send("ok what up");
// });

// app.use('/', router);

// app.listen(process.env.PORT || 3000, () => {
//     console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
// });


// // *** Middleware to catch errors
// app.use((err, req, res, next) => {
//     res.status(500).send('Something broke!')
// });

// // *** Third Party Express Middleware 
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const router = express.Router();

// router.get('/home', (req, res) => {
//     res.send('Hello World, This is home router');
// });

// router.get('/profile', (req, res) => {
//     res.send('Hello World, This is profile router');
// });

// router.get('/login', (req, res) => {
//     res.send('Hello World, This is login router');
// });

// router.get('/logout', (req, res) => {
//     res.send('Hello World, This is logout router');
// });

// // Add middleware before routes
// app.use(bodyParser.json());
// app.use('/', router);

// app.listen(process.env.PORT || 3000, () => {
//     console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
// });

// *** Express Sessions Management - 4 routers
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var sess; // global session, NOT recommended, only for demonstration purposes

router.get('/', (req, res) => {
    sess = req.session;
    if (sess.email) {
        return res.redirect('/admin');
    }
    res.send('Ok');
});

router.post('/login', (req, res) => {
    sess = req.session;
    sess.email = req.body.email;
    res.end('done');
});

router.get('/admin', (req, res) => {
    sess = req.session;
    if (sess.email) {
        res.write(`Hello ${sess.email}`);
        res.end('Logout');
    } else {
        res.write('Please login first!');
        res.end('Login');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});