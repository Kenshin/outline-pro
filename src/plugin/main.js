console.log( "=== outline plugin: main load ===" )

import * as code   from './code';
import * as bold   from './bold';
import * as italic from './italic';

function convert( str ) {
    str = code.toCode( str );
    str = bold.toBold( str );
    str = italic.toItalic( str );
    return str;
}

function recovery( str ) {
    str = code.fromCode( str );
    str = bold.fromBold( str );
    str = italic.fromItalic( str );
    return str;
}

export {
    convert,
    recovery
}