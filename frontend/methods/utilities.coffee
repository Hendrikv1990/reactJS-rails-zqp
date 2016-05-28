_ = require 'underscore'
module.exports =
  mapObject: (object, cb) ->
    Object.keys object
      .map (key, index) ->
        cb object[key], index
  formatValue: (value) ->
    value = switch typeof value
      when "string" then value = value.trim()
      when "boolean" then value = if value then "ja"
      when "object"
        buff = ""
        if Array.isArray value
          if value.length
            value.forEach (el, index) ->
              if [null, undefined, false, "", "undefined", "off"].indexOf(el) is -1
                buff += if index isnt 0 then ", #{el}" else el
          else buff = null
        value = buff
