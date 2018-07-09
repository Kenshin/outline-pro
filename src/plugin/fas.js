console.log( "=== outline plugin: fas load ===" )

const target = '::';

function init() {
    $( 'head' ).append( '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/solid.css" integrity="sha384-TbilV5Lbhlwdyc4RuIV/JhD8NR+BfMrvz4BL5QFa2we1hQu6wvREr3v6XSRfCTRp" crossorigin="anonymous">' );
    $( 'head' ).append( '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/fontawesome.css" integrity="sha384-ozJwkrqb90Oa3ZNb+yKFW2lToAWYdTiF1vt8JiH5ptTGHTGcN7qdoR1F95e0kYyG" crossorigin="anonymous">' );
}
init();

function toFas( str ) {
    console.log( "fas str before is", str )
    const arr = str.match( /:\S+:/ig );
    if ( arr && arr.length > 0 ) {
        const repl = arr.map( item => {
            let type = item;
            type = type.replace( /:/ig, '' ).trim();
            return item.replace( /^:[\w-]+/, `<i class="fas fa-${type}">` ).replace( /:$/, '</i>' );
        });
        arr.forEach( ( item, idx ) => {
            str = str.replace( arr[idx], repl[idx] );
        });
    }
    console.log( "italic str after is", str, arr )
    return str;

}

function fromFas() {
    str = str.replace( /<i class="fas fa-\w+">/ig, ':' ).replace( /<\/i>/ig, ':' );
}

export {
    toFas,
    fromFas
}