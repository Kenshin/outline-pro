console.log( "=== outline plugin: time load ===" )

import timeago from 'timeago';

const target = '[2018-07-10 15:00] [2018-07-10]';

function init() {
    $( '#paper' ).on( 'mouseover', '.outline-time', event => {
        $( event.target ).append( `<time src=${event.target.href}></time>` );
        $( event.target ).parent().parent().addClass( 'outline-time-deep' );
    });
    $( '#paper' ).on( 'mouseout', '.outline-time', event => {
        $( event.target ).find( 'time' ).remove();
        $( event.target ).parent().parent().removeClass( 'outline-time-deep' );
    });
}
//init();

function toTime( str ) {
    console.log( "time str before is", str )
    const arr = str.match( /\[\d{4}-\d{2}-\d{2}( \d{2}:\d{2})?\]/ig ),
          ago = str => {
            return timeago().format( new Date( str + ':00' ), 'zh_CN' );
          };
    if ( arr && arr.length > 0 ) {
        const repl = arr.map( item => {
            let time = item;
            time = time.replace( /\[|\]/ig, '' ).trim();
            return `<outline class="time"><i class="fas fa-calendar-alt"></i> ${ago(time)}</outline>`;
        });
        arr.forEach( ( item, idx ) => {
            str = str.replace( arr[idx], repl[idx] );
        });
    }
    console.log( "time str after is", str, arr )
    return str;
}

function fromTime( str ) {
    // TO-DO
}

export {
    toTime,
    fromTime,
}