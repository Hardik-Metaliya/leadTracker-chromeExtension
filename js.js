let myLeads = [];
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
// variables
const inputEL = document.querySelector("#input-el");
const saveBtnEL = document.querySelector("#input-btn");
const ulEl = document.querySelector("#ul-el");
const clearEL = document.querySelector("#clear-btn");
const tabBtn = document.querySelector("#tab-btn");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads();
}
function renderLeads() {
  let leadItem = "";
  for (let i = 0; i < myLeads.length; i++) {
    leadItem += `<li> <a target='_blank' href='${myLeads[i]}'> ${myLeads[i]}</a> </li>`;
  }
  ulEl.innerHTML = leadItem;
  inputEL.value = "";
}
function clear() {
  localStorage.clear();
  myLeads = [];
  renderLeads();
}

saveBtnEL.addEventListener("click", function () {
  if (inputEL.value !== "");
  myLeads.push(inputEL.value);
  // console.log(myLeads);
  renderLeads();
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
});
clearEL.addEventListener("click", clear);

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    console.log("click");
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads();
  });
});
