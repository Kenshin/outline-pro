console.log( "=== outline plugin: action load ===" )

function init() {
    sync();
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

export {
    badge
}