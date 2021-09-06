import { useSelector } from '../hooks/use-typed-selector';

import CellListItem from './cell-list-item';

const CellList: React.FC = () => {
  const cells = useSelector(({ cells: { data, order } }) => {
    return order.map(id => data[id]);
  });

  return(
    <div>
      { cells.map(cell => <CellListItem key={cell.id} cell={cell} />) }
    </div>
  )
}

export default CellList;
