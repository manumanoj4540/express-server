const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();
const mongoose = require('mongoose');
const Leaders = require('../models/leaders');

leaderRouter.use(bodyParser.json());
leaderRouter.route('/')
.get((req,res) => {
    Leaders.find({})
    .then((leaders) => {
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err) ) ;
})
.post((req,res) => {
    Leaders.create(req.body)
    .then((leader) => {
        console.log(`${leader} created !!`);
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err) ) ;
})
.put((req,res) => {
    res.statusCode = 403;
    res.end(`Not supported :${req.method}`);
})
.delete((req,res) => {
    Leaders.remove()
    .then((resp) => {
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err) ) ;
});

leaderRouter.route('/:leaderId')
.get((req,res) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err) ) ;
})
.post((req,res) => {
    res.end(`POST operation not supported on /leaders/${req.params.leaderId}`);
})
.put((req,res) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, { $set : req.body }, { new : true })
    .then((leader) => {
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err) ) ;
})
.delete((req,res) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err) ) ;
});

module.exports = leaderRouter;