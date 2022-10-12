const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 4000;

app.use(express.static('assets'))

app.get('/:json', (req, res) => {
  // res.send('<h1>Hello world</h1>');
  // res.redirect("https://armengol-altayo.com/");

  //example prefill airtable url
  //https://airtable.com/shraZs8zPgwX0nTnq?prefill_link=asdf&prefill_title=asdf
  //examples json
  //{"form":"asdf","random":[{"record":"action","min":1,"max":6},{"record":"app","min":1,"max":100}]}
  //{"form":"asdf","random":[{"record":"action","min":1,"max":6}]}
  const json = req.params.json;
  const jsonParsed = JSON.parse(json);
  // console.log(jsonParsed);
  const form = jsonParsed.form;
  const random = jsonParsed.random;
  // console.log(form);
  // console.log(random);
  var prefill = "";
  for(i = 0; i < random.length; i++){
    // console.log("test");
    // console.log(random[i]);
    var record = random[i].record;
    var min = random[i].min;
    var max = random[i].max;
    var r = between(min, max); 
    console.log("record:" + record + " min:" + min + " max:" + max + " r:" + r);
    if (prefill !== ""){
      prefill = prefill + "&"
    }
    prefill = prefill + "prefill_" + record + "=" + r;
  }
  // console.log(prefill);
  var airtableURL = "https://airtable.com/" + form + "?" + prefill;
  console.log("redirect to " + airtableURL);
  res.redirect(airtableURL);
});

http.listen(port, () => {
  console.log(`listening on http://localhost:${port}/`);
});

//Returns a random number between min (inclusive) and max (inclusive)
//via https://futurestud.io/tutorials/generate-a-random-number-in-range-with-javascript-node-js
 function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}