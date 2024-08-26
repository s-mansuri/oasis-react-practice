import React from 'react';
import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

const CabinTableOperations = () => {
  return (
    <div>
      <TableOperations>
        <Filter
          filterField='discount'
          options={[
            { value: 'all', label: 'All' },
            { value: 'no-discount', label: 'No Discount' },
            { value: 'with-discount', label: 'With Discount' },
          ]}
        />
        <SortBy
          options={[
            { value: 'name-asc', label: 'By name {A-Z}' },
            { value: 'name-desc', label: 'By name {Z-A}' },
            { value: 'regularPrice-asc', label: 'By price {Low to high}' },
            { value: 'regularPrice-desc', label: 'By price {high to low}' },
            { value: 'maxCapacity-asc', label: 'By Capacity {low to high}' },
            { value: 'maxCapacity-desc', label: 'By Capacity {high to low}' },
          ]}
        />
      </TableOperations>
    </div>
  );
};

export default CabinTableOperations;
