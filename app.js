// ------------ Mission ----------------

//Enter a start date and an end date. Assume the format is mm/dd/yyyy

// Output information in weeks

// Get the start date and end date

// Somewhere in here make sure that the date format is correct

// --------------------------------------

// Diff Date Object
var DateDiff = { 
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



function getDateDay(dateObj) {
	weekday = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
	day = dateObj.getDay();
 	return weekday[day];
}



//Veridy Date Order
// Takes 2 date objects as parameters
function verifyDateOrder( startDateObj, endDateObj ) {
  startDateTime = startDateObj.getTime();
  endDateTime = endDateObj.getTime();

  if ( startDateTime > endDateTime ) {
    return false;
  } 
  else {
    return true;
  }
}



// Takes String as arguement
// Ensure that date format mm/dd/yyyy or yyyy-mm-dd is used
function verifyDateFormat(dateString) {

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
}

// Code provided from the internet (tested)
// Checks to see if the date in mm/dd/yyyy format is an existing date
function dateIsValid(dateString) {

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

// Function that does all checks on dates
function verifyDates(startDateObj, endDateObj) {

  startDateString = document.getElementById("schedule_start_date").value;
  endDateString = document.getElementById("schedule_end_date").value;

  if(!verifyDateFormat(startDateString)) {return false;}
  if(!verifyDateFormat(endDateString)) {return false;}

  if(!dateIsValid(startDateString)) {return false;}
  if(!dateIsValid(endDateString)) {return false;}

  if(!verifyDateOrder(startDateObj, endDateObj)) {return false;}

  return true;

  // Test

}



// Takes the number of weeks and outputs them to a specifed htmlElement ID on the page.
function displayWeek(numberOfWeeks, htmlElement) {

  // Make it so that the week number is shown above each week

  //Clear the contents of the htmlElement
  document.getElementById(htmlElement).innerHTML = "";

	weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
	final_text = "";


  template = '<div class="weekday-container {{disabled?}}">';
  template += '<label for="{{day}}"> {{label}} </label>';
  template += '<input type="checkbox" value="{{day}}" id="{{day}}" class="dateBoxes" {{disabled?}}>';
  template += '</div>';
  
  
  for (i in weekdays) {

    // Add attributes
   	abbrday = weekdays[i].slice(0,3).toLowerCase();
		final_text += template.replace(/\{\{day\}\}/g, abbrday );
    

   	// Add Label Text
   	final_text = final_text.replace(/\{\{label\}\}/g, weekdays[i] );

    //make in put disabled
    final_text = final_text.replace(/\{\{disabled\?\}\}/g, "");

	}
  
  // Print the number of weeks onto the page
  for (i = 0; i < numberOfWeeks; i++) {

  	document.getElementById(htmlElement).innerHTML += "<div class='week-wrap'> <h3> Week " + (i + 1) + "</h3>" + final_text + "</div>";
    
    // Stop to prevent too many weeks from being added.
    if ( i > 10 ) {
    	alert("too many weeks");
    	return final_text;
    }
  }
  return final_text;
}



function calculateWeeks(startDate, endDate, dateDiff) {

	// Goal - Output the proper number of weeks based on the time period entered.
  // Get the difference in dats
  dayDiff = dateDiff.inDays(startDate, endDate);
  weeks = 1;
  dayCounter = startDate.getDay();

  for (i = 0; i < dayDiff; i++) {
    if(dayCounter == 6) {
      weeks++;
      dayCounter = 0;
    } else {
      dayCounter++;
    }

  }

  return weeks

}



function getCheckboxValues() {

  checkboxClass = "dateBoxes";
  result = [];

  checkboxes = document.getElementsByClassName(checkboxClass);

  for (i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      result.push(checkboxes[i].value);
    } else {
      result.push("");
    }
  }

  result = result.join(",");

  return result;

}


function something() {

}

function trackDays() {

}

// Disable the weekday checkboxes depending on which day the date starts on
function disabledays(startDateObj, endDateObj) {


  checkboxClass = "dateBoxes";

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


  // for( i = 0; i endDayVal i++; ) {
  //   checkboxes[i].disabled = true;
  // }

}


/* --------------- Testing area ------------------- */

document.getElementById("get_days_button").addEventListener("click", function() {

  weekText = getCheckboxValues();

  document.getElementById("theweekresults").innerHTML = weekText;

  thedateboxes = document.getElementsByClassName("dateBoxes");


});






// -------------------- Main Action --------------------/



// When the button is clicked create new dates and call the function
document.getElementById("submit-dates").addEventListener("click", function() {

  entered_dates = {
    "start_date" : "",
    "end_date" : ""
  }


  // Get start and end date inputs
	entered_dates.start_date = document.getElementById("schedule_start_date").value;
  entered_dates.end_date = document.getElementById("schedule_end_date").value;



  // Create Start and End Date Objects
  startDateObj = new Date(entered_dates.start_date);
  endDateObj = new Date(entered_dates.end_date);



  // Verify the date order and verify the format is correct
  // If the dates are valid and in the right order then do it
  if(verifyDates(startDateObj, endDateObj)) {

    number_of_weeks = calculateWeeks(startDateObj, endDateObj, DateDiff);
    displayWeek(number_of_weeks, 'weeks-container');
    disabledays(startDateObj, endDateObj);

  } 
  else {
    alert("Dates are invalid");
  }
  

  
});

function serializeArray(form) {

      var field, l, s = [];
      if (typeof form == 'object' && form.nodeName == "FORM") {
          var len = form.elements.length;
          for (i=0; i<len; i++) {
              field = form.elements[i];
              if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
                  if (field.type == 'select-multiple') {
                      l = form.elements[i].options.length; 
                      for (j=0; j<l; j++) {
                          if(field.options[j].selected)
                              s[s.length] = { name: field.name, value: field.options[j].value };
                      }
                  } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                      s[s.length] = { name: field.name, value: field.value };
                  }
              }
          }
      }
      return s;

}



// Prevent the form from submitting
document.getElementById("my-form").addEventListener('submit', function(event) {

  console.log("hello world");
  event.preventDefault();
  alert("Default Prevented");
  
});