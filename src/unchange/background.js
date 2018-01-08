var global = {};

/**
 * Returns whether the url is forbidden for the extension to act on.
 *
 * @param {string} url The URL of a tab.
 * @return {boolean}
 */
function isForbiddenUrl(url) {
    return (url.startsWith('chrome://') || url.startsWith('view-source'));
}

/**
 * Fetches the content of the tab's URL and validates it. Then updates the
 * extension's icons with pass/fail.
 *
 * @param {Tab} tab The Tab which triggered the event.
 */
function validateUrlFromTab(tab, port) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', tab.url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            const doc = xhr.responseText;
            const validationResult = amp.validator.validateString(doc);
            console.log(validationResult);
            port.postMessage({
                "ampValidate": validationResult,
                "currentUrl" : tab.url
            });
        }
    };
    xhr.send();
}

function isAMPpage(tab, port) {
    if (!isForbiddenUrl(tab.url)) {
        validateUrlFromTab(tab, port);
        // chrome.tabs.sendMessage(
        //     tab.id, { 'getAmpDetails': true }, function (response) {
        //         if (response && response.isAmp) {
        //             global.checkAMP = true;
        //             validateUrlFromTab(tab, port);
        //         } else {
        //             global.checkAMP = false;
        //             notAmpPage(tab, port);
        //         }
        //     }
        // );
    }
}

function notAmpPage(tab, port) {
    port.postMessage("not AMP Page...");
}

chrome.extension.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        if (msg === "validatePage") {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                isAMPpage(tabs[0], port);
            });
        }
    });
})