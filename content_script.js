function copyToClipboard(text) {
    var elem = document.createElement("textarea");
    elem.style.position = "fixed";
    elem.style.opacity = "0";
    elem.style.zIndex = "-1";
    elem.style.width = "1px";
    elem.style.height = "1px";
    elem.style.overflow = "hidden";
    elem.style.whiteSpace = "pre";
    elem.textContent = text;
    document.body.appendChild(elem);

    elem.select();
    elem.focus();

    document.execCommand("copy");
    document.body.removeChild(elem);
}

function readFromClipboard() {
    var elem = document.createElement("textarea");
    elem.style.position = "fixed";
    elem.style.opacity = "0";
    elem.style.zIndex = "-1";
    elem.style.width = "1px";
    elem.style.height = "1px";
    elem.style.overflow = "hidden";
    elem.style.whiteSpace = "pre";

    document.body.appendChild(elem);

    elem.select();
    elem.focus();

    if (document.execCommand("paste")) return elem.value;
    return "";
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("Received message:", request);
    if (request.message === "copy-and-paste") {
        try {
            const text = readFromClipboard();
            console.log("Clipboard text:", text);
            const decodedText = decodeURIComponent(text);
            console.log("Decoded text:", decodedText);
            copyToClipboard(decodedText);
            console.log("Copied decoded text to clipboard");
            sendResponse({ status: "success", text: decodedText });
        } catch (err) {
            sendResponse({ status: "error", error: err });
        }
    }
});

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
