Reflux = require 'reflux'
inputActions = require '../actions/input_actions'
formBase = require '../../client/formBase'
submit = require '../../methods/submit'
_ = require 'underscore'
$ = require 'jquery'

formStore = Reflux.createStore
  listenables: [inputActions]
  init: ->
    @comments = {}
    @data = {}
    console.log "in form store init, @", @
    formBase.forEach (fieldset, index) => @initFieldset fieldset

  initElement: (element, parent) ->
    fn = switch element.elementType
      when "switchInput"
        require('../../methods/switchInputsHelper').init
      when "multipleInputs"
        require('../../methods/multipleInputsHelper').init
      when "datePicker"
        require('../../methods/datePickerHelper').init
      when "multiSelect"
        require('../../methods/multiSelectHelper').init
      when "inputsBlock"
        require('../../methods/inputsBlockHelper').init
      else
        # TODO: rework this shitty one
        () => undefined

    res = fn.call @, element
    if element.multiple
      if typeof res is 'object'
        res.init = res.inputs
      else if _.isUndefined res
        res =
          init: undefined
      res.inputs = []
      res.multiple = true
    res
  initFieldset: (fieldset) ->
    fieldset.inputs.forEach (input) =>
      @data[input.id] = @initElement input
  onControlChanged: (data) ->
    recursive = (target, parent) ->
      if parent.length is 1
        Object.assign target[parent[0]], data.changes
      else
        recursive target[parent[0]].inputs, _.rest parent
    recursive @data, data.parent
    @trigger
      type: "onValueChanged"
      outputs: @data
      toUpdate: data.changes

  onValueChanged: (data) ->
    target = @data
    # TODO: redo this entire function
    if data.block?.length
      fn = require('../../methods/inputsBlockHelper').updateStore
      fn target, data
    else
      #1. go through parents
      if data.parent?.length
        _.each data.parent, (val) ->
          target = target[val].inputs
      localizer = data.id
      #2. check the elementType
      unless target[localizer]?.elementType
        #4. shitty thing for a input replicated and nested
        unless _.isString data.nested
          target[localizer] = data.value
        else
          target[localizer]
          if target[localizer] is undefined
            target[localizer] = {}
          Object.assign target[localizer], "#{data.id}": data.value
      else
        # TODO: call the specific function for updating a special elementType
        fn = switch target[localizer].elementType
          when "datePicker"
            require('../../methods/datePickerHelper').updateStore
          when "multiSelect"
            require('../../methods/multiSelectHelper').updateStore
        fn target[localizer], data
    @trigger
      type: "onValueChanged"
      outputs: @data
      toUpdate: data

  onSubmit: ->
    data = submit.submit @data
    console.log "data :", Object.assign data, comments:@comments
    console.log "comments", @comments
    token = document.querySelector('meta[name="csrf-token"]').content
    $.ajax
      type: 'POST'
      url: '/api/projects'
      beforeSend: (xhr) ->
        xhr.setRequestHeader 'X-CSRF-Token', token
      data: {project: data}
    .done (res) =>
      console.log "submit succeed"
      @trigger
        type: "onSubmit"
        res: res
  onCommentChanged: (data) ->
    @comments[data.key] = data.value
  onReplicaDeleted: (data) ->
    @data[data.id].inputs.splice data.index, 1
    @trigger
      type: "onValueChanged"
      outputs: @data
      toUpdate: data
  orderData: ->
    inputs = _.flatten formBase.map (el) -> el.inputs
module.exports = formStore
