module.exports = function(app) {
  app.route('/').get((req, res) => {
    res.render('index', {
      err: "Error: Please add a proper request."
    });
  });
};
