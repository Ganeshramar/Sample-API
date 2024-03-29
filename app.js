const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyPaeser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');

app.use(morgan('dev'));
app.use(bodyPaeser.urlencoded({extended: false}));
app.use(bodyPaeser.json());

// app.use((req, res, next) =>{
//     res.status(200).json({
//         message:'It works'
//     });
// });

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Authorizaion');
    if(req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found here');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports = app;