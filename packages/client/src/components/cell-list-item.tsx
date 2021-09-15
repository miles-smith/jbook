import './cell-list-item.css';

import { Cell }  from '../state';
import CodeCell from './code-cell';
import TextEditor from './text-editor';
import ActionBar from './action-bar';

interface CellListItemProps {
  cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;

  switch(cell.type) {
    case 'code':
      child =
        <>
          <div className="action-bar-wrapper">
            <ActionBar id={cell.id} />
          </div>
          <CodeCell cell={cell} />
        </>;
      break;
    case 'text':
      child =
        <>
          <TextEditor cell={cell} />
          <ActionBar id={cell.id} />
        </>;
      break;
    default:
      child = <></>;
  }

  return(
    <div className="cell-list-item">
      {child}
    </div>
  )
}

export default CellListItem;
