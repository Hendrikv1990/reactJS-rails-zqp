overviewHelper = require './overviewHelper'
_ = require 'underscore'

initializer =
  dateLabels: ['year', 'month']
  months: ['undefiniert', 'januar', 'Februar', 'märz', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'dezember']
  years: do ->
    res = []
    yNow = (new Date).getFullYear()
    yMinus = 50
    i = 0
    while i <= yMinus
      res.push yNow - i
      i++
    res

helper =
  initComponent: initializer
  init: (element) ->
    elementType: element.elementType
    inputs: {}
  updateStore: (_datePicker, data) ->
    Object.assign _datePicker.inputs, data.value
  extractValues: (outputs, toUpdate, _date) ->
    #console.log "DatePicker : \noutputs :", outputs,"\n toUpdate :", toUpdate, "\n_date :",_date
    #overviewHelper.extractValues _date.inputs, toUpdate
    #console.log "findKey",_.findKey outputs, _date
    # TODO: id : So wrooong
    id = _.chain toUpdate
      .keys()
      .first()
      .value()
    data =
      key: id
      updating: _.has toUpdate, id
      id: id
      value: _date.inputs
    fn = require '../components/descriptionListDatePicker'
    res = fn data
    #fn data
    res
  submit:(element, value) ->
    res = {}
    _.each value.inputs, (val, keyword) =>
      postKey = _.find element.postKey, (pKey, index) =>
        pKey.includes keyword
      if initializer.months.includes val then val = initializer.months.indexOf val
      res[postKey] = val
    res
module.exports = helper
