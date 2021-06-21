/* eslint-disable */

import StringMap from '../model/StringMap'

const LibraryMap: StringMap = {
    'es6.d.ts': require('!raw-loader!typescript/lib/lib.es2015.d.ts').default,
    'dom.d.ts': require('!raw-loader!typescript/lib/lib.dom.d.ts').default,
    'lib.es5.d.ts': require('!raw-loader!typescript/lib/lib.es5.d.ts').default,
    'lib.es6.d.ts': require('!raw-loader!typescript/lib/lib.es2015.d.ts')
        .default,
    'lib.es6.core.d.ts':
        require('!raw-loader!typescript/lib/lib.es2015.core.d.ts').default,
    'lib.es6.collection.d.ts':
        require('!raw-loader!typescript/lib/lib.es2015.collection.d.ts')
            .default,
    'lib.es6.generator.d.ts':
        require('!raw-loader!typescript/lib/lib.es2015.generator.d.ts').default,
    'lib.es6.promise.d.ts':
        require('!raw-loader!typescript/lib/lib.es2015.promise.d.ts').default,
    'lib.es6.iterable.d.ts':
        require('!raw-loader!typescript/lib/lib.es2015.iterable.d.ts').default,
    'lib.es6.proxy.d.ts':
        require('!raw-loader!typescript/lib/lib.es2015.proxy.d.ts').default,
    'lib.es6.reflect.d.ts':
        require('!raw-loader!typescript/lib/lib.es2015.reflect.d.ts').default,
    'lib.es6.symbol.d.ts':
        require('!raw-loader!typescript/lib/lib.es2015.symbol.d.ts').default,
    'lib.es6.symbol.wellknown.d.ts':
        require('!raw-loader!typescript/lib/lib.es2015.symbol.wellknown.d.ts')
            .default,
}

export default LibraryMap
