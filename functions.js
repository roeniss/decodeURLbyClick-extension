// ref: https://stackoverflow.com/a/43375402/8556340
function readFromClipboard() {
  var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.select();
  elem.focus();
  if (document.execCommand("paste")) return elem.value;
  return "";
}

// ref: https://stackoverflow.com/a/18455088/8556340
function copyToClipboard(text) {
  var elem = document.createElement("textarea");
  elem.textContent = text;
  document.body.appendChild(elem);
  elem.select();
  document.execCommand("copy");
  elem.blur();
  document.body.removeChild(elem);
}

module.exports = { readFromClipboard, copyToClipboard };
