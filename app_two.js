 function Schedule(startDate, endDate) {
  this.startDate = startDate;
  this.endDate = endDate;
  this.startDateObj = new Date(this.startDate);
  this.endDateObj = new Date(this.endDate);

  // Prevent the user from adding a date
  if(!this.verifyDates()) {
    alert("the dates aren't valid");
    return false;
    
  }

  // DOM Information about the object. So that it could be deleted later.
  this.weekDayArray = [];
  this.deleteButton = [];
  this.htmlContainer = [];
  // WHen you reutrn and i know that you will return. I will not be there to help you.


  // Diff Date Object
  this.DateDiff = { 
    inDays: function(d1, d2) { 
      var t2 = d2.getTime(); 
      var t1 = d1.getTime(); 
      return parseInt((t2-t1)/(24*3600*1000)); 
    }, 
     
    inWeeks: function(d1, d2) { 
      var t2 = d2.getTime(); 
      var t1 = d1.getTime(); 
      return parseInt((t2-t1)/(24*3600*1000*7)); 
    },
  }


  this.htmlScheduleTemplate = `
    <div class="schedule__container">
      <div class="schedule__title">
        <h3> {{scheduleTitle}} </h3>
      </div>
      {{weeksTemplate}}
      <button> Delete Schedule </button>
    </div>
  `;



  // The weekday container goes into the weeksTemplate area
  this.htmlWeekTemplate = `
    <div class='week-wrap'> 
      <h3> Week {{weekNumber}} </h3>
        {{weekDayTemplate}}
    </div>
  `;



  this.htmlWeekDayTemplate = `
    <div class="weekday-container">
      <label for="{{day}}"> {{label}} </label>
      <input type="checkbox" value="1" class="dateBoxes">
    </div>
  `

  // If the dates are valid then show on the page 

  this.displaySchedule("schedule_wrap");

  this.getScheduleDomElement();
  


}

// ================= Schedule Object Functions =================



// Get day of week in words from date object
Schedule.prototype.getDateDay = function(dateObj) {
  weekday = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  day = dateObj.getDay();
  return weekday[day];
};




Schedule.prototype.setWeekDayArray = function() {

  // This array should contain week checkboxes as an array. Should store whether the items are checked or not.
  this.weekDayArray = ["some", "random", "elements"];
}




Schedule.prototype.verifyDates = function(startDateObj, endDateObj) {

  // This information should be obtained by the date Object
  // startDateString = document.getElementById("schedule_start_date").value;
  // endDateString = document.getElementById("schedule_end_date").value;

  if(!verifyDateFormat(startDateString)) {return false;}
  if(!verifyDateFormat(endDateString)) {return false;}

  if(!dateIsValid(startDateString)) {return false;}
  if(!dateIsValid(endDateString)) {return false;}

  if(!verifyDateOrder(startDateObj, endDateObj)) {return false;}

  return true;

}



// Check if the start Date Comes Befor the end Date
Schedule.prototype.verifyDateOrder = function(startDateObj, endDateObj) {

  startDateTime = startDateObj.getTime();
  endDateTime = endDateObj.getTime();

  if ( startDateTime > endDateTime ) {
    console.log("Error - The start date is NOT before the end date")
    return false;
  } 
  else {
    console.log("Success - The Start date is before the end date");
    return true;
  }

};




// Ensure that date format mm/dd/yyyy or yyyy-mm-dd is used
Schedule.prototype.verifyDateFormat = function(dateString) {

  match_found = false;

  dateFormats = [
    /^\d{1,2}\/\d{1,2}\/\d{4}$/i,
    /^\d{4}\-\d{1,2}\-\d{1,2}$/i
  ];

  // If the Day is greater than 31 then return false;
  splitDate = dateString.split("/");
  if (splitDate[1] > 31) {
    return false;
  }

  for (i in dateFormats) {
    if ( dateString.match(dateFormats[i]) ) {
        match_found = true;
    }
  }

    return match_found;

};




// Checks to see if the date is on the calendar.
Schedule.prototype.dateExists = function(first_argument) {
  // convert date string to string that can be parsed
  dateString = new Date(dateString).toLocaleDateString();

  var comp = dateString.split('/');

  var m = parseInt(comp[0], 10);
  var d = parseInt(comp[1], 10);
  var y = parseInt(comp[2], 10);
  var date = new Date(y,m-1,d);
  if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
      return true;
  } else {
      return false;
  }

};




//Meaning Curly Brace format, takes a string like "hello {{something}} and replaces it with "Hello World"
function cbFormat(string, obj) {

  for (var i in obj) {
    string = string.replace("{{"+ i +"}}", obj[i]);
  }
  return string; 
}


// Gets the DOM information for the schedule.
// Grabs the DOM information from the last schedule created.
Schedule.prototype.getScheduleDomElement = function() {

  // Get get the last schedule Element
    var lastSchedule = document.getElementsByClassName('schedule__container').length -1;
    scheduleHTML = document.getElementsByClassName('schedule__container')[lastSchedule];
    console.log(scheduleHTML);


    // Assign the DOM element to the object
}




