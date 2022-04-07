const time = document.getElementById("currentDay");
const infoTextAreas = document.getElementsByClassName("information");
const saveButtons = document.getElementsByClassName("saveBtn");
const hour = moment().format("H");

//sets current time
const myTimer = () => {
  const date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  time.innerHTML = date;
};

//changes colors based off military time
const timeCheck = () => {
  for(textArea of infoTextAreas){
    if (textArea.dataset.hour < hour){
      textArea.classList.add('past'); 
    };
    if (textArea.dataset.hour == hour) {
      textArea.classList.add('present');
    };
    if (textArea.dataset.hour > hour) {
      textArea.classList.add('future');
    };
  };
};

//save button to change local storage
$(".saveBtn").on("click", () => {
  let time = $(this).siblings(".information").attr("data-hour");
  let data = $(this).siblings(".information").val();

  localStorage.setItem(time, data);
});


//recall saved data upon load
const checkStorage = () => {
  for(textArea of infoTextAreas){
    data = localStorage.getItem(textArea.dataset.hour);
    if (data !== null) {
      textArea.innerHTML = data;
    };
  };
};

//builds the sections of the planner programatically
const buildSections = () => {
  let allSections = '';
  for(let i = 9; i < 18; i++){
    allSections += `<section id="hour-nine" class="row time-block">` +
                   `<div class="col-md-1 hour">${i === 9 ? '0' + i : i}:00</div>` +
                   `<textarea class="col-md-10 information" data-hour="${i === 9 ? '0' + i : i}"></textarea>` +
                   `<button class="btn saveBtn col-md-1"><i class="fa fa-save" style="font-size: 36px;"></i></button>` +
                   `</section>`
  }
  document.getElementById("container").innerHTML += allSections
};

setInterval(myTimer, 1000);
buildSections();
checkStorage();
timeCheck();
