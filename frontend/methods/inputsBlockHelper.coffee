_ = require 'underscore'
overviewHelper = require './overviewHelper'
descriptionListBlock = require '../components/descriptionListBlock'

module.exports =
  init: (element) ->
    initChildren =  (element) ->
      _.map element.inputs, (input, index) =>
        res2 = id: input.id
        if input.elementType is "inputsBlock"
          Object.assign res2,
              elementType: input.elementType
              inputs: []
              children: initChildren input
        res2
    res =
      elementType: element.elementType
      inputs: []
      childrenRef: initChildren element


    res
  updateStore: (target, data) ->
    _.each data.block, (depth, index) ->
      #if index is 0, target is an object, then it's an array. Might need code here
      unless index is 0
        #init block inside ?
        if target[depth.id] is undefined
          target[depth.id] =
            elementType: "inputsBlock"
            inputs: []
        #this else might not be necessary
      target = target[depth.id].inputs
      target[depth.index] = {} if target[depth.index] is undefined
      target = target[depth.index] unless index is data.block.length-1
    Object.assign target[_.last(data.block).index], "#{data.id}":data.value

  extractValues: (outputs, toUpdate, _block, id) ->
    data =
      id: id
      key: id
      #updating: (_block.childrenId.indexOf toUpdate.id) isnt -1
      updating: undefined isnt _.find _block.childrenRef, (child) -> child.id is toUpdate.id
      blocks: _block.inputs
    descriptionListBlock data
  submit: (element, value) ->
    res = []
    # each value in value.inputs
    _.each value.inputs, (input, index) ->
      buff = {}
      # each key in input
      _.each input, (value, key) ->
        postKey = _.chain(element.inputs)
          .pick (inp) ->
            inp.id is key
          .pluck "postKey"
          .first()
          .value()
        buff[postKey] = value
      res.push buff
    "#{element.postKey}":res
