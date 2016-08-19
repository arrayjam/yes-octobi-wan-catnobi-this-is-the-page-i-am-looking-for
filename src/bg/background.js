var possibleRepoRegex = /^https:\/\/github.com\/([0-9a-z-]+)\/([0-9a-z-_]+)\/?$/i;
function createMessageSender(response) {
    if (possibleRepoRegex.test(response.url) && response.statusCode === 404) {
        var matches = possibleRepoRegex.exec(response.url);
        if (matches === null)
            return null;
        if (matches.length === 3) {
            var message_1 = {
                owner: matches[1],
                name: matches[2]
            };
            return function (updatedTabId) {
                if (updatedTabId === response.tabId) {
                    chrome.tabs.sendMessage(response.tabId, message_1);
                }
            };
        }
    }
    return null;
}
var sendMessage = null;
chrome.webRequest.onCompleted.addListener(function (response) {
    sendMessage = createMessageSender(response);
}, { urls: ["https://github.com/*/*"] });
chrome.tabs.onUpdated.addListener(function (tabId, info) {
    if (info.status === "complete" && sendMessage) {
        sendMessage(tabId);
    }
});
