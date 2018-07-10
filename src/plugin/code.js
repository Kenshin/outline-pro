console.log( "=== outline plugin: code load ===" )

const target = '`';

function toCode( str ) {
    //console.log( "code str before is", str )
    const arr = str.match( /`[\S ][^`]*`/ig );
    if ( arr && arr.length > 0 ) {
        const repl = arr.map( item => {
            return item.replace( /^`/, '<outline class="code">' ).replace( /`$/, '</outline>' );
        });
        arr.forEach( ( item, idx ) => {
            str = str.replace( arr[idx], repl[idx] );
        });
    }
    //console.log( "code str after is", str, arr )
    return str;
}

function fromCode( str ) {
    str = str.replace( /<outline class="code">/ig, '`' ).replace( /<\/outline>/ig, '`' );
}

export {
    toCode,
    fromCode,
}