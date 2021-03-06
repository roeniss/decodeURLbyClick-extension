const assert = require("assert");
const reload = require("require-reload")(require);
const { readFromClipboard, copyToClipboard } = require("../functions");

describe("functions test", function () {
  beforeEach("re-init document stub", function () {
    // so many stub... I'm not sure this tests have any meaning at all.
    reload("./documentStub");
  });

  describe("readFromClipboard test", function () {
    it("read plain text", function () {
      global.clipboard = "test content";
      const readValue = readFromClipboard();
      assert(global.clipboard === readValue);
    });

    it("read encoded text", function () {
      global.clipboard =
        "https://velog.io/@roeniss/%ED%81%AC%EB%A1%AC-%ED%99%95%EC%9E%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%95%98%EB%8B%A4";
      const readValue = readFromClipboard();
      assert(global.clipboard === readValue);
    });

    it("read empty text", function () {
      global.clipboard = "";
      const readValue = readFromClipboard();
      assert(global.clipboard === readValue);
    });
  });
  describe("copyToClipboard test", function () {
    it("copy plain text", function () {
      const copyValue = "test content";
      copyToClipboard(copyValue);
      assert(global.clipboard === copyValue);
    });

    it("copy encoded text", function () {
      const copyValue =
        "https://velog.io/@roeniss/%ED%81%AC%EB%A1%AC-%ED%99%95%EC%9E%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%95%98%EB%8B%A4";
      copyToClipboard(copyValue);
      assert(global.clipboard === copyValue);
    });

    it("copy empty text", function () {
      const copyValue = "";
      copyToClipboard(copyValue);
      assert(global.clipboard === copyValue);
    });
  });
});
