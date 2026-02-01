let currentTab = "";
let startTime = Date.now();

chrome.tabs.onActivated.addListener(async () => {
  await updateTime();
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    await updateTime();
  }
});

async function updateTime() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.url) return;

  let url = new URL(tab.url).hostname;
  let now = Date.now();
  let timeSpent = now - startTime;

  if (currentTab) {
    chrome.storage.local.get([currentTab], (result) => {
      let total = result[currentTab] || 0;
      chrome.storage.local.set({ [currentTab]: total + timeSpent });
    });
  }

  currentTab = url;
  startTime = now;
}
