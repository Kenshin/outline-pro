console.log( "=== outline plugin: img load ===" )

const target = 'http\S+.(png|gif|jpg)|\!\[[\S ]+\]\(http\S+.(png|gif|jpg)\)';

function init() {
    $( '#paper' ).on( 'mouseover', '.outline-img', event => {
        $( event.target ).append( `<img src=${event.target.href}></img>` );
        $( event.target ).parent().parent().addClass( 'outline-img-deep' );
    });
    $( '#paper' ).on( 'mouseout', '.outline-img', event => {
        $( event.target ).find( 'img' ).remove();
        $( event.target ).parent().parent().removeClass( 'outline-img-deep' );
    });
}
init();

function toImg( str ) {
    console.log( "img str before is", str )
    const arr = str.match( /\!\[[\S ]*\]\(http\S+.(png|gif|jpg)\)/ig ),
          title = str => {
            str = str.match( /!\[[\S ]*\]/ );
            str = str[0].replace( '![', '' ).replace( ']', '' );
            return str == '' ? '已插入图片' : str;
          },
          href = str => {
            str = str.match( /http\S+.(png|gif|jpg)/ );
            str = str[0];
            return str;
          };
    if ( arr && arr.length > 0 ) {
        const repl = arr.map( item => {
            return `<a class="outline-img" href=${href(item)} target="_blank"><i class="fas fa-image"></i> ${title(item)}</a>`
        });
        arr.forEach( ( item, idx ) => {
            str = str.replace( arr[idx], repl[idx] );
        });
    }
    console.log( "img str after is", str, arr )
    return str;
}

function fromImg( str ) {
    // TO-DO
}

export {
    toImg,
    fromImg,
}