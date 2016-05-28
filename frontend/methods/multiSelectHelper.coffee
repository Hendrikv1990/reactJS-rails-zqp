overviewHelper = require './overviewHelper'


module.exports =
  init: (element) ->
    elementType: element.elementType
    inputs: []
  updateStore: (_select, data) ->
    _select.inputs = data.value
  extractValues: (outputs, toUpdate, _multi, id) ->
    data =
      key: id
      updating: toUpdate.id is id
      id: id
      value: _multi.inputs
    fn = require '../components/descriptionListItem'
    fn data
  submit: (element, value) ->
    "#{element.postKey}":value.inputs if value.inputs.length
