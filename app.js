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
    /\d{1,2}\/\d{1,2}\/\d{4}/i,
    /\d{4}\-\d{1,2}\-\d{1,2}/i
  ];

  for (i in dateFormats) {

    if ( dateString.match(dateFormats[i]) ) {

        match_found = true;
    }
    return match_found;
  }
}

function dateIsValid(dateString) {
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

	weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wedesday', 'Thursday', 'Friday', 'Saturday'];
  
	final_text = "";


  template = '<div class="weekday-container">';
  template += '<label for="{{day}}"> {{label}} </label>';
  template += '<input type="checkbox" value="" id="{{day}}"; class="dateBoxes">';
  
  
  for (i in weekdays) {

    // Add attributes
   	abbrday = weekdays[i].slice(0,3).toLowerCase();
		final_text += template.replace(/\{\{day\}\}/g, abbrday );
    

   	// Add Label Text
   	final_text = final_text.replace(/\{\{label\}\}/g, weekdays[i] );

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

  } else {
    alert("we wren't able to verify the dates");
  }
  

  
});
