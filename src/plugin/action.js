console.log( "=== outline plugin: action load ===" )

/**
 * Listen runtime message
 */
chrome.runtime.onMessage.addListener( ( request, sender, sendResponse ) => {
    if ( request == 'popout' ) {
        $( '#editor-header' ).find( '.right .popup' ).removeClass( 'fa-sign-out-alt' ).addClass( 'fa-sign-in-alt' );
    } else if ( request = 'popin' ) {
        $( '#editor-header' ).find( '.right .popup' ).removeClass( 'fa-sign-in-alt' ).addClass( 'fa-sign-out-alt' );
    }
});

function init() {
    sync();
    bar();
}
init();

function badge() {
    let count = 0;
    const $target = $( '#node-wrapper' ).find( 'outline.today' );
    if ( $target && $target.length > 0 ) {
        $target.parent().parent().next().find( '.content' ).map( ( idx, item ) => {
            if ( !$(item).parent().parent().hasClass( 'finished' ) ) {
                count++;
            }
        });
    }
    chrome.runtime.sendMessage( { type: 'update_badge', count } );
}

function sync() {
    const observer = new MutationObserver( event => {
        badge();
    });
    observer.observe( $( '.action-save' )[0], {
        attributes: true, 
        attributeFilter: ['class'],
        childList: false, 
        characterData: false
    });
}

function bar() {
    $( '#editor-header' )
        .find( '.right' )
        .prepend( `<div id="toolbar-mind" class="operate"><i class="icon popup fas fa-sign-out-alt"></i></div>` )
        .prepend( `<div id="toolbar-mind" class="operate"><i class="icon beautify convert fas fa-fire"></i></div>` );

    $( '#editor-header' ).find( '.right' ).on( 'click', '.popup, .beautify', event => {
        const cls     = event.target.className,
              $target = $( event.target );
        if ( cls.includes( 'popup' ) ) {
            popup( cls, $target );
        } else if ( cls.includes( 'beautify' ) ) {
            const state = cls.includes( 'convert' ) ? true : false;
            if ( state ) {
                $target.removeClass( 'convert' ).addClass( 'recovery' );
            } else {
                $target.removeClass( 'recovery' ).addClass( 'convert' );
            }
            chrome.runtime.sendMessage( { type: 'beautify', state } );
        }
    });
}

function popup( cls, $target ) {
    const popup = cls.includes( 'out' ) ? true : false;
    if ( popup ) {
        window.open( location.href, '_blank', 'width=700,height=700,toolbar=0,statusbar=0,location=0,status=0' );
        chrome.runtime.sendMessage( { type: 'popup', popup, href: location.href });
    } else {
        chrome.runtime.sendMessage( { type: 'popup', popup, href: location.href });
        window.close();
    }
}

export {
    badge
}