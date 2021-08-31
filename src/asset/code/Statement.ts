do {
    break
} while (false)

for (let index = 0; index < 0; index += 1) {
    continue
}

const set: Set<string> = new Set()
for (const key in set) {
}

const list: number[] = [1, 2]
for (const item of list) {
}

list.find((item) => item === 0)
list.forEach((item) => {
    return
})

function add(aaa: number, bbb: number) {
    return aaa + bbb
}

if (!true) {
} else {
}

let literal: 'sss' | 'ccc' = 'ccc'

literal = 'sss'

try {
    throw new Error('Error')
} catch (error) {
} finally {
}

while (false) {
    break
}

type ut = null | undefined | Array<string>

export default ut
