console.log( "=== outline plugin: main load ===" )

import * as code   from './code';
import * as bold   from './bold';
import * as italic from './italic';
import * as border from './border';
import * as tag    from './tag';
import * as fas    from './fas';
import * as img    from './img';
import * as lnk    from './link';

function convert( $target, str ) {
    str = code.toCode( str );
    str = bold.toBold( str );
    str = italic.toItalic( str );
    str = tag.toTag( str );
    str = fas.toFas( str );
    str = img.toImg( str );
    str = lnk.toLnk( str );
    str = border.toBorder( $target, str );
    return str;
}

function recovery( $target, str ) {
    str = border.fromBorder( $target, str );
    return str;
}

export {
    convert,
    recovery
}