console.log( "=== outline plugin: time load ===" )

import * as todo from './todo';

const target = '[2018-07-10 15:00] [2018-07-10]';

function toTime( str ) {
    //console.log( "time str before is", str )
    const arr = str.match( /\[\d{4}-\d{2}-\d{2}( \d{2}:\d{2})?\]/ig ),
          ago = str => {
            return new Date( str + ':00' );
          };
    if ( arr && arr.length > 0 ) {
        const repl = todo.timeTmpl( arr, ago );
        arr.forEach( ( item, idx ) => {
            str = str.replace( arr[idx], repl[idx] );
        });
    }
    //console.log( "time str after is", str, arr )
    return str;
}

function fromTime( str ) {
    // TO-DO
}

export {
    toTime,
    fromTime,
}