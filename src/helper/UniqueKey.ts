export default function UniqueKey(prefix: string = 'key') {
    let index = 0
    return function next() {
        index += 1
        return prefix + index
    }
}
