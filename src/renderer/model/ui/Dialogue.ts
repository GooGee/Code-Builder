import Swal, { SweetAlertType } from 'sweetalert2'

function toString(object: any, isRoot: boolean = true): string {
    if (typeof object == 'function') {
        return 'Function'
    }
    if (Array.isArray(object)) {
        return 'Array'
    }
    if (typeof object == 'object') {
        if (!object) {
            return String(object)
        }
        if (!isRoot) {
            return 'Object'
        }
        if (object instanceof Error) {
            return object.name + ': ' + object.message
        }

        let list: Array<string> = []
        Object.getOwnPropertyNames(object).forEach(key => {
            let value = toString(object[key], false)
            list.push(key + ': ' + value)
        })
        return list.join('\n')
    }
    return object
}

export function look(message: string, status: number = 0) {
    let icon: SweetAlertType = 'info'
    if (status >= 400) {
        icon = 'error'
    } else if (status >= 300) {
        icon = 'warning'
    } else if (status >= 200) {
        icon = 'success'
    } else if (status >= 100) {
        icon = 'question'
    }
    return Swal.fire(toString(message), undefined, icon)
}

export function sure(message: string) {
    return Swal.fire({
        title: message,
        type: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    })
}

export function enter(message: string, value: string = '') {
    return Swal.fire({
        title: message,
        input: 'text',
        inputValue: value,
        showCancelButton: true
    })
}
