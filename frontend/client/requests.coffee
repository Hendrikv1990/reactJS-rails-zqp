_ = require 'underscore'
$ = require 'jquery'
module.exports =
  categories: ->
    r = []
    $.ajax
      type: 'GET'
      url: '/api/tag_categories'
    .done (res) ->
      recursive = (arr) ->
        _.map arr, (obj, index) ->
          buff = _.omit obj, 'children'
          if obj.children.length
            buff = [buff]
            buff.push recursive obj.children
          buff
      r = _.flatten recursive res
    r
  categories2: ->
    $.ajax
      type: 'GET'
      url: '/api/tag_categories'

  success: (res) ->
    console.log "success :", res
    recursive = (arr) ->
      _.map arr, (obj, index) ->
        buff = _.omit obj, 'children'
        if obj.children.length
          buff = [buff]
          buff.push recursive obj.children
        buff
    _.flatten recursive res
