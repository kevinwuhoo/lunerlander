insults = [];

$(document).ready(function() {
  generateInsults();
  generatePrice();
});

var price;
function generatePrice() {
  $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22YHOO%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?", {}, 
  function (priceData) {
    price = priceData.query.results.quote.LastTradePriceOnly; 
  });
}

function getPrice() {
  return price;
}
    
function generateInsults() {
  
  $.getJSON("http://search.twitter.com/search.json?callback=?",
  {
    q: "from:insult_bird",
  },
  function(data) {
    results = data.results;
    for (i = 0; i < results.length; i++) {
      str = data.results[i].text
      insults.push(str.substring(str.indexOf(" ") + 1) + "!");
    }
  });
}

function getRandomInsult() {
  var randomnumber=Math.floor(Math.random()*insults.length);
  return (insults[randomnumber]);
}

function getIcon(userName) {
  return "http://img.tweetimag.es/i/" + userName;
}