Schedule.prototype.displaySchedule = function( htmlElement ) {

  // Make it so that the week number is shown above each week

  // Should be calculated automatically from within object

  var numberOfWeeks = this.calculateWeeks(),
  htmlContainer = document.getElementById(htmlElement),
  weekDays= ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  finalHtml = "",
  scheduleHtml = "",
  weekHtml = "",
  dayHtml = "";



  // Construct the HTML

  for ( var i in this.range(numberOfWeeks) ) {
    dayHtml = "";
    for ( var j in this.range(7) ) {
      dayHtml += cbFormat(this.htmlWeekDayTemplate, {"label" : weekDays[j]});
    }
    weekHtml += cbFormat(this.htmlWeekTemplate, {"weekDayTemplate" : dayHtml, "weekNumber" : parseInt(i) + 1});
  }

  scheduleHtml = cbFormat(this.htmlScheduleTemplate, {"scheduleTitle": this.startDate,"weeksTemplate" : weekHtml});

  finalHtml = scheduleHtml;

  // Display Onto the page
  htmlContainer.innerHTML += (finalHtml);

};




Schedule.prototype.calculateWeeks = function () {

  // Goal - Output the proper number of individual weeks the dates spans.
  // Example if the class starts on a saturday and ends on sunday of next week
  //it will count as the dates spanning across two different weeks.
  // Get the difference in days.
  // 
  dayDiff = this.DateDiff.inDays(this.startDateObj, this.endDateObj);
  weeks = 1;
  dayCounter = this.startDateObj.getDay();

  for (i = 0; i < dayDiff; i++) {
    if(dayCounter == 6) {
      weeks++;
      dayCounter = 0;
    } else {
      dayCounter++;
    }

  }
  return weeks;

}



Schedule.prototype.range = function(number) {
  arry = [];

  for (i = 0; i < number; i++) {
    arry.push(i);
  }

  return arry;

}




Schedule.prototype.getCheckboxValues = function(htmlClass) {

  // checkboxClass = "dateBoxes";
  checkboxClass = htmlClass;
  result = [];

  checkboxes = document.getElementsByClassName(checkboxClass);

  for (i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      result.push(checkboxes[i].value);
    } else {
      result.push("0");
    }
  }

  // uncomment to Return result as string
  // result = result.join(",");

  return result;

}




Schedule.prototype.createDateBinString = function(arr) {

  // If the array is not divisible by 7 then quit the program
  if(arr.length % 7 != 0) {
    alert("there is something wrong with the array");
    return false;
  }
  result = [];
  
  for (i = 0; i < ( arr.length / 7 ); i++) {
    weekStartIndex = i * 7;
    weekEndIndex = weekStartIndex + 7
    slicedarray = arr.slice(weekStartIndex, weekEndIndex);
    binValue = parseInt(slicedarray.join(""), 2);
    result.push(binValue);
  }

  //uncomment this to return an array instad of a string
  //return result;

  //Return a string instead of an array
  return result.join(",");

}




Schedule.prototype.disabledays = function(startDateObj, endDateObj) {

  checkboxClass = "dateBoxes";

  //This will soon reference ourCheckboxes
  checkboxes = document.getElementsByClassName(checkboxClass);

  startDayVal = startDateObj.getDay();
  endDayVal = endDateObj.getDay();


  // Disabled Start Dates
  for (i = 0; i < startDayVal; i++) {
    checkboxes[i].disabled = true;
  }

  // Disabled end dates
  endCounter = checkboxes.length - (7 - endDayVal);
  for (i = endCounter + 1; i < checkboxes.length; i++) {
    checkboxes[i].disabled = true;
  }

};




Schedule.prototype.dateIsValid = function(dateString) {

  // convert date string to string that can be parsed
  dateString = new Date(dateString).toLocaleDateString();

  var comp = dateString.split('/');

  var m = parseInt(comp[0], 10);
  var d = parseInt(comp[1], 10);
  var y = parseInt(comp[2], 10);
  var date = new Date(y,m-1,d);
  if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
      return true;
  } else {
      return false;
  }

}




Schedule.prototype.verifyDates = function() {

  // startDateString = document.getElementById("schedule_start_date").value;
  // endDateString = document.getElementById("schedule_end_date").value;

  if(!this.verifyDateFormat(this.startDate)) {return false;}
  if(!this.verifyDateFormat(this.endDate)) {return false;}

  if(!this.dateIsValid(this.startDate)) {return false;}
  if(!this.dateIsValid(this.endDate)) {return false;}

  if(!this.verifyDateOrder(this.startDateObj, this.endDateObj)) {return false;}

  return true;

};


/* ------------------------ Testing Area --------------------- */

// Find the schedule button
var scheduleButton = document.getElementById("addDate");


// Created empty array to store schedules in
scheduleArr = [];

scheduleButton.addEventListener('click',function( event ) {
  

  // Get the input box values
  startDate = document.getElementById('schedule_start_date').value;
  endDate = document.getElementById('schedule_end_date').value;


  // Push the user object to the users array
  scheduleArr.push( new Schedule( startDate, endDate  ) );

});


// When the remove button is clicke then call the remove funtion got the object you are removing.






//
// OK so each time the button is pressed we are going to create a new schedule object.
// Complete with a start date and end date. I also want to verify the dates before we can do anything.



