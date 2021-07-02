/* eslint-disable */

import StringMap from '../model/StringMap'

const LibraryMap: StringMap = {
    'lib.es5.d.ts': require('!raw-loader!typescript/lib/lib.es5.d.ts').default,
    'lib.es6.d.ts': require('!raw-loader!typescript/lib/lib.es6.d.ts').default,
    'lib.es2015.d.ts': require('!raw-loader!typescript/lib/lib.es2015.d.ts')
        .default,
    'lib.dom.d.ts': require('!raw-loader!typescript/lib/lib.dom.d.ts').default,
    'lib.dom.iterable.d.ts':
        require('!raw-loader!typescript/lib/lib.dom.iterable.d.ts').default,
    'lib.webworker.importscripts.d.ts':
        require('!raw-loader!typescript/lib/lib.webworker.importscripts.d.ts')
            .default,
    'lib.scripthost.d.ts':
        require('!raw-loader!typescript/lib/lib.scripthost.d.ts').default,
    'lib.es2015.core.d.ts':
        require('!raw-loader!typescript/lib/lib.es2015.core.d.ts').default,
    'lib.es2015.collection.d.ts':
        require('!raw-loader!typescript/lib/lib.es2015.collection.d.ts')
            .default,
    'lib.es2015.iterable.d.ts':
        require('!raw-loader!typescript/lib/lib.es2015.iterable.d.ts').default,
    'lib.es2015.generator.d.ts':
        require('!raw-loader!typescript/lib/lib.es2015.generator.d.ts').default,
    'lib.es2015.promise.d.ts':
        require('!raw-loader!typescript/lib/lib.es2015.promise.d.ts').default,
    'lib.es2015.proxy.d.ts':
        require('!raw-loader!typescript/lib/lib.es2015.proxy.d.ts').default,
    'lib.es2015.reflect.d.ts':
        require('!raw-loader!typescript/lib/lib.es2015.reflect.d.ts').default,
    'lib.es2015.symbol.d.ts':
        require('!raw-loader!typescript/lib/lib.es2015.symbol.d.ts').default,
    'lib.es2015.symbol.wellknown.d.ts':
        require('!raw-loader!typescript/lib/lib.es2015.symbol.wellknown.d.ts')
            .default,
    'typescript.d.ts': require('!raw-loader!typescript/lib/typescript.d.ts')
        .default,
}

export default LibraryMap
