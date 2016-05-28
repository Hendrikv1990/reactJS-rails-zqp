_ = require 'underscore'
overviewHelper = require './overviewHelper'

module.exports =
  init: (element) ->
    res =
      elementType: element.elementType
      inputs: {}
    if element.nested
      res.nested = true

    element.inputs.forEach (current) => res.inputs[current.id] = @initElement current
    res
  extractValues: (outputs, toUpdate, _multi) ->
    overviewHelper.extractValues _multi.inputs, toUpdate
  submit: (element, value) ->
    res = {}
    _.chain value.inputs
      .pick (val) =>
        value
      .each (val, id) =>
        buff = _.find element.inputs, (child) =>
          child.id is id
        res[buff.postKey] = value.inputs[buff.id]
    if value.nested
      res = "#{element.postKey}":res
    res
