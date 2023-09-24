import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useFetchBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };
  // { field: 'totalPrice', value: 5000, method: 'gte' };

  // SORT
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // PAGINATION

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    // Man kann das Array als das Dependency-Array von useQuery betrachten, d.h. wenn sich ein Wert in diesem
    // Array ändert, so wird die Query-Funktion getBookings erneut ausgeführt und die Daten vom Server gefeched
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });
  return { isLoading, bookings, error, count };
}
