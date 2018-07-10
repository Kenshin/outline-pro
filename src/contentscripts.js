console.log( "=== outline contentscripts load ===" )

import './assets/css/main.styl';

import * as plugin from 'plugin';
import storage     from 'storage';

const selector = '.content, .note';

/**
 * Listen runtime message
 */
chrome.runtime.onMessage.addListener( ( request, sender, sendResponse ) => {
    if      ( request == 'recovery' ) recovery();
    else if ( request == 'convert' )  convert();
});

$( '#paper' ).on( 'keydown', selector, event => {
    storage.isClick = true;
})

$( '#paper' ).on( 'keyup', selector, event => {
    storage.isClick = false;
    const $target = $( event.target ),
          str     = $target.text(),
          repl    = plugin.replace( $target, str );
    str != repl && $target.text( repl );
})

$( '#paper' ).on( 'focus', selector, event => {
    if ( storage.isClick ) return;
    console.log( event.type, $( event.target ).data( 'outline-content' ) )
    const $target = $( event.target ),
          str     = $target.data( 'outline-content' );
    plugin.recovery( $target, str );
    $target.text( str );
});

$( '#paper' ).on( 'blur', selector, event => {
    if ( storage.isClick ) return;
    console.log( event.type )
    const $target = $( event.target ),
          str     = $target.text();
    $target.data( 'outline-content', str );
    $target.html( plugin.convert( $target, str ) );
});

/**
 * Convert data
 */
function convert() {
    $( 'body' ).find( selector ).map( ( idx, item ) => {
        const $target = $( item ),
              str     = $target.text();
        $target.data( 'outline-content', str );
        $target.html( plugin.convert( $target, str ) );
    });
}

/**
 * Recovery data
 */
function recovery() {
    $( 'body' ).find( selector ).map( ( idx, item ) => {
        const $target = $( item ),
              str     = $target.data( 'outline-content' );
        plugin.recovery( $target, str );
        $target.text( str );
    });
}

convert();