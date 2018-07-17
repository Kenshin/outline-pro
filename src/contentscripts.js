console.log( "=== outline contentscripts load ===" )

import './assets/css/main.styl';

import * as plugin from 'plugin';
import storage     from 'storage';

const selector = '.content, .note',
      is_mubu  = location.host == 'mubu.com' ? true : false,
      root     = is_mubu ? '#paper' : '#pageContainer';

/**
 * Listen runtime message
 */
chrome.runtime.onMessage.addListener( ( request, sender, sendResponse ) => {
    if      ( request == 'recovery' ) recovery();
    else if ( request == 'convert' )  convert();
});

$( root ).on( 'keydown', selector, event => {
    storage.isClick = true;
})

$( root ).on( 'keyup', selector, event => {
    storage.isClick = false;
    const $target = $( event.target ),
          str     = $target.text(),
          repl    = plugin.replace( $target, str );
    str != repl && $target.text( repl );
    $target.data( 'outline-content', str );
})

is_mubu && $( root ).on( 'focus', selector, event => {
    if ( storage.isClick ) return;
    console.log( event.type, $( event.target ).data( 'outline-content' ) )
    const $target = $( event.target ),
          str     = $target.data( 'outline-content' );
    plugin.recovery( $target, str );
    $target.text( str );
});

is_mubu && $( root ).on( 'blur', selector, event => {
    if ( storage.isClick ) return;
    console.log( event.type )
    const $target = $( event.target ),
          str     = $target.data( 'outline-content' );
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

location.host == 'mubu.com' && convert();