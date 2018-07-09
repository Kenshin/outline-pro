console.log( "=== outline plugin: link load ===" )

import storage from 'storage';

const target = 'http://xxx.xxx.xxx';

function init() {
    $( '#paper' ).on( 'mouseover', '.outline-link', event => {
        storage.isClick = true;
    });
    $( '#paper' ).on( 'mouseout', '.outline-link', event => {
        storage.isClick = false;
    });
}
init();

function toLnk( str ) {
    console.log( "link str before is", str )
    if ( str.startsWith( '<a class="outline-img"' ) ) return str;
    const arr = str.match( /http\S+/ig );
    if ( arr && arr.length > 0 ) {
        const repl = arr.map( item => {
            const imgClass = /.(png|gif|jpg)$/.test( item.trim() ) ? 'outline-img' : '';
            return `<a class="outline-link content-link ${imgClass}" target="_blank" rel="noreferrer" href="${item}">${item}</a>`
        });
        arr.forEach( ( item, idx ) => {
            str = str.replace( arr[idx], repl[idx] );
        });
    }
    console.log( "link str after is", str, arr )
    return str;
}

function fromLnk( str ) {
    // TO-DO
}

export {
    toLnk,
    fromLnk,
}