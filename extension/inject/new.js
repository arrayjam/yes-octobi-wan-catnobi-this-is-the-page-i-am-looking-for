var hash = window.location.hash.substr(1);
var result = {
    name: "",
    owner: ""
};
var nameAndOwnerChunks = hash.split("&");
if (nameAndOwnerChunks.length === 2) {
    nameAndOwnerChunks.map(function (chunk) {
        var keyValue = chunk.split("=");
        var key = keyValue[0];
        var value = keyValue[1] || "";
        // NOTE(yuri): Doing this explicitly means the Typescript compiler is happy
        // and we won't end up with undefined data
        if (key === "name") {
            result.name = value;
        }
        if (key === "owner") {
            result.owner = value;
        }
    });
}
if (result.name !== "" && result.owner !== "") {
    var ownerButton = document.querySelector(".js-owner-container .js-menu-target");
    ownerButton.click();
    var ownerChoice = document.querySelector("input[name=\"owner\"][value=\"" + result.owner + "\"]");
    ownerChoice.click();
    var input = document.querySelector("[name='repository[name]']");
    input.value = result.name;
    if (history && history.replaceState)
        history.replaceState(null, undefined, "#");
}
