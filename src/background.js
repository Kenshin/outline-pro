console.log( "=== outline background load ===" )

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