import { useSelector } from '../hooks/use-typed-selector';

import { Fragment } from 'react';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';

const CellList: React.FC = () => {
  const cells = useSelector(({ cells: { data, order } }) => {
    return order.map(id => data[id]);
  });

  return(
    <div>
      {
        cells.map((cell) => {
          return(
            <Fragment key={cell.id}>
              <AddCell nextCellId={cell.id} />
              <CellListItem cell={cell} />
            </Fragment>
          )
        })
      }
      <AddCell nextCellId={null} forceVisible={cells.length === 0} />
    </div>
  )
}

export default CellList;
