import ts from 'typescript'

const KeywordTypeList: Array<ts.KeywordTypeSyntaxKind> = [
    ts.SyntaxKind.BooleanKeyword,
    ts.SyntaxKind.NeverKeyword,
    ts.SyntaxKind.NumberKeyword,
    ts.SyntaxKind.ObjectKeyword,
    ts.SyntaxKind.StringKeyword,
    ts.SyntaxKind.UndefinedKeyword,
    ts.SyntaxKind.VoidKeyword,
]

export default KeywordTypeList
