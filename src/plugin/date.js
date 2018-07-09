console.log( "=== outline plugin: date load ===" )

import timeago from 'timeago';

const target = '[now|tomorrow|week]';

function toDate( str ) {
    console.log( "date str before is", str )
    const arr = str.match( /\[(now|tomorrow|week)\]/ig ),
          ago = str => {
            let hour = 1000 * 60 * 60,
                now  = Date.now(),
                date;
            switch ( str ) {
                case 'now':
                    date = now;
                    break;
                case 'tomorrow':
                    date = now + ( hour * 24 );
                    break;
                case 'week':
                    date = now + ( hour * 24 * 7 );
                    break;
            }
            return timeago().format( date , 'zh_CN' );
          };
    if ( arr && arr.length > 0 ) {
        const repl = arr.map( item => {
            let date = item;
            date = date.replace( /\[|\]/ig, '' ).trim();
            date = ago( date );
            const agoCls = date.includes( '前' ) ? 'ago' : '';
            return `<outline class="time ${agoCls}"><i class="fas fa-calendar-alt"></i> ${date}</outline>`;
        });
        arr.forEach( ( item, idx ) => {
            str = str.replace( arr[idx], repl[idx] );
        });
    }
    console.log( "date str after is", str, arr )
    return str;
}

function fromDate( str ) {
    // TO-DO
}

export {
    toDate,
    fromDate,
}