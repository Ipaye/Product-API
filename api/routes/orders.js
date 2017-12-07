const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "handling GET request /orders"
    })
})

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "handling POST request /orders"
    })
})

router.get('/:id', (req, res, next) => {
    let orderID = req.params.id;
    res.status(200).json({
        message: "handling GET request /orders/:id",
        id: orderID
    })
})

router.delete('/:id', (req, res, next) => {
    let productID = req.params.id;
    res.status(200).json({
        message: "handling Delete request /orders/:id",
        id: productID,
        status: "Delete Order"
    })
})

module.exports = router;