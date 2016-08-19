var hash = window.location.hash.substr(1);
var result = {};
var nameAndOwnerChunks = hash.split("&");
if (nameAndOwnerChunks.length === 2) {
    nameAndOwnerChunks.map(function (chunk) {
        var keyValue = chunk.split("=");
        result[keyValue[0]] = keyValue[1];
    });
}
if ("owner" in result && "name" in result) {
    var ownerButton = document.querySelector(".js-owner-container .js-menu-target");
    ownerButton.click();
    var ownerChoice = document.querySelector("input[name=\"owner\"][value=\"" + result.owner + "\"]");
    ownerChoice.click();
    var input = document.querySelector("[name='repository[name]']");
    input.value = result.name;
}
