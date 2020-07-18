const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();

promoRouter.use(bodyParser.json());
promoRouter.route('/')
.all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res) => {
    res.end('Will send all the promotions to you');
})
.post((req,res) => {
    res.end(`will add the info ${req.body.name} with description ${req.body.description}`);
})
.put((req,res) => {
    res.statusCode = 403;
    res.end(`Not supported :${req.method}`);
})
.delete((req,res) => {
    res.end('Deleting all the promotions');
});

promoRouter.route('/:promoId')
.get((req,res) => {
    res.end(`Will send details of promotion ${req.params.promoId} to you`);
})
.post((req,res) => {
    res.end(`POST operation not supported on /promotions/${req.params.promoId}`);
})
.put((req,res) => {
    res.write(`updating promotion ${req.params.promoId} \n`);
    res.end(`Will update promotion ${req.params.promoId}`)
})
.delete((req,res) => {
    res.end(`Deleting promotion ${req.params.promoId}`);
});

module.exports = promoRouter;