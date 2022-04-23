var userDoc = sessionStorage.getItem("document");
var userName = sessionStorage.getItem("name");
var eventName = document.querySelector("input[name='input-text']"); // grabs the input from HTML
var enterBtn = document.querySelector("#enter-button"); // grabs the info from button
var ul = document.querySelector("ul"); // grabs the event lists 
var li = document.createElement("li");
var displayID = document.querySelector("#id-display"); // variable for displaying users ID
var userDocument = firebase.firestore().collection("users").doc(userDoc); // variable for documents in users collection
var inputMonths, inputDays, inputYears, inputHours, inputMinutes, listEvents; // initializing variables for user inputs

// adding event name
function addEvent() {
    if(eventName.value != "") { // if there are no events
        li.addEventListener("click", function(){
            li.remove(); // removes the event list when its clicked
        });
        li.innerHTML = eventName.value; // assigns
        ul.appendChild(li);  // adds the event at the end of the list
    } 
}

// using enter BUTTON to add the event name
enterBtn.addEventListener("click", addEvent);
document.addEventListener("keypress", function(event){
    if (event.key == "Enter"){
        addEvent();
    }
});

// using click to remove the event list(s)
userDocument.get().then((doc) => {
    if(doc.data().eventName.length != ""){ // if data in events has nothing
        (doc.data().eventName).forEach(function(eventName) { // for each events
            li.addEventListener("click", function(){ // when the event name is clicked
                li.remove(); // remove the event
            });
            li.innerHTML = eventName;
            ul.appendChild(li); // add the event at the end of the list
        });
    }
});

// SAVING EVENT DATE --------------------------------------

// assigns the IDs with the current saved data from the firestore
userDocument.get().then(function(doc){
    document.querySelector("#month").value = doc.data().countdownMonths;
    document.querySelector("#day").value = doc.data().countdownDays;
    document.querySelector("#year").value = doc.data().countdownYears;
    document.querySelector("#hour").value = doc.data().countdownHours;
    document.querySelector("#min").value = doc.data().countdownMinutes;
});

// assign the initialized variables with the ID
var saveButton = document.querySelector("#save");
saveButton.addEventListener("click", function(){
    inputMonths = document.querySelector("#month"); 
    inputDays = document.querySelector("#day");
    inputYears = document.querySelector("#year");
    inputHours = document.querySelector("#hour");
    inputMinutes = document.querySelector("#min");
    listEvents = document.querySelectorAll("li");
    console.log(inputMonths.value + " " + inputDays.value + " " + inputYears.value + " " + inputHours.value + " " + inputMinutes.value);
   
    var userEvent = []; // array for saving the event name
    listEvents.forEach(function(li){
        userEvent.push(li.innerHTML);
    });
    
    var listDays = document.querySelectorAll("#timer_days");
    var userCountdownDays = []; // array to save for days
    listDays.forEach(function(month){
        userCountdownDays.push(month.innerHTML);
    });
    
    var listHours = document.querySelectorAll("#timer_hours");
    var userCountdownHours = []; // array to save for hours
    listHours.forEach(function(timer_hours){
        userCountdownHours.push(timer_hours.innerHTML);
    });
    
    var listMinutes = document.querySelectorAll("#timer_minutes");
    var userCountdownMinutes = []; // array to save for minutes
    listMinutes.forEach(function(timer_minutes){
        userCountdownMinutes.push(timer_minutes.innerHTML);
    });
    
    var listSeconds = document.querySelectorAll("#timer_seconds");
    var userCountdownSeconds = []; // array to save for seconds
    listSeconds.forEach(function(timer_seconds){
        userCountdownSeconds.push(timer_seconds.innerHTML);
    });
    
    (userDocument).set({
        eventName: userEvent, // sets the user event names to the firestore
        countdownDays: inputDays.value, // sets the user inputed days to the firestore
        countdownMonths: inputMonths.value, // sets the user inputed months to the firestore
        countdownMinutes: inputMinutes.value, // sets the user inputed minutes to the firestore
        countdownHours: inputHours.value, // sets the user inputed hours to the firestore
        countdownYears: inputYears.value, // sets the user inputed years to the firestore
    }, {merge: true}); // takes all the info and sends to firestore
});

// CLOCK -----------------------------------------------
var clock = setInterval(myClock, 100);
  function myClock() {
      var date = new Date();
      var i = date.toLocaleTimeString('en-GB'); // gets the current time
      document.getElementById("clock").innerHTML = i;
}

// showing the user their documentID and name
displayID.innerHTML = userDocument.id; // SHOWS USER DOCUMENT

var myString = "Welcome " + userName; // WELCOMES THE USER
var myArray = myString.split("");
var loopTimer;

function looper() {
  if(myArray.length > 0) {
    document.getElementById("typingText").innerHTML += myArray.shift();
  }else {
    clearTimeout(loopTimer);
  }
  loopTimer = setTimeout('looper()', 100);
}
looper();

var loadPage = setInterval(() => { // whenever page loads, it will click run the saved countdown
    countdownFunction(); // run the countdown 
    clearInterval(loadPage);
}, 500); // per 500 second

// ----------------------COUNTDOWN SCRIPT---------------------------------------------------
var countdown; // initializing the countdown

function countdownFunction() {
     clearInterval(countdown);
     var idMonth = document.getElementById("month").value; // collects the user input of month
     var idDay = document.getElementById("day").value; // collects the user input of day
     var idYear = document.getElementById("year").value; // collects the user input of year
     var idHour = document.getElementById("hour").value; // collects the user input of hour
     var idMin = document.getElementById("min").value; // collects the user input of minutes
     var combineTime = idMonth + "/" + idDay + "/" + idYear + " " + idHour + ":" + idMin;
     var end = new Date(combineTime); // arrange values in tate time format
     var second = 1000; // total millisecond in one second
     var minute = second * 60; // total seconds in one minute
     var hour = minute * 60; // total min in one hour
     var day = hour * 24; // total hour in one day
     
     function showTimer() {
          var now = new Date(); // get the current date
          var remain = end - now; // get the difference between current and entered date time
      
         if(remain < 0) {   // when the timer reaches 0, a page pops up
           clearInterval(countdown);
           document.getElementById("timer_value").innerHTML = window.open('https://acegif.com/wp-content/gif/confetti-4.gif','name','width=10000,height=10000');
           return; // a gif image opens when the countdown hits 0
         }
      
      // does all the math and gets the current time left
          var days = Math.floor(remain / day); // get remaining days
          var hours = Math.floor((remain % day) / hour); // get remaining hours
          var minutes = Math.floor((remain % hour) / minute); // get remaining minutes
          var seconds = Math.floor((remain % minute) / second); // get remaining seconds
    
    // displaying the data on the HTML
          document.getElementById("timer_days").innerHTML = days; // displays days
          document.getElementById("timer_hours").innerHTML = hours; // displays hours
          document.getElementById("timer_minutes").innerHTML = minutes; // displays minutes
          document.getElementById("timer_seconds").innerHTML = seconds; // displays seconds
     }
     countdown = setInterval(showTimer, 1); // display timer In Every 1 Seconds
}