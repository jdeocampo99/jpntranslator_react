var express = require("express");
const get_results = require("../scraper");
var router = express.Router();

/* GET conjugations from reverso.net */
router.get("/", function (req, res, next) {
  console.log(req.query.verb);
  //grabbing the query from the api request
  const query = req.query.verb;
  //
  const result = get_results(query);
  res.send(result);
});

module.exports = router;
