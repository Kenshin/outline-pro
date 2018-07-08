console.log( "=== outline plugin: main load ===" )

import * as code from './code';
import * as bold from './bold';

function convert( str ) {
    str = code.toCode( str );
    str = bold.toBold( str );
    return str;
}

function recovery( str ) {
    str = code.fromCode( str );
    str = bold.fromBold( str );
    return str;
}

export {
    convert,
    recovery
}