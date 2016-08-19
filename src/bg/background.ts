const possibleRepoRegex = /^https:\/\/github.com\/([0-9a-z-]+)\/([0-9a-z-_]+)\/?$/i;

function createMessageSender(response: chrome.webRequest.WebResponseCacheDetails): Function | null {
    if (possibleRepoRegex.test(response.url) && response.statusCode === 404) {
        const matches = possibleRepoRegex.exec(response.url);
        if (matches === null) return null;
        if (matches.length === 3) {
            const message = {
                owner: matches[1],
                name: matches[2],
            };

            return function (updatedTabId: number) {
                if (updatedTabId === response.tabId) {
                    chrome.tabs.sendMessage(response.tabId, message);
                }
            }
        }
    }

    return null;
}

let sendMessage: null | Function = null;
chrome.webRequest.onCompleted.addListener(response => {
    sendMessage = createMessageSender(response);
}, { urls: ["https://github.com/*/*"] });

chrome.tabs.onUpdated.addListener((tabId, info) => {
    if (info.status === "complete" && sendMessage) {
        sendMessage(tabId);
    }
});