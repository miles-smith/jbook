import './cell-list.css';

import { useSelector } from '../hooks/use-typed-selector';
import { useActions } from '../hooks/use-actions';

import { Fragment, useEffect } from 'react';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';

const CellList: React.FC = () => {
  const cells = useSelector(({ cells: { data, order } }) => {
    return order.map(id => data[id]);
  });

  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  return(
    <div className="cell-list">
      <AddCell cellId={null} forceVisible={cells.length === 0} />
      {
        cells.map((cell) => {
          return(
            <Fragment key={cell.id}>
              <CellListItem cell={cell} />
              <AddCell cellId={cell.id} />
            </Fragment>
          )
        })
      }
    </div>
  )
}

export default CellList;
