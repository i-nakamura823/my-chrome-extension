//const postTwitter = require("./src/twitterController");
let selectionText;
let history = [];
let historyCounter = 0;

const user = {
    username: 'demo-user'
};

const copyText = (text) => {
    //postTwitter();
    history.push(text);
    //historyCounter += 1;
    console.log("copy: "+text);
}

const pasteText = (text) => {
    history = [];
    console.log("clear history!!");
}

const showList = (text) => {
    console.log("<コピー履歴>");
    history.forEach(element => console.log(element));
}

chrome.commands.onCommand.addListener((command) => {
    console.log("-------------------------");
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
    //console.log(`Command "${command}" called selectionText:${selectionText}`);
});

chrome.runtime.onMessage.addListener(
    function onMessageFunc(message, sender, sendResponse) {
        if (message === 'get-user-data') {
            sendResponse(user);
        }
        selectionText = message.message;
        chrome.tabs.query({active: true}).then(tabs => {
            const tab = tabs[0];
            //console.log(`selection text[${message.message}] update by sender:${sender.tab.id}, active.tab.id:${tab.id}`);
    
            if (sender.tab.id === tab.id) {
                selectionText = message.message;
            }
        })
        return true;
    }
);