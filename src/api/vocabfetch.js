//returns the correct url for a vocab/phrase
export const fetch_vocab_url = (query) => {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  query = query.trim();
  return proxy + "https://jisho.org/api/v1/search/words?keyword=" + query;
};

//return an array of vocabulary objects
export const get_vocab_info = (json) => {
  let vocab_list = json.data;
  let obj_vocab_list = [];
  for (let i = 0; i < vocab_list.length; i++) {
    let current_word = vocab_list[i];
    obj_vocab_list.push({
      word: current_word.japanese[0].word, //note there may not be anything here if it is just katakana
      reading: current_word.japanese[0].reading,
      english_definitions: current_word.senses[0].english_definitions,
      uri: "https://jisho.org/word/" + current_word.japanese[0].word,
    });
    //console.log(obj_vocab_list[i]);
  }
  return obj_vocab_list;
};

//returns the correct url for a kanji
export const fetch_kanji_url = (query) => {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const JishoApi = require("unofficial-jisho-api");
  const jisho = new JishoApi();
  let SEARCH_KANJI = query.trim();
  const SEARCH_URI = proxy + jisho.getUriForKanjiSearch(SEARCH_KANJI);
  return SEARCH_URI;
};
