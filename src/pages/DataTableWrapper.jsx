import React from 'react';
import $ from 'jquery';
import 'datatables.net';

const DataTableWrapper = ({ data, className, options, children }) => {
  React.useEffect(() => {
    const table = $(document).ready(function () {
      return $('.display').DataTable(options);
    });

    return () => {
      table.DataTable().destroy(true); // Cleanup on unmount
    };
  }, [data, options]);

  return (
    <table className={className}>
      {children}
    </table>
  );
};

export default DataTableWrapper;
