_ = require 'underscore'
overviewHelper = require './overviewHelper'
typeCheck = require('./submit').typeCheck

module.exports =
  init: (element)->
    res =
      elementType: element.elementType
      current: element.inputs[0].id
      inputs: {}

    element.inputs.forEach (current) => res.inputs[current.id] = @initElement current
    res
  extractValues: (outputs, toUpdate, _switch) ->
    overviewHelper.worker2 (_.pick _switch.inputs, _switch.current), toUpdate, _switch.current
  submit: (element, value) ->
    _child = _.find element.inputs, (child) ->
      child.id is value.current
    typeCheck _child, value.inputs[value.current]
