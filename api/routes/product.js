const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "handling GET request /products"
    })
})

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "handling POST request /products"
    })
})

router.get('/:id', (req, res, next) => {
    let productID = req.params.id;
    res.status(200).json({
        message: "handling GET request /products/:id",
        id: productID
    })
})

module.exports = router;