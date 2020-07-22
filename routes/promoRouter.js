const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();
const mongoose = require('mongoose');
const Promotions = require('../models/promotions');

promoRouter.use(bodyParser.json());
promoRouter.route('/')
.get((req,res) => {
    Promotions.find({})
    .then((promos) => {
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    }, (err) => next(err))
    .catch((err) => next(err) ) ;
})
.post((req,res) => {
    Promotions.create(req.body)
    .then((promo) => {
        console.log(`${promo} created !!`);
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err) ) ;
})
.put((req,res) => {
    res.statusCode = 403;
    res.end(`Not supported :${req.method}`);
})
.delete((req,res) => {
    Promotions.remove()
    .then((resp) => {
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err) ) ;
});

promoRouter.route('/:promoId')
.get((req,res) => {
    Promotions.findById(req.params.promoId)
    .then((promo) => {
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err) ) ;
})
.post((req,res) => {
    res.end(`POST operation not supported on /promotions/${req.params.promoId}`);
})
.put((req,res) => {
    Promotions.findByIdAndUpdate(req.params.promoId, { $set : req.body }, { new : true })
    .then((promo) => {
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err) ) ;
})
.delete((req,res) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err) ) ;
});

module.exports = promoRouter;