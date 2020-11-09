import React, { Component, useState } from 'react'
import "../css/SearchRenderer.css"
import { Tabs, Tab, TextField } from '@material-ui/core'

//this component renders the search bar
const SearchRenderer = () => {

    //Declaring state
    const [query, setQuery] = useState("");
    const [type_of_query, set_type_of_query] = useState(0);
    const [placeholder_text, setplaceholder_text] = useState("Enter English/Japanese Vocabulary");

    //this function handles the submission of the query to the api
    const handleSubmit = (e) => {
        e.preventDefault();

        switch (type_of_query) {
            //vocabulary
            case 0:
                //send the query to jisho's API

                //parse the vocabulary words and map vocab renderer objects to each vocabulary we come across

                break;

            //google translate
            case 1:
                //should take the query and open up the google translate on a tab

                //TODO: maybe we could scrape the translation off of the google translate page

                //map to Translation Renderer array
                break;

            //verb conjugations
            case 2:
                //scrape reverso.net for conjugations, 
                //map them to conjurenderer array

                break;

            //jisho stroke order
            case 3:
                //Provide some sort of string parsing to make sure they have pasted in
                //a single kanji

                //append "#kanji" to the end of the query

                //send the query to jisho's api

                //parse the kanji's meaning, and its readings

                //provide a link to jisho's page in case they want the stroke order

                //map to a bunch of vocab renderers
                break;
            default:
                //we should never hit this because the tabs will always be indexed correctly
                break;
        }

    }

    //updates the type of query to be the right index 0 = jisho, 1 = g translate, 2 = kanji stroke order
    //also updates the placeholder text
    const handleChange = (e, new_value) => {
        e.preventDefault();

        //updating the type of query
        set_type_of_query(new_value);

        switch (new_value) {
            case 0:
                setplaceholder_text("Enter English/Japanese Vocabulary")
                break;
            case 1:
                setplaceholder_text("Enter English/Japanese Sentence")
                break;
            case 2:
                setplaceholder_text("Enter English/Japanese Verb")
                break;
            case 3:
                //TODO: make a user note here that they have to paste in the kanji IN japanese for this
                // to be accurate
                setplaceholder_text("Enter/Paste Kanji")
                break;
            default:
                break;
        }

    }

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
                <Tab label="Kanji Stroke Order" />
            </Tabs>
            <form className="search_form" onSubmit={handleSubmit} >
                <input placeholder={placeholder_text} type="text" name="search_bar" onChange={e => setQuery(e.target.value)} />
            </form>
        </div >
    )
}

export default SearchRenderer;
