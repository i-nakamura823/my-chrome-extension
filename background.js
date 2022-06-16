// chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//         target: {tabId: tab.id},
//         func: contentScriptFunc,
//         args: ['action'],
//     });
// });

// function contentScriptFunc(name) {
//     alert(`"${name}" executed`);
// }

// // This callback WILL NOT be called for "_execute_action"
// chrome.commands.onCommand.addListener((command) => {
//     console.log(`Command "${command}" called`);
// });

// chrome.commands.onCommand.addListener((command) => {
//     chrome.scripting.executeScript({
//         target: {tabId: tab.id},
//         func: contentScriptFunc,
//         args: ['action'],
//     });
// });

let selectionText;

const user = {
    username: 'demo-user'
};

const copyText = (text) => {
    console.log("copy: "+text);
}

const pasteText = (text) => {
    console.log("paste: " + text);
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