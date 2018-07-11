console.log( "=== outline plugin: action load ===" )

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
        .prepend( `<div id="toolbar-mind" class="operate"><i class="icon popup fas fa-external-link-square-alt"></i></div>` )
        .prepend( `<div id="toolbar-mind" class="operate"><i class="icon beautify convert fas fa-fire"></i></div>` );

    $( '#editor-header' ).find( '.right' ).on( 'click', '.popup, .beautify', event => {
        const cls     = event.target.className,
              $target = $( event.target );
        if ( cls.includes( 'popup' ) ) {
            // TO-DO
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

export {
    badge
}