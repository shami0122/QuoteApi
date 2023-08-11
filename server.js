const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');
const e = require('express');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, ()=>{
    console.log('Server listening on Server 4001');
});

app.get('/api/quotes/random', (req, res, next) => {
    const quote = getRandomElement(quotes);
    res.send({
        quote: quote
    });
});

app.get('/api/quotes', (req, res, next) => {
    const name = req.query.person;
    if(name){ 
       const arr = [];  
       quotes.forEach(quote => {
         if(quote.person === name){
            arr.push(quote);
         }
       }); 
       res.send({
        quotes: arr
       })
    }
    else{
        res.send({
            quotes: quotes
        });
    }
});

app.post('/api/quotes', (req, res, next) => {
    if(req.query.quote && req.query.person){
        quotes.push(req.query);
        res.send({
            quote: req.query
        });
    }
    else{
        res.status(404).send();
    }
})