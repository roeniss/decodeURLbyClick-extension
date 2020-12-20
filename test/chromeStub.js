global.chrome = {
  tabs: {
    onUpdated: {
      isListenerAdded: false,
      callback: null,
      addListener(callback) {
        super.isListenerAdded = true;
        super.callback = callback;
      },
    },
  },
  browserAction: {
    onClicked: {
      isListenerAdded: false,
      callback: null,
      addListener(callback) {
        super.isListenerAdded = true;
        super.callback = callback;
      },
    },
    isSetIconTriggered: false,
    setIcon() {
      super.isSetIconTriggered = true;
    },
    isSetPopupTriggered: false,
    setPopup() {
      super.isSetPopupTriggered = true;
    },
  },
};

module.exports = {};
