const time = document.getElementById("currentDay");
const infoTextAreas = document.getElementsByClassName("information");
const saveButtons = document.getElementsByClassName("saveBtn");
const hour = parseInt(moment().format("H"));

//sets current time
const myTimer = () => {
  const date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  time.innerHTML = date;
};

//changes colors based off military time
const timeCheck = () => {
  for(textArea of infoTextAreas){
     parseInt(textArea.dataset.hour) < hour ? textArea.classList.add('past') : 
      parseInt(textArea.dataset.hour) > hour ? textArea.classList.add('future') :
      textArea.classList.add('present');    
  };
};

//save function to change local storage
const saveData = hour => {
  localStorage.setItem(hour, document.querySelector(`[data-hour="${hour}"]`).value);
};

//recall saved data upon load
const checkStorage = () => {
  for(textArea of infoTextAreas) {
    textArea.innerHTML = localStorage.getItem(textArea.dataset.hour) ?? '';
  };
};

//converts time from military time to standard time
const convertTime = militaryTime => {
  let standardTime = militaryTime - 12;
  return standardTime < 0 ? `${militaryTime} AM` :
    standardTime > 0 ? `${standardTime} PM` :
    `${militaryTime} PM`;
};

//builds the sections of the planner programatically
const buildSections = () => {
  let allSections = '';
  for(let i = 9; i < 18; i++){
    allSections += `<section class="row time-block">` +
                   `<div class="col-md-1 hour">${convertTime(i)}</div>` +
                   `<textarea class="col-md-10 information" data-hour="${i}"></textarea>` +
                   `<button onclick="saveData(${i})" class="btn saveBtn col-md-1"><i class="fa fa-save" style="font-size: 36px;"></i></button>` +
                   `</section>`
  }
  document.getElementById("container").innerHTML += allSections
};

setInterval(myTimer, 1000);
buildSections();
checkStorage();
timeCheck();
