const hash = window.location.hash.substr(1);

interface RepoDetails {
    name: string;
    owner: string;
}

const result: RepoDetails = {
    name: "",
    owner: "",
};

const nameAndOwnerChunks = hash.split("&");
if (nameAndOwnerChunks.length === 2) {
    nameAndOwnerChunks.map(chunk => {
        const keyValue = chunk.split("=");

        const key = keyValue[0];
        const value = keyValue[1] || "";

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

let ownerButton = document.querySelector(".js-owner-container .js-menu-target") as HTMLElement;
ownerButton.click();

let ownerChoice = document.querySelector(`input[name="owner"][value="${result.owner}"]`) as HTMLElement;
ownerChoice.click();

let input = document.querySelector("[name='repository[name]']") as HTMLInputElement;
input.value = result.name;
