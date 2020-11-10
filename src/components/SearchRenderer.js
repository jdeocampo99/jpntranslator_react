import React, { Component, useState } from "react";
import "../css/SearchRenderer.css";
import { Tabs, Tab, Switch } from "@material-ui/core";
import {
  determine_query,
  fetch_kanji_url,
  fetch_vocab_url,
  get_translate_url,
  get_vocab_info,
} from "../api/vocabfetch";

//this component renders the search bar
const SearchRenderer = () => {
  const JishoApi = require("unofficial-jisho-api");
  const jisho = new JishoApi();

  //Declaring state
  const [query, setQuery] = useState("");
  const [type_of_query, set_type_of_query] = useState(0);
  const [placeholder_text, setplaceholder_text] = useState(
    "Enter English/Japanese Vocabulary"
  );
  const [translationSwitch, settranslationSwitch] = useState(false);

  //this function handles the submission of the query to the api
  const handleSubmit = (e) => {
    e.preventDefault();

    //determines whether we want to use google translate or jisho query
    set_type_of_query(determine_query(query));

    switch (type_of_query) {
      //jisho/kanji jisho/ conjugation query
      case 0:
        ////////////////////////////////////////////////////////////////////
        //GET THE VOCABULARY INFO FOR THE QUERY
        //send the query to jisho's API
        let vocab_url = fetch_vocab_url(query);
        //fetching the data from the api and turning it into a usable json
        fetch(vocab_url)
          .then((res) => res.json())
          .then((json) => {
            //save the query's data into an array of useful vocabulary objects
            let arr_of_vocab_obj = get_vocab_info(json);
          });

        //////////////////////////////////////////////////////////////////
        //TODO: Parse through every kanji in the query and make a fetch request for its data

        let request = require("request");
        //send the query to jisho's api
        let kanji_url = fetch_kanji_url(query);

        //creates a request for the kanjis
        request(kanji_url, (error, response, body) => {
          const json = jisho.parseKanjiPageHtml(body, query);
          let kanji_info = {
            stroke_order: json.strokeOrderSvgUri,
            kunyomi: json.kunyomi,
            onyomi: json.onyomi,
            parts: json.parts,
            meaning: json.meaning,
            url: json.uri,
          };
        });

        ///////////////////////////////////////////////////////////////////////////////////////////

        break;

      //google translate
      case 1:
        //TODO: determine whether the user type in english or japanese query based on if there are kanjis in the query
        let translate_url = get_translate_url(translationSwitch, query);
        //opens the google translate tab in a new page
        window.open(translate_url);

        break;

      default:
        //we should never hit this because the tabs will always be indexed correctly
        break;
    }
  };

  //updates the type of query to be the right index 0 = jisho, 1 = g translate, 2 = kanji stroke order
  //also updates the placeholder text
  const handleChange = (e, new_value) => {
    e.preventDefault();

    //updating the type of query
    set_type_of_query(new_value);
  };

  //handles the switch for the google chrome translator
  const handleSwitch = (e) => {
    //updating the switch whenever it is clicked
    settranslationSwitch(!translationSwitch);
  };

  return (
    <div>
      <Tabs
        value={type_of_query}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Translate" />
      </Tabs>
      <form className="search_form" onSubmit={handleSubmit}>
        <input
          placeholder={placeholder_text}
          type="text"
          name="search_bar"
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchRenderer;
