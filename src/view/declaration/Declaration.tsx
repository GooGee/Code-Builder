import React, { ReactElement } from 'react'
import ts from 'typescript'
import EmptyStatement from '../statement/EmptyStatement'
import ClassDeclaration from './ClassDeclaration'
import ConstructorDeclaration from './ConstructorDeclaration'
import EnumDeclaration from './EnumDeclaration'
import EnumMember from './EnumMember'
import FunctionDeclaration from './FunctionDeclaration'
import ImportDeclaration from './ImportDeclaration'
import InterfaceDeclaration from './InterfaceDeclaration'
import MethodDeclaration from './MethodDeclaration'
import MethodSignature from './MethodSignature'
import ParameterDeclaration from './ParameterDeclaration'
import PropertyDeclaration from './PropertyDeclaration'
import PropertySignature from './PropertySignature'
import TypeAliasDeclaration from './TypeAliasDeclaration'
import TypeParameterDeclaration from './TypeParameterDeclaration'

interface Props {
    node: ts.Declaration
}

export default function Declaration({ node }: Props): ReactElement {
    if (ts.isEmptyStatement(node)) {
        return <EmptyStatement node={node as any}></EmptyStatement>
    }

    switch (node.kind) {
        case ts.SyntaxKind.ClassDeclaration:
            return <ClassDeclaration node={node as any}></ClassDeclaration>

        case ts.SyntaxKind.Constructor:
            return (
                <ConstructorDeclaration
                    node={node as any}
                ></ConstructorDeclaration>
            )

        case ts.SyntaxKind.EnumDeclaration:
            return <EnumDeclaration node={node as any}></EnumDeclaration>

        case ts.SyntaxKind.EnumMember:
            return <EnumMember node={node as any}></EnumMember>

        case ts.SyntaxKind.FunctionDeclaration:
            return (
                <FunctionDeclaration node={node as any}></FunctionDeclaration>
            )

        case ts.SyntaxKind.ImportDeclaration:
            return <ImportDeclaration node={node as any}></ImportDeclaration>

        case ts.SyntaxKind.InterfaceDeclaration:
            return (
                <InterfaceDeclaration node={node as any}></InterfaceDeclaration>
            )

        case ts.SyntaxKind.MethodDeclaration:
            return <MethodDeclaration node={node as any}></MethodDeclaration>

        case ts.SyntaxKind.MethodSignature:
            return <MethodSignature node={node as any}></MethodSignature>

        case ts.SyntaxKind.Parameter:
            return (
                <ParameterDeclaration node={node as any}></ParameterDeclaration>
            )

        case ts.SyntaxKind.PropertyDeclaration:
            return (
                <PropertyDeclaration node={node as any}></PropertyDeclaration>
            )

        case ts.SyntaxKind.PropertySignature:
            return <PropertySignature node={node as any}></PropertySignature>

        case ts.SyntaxKind.TypeAliasDeclaration:
            return (
                <TypeAliasDeclaration node={node as any}></TypeAliasDeclaration>
            )

        case ts.SyntaxKind.TypeParameter:
            return (
                <TypeParameterDeclaration
                    node={node as any}
                ></TypeParameterDeclaration>
            )

        default:
            break
    }

    throw new Error(
        `Error loading declaration: ${node.kind}-${ts.SyntaxKind[node.kind]}`,
    )
}
