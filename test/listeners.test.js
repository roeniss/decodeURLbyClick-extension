const assert = require("assert");
const reload = require("require-reload")(require);

describe("listeners test", function () {
  beforeEach("re-init chrome stub", function () {
    reload("./chromeStub");
    reload("./documentStub");
  });

  describe("chrome.tabs.onUpdated listener", function () {
    it("add listener", function () {
      assert(!chrome.tabs.onUpdated.isListenerAdded);
      reload("../listeners");
      assert(chrome.tabs.onUpdated.isListenerAdded);
    });
    it("set icon and popup when changeInfo.status is set to complete", function () {
      assert(!chrome.browserAction.isSetIconTriggered);
      assert(!chrome.browserAction.isSetPopupTriggered);

      reload("../listeners");
      chrome.tabs.onUpdated.callback(undefined, { status: "complete" }, undefined);

      assert(chrome.browserAction.isSetIconTriggered);
      assert(chrome.browserAction.isSetPopupTriggered);
    });
  });

  describe("chrome.browserAction.onClicked listener", function () {
    it("add listener", function () {
      assert(!chrome.browserAction.onClicked.isListenerAdded);
      reload("../listeners");
      assert(chrome.browserAction.onClicked.isListenerAdded);
    });
    it("set icon and popup when browserAction is clicked", function () {
      assert(!chrome.browserAction.isSetIconTriggered);
      assert(!chrome.browserAction.isSetPopupTriggered);

      reload("../listeners");
      chrome.browserAction.onClicked.callback(undefined);

      assert(chrome.browserAction.isSetIconTriggered);
      assert(chrome.browserAction.isSetPopupTriggered);
    });

    it("get decoded url when browserAction is clicked", function () {
      global.clipboard =
        "https://velog.io/@roeniss/%ED%81%AC%EB%A1%AC-%ED%99%95%EC%9E%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%95%98%EB%8B%A4";

      reload("../listeners");
      chrome.browserAction.onClicked.callback(undefined);

      assert(global.clipboard === "https://velog.io/@roeniss/크롬-확장-프로그램을-만들어보았다");
    });
  });
});
