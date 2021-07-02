import ts from 'typescript'

const options: ts.CompilerOptions = {
    ...ts.getDefaultCompilerOptions(),
    esModuleInterop: true,
    module: ts.ModuleKind.None,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    suppressOutputPathCheck: true,
    skipLibCheck: true,
    skipDefaultLibCheck: true,
    strict: true,
    target: ts.ScriptTarget.ES2015,
}

export default options
