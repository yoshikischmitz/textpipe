function replaceSelectedText(replacementText) {
  var sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(replacementText));
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    range.text = replacementText;
  }
}

browser.runtime.onMessage.addListener(m => {
  replaceSelectedText(m);
  navigator.clipboard.readText().then(text => {
    const clipboardContents = text;
    navigator.clipboard.writeText(m).then(() => {
      document.execCommand("paste");
      navigator.clipboard.writeText(clipboardContents, () => {
        console.log("done!");
      });
    });
  });
});
