console.log( "=== outline contentscripts load ===" )

import './assets/css/main.styl';

import * as plugin from 'plugin';
import storage     from 'storage';

$( 'body' ).find( '.content' ).map( ( idx, item ) => {
    const $target = $( item ),
          str     = $target.text();
    $target.data( 'outline-content', str );
    $target.html( plugin.convert( $target, str ) );
});

$( '#paper' ).on( 'focus', '.content', event => {
    if ( storage.isClick ) return;
    console.log( event.type, $( event.target ).data( 'outline-content' ) )
    const $target = $( event.target ),
          str     = $target.data( 'outline-content' );
    $target.text( str );
    plugin.recovery( $target, str );
});

$( '#paper' ).on( 'blur', '.content', event => {
    if ( storage.isClick ) return;
    console.log( event.type )
    const $target = $( event.target ),
          str     = $target.text();
    $target.data( 'outline-content', str );
    $target.html( plugin.convert( $target, str ) );
});
