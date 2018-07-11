console.log( "=== outline background load ===" )

let convert = true;

chrome.runtime.onMessage.addListener( ( request, sender, sendResponse ) => {
    console.log( request, sender, sendResponse )
    if ( request.type = "update_badge" ) {
        badge( request.count );
    } else if ( request.type == 'beautify' ) {
        convert = request.state;
        getTabId( tabs => {
            if ( tabs && tabs.length > 0 ) {
                beautify( tabs[0] );
            }
        });
    }
});

chrome.browserAction.onClicked.addListener( tab => {
    beautify( tab );
});

chrome.alarms.onAlarm.addListener( () => {
    getTabId( tabs => {
        if ( tabs && tabs.length > 0 ) {
            chrome.tabs.sendMessage( tabs[0].id, "timediff", resp => {
                resp && notify();
            });
        }
    });
});
chrome.alarms.create({ periodInMinutes: 1 });

/**
 * Get mubu tabid
 * 
 * @param {func} callback 
 */
function getTabId( callback ) {
    chrome.tabs.query( {}, tabs => callback( tabs.filter( tab => tab.url.startsWith( 'https://mubu.com/' ) ) ) );
}

/**
 * Notification
 */
function notify() {
    chrome.notifications.create({
        iconUrl:  chrome.extension.getURL( 'assets/icons/icon48.png' ),
        type:     'basic',
        title:    '过期提示',
        message:  '您的待办事项已有过期，请注意。',
        priority: 0
    });
}

/**
 * Beautify( convert/recovery )
 * 
 * @param {object} tab 
 */
function beautify( tab ) {
    if ( convert ) {
        chrome.browserAction.setTitle({ title: '美化原始数据' });
        chrome.tabs.sendMessage( tab.id, "recovery" );
        convert = false;
    } else {
        chrome.browserAction.setTitle({ title: '恢复原始数据' });
        chrome.tabs.sendMessage( tab.id, "convert" );
        convert = true;
    }
}

/**
 * Set badge
 * 
 * @param {number} count 
 */
function badge( count ) {
    const text = count == 0 ? '' : count + '';
    chrome.browserAction.setBadgeText({ text });
    chrome.browserAction.setBadgeBackgroundColor({ color: '#f44336' });
}