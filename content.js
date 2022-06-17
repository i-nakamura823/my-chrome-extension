//alert("Hello!");

document.addEventListener('selectionchange', function (event) {
    let selectionText = window.getSelection().toString();
    console.log(`selection changed:${selectionText}`);

    if (selectionText.length)
        chrome.runtime.sendMessage({
            message: selectionText
        }).catch(e => console.error(e));
})