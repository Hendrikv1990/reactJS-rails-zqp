Reflux = require 'reflux'
refActions = require '../actions/ref_action'
_ = require 'underscore'

formBase = require '../../client/formBase'

module.exports = Reflux.createStore
  listenables: [refActions]
  init: ->
    @refs =[]
    _.each (formBase.map (el) -> el.inputs), (el, index) =>
        @refs[index] = _.object (_.chain el
            .pluck 'id'
            .flatten().value())
          , [0...]

  onReferringInput: (data) ->
    destination = if data.parent then data.parent[0] else data.key
    _.detect @refs, (el) ->
      if _.has el, destination
        el[data.key] = data.value
        true
  onInputFocused: (data) ->
    _.detect @refs, (formField, index) =>
      if _.has formField, data.key
        @trigger value: index
        formField[data.key].focus()
        true
