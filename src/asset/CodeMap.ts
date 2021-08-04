/* eslint-disable */

export default {
    declaration: require('!raw-loader!./code/Declaration.ts').default,
    statement: require('!raw-loader!./code/Statement.ts').default,
    test: 'const list: Array<number> = [1, 2, 3]\nlet sum: number = 0\n',
}
