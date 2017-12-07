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

router.patch('/:id', (req, res, next) => {
    let productID = req.params.id;
    res.status(200).json({
        message: "handling PATCH request /products/:id",
        id: productID,
        status: "Updated Product"
    })
})

router.delete('/:id', (req, res, next) => {
    let productID = req.params.id;
    res.status(200).json({
        message: "handling Delete request /products/:id",
        id: productID,
        status: "Delete Product"
    })
})

module.exports = router;