import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useFetchBookings() {
  const [searchParams] = useSearchParams();

  //FILTER

  const filterValue = searchParams.get('status');

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };
  // { field: 'totalPrice', value: 5000, method: 'gte' };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    // Man kann das Array als das Dependency-Array von useQuery betrachten, d.h. wenn sich ein Wert in diesem
    // Array ändert, so wird die Query-Funktion getBookings erneut ausgeführt und die Daten vom Server gefeched
    queryKey: ['bookings', filter],
    queryFn: () => getBookings(filter),
  });
  return { isLoading, bookings, error };
}
