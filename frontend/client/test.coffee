$ = require 'jquery'
$http = require './ajax'

module.exports = () ->

  catPromise = $http('api/tag_categories')
  orgPromise =  $http('api/organizations')

  Promise.all([catPromise.get(), orgPromise.get()])
    .then((res) =>
        console.log "success", res
      ,
      (err) =>
        console.log "eerroooorrr", error
  )
