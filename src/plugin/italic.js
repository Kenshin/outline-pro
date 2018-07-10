console.log( "=== outline plugin: italic load ===" )

const target = '_';

function toItalic( str ) {
    //console.log( "italic str before is", str )
    const arr = str.match( /_[\S ][^_]*_/ig );
    if ( arr && arr.length > 0 ) {
        const repl = arr.map( item => {
            return item.replace( /^_/, '<outline class="italic">' ).replace( /_$/, '</outline>' );
        });
        arr.forEach( ( item, idx ) => {
            str = str.replace( arr[idx], repl[idx] );
        });
    }
    //console.log( "italic str after is", str, arr )
    return str;
}

function fromItalic( str ) {
    str = str.replace( /<outline class="italic">/ig, '_' ).replace( /<\/outline>/ig, '_' );
}

export {
    toItalic,
    fromItalic,
}