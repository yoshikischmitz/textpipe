browser.contextMenus.create({
  id: "sort",
  title: "sort",
  contexts: ["selection"]
});

browser.contextMenus.create({
  id: "grep hello",
  title: "grep",
  contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "sort") {
    const { id } = tab;
    console.log("piping", info.selectionText);
    browser.runtime
      .sendNativeMessage("piper", {
        command: "sort",
        content: info.selectionText
      })
      .then(o => {
        browser.tabs.sendMessage(id, o.stdout);
      });
  }
});
