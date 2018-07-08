console.log( "=== outline plugin: tag load ===" )

const target = '#(project|feature|release|bug)';

function toTag( str ) {
    console.log( "tag str before is", str )
    const arr = str.match( /#(project|feature|release|bug) /ig );
    if ( arr && arr.length > 0 ) {
        const repl = arr.map( item => {
            let type = item;
            type = type.replace( '#', '' ).trim();
            return item.replace( /^#/, `<outline class="tag ${type}">` ).replace( / $/, '</outline>' );
        });
        arr.forEach( ( item, idx ) => {
            str = str.replace( arr[idx], repl[idx] );
        });
    }
    console.log( "tag str after is", str, arr )
    return str;
}

function fromTag( str ) {
    str = str.replace( /<outline class="tag \w+">/ig, '**' ).replace( /<\/outline>/ig, '**' );
}

export {
    toTag,
    fromTag,
}