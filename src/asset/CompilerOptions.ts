import ts from 'typescript'

const options: ts.CompilerOptions = {
    ...ts.getDefaultCompilerOptions(),
    strict: true,
    target: ts.ScriptTarget.ES2015,
    esModuleInterop: true,
    module: ts.ModuleKind.None,
    suppressOutputPathCheck: true,
    skipLibCheck: true,
    skipDefaultLibCheck: true,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
}

export default options
