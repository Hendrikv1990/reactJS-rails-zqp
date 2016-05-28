requests = './requests'

module.exports = [
    legend: "Projektbeschreibung"
    inputs:   [
        id: "something"
        name: "Titel"
        placeholder: "I placehold"
        labelText: "Titel"
        elementType: "input"
        inputType: "text"
        postKey: "title"
      ,
        id: "andSomethingElse"
        name: "Undertitel"
        placeholder: "Hey, wanna write some"
        labelText: "Undertitel"
        elementType: "input"
        inputType: "text"
        postKey: "untertitel"
      ,
        id: "andSomethingElseToo"
        name: "Projektbeschreibung"
        placeholder: "describe the project"
        labelText: "Projektbeschreibung"
        elementType: "textarea"
        postKey: "Projektbeschreibung"
      ]
  ,
    legend: "inputsBlock"
    inputs: [
        id: "inputsBlock"
        name: "inputsBlock"
        labelText: "test multi"
        elementType: "inputsBlock"
        postKey: "inputsBlock"
        inputs: [
            id: "firstMulti"
            name: "firstMulti"
            labelText: "firstMulti"
            elementType: "input"
            inputType: "text"
            postKey: "KfirstMultiK"
            block: [id: "inputsBlock"]
          ,
            id: "secondMulti"
            name: "secondMulti"
            labelText: "secondMulti"
            elementType: "input"
            inputType: "text"
            postKey: "KsecondMultiK"
            block: [id: "inputsBlock"]
          ,
            id: "childBlock"
            name: "childBlock"
            labelText: "childBlock"
            elementType: "inputsBlock"
            postKey: "unAutreEnfant"
            block: [id: "inputsBlock"]
            inputs: [
                id: "textChild"
                name: "textChild"
                labelText: "textChild"
                elementType: "input"
                inputType: "text"
                postKey: "txt"
                block: [id: "inputsBlock",
                 id: "childBlock"]
            ]
          ]
    ]
  ,
    legend: "Projektdetails"
    inputs: [
        id: "Projektstart"
        name: "Projektstart"
        labelText: "Projektstart"
        elementType: "datePicker"
        postKey: ["start_year", "start_month"]
      ,
        id: "Projektende"
        name: "Projektende"
        labelText: "Projektende"
        elementType: "datePicker"
        postKey: ["end_year", "end_month"]
      ,
        id: "Projekfinanzierung"
        name: "Projekfinanzierung"
        labelText: "Projekfinanzierung"
        elementType: "input"
        inputType: "text"
        postKey: "Projekfinanzierung"
      ,
        id: "Förderform"
        name: "Förderform"
        labelText: "Förderform"
        elementType: "input"
        postKey: "Förderform"
    ]
  ,
    legend: "Projektquelle"
    inputs: [
        id: "Projekwebseite"
        name: "Projekwebseite"
        labelText: "Projekwebseite"
        elementType: "input"
        inputType: "text"
        postKey: "projekwebseite"
    ]
  ,
    legend: "Publikation(en)"
    inputs: [
        id: "publikationen"
        name: "publikationen"
        labelText: "publikationen"
        elementType: "multipleInputs"
        inputs: [
            id:"qqun"
            name:"qqun"
            labelText: "ehre is something"
            elementType: "input"
            inputType: "text"
            postKey: "qqun"
            parent: ["publikationen"]
        ]
    ]
  ,
    legend: "Schlagworte"
    inputs: [
      id: "Verschlagwortung"
      name: "Verschlagwortung"
      labelText: "Verschlagwortung"
      elementType: "multiSelect"
      dataSource: [1,2,3,4,5,6]
    ]
    legend: "Einrichtung(en)"
    inputs: [
        id:"Leitende_Einrichtung"
        name: "Leitende Einrichtung"
        labelText: "Leitende Einrichtung"
        elementType: "input"
        inputType: "checkbox"
        postKey: "leitende_einrichtung"
      ,
        id: "Einrichtung"
        name: "Einrichtung"
        labelText: "Einrichtung"
        elementType: "autocomplete"
        postKey: "einrichtung"
        #required: true
        dataSource: ["uesh", "fine", "bonsoir", "maybe", "joder"]
      ,
        id: "Ansprechpartner"
        name: "Ansprechpartner"
        labelText: "Ansprechpartner"
        elementType: "input"
        inputType: "text"
        #required: true
        postKey: "ansprechpartner"
      ,
        id: "E-Mail"
        name: "E-Mail"
        labelText: "E-Mail"
        elementType: "input"
        inputType: "email"
        postKey: "email"
      ,
        id:"Leitende_Ansprechpartner"
        name: "Leitende Ansprechpartner"
        labelText: "Leitende Ansprechpartner"
        elementType: "input"
        inputType: "checkbox"
        postKey: "leitende_ansprechpartner"
      ,
        id: "testSwitch"
        name: "im the switch"
        elementType: "switchInput"
        inputs: [
            id:"a"
            name:"a"
            labelText: "ehre is something"
            elementType: "input"
            inputType: "text"
            postKey: "caca"
            parent: ["testSwitch"]
          ,
            id:"b"
            name:"b"
            labelText: "boouuya"
            elementType: "multipleInputs"
            postKey: "yololo"
            parent: ["testSwitch"]
            inputs: [
                id:"multiple-1"
                name:"multiple-1"
                labelText: "ehre is something"
                elementType: "input"
                inputType: "number"
                postKey: "multiple-1pK"
                parent: ["testSwitch", "b"]
              ,
                id:"multiple-2"
                name:"multiple-2"
                labelText: "a range heeey"
                elementType: "input"
                inputType: "range"
                postKey: "multiple-2"
                parent: ["testSwitch", "b"]

              ,
                id:"multiple-3"
                name:"multiple-3"
                labelText: "gimme yo mail"
                elementType: "input"
                inputType: "text"
                postKey: "multiple-3"
                parent: ["testSwitch", "b"]
            ]
        ]
    ]
]


###
  structure :         here is a example of the formBase globale structure
[                                   ==> the form
  {                                 ==> a fieldset
    legend: string,                 ==> its legend
    inputs: []                      ==> its inputs
  }
]
###
