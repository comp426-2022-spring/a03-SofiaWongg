//import minimist from 'minimist'
//import express from 'express'

const express = require('express')
const app = express()







const args = require('minimist')(process.argv.slice(2));

args['port']

var port = args.port || process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log('App is running on port %PORT%'.replace('%PORT%', port))
});

//app.use(express.json())
//app.use(express.urlencoded({ extended: true}))


//coin flip stuff from 02

// import { createRequire } from 'module';
//import { isNumberObject } from 'util/types'
// const require = createRequire(import.meta.url);

function coinFlip() {
  var x = Math.round(Math.random());
  if (x < 1) {return "heads";} else {return "tails";}
}


function coinFlips(flips) {
  const flipArray = []
  for(let i = 0; i<flips; i++){
    flipArray[i] = coinFlip()
  }
  return flipArray
}


function countFlips(array) {
  var h = 0;
  var t = 0;
  for(let i = 0; i<array.length; i++){
    if(array[i]==='heads'){
      h++;
    }
    else{
      t++;
    }
  }
  return {heads: h, tails: t};
}


function flipACoin(call) {
  let flipCall = {call: call, flip: coinFlip(), result: ''};
  if(flipCall.call === flipCall.flip){
    flipCall.result = 'win';
  } 
  else{
    flipCall.result = 'lose';
  }
  return flipCall;
}

//end of coin stuff

//start of endpoints



app.get('/app', (req, res)=>{
  res.status(200).end('OK')
  res.type('text/plain')
})

app.get('/app/flip', (req, res) => {
  res.status(200).json({ 'flip': coinFlip() })
})

app.get('/app/flips/:number([0-9]{1,3})', (req, res) => {
  const flips = coinFlips(req.params.number);
	const numFlips = countFlips(flips);
  res.status(200).json({'raw': flips, 'summary': numFlips})
});//one line

app.get('/app/flip/call/heads', (req, res) => {
  res.status(200).json({ 'message': flipACoin('heads')})
})

app.get('/app/flip/call/tails', (req, res) => {
  res.status(200).json({ 'message': flipACoin('tails')})
})

app.use(function(req, res) {
  res.status(404).end("Endpoint does not exist")
  res.type("text/plain")
})




/** 

app.get('/app/', (req, res) => {
  // Respond with status 200
    res.statusCode = 200;
  // Respond with status message "OK"
      res.statusMessage = 'OK';
      res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
      res.end(res.statusCode+ ' ' +res.statusMessage)
});







app.get('/app/flip', (req, res) =>{
    res.status(200).json({'flip' : coinflip()})
})

app.get('/app/flip', (req, res) =>{
    var flip = coinFlip() //abstracted function to a variable -- REFACTORED IT
    res.status(200).json({'flip' : coinflip()})
})




app.get('/app/echo/:number', (req, res)=> {
    res.status(200).json({ 'message': req.params.number })
})

app.use('/app/', (req, res) => {
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})

*/


