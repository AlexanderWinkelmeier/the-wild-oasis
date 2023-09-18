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

  const filterValue = searchParams.get('discount') || 'all';
  // ruft die jeweiligen searchParams von "discount" in der URL ab; wenn nicht vorhanden, d.h. null, dann wird "all" gesetzt; das passiert beim Mounting der Komponenten, wenn noch kein Filter-Button gedrückt wurde

  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.disount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.disount > 0);

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
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
