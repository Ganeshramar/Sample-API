const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) =>{
    res.status(200).json({
        message:'Handling GET requests to /products'
    });
});

router.post('/',(req, res, next) =>{
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message:'Handling POST requests to /products',
        createdProduct: product
    });
});

router.get('/:productId',(req, res, next) =>{
    const id = req.params.productId;
    if(id === 'special'){    
        res.status(200).json({
            message:'You discoverd the special ID',
            id: id
        });
    }
    else
    {
        res.status(200).json({
            message:'You passed the ID'
        }); 
    }
});

router.patch('/',(req, res, next) =>{
    res.status(200).json({
        message:'Updated successfuliy!!'
    });
});

router.delete('/',(req, res, next) =>{
    res.status(200).json({
        message:'Deleted successfully!!'
    });
});

module.exports = router;
