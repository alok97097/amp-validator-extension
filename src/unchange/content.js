

/**
 * Determine if the page is an AMP page.
 * @return {boolean}
 * @private
 */
function isAmpDocument() {
    return true
    // return (document.documentElement.hasAttribute('amp') ||
    //     document.documentElement.hasAttribute('⚡'));
}

/**
 * Listener for requests from the extension.
 *
 * Requests for getAmpDetails. Return to the extension:
 * - isAmp: Is the page marked as an AMP page.
 * Requests for loadAmp and has ampHref, then redirects the browser to ampHref.
 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.getAmpDetails) {
        const isAmp = isAmpDocument();
        sendResponse({
            'isAmp': isAmp
        });
    }
});