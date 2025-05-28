import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar } from '@/components/ui/calendar'; // Shadcn UI Calendar
import { Button } from '@/components/ui/button';     // Shadcn UI Button
import { fetchMockEvents, CalendarEvent } from '../services/mockCalendarApi';
import { addMonths, subMonths, startOfMonth, endOfMonth, isSameDay, format, parseISO } from 'date-fns';

export function EventCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // Fetch events
  // The queryKey includes the month (e.g., "2023-10") to refetch when the month changes.
  // queryFn fetches all events; filtering is done client-side for this iteration.
  const { data: events, isLoading, error } = useQuery<CalendarEvent[]>({
    queryKey: ['mockEvents', currentMonth.toISOString().slice(0, 7)],
    queryFn: () => fetchMockEvents().then(fetchedEvents => 
      // Ensure event start/end times are Date objects
      fetchedEvents.map(event => ({
        ...event,
        start: typeof event.start === 'string' ? parseISO(event.start) : event.start,
        end: typeof event.end === 'string' ? parseISO(event.end) : event.end,
      }))
    ),
  });

  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
    setSelectedDate(undefined); // Clear selected date when month changes
  };

  const goToPreviousMonth = () => {
    handleMonthChange(subMonths(currentMonth, 1));
  };

  const goToNextMonth = () => {
    handleMonthChange(addMonths(currentMonth, 1));
  };

  // Filter events for display based on selectedDate or currentMonth
  const eventsForDisplay = events?.filter(event => {
    if (selectedDate) {
      return isSameDay(event.start, selectedDate);
    }
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    return event.start >= monthStart && event.start <= monthEnd;
  });

  // Prepare event indicators for the calendar
  const daysWithEvents = events?.map(e => e.start) || [];

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={goToPreviousMonth} variant="outline">Previous Month</Button>
        <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <Button onClick={goToNextMonth} variant="outline">Next Month</Button>
      </div>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          setSelectedDate(date);
        }}
        month={currentMonth}
        onMonthChange={handleMonthChange}
        className="rounded-md border shadow"
        modifiers={{ hasEvents: daysWithEvents }}
        modifiersClassNames={{ hasEvents: 'day-with-event' }}
        components={{
          // Example of how you might further customize Day if needed,
          // but for a simple dot, modifiers + CSS is often enough.
          // Day: ({ day, ...props }) => {
          //   const hasEventOnDay = daysWithEvents.some(eventDate => isSameDay(eventDate, day));
          //   return (
          //     <div {...props.containerProps} className={`${props.containerProps.className} relative`}>
          //       {props.children}
          //       {hasEventOnDay && <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-sky-500 rounded-full"></div>}
          //     </div>
          //   );
          // }
        }}
      />

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">
          {selectedDate ? `Events for ${format(selectedDate, 'PPP')}` : `Events in ${format(currentMonth, 'MMMM')}`}
        </h3>
        {isLoading && <p>Loading events...</p>}
        {error && <p>Error loading events: {error.message}</p>}
        {!isLoading && !error && eventsForDisplay && eventsForDisplay.length > 0 ? (
          <ul className="space-y-2">
            {eventsForDisplay.map(event => (
              <li key={event.id} className="p-3 border rounded-md shadow-sm hover:shadow-md transition-shadow">
                <strong className="text-blue-600">{event.title}</strong>
                <p className="text-sm text-gray-700">
                  {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                </p>
                {event.description && <p className="text-xs text-gray-500 mt-1">{event.description}</p>}
              </li>
            ))}
          </ul>
        ) : (
          !isLoading && !error && <p>No events to display.</p>
        )}
      </div>
    </div>
  );
}
