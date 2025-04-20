const iconRedPaths = {
    16: "images/icon16red.png",
    24: "images/icon24red.png",
    32: "images/icon32red.png",
    48: "images/icon48red.png",
    128: "images/icon128red.png",
};

const iconGreenPaths = {
    16: "images/icon16green.png",
    24: "images/icon24green.png",
    32: "images/icon32green.png",
    48: "images/icon48green.png",
    128: "images/icon128green.png",
};

// click extension icon -> send message to content script to copy and paste
chrome.action.onClicked.addListener((_tab) => {
    console.log("Browser action clicked");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log("Active tab found:", tabs[0]);
        chrome.tabs.sendMessage(tabs[0].id, { message: "copy-and-paste" }, function (response) {
            console.log("Response from content script:", response);
            if (response && response.status === "success") {
                chrome.action.setIcon({ path: iconGreenPaths });

                // after 1 second, reset the icon to red
                setTimeout(() => {
                    chrome.action.setIcon({ path: iconRedPaths });
                }, 1000);
            }
        });
    });
});
