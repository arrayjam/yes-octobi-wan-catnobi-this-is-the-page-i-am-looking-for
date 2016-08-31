const possibleRepoRegex = /^https:\/\/github.com\/([0-9a-z-]+)\/([0-9a-z-_]+)\/?$/i;

interface TabToMessageMap {
    [propName: string]: Function;
}

const tabToMessage: TabToMessageMap = {};
chrome.webRequest.onCompleted.addListener(response => {
    if (possibleRepoRegex.test(response.url) && response.statusCode === 404) {
        const matches = possibleRepoRegex.exec(response.url);
        if (matches === null) return;
        if (matches.length === 3) {
            const message: RepoDetails = {
                owner: matches[1],
                name: matches[2],
            };

            tabToMessage[response.tabId] = function () {
                chrome.tabs.sendMessage(response.tabId, message);
            };
        }
    }
}, { urls: ["https://github.com/*/*"] });

chrome.tabs.onUpdated.addListener(tabId => {
    if (tabId in tabToMessage) {
        tabToMessage[tabId]();
        delete tabToMessage[tabId];
    }
});