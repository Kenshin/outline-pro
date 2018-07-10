console.log( "=== outline plugin: date load ===" )

import timeago from 'timeago';

import storage from 'storage';

const target = '[now|tomorrow|week]';

/**
 * Get now time
 * 
 * @return {string} return now, e.g. 2017年04月03日 11:43:53
 */
function convert( day ) {
    const date   = new Date( day ),
          format = value => value = value < 10 ? "0" + value : value;
    return date.getFullYear() + "-" + format( date.getUTCMonth() + 1 ) + "-" + format( date.getUTCDate() ) + " " + format( date.getHours() ) + ":" + format( date.getMinutes() ) + ":" + format( date.getSeconds() );
}

/**
 * Create <outline time="2018-07-09 15:00:00" class="time ago"><i class="fas fa-calendar-alt"></i> 18 小时前</outline>
 * 
 * @param  {array} arr
 * @param  {func} ago
 * @return {array}
 */
function format( arr, ago ) {
    return arr.map( item => {
        let date     = item;
        date         = date.replace( /\[|\]/ig, '' ).trim();
        date         = ago( date );
        const fmt    = timeago().format( date , 'zh_CN' ),
              agoCls = fmt.includes( '前' ) ? 'ago' : '',
              time   = convert( date );
        storage.todo.push( time );
        return `<outline time="${time}" class="time ${agoCls}"><i class="fas fa-calendar-alt"></i> ${fmt}</outline>`;
    });
}

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
            return new Date( date );
          };
    if ( arr && arr.length > 0 ) {
        const repl = format( arr, ago );
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