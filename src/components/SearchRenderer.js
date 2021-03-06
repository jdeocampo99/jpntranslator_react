import React, { Component, useState } from "react";
import "../css/SearchRenderer.css";
import { Tabs, Tab, Switch } from "@material-ui/core";
import {
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

    let url;

    let request;

    switch (type_of_query) {
      //vocabulary
      case 0:
        request = require("request");
        //send the query to jisho's API
        url = fetch_vocab_url(query);
        //fetching the data from the api and turning it into a usable json
        fetch(url)
          .then((res) => res.json())
          .then((json) => {
            //save the query's data into an array of useful vocabulary objects
            let arr_of_vocab_obj = get_vocab_info(json);
          });

        //parse the vocabulary words and map vocab renderer objects to each vocabulary we come across

        break;

      //google translate
      case 1:
        //Setting the URL
        url = get_translate_url(translationSwitch, query);
        //opens the google translate tab in a new page
        window.open(url);

        break;

      //verb conjugations
      case 2:
        //scrape reverso.net for conjugations,

        //map them to conjurenderer array

        break;

      //jisho stroke order
      case 3:
        request = require("request");
        //send the query to jisho's api
        url = fetch_kanji_url(query);

        //creates a request for the kanjis
        request(url, (error, response, body) => {
          const json = jisho.parseKanjiPageHtml(body, query);
          let kanji_info = {
            stroke_order: json.strokeOrderSvgUri,
            kunyomi: json.kunyomi,
            onyomi: json.onyomi,
            parts: json.parts,
            meaning: json.meaning,
            url: json.uri,
          };
          console.log(`Stroke order ${json.strokeOrderDiagramUri}`);
          console.log(`SVG: ${json.strokeOrderSvgUri}`);
          console.log(`kunyomi: ${json.kunyomi}`);
          console.log(`onyomi: ${json.onyomi}`);
          console.log(`Stroke count: ${json.strokeCount}`);
          console.log(`Parts: ${json.parts}`);
          console.log(`Meaning: ${json.meaning}`);
          console.log(`Url: ${json.uri}`);
        });

        //pass object with kanji information to a kanji stroke renderer

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

    switch (new_value) {
      case 0:
        setplaceholder_text("Enter English/Japanese Vocabulary");
        break;
      case 1:
        setplaceholder_text("Enter English/Japanese Sentence");
        break;
      case 2:
        setplaceholder_text("Enter English/Japanese Verb");
        break;
      case 3:
        //TODO: make a user note here that they have to paste in the kanji IN japanese for this
        // to be accurate
        setplaceholder_text("Enter/Paste Kanji");
        break;
      default:
        break;
    }
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
        <Tab label="Vocabulary" />
        <Tab label="Sentence Translation" />
        <Tab label="Verb Conjugation" />
        <Tab label="Kanji Information" />
      </Tabs>
      <form className="search_form" onSubmit={handleSubmit}>
        <input
          placeholder={placeholder_text}
          type="text"
          name="search_bar"
          onChange={(e) => setQuery(e.target.value)}
        />
        <br />
        {
          //conditionally render the switch statement if the g translate tab is up
          //TODO: clean this ui up
          type_of_query === 1 && (
            <div>
              <label>
                {translationSwitch === true ? "JPN" : "ENG"}
                {"->"}
                {translationSwitch === false ? "JPN" : "ENG"}
              </label>
              <Switch
                checked={translationSwitch.ToJpn}
                onChange={handleSwitch}
              />
            </div>
          )
        }
      </form>
    </div>
  );
};

export default SearchRenderer;
