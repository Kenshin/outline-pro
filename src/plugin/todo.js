console.log( "=== outline plugin: time load ===" )

import timeago from 'timeago';

import storage from 'storage';

/**
 * Format time
 * 
 * @return {string} return now, e.g. 2017-04-03 11:43:53
 */
function fmtDate( day ) {
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
function timeTmpl( arr, ago ) {
    return arr.map( item => {
        let date     = item;
        date         = date.replace( /\[|\]/ig, '' ).trim();
        date         = ago( date );
        const fmt    = timeago().format( date , 'zh_CN' ),
              agoCls = fmt.includes( '前' ) ? 'ago' : '',
              time   = fmtDate( date );
        storage.todo.push( time );
        return `<outline time="${time}" class="time ${agoCls}"><i class="fas fa-calendar-alt"></i> ${fmt}</outline>`;
    });
}

export {
    timeTmpl,
}