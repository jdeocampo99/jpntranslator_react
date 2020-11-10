const cheerio = require("cheerio");
const axios = require("axios");

//sending axios to get the page data
const fetchdata = async (query) => {
  //parsing the correct url to send to reverso.net
  const siteUrl =
    "https://conjugator.reverso.net/conjugation-japanese-verb-" +
    query +
    ".html";
  //getting the page data using axios and returning it
  const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

//parsing the html's data to get what we need
const get_results = async (query) => {
  //get the page data from axios
  const $ = await fetchdata(query);
};

module.exports = get_results;
