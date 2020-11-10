var express = require("express");
var router = express.Router();

const scrape_conjugation = (query) => {
  const cheerio = require("cheerio");
  const axios = require("axios");
  const siteUrl =
    "https://conjugator.reverso.net/conjugation-japanese-verb-" +
    query +
    ".html";
};
/* GET conjugations from reverso.net */
router.get("/", function (req, res, next) {
  console.log(req.query.verb);
  const query = req.query.verb;
  scrape_conjugation(query);
  res.send(query);
});

module.exports = router;
