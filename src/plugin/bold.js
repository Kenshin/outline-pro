console.log( "=== outline plugin: bold load ===" )

function toBold( str ) {
    console.log( "bold str before is", str )
    const re   = /\*\*[\S ][^*]+\*\*/ig,
          arr  = str.match( /\*\*[\S ][^*]+\*\*/ig );
    if ( arr && arr.length > 0 ) {
        const repl = arr.map( item => {
            return item.replace( /^\*\*/, '<outline class="bold">' ).replace( /\*\*$/, '</outline>' );
        });
        arr.forEach( ( item, idx ) => {
            str = str.replace( arr[idx], repl[idx] );
        });
    }
    console.log( "bold str after is", str, arr )
    return str;
}

function fromBold( str ) {
    str = str.replace( /<outline class="bold">/ig, '**' ).replace( /<\/outline>/ig, '**' );
}

export {
    toBold,
    fromBold,
}