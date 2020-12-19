const { readFromClipboard, copyToClipboard } = require("./functions");

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

// ref: https://stackoverflow.com/a/39909282/8556340
chrome.tabs.onUpdated.addListener(function (_tabId, changeInfo, _tab) {
  if (changeInfo.status == "complete") {
    chrome.browserAction.setIcon({ path: iconRedPaths });
    chrome.browserAction.setPopup({ popup: "" });
  }
});

chrome.browserAction.onClicked.addListener(function (_tab) {
  try {
    var originalUrl = readFromClipboard();
    var decodedUrl = decodeURIComponent(originalUrl);
    copyToClipboard(decodedUrl);
    chrome.browserAction.setIcon({ path: iconGreenPaths });
    chrome.browserAction.setPopup({ popup: "./info.html" });
  } catch (error) {
    chrome.browserAction.setPopup({ popup: "./fail.html" });
    return;
  }
});
