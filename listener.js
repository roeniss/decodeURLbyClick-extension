chrome.browserAction.onClicked.addListener(function (_tab) {
  var text = readFromClipboard();
  var decodedText;

  try {
    decodedText = decodeURIComponent(text);
  } catch (error) {
    // chrome.browserAction.setPopup({ popup: "./fail.html" });
    alert(`Fail to Decode! : ${text}`);
    return;
  }

  copyToClipboard(decodedText);
  alert(`Decoded! : ${decodedText}`);
  // chrome.browserAction.setPopup({ popup: "./success.html" });
});

function readFromClipboard() {
  var readTo = document.createElement("textarea");
  document.body.appendChild(readTo);
  readTo.select();
  readTo.focus();
  if (document.execCommand("paste")) {
    return readTo.value;
  }
  return "";
}

function copyToClipboard(text) {
  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand("copy");
  copyFrom.blur(); //(Optional) De-select
  document.body.removeChild(copyFrom);
}
