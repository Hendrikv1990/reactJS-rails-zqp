"use strict";
const SearchPage = require('./components/searchPage');
const React = require("./reactwithtap.js");
const ReactDOM = require("react-dom");
const $ = require("jquery");
const Reflux = require("reflux");

ReactDOM.render( React.createElement(SearchPage,null), document.getElementById('renderer'));

