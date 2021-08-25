import ts from 'typescript'

export function makeArrowFunction(
    typeParameters: readonly ts.TypeParameterDeclaration[],
    parameters: readonly ts.ParameterDeclaration[],
) {
    return ts.factory.createArrowFunction(
        [],
        typeParameters,
        parameters,
        undefined,
        undefined,
        ts.factory.createBlock([]),
    )
}

export function makeClass(name: string) {
    return ts.factory.createClassDeclaration([], [], name, [], [], [])
}

export function makeConstructor() {
    return ts.factory.createConstructorDeclaration(
        [],
        [],
        [],
        ts.factory.createBlock([]),
    )
}

export function makeEnum(name: string) {
    return ts.factory.createEnumDeclaration([], [], name, [])
}

export function makeEnumMember(name: string) {
    return ts.factory.createEnumMember(name)
}

export function makeExtend() {
    return makeHeritage(ts.SyntaxKind.ExtendsKeyword)
}

export function makeFunction(name: string) {
    return ts.factory.createFunctionDeclaration(
        [],
        [],
        undefined,
        name,
        [],
        [],
        undefined,
        ts.factory.createBlock([]),
    )
}

export function makeGet(name: string) {
    return ts.factory.createGetAccessorDeclaration(
        [],
        [],
        name,
        [],
        undefined,
        ts.factory.createBlock([ts.factory.createReturnStatement()]),
    )
}

function makeHeritage(
    token: ts.SyntaxKind.ExtendsKeyword | ts.SyntaxKind.ImplementsKeyword,
) {
    return ts.factory.createHeritageClause(token, [])
}

export function makeImplement() {
    return makeHeritage(ts.SyntaxKind.ImplementsKeyword)
}

export function makeInterface(name: string) {
    return ts.factory.createInterfaceDeclaration([], [], name, [], [], [])
}

export function makeLambda(
    typeParameters: readonly ts.TypeParameterDeclaration[],
    parameters: readonly ts.ParameterDeclaration[],
) {
    return makeArrowFunction(typeParameters, parameters)
}

export function makeMethod(name: string) {
    return ts.factory.createMethodDeclaration(
        [],
        [],
        undefined,
        name,
        undefined,
        [],
        [],
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword),
        ts.factory.createBlock([]),
    )
}

export function makeMethodSignature(name: string) {
    return ts.factory.createMethodSignature(
        [],
        name,
        undefined,
        [],
        [],
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword),
    )
}

export function makeParameter(name: string) {
    return ts.factory.createParameterDeclaration(
        [],
        [],
        undefined,
        name,
        undefined,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    )
}

export function makeProperty(name: string) {
    return ts.factory.createPropertyDeclaration(
        [],
        [],
        name,
        undefined,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        undefined,
    )
}

export function makePropertySignature(name: string) {
    return ts.factory.createPropertySignature(
        [],
        name,
        undefined,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    )
}

export function makeTypeAlias(name: string) {
    const skt = ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
    const ukt = ts.factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword)
    const ut = ts.factory.createUnionTypeNode([skt, ukt])
    return ts.factory.createTypeAliasDeclaration([], [], name, [], ut)
}

export function makeVariable(name: string) {
    return ts.factory.createVariableDeclaration(
        name,
        undefined,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        ts.factory.createStringLiteral(''),
    )
}
