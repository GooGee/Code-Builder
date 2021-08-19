import StringTool from './StringTool'

function inputName(message: string = 'Enter a name', value: string = '') {
    const text = prompt(message, value)
    if (text === null) {
        return null
    }

    const name = text.trim()
    if (StringTool.isValidIdentifier(name) === false) {
        throw new Error(name + ' is not a valid name!')
    }
    return name
}

const InputTool = {
    inputName,
}

export default InputTool
