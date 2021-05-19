import ts from 'typescript'

const map = new Map([
    [ts.SyntaxKind.ArrayType, 'Array'],
    [ts.SyntaxKind.AsExpression, 'as'],
    [ts.SyntaxKind.AsKeyword, 'as'],
    [ts.SyntaxKind.BooleanKeyword, 'boolean'],
    [ts.SyntaxKind.BreakKeyword, 'break'],
    [ts.SyntaxKind.BreakStatement, 'break'],
    [ts.SyntaxKind.CaseBlock, 'case'],
    [ts.SyntaxKind.CaseClause, 'case'],
    [ts.SyntaxKind.CaseKeyword, 'case'],
    [ts.SyntaxKind.CatchClause, 'catch'],
    [ts.SyntaxKind.CatchKeyword, 'catch'],
    [ts.SyntaxKind.ClassDeclaration, 'class'],
    [ts.SyntaxKind.ClassExpression, 'class'],
    [ts.SyntaxKind.ClassKeyword, 'class'],
    [ts.SyntaxKind.ConstKeyword, 'const'],
    [ts.SyntaxKind.Constructor, 'constructor'],
    [ts.SyntaxKind.ConstructorKeyword, 'constructor'],
    [ts.SyntaxKind.ConstructorType, 'constructor'],
    [ts.SyntaxKind.ContinueKeyword, 'continue'],
    [ts.SyntaxKind.ContinueStatement, 'continue'],
    [ts.SyntaxKind.DefaultClause, 'default'],
    [ts.SyntaxKind.DefaultKeyword, 'default'],
    [ts.SyntaxKind.DeleteExpression, 'delete'],
    [ts.SyntaxKind.DeleteKeyword, 'delete'],
    [ts.SyntaxKind.DoKeyword, 'do'],
    [ts.SyntaxKind.DoStatement, 'do'],
    [ts.SyntaxKind.EnumDeclaration, 'enum'],
    [ts.SyntaxKind.EnumKeyword, 'enum'],
    [ts.SyntaxKind.EnumMember, 'enum'],
    [ts.SyntaxKind.FalseKeyword, 'false'],
    [ts.SyntaxKind.ForKeyword, 'for'],
    [ts.SyntaxKind.ForStatement, 'for'],
    [ts.SyntaxKind.ForInStatement, 'for'],
    [ts.SyntaxKind.ForOfStatement, 'for'],
    [ts.SyntaxKind.FunctionDeclaration, 'function'],
    [ts.SyntaxKind.FunctionExpression, 'function'],
    [ts.SyntaxKind.FunctionKeyword, 'function'],
    [ts.SyntaxKind.IfKeyword, 'if'],
    [ts.SyntaxKind.IfStatement, 'if'],
    [ts.SyntaxKind.ImportClause, 'import'],
    [ts.SyntaxKind.ImportDeclaration, 'import'],
    [ts.SyntaxKind.ImportKeyword, 'import'],
    [ts.SyntaxKind.InterfaceDeclaration, 'interface'],
    [ts.SyntaxKind.InterfaceKeyword, 'interface'],
    [ts.SyntaxKind.LetKeyword, 'let'],
    [ts.SyntaxKind.NeverKeyword, 'never'],
    [ts.SyntaxKind.NewExpression, 'new'],
    [ts.SyntaxKind.NewKeyword, 'new'],
    [ts.SyntaxKind.NullKeyword, 'null'],
    [ts.SyntaxKind.NumberKeyword, 'number'],
    [ts.SyntaxKind.ObjectKeyword, 'object'],
    [ts.SyntaxKind.ReturnKeyword, 'return'],
    [ts.SyntaxKind.ReturnStatement, 'return'],
    [ts.SyntaxKind.StringKeyword, 'string'],
    [ts.SyntaxKind.SwitchKeyword, 'switch'],
    [ts.SyntaxKind.SwitchStatement, 'switch'],
    [ts.SyntaxKind.ThisKeyword, 'this'],
    [ts.SyntaxKind.ThrowKeyword, 'throw'],
    [ts.SyntaxKind.ThrowStatement, 'throw'],
    [ts.SyntaxKind.TrueKeyword, 'true'],
    [ts.SyntaxKind.TryKeyword, 'try'],
    [ts.SyntaxKind.TryStatement, 'try'],
    [ts.SyntaxKind.TypeAliasDeclaration, 'type'],
    [ts.SyntaxKind.TypeAssertionExpression, 'type'],
    [ts.SyntaxKind.TypeOfExpression, 'typeof'],
    [ts.SyntaxKind.TypeOfKeyword, 'typeof'],
    [ts.SyntaxKind.UndefinedKeyword, 'undefined'],
    [ts.SyntaxKind.VoidKeyword, 'void'],
    [ts.SyntaxKind.WhileKeyword, 'while'],
    [ts.SyntaxKind.WhileStatement, 'while'],
])

export default function KeywordText(kind: ts.SyntaxKind) {
    return map.get(kind)
}
