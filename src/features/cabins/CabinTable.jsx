/* eslint-disable react/prop-types */
import { useFetchCabins } from './useFetchCabins.js';

import Spinner from '../../ui/Spinner.jsx';
import CabinRow from './CabinRow.jsx';
import Table from '../../ui/Table.jsx';
import Menus from '../../ui/Menus.jsx';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const { isLoading, cabins } = useFetchCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // 1) FILTER
  const filterValue = searchParams.get('discount') || 'all';
  // ruft die jeweiligen searchParams von "discount" in der URL ab; wenn nicht vorhanden, d.h. null, dann wird "all" gesetzt; das passiert beim Mounting der Komponenten, wenn noch kein Filter-Button gedrückt wurde

  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.disount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.disount > 0);

  // 2) SORT
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';

  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  return (
    <Menus>
      <Table colums="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
