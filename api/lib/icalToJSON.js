const ical = require('ical');
const fs = require('fs');


// a script to convert .ical file data to JSON or .csv  
async function icalToJSON(uploadedFile) {
  try {
    const data = fs.readFileSync(uploadedFile.path, 'utf8');
    const calendar = ical.parseICS(data);

    const events = [];
    for (const component in calendar) {
      if (calendar[component].type === 'VEVENT') {
        const event = {
          title: calendar[component].summary,
          start: calendar[component].start.toISOString(),
          end: calendar[component].end.toISOString(),
          location: calendar[component].location,
          description: calendar[component].description,
        };
        events.push(event);
      }
    }

    return events;
    const csvData = events.map(event => Object.values(event)).join('\n');

    // fs.writeFileSync(csvFile, csvData);
    // console.log(`iCal file "${icalFile}" converted to CSV file "${csvFile}"`);
  } catch (error) {
    console.error('Error converting iCal to CSV:', error);
  }
}

// const icalFile = './data/ical/personal.ics';
// const csvFile = './data/converted/personal.csv';
module.exports = icalToJSON;