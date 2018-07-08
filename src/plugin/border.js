console.log( "=== outline plugin: border load ===" )

function toBorder( $target, str ) {
    console.log( "border str before is", str )
    if ( /^! /.test( str ) ) {
        $target.addClass( 'outline-normal' );
    } else if ( /^!! /.test( str ) ) {
        $target.addClass( 'outline-secondary' );
    } else if ( /^!!! /.test( str ) ) {
        $target.addClass( 'outline-primary' );
    }
    return str;
}

function fromBorder( $target ) {
    $target
        .removeClass( 'outline-primary' )
        .removeClass( 'outline-secondary' )
        .removeClass( 'outline-normal' );
}

export {
    toBorder,
    fromBorder,
}