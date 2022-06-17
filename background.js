import {postTwitter} from "./src/twitterController.js";
let selectionText;

const user = {
    username: 'demo-user'
};

const copyText = (text) => {
    postTwitter();
    console.log("copy: "+text);
}

const pasteText = (text) => {
    console.log("paste: " + text);
}

const showList = (text) => {
    console.log("list: " + text);
}

// function onMessageFunc(message, sender, sendResponse) {
//     chrome.tabs.query({active: true}).then(tabs => {
//         const tab = tabs[0];
//         console.log(`selection text[${message.message}] update by sender:${sender.tab.id}, active.tab.id:${tab.id}`);

//         if (sender.tab.id === tab.id) {
//             selectionText = message.message;
//         }
//     })
//     return true;
// }

chrome.commands.onCommand.addListener((command) => {
    switch (command) {
        case "copy":
            copyText(selectionText);
            break;
        case "paste":
            pasteText(selectionText);
            break;
        case "list":
            showList(selectionText);
            break;
    }
    console.log(`Command "${command}" called selectionText:${selectionText}`);
});

chrome.runtime.onMessage.addListener(
    function onMessageFunc(message, sender, sendResponse) {
        if (message === 'get-user-data') {
            sendResponse(user);
        }
        selectionText = message.message;
        chrome.tabs.query({active: true}).then(tabs => {
            const tab = tabs[0];
            console.log(`selection text[${message.message}] update by sender:${sender.tab.id}, active.tab.id:${tab.id}`);
    
            if (sender.tab.id === tab.id) {
                selectionText = message.message;
            }
        })
        return true;
    }
);