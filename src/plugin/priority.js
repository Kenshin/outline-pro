console.log( "=== outline plugin: priority load ===" )

function toPriority( $target, str ) {
    //console.log( "priority str before is", str )
    if ( /^! /.test( str ) ) {
        $target.addClass( 'outline-normal' );
    } else if ( /^!! /.test( str ) ) {
        $target.addClass( 'outline-secondary' );
    } else if ( /^!!! /.test( str ) ) {
        $target.addClass( 'outline-primary' );
    }
    return str;
}

function fromPriority( $target ) {
    $target
        .removeClass( 'outline-primary' )
        .removeClass( 'outline-secondary' )
        .removeClass( 'outline-normal' );
}

export {
    toPriority,
    fromPriority,
}