import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useFetchBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

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
  // page ist die aktuelle Seite als Anzahl, z.B. 1 --> 1. Seite, 2 --> 2. Seite usw.

  // QUERY
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

  // PRE-FETCHING
  // Prefetching funktioniert genauso wie der useQuery-Hook:
  // man benötigt einen queryKey als Dependency-Array und eine queryFn
  // das Prefetching wird mit dem useQueryClient mit der prefetchQuery-Methode durchgeführt
  // in diesem Beispiel werden immer zwei Queries durchgeführt:
  // - ein reguläres Query mit useQuery
  // - ein weiteres Query mit queryClient, der entweder die Daten der nächsten Seite (1. if-Statement) oder
  // die Daten der vorherigen Seite (2. if-Statement) abruft
  // das Resultat ist, dass die für die nächste bzw. vorherige Seite zum Anzeigen benötigten Daten schon zur
  // Verfügung stehen, bevor sie benötigt werden: ein Loading-Spinner erscheint nicht mehr, die User-Experience
  // wird damit verbessert, da Daten immer sofort auf dem Bildschirm erscheinen
  // grundsätzlich kann man alle Daten prefetchen (ganze Seiten, vorgefilterte und vorsortiere Daten etc.),
  // aber die Pagination ist hierfür wohl am besten geeignet

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, error, count };
}
