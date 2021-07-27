function isValidIdentifier(name: string) {
    if (typeof name === 'string') {
        if (name.match(/^[A-Z_a-z][A-Z_a-z0-9]*$/) === null) {
            return false
        }
        return true
    }
    return false
}

const StringTool = {
    isValidIdentifier,
}

export default StringTool
