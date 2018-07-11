console.log( "=== outline plugin: date load ===" )

import * as todo from './todo';

const target = '[now|tomorrow|week|today]',
      ago = str => {
        let hour = 1000 * 60 * 60,
            now  = Date.now(),
            date;
        switch ( str ) {
            case 'now':
                date = now;
                break;
            case 'today':
                date = new Date();
                const format = value => value = value < 10 ? "0" + value : value;
                date = date.getFullYear() + "-" + format( date.getUTCMonth() + 1 ) + "-" + format( date.getUTCDate() ) + " 23:59";
                break;
            case 'tomorrow':
                date = now + ( hour * 24 );
                break;
            case 'week':
                date = now + ( hour * 24 * 7 );
                break;
        }
        return new Date( date );
      };

function toDate( str ) {
    //console.log( "date str before is", str )
    const arr = str.match( /\[(now|tomorrow|week|today)\]/ig );
    if ( arr && arr.length > 0 ) {
        const repl = todo.timeTmpl( arr, ago );
        arr.forEach( ( item, idx ) => {
            str = str.replace( arr[idx], repl[idx] );
        });
    }
    //console.log( "date str after is", str, arr )
    return str;
}

function replace( $target, str ) {
    if ( str == undefined ) return str;
    const arr = str.match( /\[(now|tomorrow|week|today)\]/ig );
    if ( arr && arr.length > 0 ) {
        let time = arr[0].replace( /\[|\]/ig, '' ).trim();
        time     = ago( time );
        time     = todo.fmtDate( time );
        time     = time.replace( /:\d{2}$/ig, '' );
        return str.replace( /\[(now|tomorrow|week|today)\]/ig, `[${time}]` );
    }
    return str;
}

function fromDate( str ) {
    // TO-DO
}

export {
    toDate,
    fromDate,
    replace,
}