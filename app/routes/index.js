'use stric';

module.exports = function(app, db) {
  app.route('/')
    .get(function(req, res) {
      res.render('index', {
        appname: "URL Shortener Microservice"
      });
    });

  app.route('/new')
    .get(function(req, res) {
      res.render('index', {
        err: "Error! Wrong format."
      });
    });

};
