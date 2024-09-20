import React from 'react';
import './styles/styles.scss';

import parseICal from './lib/parseICal';

const DaysOfTheWeek = [{
  id : 1,
  fullName : "Monday",
  shortName : "Mon"
},{
  id : 2,
  fullName : "Tuesday",
  shortName : "Tues",
},{
  id : 3,
  fullName : "Wednesday",
  shortName : "Wed"
},{
  id : 4,
  fullName : "Thursday",
  shortName : "Thurs"
},{
  id : 5,
  fullName : "Friday",
  shortName : "Fri"
},{
  id : 6,
  fullName : "Saturday",
  shortName : "Sat"
},{
  id : 7,
  fullName : "Sunday",
  shortName : "Sun"
}]

const MonthsOfTheYear = [{
  id : 1,
  fullName : "January",
  shortName: "Jan",
  numberOfDays : 31 
},{
  id : 2,
  fullName : "February",
  shortName : "Feb",
  numberOfDays : 28
},{
  id : 3,
  fullName : "March",
  shortName : "Mar",
  numberOfDays : 31
},{
  id : 4,
  fullName : "April",
  shortName : "Apr",
  numberOfDays : 30
},{
  id : 5,
  fullName : "May",
  shortName : "May",
  numberOfDays : 31
},{
  id : 6,
  fullName : "June",
  shortName : "Jun",
  numberOfDays : 30
},{
  id : 7,
  fullName : "July",
  shortName : "Jul",
  numberOfDays : 31
},{
  id : 8,
  fullName : "August",
  shortName : "Aug",
  numberOfDays : 31
},{
  id : 9,
  fullName : "September",
  shortName : "Sept",
  numberOfDays : 30
},{
  id : 10,
  fullName : "October",
  shortName : "Oct",
  numberOfDays : 31
},{
  id : 11,
  fullName : "November",
  shortName : "Nov",
  numberOfDays : 30
},{
  id : 12,
  fullName : "December",
  shortName : "Dec",
  numberOfDays : 31
}]

const CalendarModel = {
  currentMonth : 9,
  currentDayOftheWeek: 4, // counting Monday as 1,
  weekStartsAt : 1,
  isLeapYear : false
}

  // Example usage:
  // const icalString = `
  // BEGIN:VCALENDAR
  // VERSION:2.0
  // PRODID:-//Example.com//NONSGML iCalendar//EN
  // BEGIN:VEVENT
  // UID:1234567890
  // DTSTAMP:20230420T100000Z
  // DTSTART:20230421T140000Z
  // DTEND:20230421T150000Z
  // SUMMARY:Meeting
  // LOCATION:Conference Room
  // END:VEVENT
  // END:VCALENDAR
  // `;
  
  // // Parse the ICAL string
  // const events = parseICal(icalString);
  
  // // Print the parsed events

  const uploadICalFile = async (file) => {
     
    // Create FormData object
    const formData = new FormData();

    // Add the iCal file to the FormData array
    formData.append("file", file); // Note the "files[]" name, make sure your API expects this

    // Send the FormData to the API
    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: "POST",
        body: formData,
      });

      // Check if the request was successful
      if (response.ok) {
        console.log("iCal file uploaded successfully!");
        // You can handle the API response here (e.g., display a success message)
      } else {
        console.error("Failed to upload iCal file.");
        // You can handle the API error here (e.g., display an error message)
      }
    } catch (error) {
      console.error("Error uploading iCal file:", error);
      // Handle any potential errors during the upload process
    }

  }

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      events : []
    }
  }

  

  handleFileUpload = (evt) => {
		const file = evt.target.files[0];
		const reader = new FileReader();

		reader.onload = async (evt) => {
			const results = parseICal(evt.target.result);
      // console.log(results);
      // Upload data to API
      const fileUpload =  await uploadICalFile(file);
			this.setState({
				events : results,
			})
		}
		reader.readAsText(file);

	}

     // console.log(events);


  render(){
    return (
      <div className="App">
        <h2>Timmay</h2>
        <form>
						<input 
							type="file"
							onChange={this.handleFileUpload}
              name="file" 
						/>
						<button type="button">Import Calendar</button>
					</form> 
        <div className="Calendar">
          <h3>Month</h3>
          <ol className='CalendarDays'>
            <li className='CalendarDay'></li>
          </ol>
        </div>
      </div>
    );
  }
}

export default App;
