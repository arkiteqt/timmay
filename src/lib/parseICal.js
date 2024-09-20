// Function to parse an ICAL file
const parseICal = (icalString) => {
    // Split the ICAL string into lines
    const lines = icalString.split('\n');
  
    // Initialize an empty object to store the calendar events
    const calendarEvents = [];
  
    // Loop through each line in the ICAL string
    let currentEvent = {};
    for (const line of lines) {
      // Trim whitespace from the line
      const trimmedLine = line.trim();
  
      // Check if the line is a start of a new event
      if (trimmedLine.startsWith('BEGIN:VEVENT')) {
        currentEvent = {};
      } else if (trimmedLine.startsWith('END:VEVENT')) {
        // Add the parsed event to the calendarEvents array
        calendarEvents.push(currentEvent);
      } else {
        // Extract key-value pairs from the line
        const [key, value] = trimmedLine.split(':');
  
        // Store the value in the current event object
        currentEvent[key.toLowerCase()] = value;
      }
    }
  
    // Return the array of parsed calendar events
    return calendarEvents;
  }

  export default parseICal;
  
