// //e.dispatchEvent(new CustomEvent(t,{bubbles:!0,cancelable:!0,detail:n}))}

// f(e,t,n){return e.dispatchEvent(new CustomEvent(t,{bubbles:!0,cancelable:!0,detail:n}))}
// t.dispatchEvent(new CustomEvent("autocheck:send", {bubbles: true, cancelable: True, detail: { value: "stuff", owner: "kharta" }}


// Object {value: "cuddly-pancakt", owner: "arrayjam"}

// n.find("input[type=radio], input[type=checkbox]").prop("checked", !0).change(),
// $$("input[name='owner'][value='arrayjam']")[0].click()
// // NOTE(yuri): Manually $0.click() for setting owner
// $0.jQuery300044320194996383311.events.input[0].handler($0)

const hash = window.location.hash.substr(1);

const result: any = {};
const chunks = hash.split("&");
if (chunks.length === 2) {
    chunks.map(d => {
        const kv = d.split("=");
        result[kv[0]] = kv[1];
    });
}

if ("owner" in result && "name" in result) {
    console.log(result);

    (<HTMLElement>document.querySelector(".js-owner-container .js-menu-target")).click();
    (<HTMLElement>document.querySelector(`input[name="owner"][value="${result.owner}"]`)).click();

    (<HTMLInputElement>document.querySelector("[name='repository[name]']")).value = result.name;
}
