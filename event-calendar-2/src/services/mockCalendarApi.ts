// event-calendar-2/src/services/mockCalendarApi.ts

/**
 * Represents a calendar event.
 */
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

// Helper to get current year and month
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth(); // 0-indexed

/**
 * An array of sample calendar events.
 */
export const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    start: new Date(currentYear, currentMonth, 10, 10, 0, 0), // 10th of current month
    end: new Date(currentYear, currentMonth, 10, 11, 0, 0),
    description: 'Weekly sync-up',
  },
  {
    id: '2',
    title: 'Project Deadline',
    start: new Date(currentYear, currentMonth, 15, 17, 0, 0), // 15th of current month
    end: new Date(currentYear, currentMonth, 15, 17, 30, 0),
  },
  {
    id: '3',
    title: 'Dentist Appointment',
    // Example: Event in the previous month (if current month is January, goes to December of last year)
    start: new Date(currentYear, currentMonth - 1, 20, 14, 0, 0), 
    end: new Date(currentYear, currentMonth - 1, 20, 15, 0, 0),
    description: 'Check-up',
  },
  {
    id: '4',
    title: 'Conference Day 1',
    // Example: Event in the next month
    start: new Date(currentYear, currentMonth + 1, 5, 9, 0, 0),
    end: new Date(currentYear, currentMonth + 1, 5, 17, 0, 0),
  },
  {
    id: '5',
    title: 'Lunch with Client',
    start: new Date(currentYear, currentMonth, today.getDate() + 1, 12, 30, 0), // Tomorrow
    end: new Date(currentYear, currentMonth, today.getDate() + 1, 13, 30, 0),
  },
  {
    id: '6',
    title: 'Quick Task Today',
    start: new Date(currentYear, currentMonth, today.getDate(), 16, 0, 0), // Today, if not past 4 PM
    end: new Date(currentYear, currentMonth, today.getDate(), 16, 30, 0),
  },
];

/**
 * Fetches mock calendar events.
 * Simulates a network delay.
 * @param dateRange Optional date range to filter events. An event is included if its start date is within the range.
 * @returns A Promise resolving to an array of CalendarEvent objects.
 */
export const fetchMockEvents = (dateRange?: { start: Date; end: Date }): Promise<CalendarEvent[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (dateRange) {
        const filteredEvents = mockEvents.filter(event => 
          event.start >= dateRange.start && event.start <= dateRange.end
        );
        resolve(filteredEvents);
      } else {
        resolve(mockEvents);
      }
    }, 500);
  });
};
