import StringTool from './StringTool'

function inputName(message: string = 'Enter a name', value: string = '') {
    const text = prompt(message, value)
    if (text === null) {
        return null
    }
    if (StringTool.isValidIdentifier(text) === false) {
        window.alert(text + ' is not a valid name!')
        return null
    }
    return text
}

const InputTool = {
    inputName,
}

export default InputTool
