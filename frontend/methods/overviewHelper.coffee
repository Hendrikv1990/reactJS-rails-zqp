_ = require 'underscore'
utilities = require './utilities'

descriptionListItem = require '../components/descriptionListItem'


module.exports =
  extractValues: (outputs, toUpdate) ->
    actualWorker = @worker2.bind @, outputs, toUpdate
    Object.keys outputs
      .map (id) ->
        actualWorker id


  worker2: (outputs, toUpdate, id) ->
    #1. check if object
    if _.isObject outputs[id]
    #2. check if multiple
      if outputs[id].multiple
        data =
          key: id
          id: id
          value: outputs[id].inputs
          updating: toUpdate.id is id
        fn = require '../components/descriptionListMultipleItem'
        fn data
    #3. check if special input
      else if outputs[id].elementType
        fn = switch outputs[id].elementType
          when "switchInput"
            require('./switchInputsHelper').extractValues.bind @, outputs, toUpdate
          when "multipleInputs"
            require('./multipleInputsHelper').extractValues.bind @, outputs, toUpdate
          when "datePicker"
            toUpdate =
              "#{id}": toUpdate
            require('./datePickerHelper').extractValues.bind @, outputs, toUpdate
          when "multiSelect"
            #console.log "case : multiSelect.\ntoUpdate :", toUpdate
            require('./multiSelectHelper').extractValues.bind @, outputs, toUpdate
          when "inputsBlock"
            fn = require('./inputsBlockHelper').extractValues.bind @, outputs, toUpdate

        fn outputs[id], id
    else
      data =
        key: id
        updating: toUpdate.id is id
        id: id
        value: outputs[id]
      descriptionListItem data

  worker: (outputs, toUpdate, id) ->
    # TODO: normal case
    unless outputs?[id]?.elementType
      data =
        key: id
        updating: toUpdate.id is id
        id: id
        value: outputs[id]
      descriptionListItem data
    # TODO: special case
    # TODO: multipleCount :
    if _.isObject outputs[id]
      if outputs[id].elementType
        #console.log "in worker, for a outputs[id].elementType", outputs[id].elementType
        switch outputs[id].elementType
          when "switchInput"
            fn = require('./switchInputsHelper').extractValues.bind @, outputs, toUpdate
          when "multipleInputs"
            fn = require('./multipleInputsHelper').extractValues.bind @, outputs, toUpdate
          when "datePicker"
            toUpdate =
              "#{id}": toUpdate
            fn = require('./datePickerHelper').extractValues.bind @, outputs, toUpdate
          when "multiSelect"
            #console.log "case : multiSelect.\ntoUpdate :", toUpdate
            fn = require('./multiSelectHelper').extractValues.bind @, outputs, toUpdate

        fn outputs[id], id
