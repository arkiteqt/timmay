// Sample event data with start and end times
// Mocking a get request to API 
// TODO : Update to fetch from API or use Local Data based on configurations passed as args
const getEvents = () => {
    return [
    {
      id: 1,
      title: "Multi-day Conference",
      start: new Date(2024, 8, 20, 10, 0), // Sept 20, 2024, 10:00 AM
      end: new Date(2024, 8, 22, 17, 0),   // Sept 22, 2024, 5:00 PM
      description: "A multi-day conference covering various topics.",
    },
    {
      id: 2,
      title: "Meeting with Client",
      start: new Date(2024, 8, 21, 13, 30), // Sept 21, 2024, 1:30 PM
      end: new Date(2024, 8, 21, 14, 30),   // Sept 21, 2024, 2:30 PM
      description: "Project discussion with client.",
    },
    {
      id: 3,
      title: "Workshop",
      start: new Date(2024, 8, 22, 9, 0),  // Sept 22, 2024, 9:00 AM
      end: new Date(2024, 8, 22, 12, 0),   // Sept 22, 2024, 12:00 PM
      description: "Technical workshop on React.",
    },
  ];
}
export default getEvents;  