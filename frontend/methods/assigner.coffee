module.exports = (data, parent) ->
  fn = switch data.elementType
    when "switchInput" then require '../components/switchInput'
    when 'multipleInputs' then require '../components/multipleInputs'
    when 'datePicker' then require '../components/datePicker'
    when 'multiSelect' then require '../components/multiSelect'
    when 'autocomplete' then require '../components/autocomplete'
    when 'inputsBlock' then require '../components/inputsBlock'
    else require '../components/FormInputWithLabel'
  fn data, parent
