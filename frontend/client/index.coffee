render = require "./render.jsx"
style = require "../styles/insertForm.css"

form = require "./formGenerator"
$http = require './ajax'

React = require 'react'
ReactDOM = require 'react-dom'

catPromise = $http('api/tag_categories')
orgPromise =  $http('api/organizations')

Promise.all([catPromise.get(), orgPromise.get()])
  .then((res) =>
    console.log "success"
    ReactDOM.render React.createElement(render, form:form res), document.getElementById 'renderer'
  ,
  (err) =>
    console.log "error", err
)
