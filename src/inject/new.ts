const hash = window.location.hash.substr(1);

const result: any = {};
const nameAndOwnerChunks = hash.split("&");
if (nameAndOwnerChunks.length === 2) {
    nameAndOwnerChunks.map(chunk => {
        const keyValue = chunk.split("=");
        result[keyValue[0]] = keyValue[1];
    });
}

if ("owner" in result && "name" in result) {
    let ownerButton = document.querySelector(".js-owner-container .js-menu-target") as HTMLElement;
    ownerButton.click();

    let ownerChoice = document.querySelector(`input[name="owner"][value="${result.owner}"]`) as HTMLElement;
    ownerChoice.click();

    let input = document.querySelector("[name='repository[name]']") as HTMLInputElement;
    input.value = result.name;
}
