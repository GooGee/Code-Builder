export default {
    empty: '\n',
    declaration: require('!raw-loader!./code/Declaration.ts').default,
    statement: require('!raw-loader!./code/Statement.ts').default,
}
