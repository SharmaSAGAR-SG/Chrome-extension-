chrome.storage.local.get(null, (data) => {
  const list = document.getElementById("list");
  for (let site in data) {
    let li = document.createElement("li");
    li.textContent = `${site} : ${(data[site] / 1000).toFixed(1)} sec`;
    list.appendChild(li);
  }
});
