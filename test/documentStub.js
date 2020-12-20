class Document {
  body = undefined;
  selectedElem = undefined;
  isElemFocused = false;

  createElement(name) {
    return new Elem(name);
  }
  select(elem) {
    this.selectedElem = elem;
  }
  focus() {
    if (this.selectedElem) this.isElemFocused = true;
  }
  blur() {
    this.isElemFocused = false;
  }

  execCommand(cmd) {
    if (cmd === "copy") {
      if (this.selectedElem) global.clipboard = this.selectedElem.textContent;
      return true;
    } else if (cmd === "paste") {
      if (this.selectedElem && this.isElemFocused) this.selectedElem.value = global.clipboard;
      return true;
    } else {
      throw new Error("Not supported command");
    }
  }
}
class Body {
  children = [];
  appendChild(elem) {
    this.children.push(elem);
  }
  removeChild(elem) {
    if (this.children.indexOf(elem) !== -1) this.children.splice(this.children.indexOf(elem), 1);
  }
}

class Elem {
  name = null;
  textContent = null;

  select() {
    document.select(this);
  }
  focus() {
    document.focus(this);
  }
  blur() {
    document.blur(this);
  }
}

document = new Document();
document.body = new Body();
global.document = document;
global.clipboard = null;

module.exports = {};
