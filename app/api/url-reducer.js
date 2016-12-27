'use strict';

module.exports = function(app, db) {

  app.route('/:url')
    .get(handleGet);

  app.get('/new/:url*', handlePost);

  function handleGet(req, res) {
    const url = process.env.APP_URL + req.params.url;
    if (url != process.env.APP_URL + 'favicon.ico') {
      findURL(url, db, res);
    }
  }

  function handlePost(req, res) {
    const url = req.url.slice(5);
    const urlObj = {};

    if (validateURL(url)) {
      urlObj = {
        "original_url": url,
        "tiny_url": process.env.APP_URL + linkGen()
      };

      res.send(urlObj);
      save(urlObj, db);

    } else {
      urlObj = {
        "error": "Wrong url format, make sure you have a valid protocol and real site."
      };

      res.send(urlObj);
      }
  }

  function linkGen() {
    const id = Math.floor(Math.random() * 900000);
    return id.toString().substring(0, 4);
  }

  function save(obj, db) {
    const sites = db.collection("sites");

    sites.save(function(err, result) {
      if(err) throw err;
      console.log("Saved " + result + ".");
    });
  }

  function findURL(link, db, res) {
    const site = db.collection('sites');

    sites.findOne({
      "tiny_url": link
    }, function(err, result) {
      if(err) throw err;

      if(result) {
        console.log("Found " + result);
        console.log("Redirect to original URL (because duplicate)");
        res.redirect(result.original_url);
      } else {
        res.send({
          "error": "This URL is not on the database!"
        });
      }
    });

  }

  function validateURL(url) {
  // Regex-source https://gist.github.com/dperini/729294
  //const regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  const regexp = new RegExp("^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i");
  return regexp.test(url);
  }

};
