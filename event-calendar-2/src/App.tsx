import { EventCalendar } from './components/EventCalendar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground p-4"> {/* Basic app styling with padding */}
        <EventCalendar />
      </div>
    </QueryClientProvider>
  );
}

export default App;
