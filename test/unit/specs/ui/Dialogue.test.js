import { enter, look, sure } from "@/model/ui/Dialogue"

test(`enter`, () => {
    const call = () => {
        enter('name', 'An')
    }
    expect(call).not.toThrowError()
})

test(`look`, () => {
    const call = () => {
        look('Hello')
    }
    expect(call).not.toThrowError()
})

test(`sure`, () => {
    const call = () => {
        sure('Are you sure?')
    }
    expect(call).not.toThrowError()
})
