var Search = require('bing-search');
var search = new Search(process.env.API_KEY);

module.exports = function(app, historyDb) {
  // Display History
  app.get('/latest', function(req, res) {
    historyDb.find({}, null, {
      "limit": 10,
      "sort": {
        "date": -1
      }
    }, (err, doc) => {
      if(err) return console.log(err);
      console.log(doc);
      res.send(doc.map(function(el) {
        return {
          term: el.term,
          date: el.date
        };
      }));
    });
  });

  app.get('/api/imagesearch/:search', (req, res) => {
      var query = req.params.search;
      var size = (req.query.offset || 2);
      var term = decodeURIComponent(query);

      // Search Hystory
      var searchHistory = {
          "term": term,
          "date": new Date().toLocaleString()
      }
      save(searchHistory);
      search.search({
          query: term,
          top: size
      }).then(function(result) {
          var resObj = [];
          var el = 0;
          while (el < size) {
              resObj.push({
                  'url': result.results[el].MediaUrl,
                  'snippet': result.results[el].Title,
                  'thumbnail': result.results[el].Thumbnail["MediaUrl"],
                  'context': result.results[el].DisplayUrl
              });
              el += 1;
          }
          res.json(resObj);
          console.log(searchHistory)
      }, function(err) {
          console.log(err);
      });
  });

  // Save a new object into the DB
  function save(historyObj) {
    var history = new historyDb(historyObj);
    history.save(function(err, history) {
      if(err) throw err;
      console.log('Saved ' + history);
    })
  }
}
