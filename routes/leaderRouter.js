const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());
leaderRouter.route('/')
.all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res) => {
    res.end('Will send all the leaders to you');
})
.post((req,res) => {
    res.end(`will add the info ${req.body.name} with description ${req.body.description}`);
})
.put((req,res) => {
    res.statusCode = 403;
    res.end(`Not supported :${req.method}`);
})
.delete((req,res) => {
    res.end('Deleting all the leaders');
});

leaderRouter.route('/:leaderId')
.get((req,res) => {
    res.end(`Will send details of leader ${req.params.leaderId} to you`);
})
.post((req,res) => {
    res.end(`POST operation not supported on /leaders/${req.params.leaderId}`);
})
.put((req,res) => {
    res.write(`updating leader ${req.params.leaderId} \n`);
    res.end(`Will update leader ${req.params.leaderId}`)
})
.delete((req,res) => {
    res.end(`Deleting leader ${req.params.leaderId}`);
});

module.exports = leaderRouter;