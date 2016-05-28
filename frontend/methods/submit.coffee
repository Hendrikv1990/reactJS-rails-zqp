formBase = require '../client/formBase'
_ = require 'underscore'

module.exports =
  submit: (data) ->
    ###
    1. data works with the id; get the associated postKey with the id
    2. handle the special cases
    3. flatten the res
    ###
    res = {}
    #array of objects from the fromBase
    fb = _.chain formBase
      .pluck 'inputs'
      .flatten()
      .map (current, index) ->
        _.pick current, 'postKey', 'id', 'inputs'
      .value()

      #filter the data, transform it if necessary, pair it with its postkey
    _.chain data
      .pick (value, key) =>
        value
      .each (value, id) =>
        buff = _.find fb, (element) =>
          element.id is id
        #transform the data here if necessary
        Object.assign res, @typeCheck buff, value
      .value()

    console.log "submit, res :", res
    res

  typeCheck: (element, value) ->
    res = {}
    unless typeof value is 'object'
      res[element.postKey] = value
    else if value.multiple
      res[element.postKey] = value.inputs
    else if value.elementType
      fn = switch value.elementType
        when "switchInput"
          require('./switchInputsHelper').submit
        when "multipleInputs"
          require('./multipleInputsHelper').submit
        when "datePicker"
          require('./datePickerHelper').submit
        when "multiSelect"
          require('./multiSelectHelper').submit
        when "inputsBlock"
          require('./inputsBlockHelper').submit
      _specialSubmit = fn element, value
      res = _.pick _specialSubmit, (value) ->
        value
    res
