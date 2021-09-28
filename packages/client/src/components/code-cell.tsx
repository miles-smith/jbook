import './code-cell.css';

import { useEffect } from 'react';
import CodeEditor from './code-editor';
import CodePreview from './code-preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useSelector } from '../hooks/use-typed-selector';

interface CodeCellProps {
  cell: Cell;
};

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useSelector((state) => {
    const { data, order } = state.cells;

    const cells = order.map(id => data[id]);
    const codeBlocks = [];

    for(let c of cells) {
      if(c.type === 'code') {
        codeBlocks.push(c.data);
      }

      if(c.id === cell.id) {
        break;
      }
    }

    return codeBlocks;
  });
  console.log(cumulativeCode);

  useEffect(() => {
    if(!bundle) {
      createBundle(cell.id, cumulativeCode.join('\n'));
      return
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'));
    }, 1000);

    return () => { clearTimeout(timer); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode.join('\n'), createBundle]);

  return(
    <Resizable direction='vertical'>
      <div style={{height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction='horizontal'>
          <CodeEditor initialValue={cell.data} onChange={value => updateCell(cell.id, value)} />
        </Resizable>
        <div className="progress-wrapper">
        {
          !bundle || bundle.loading
          ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading...
              </progress>
            </div>
          )
          : (<CodePreview code={bundle.code} error={bundle.error} />)
        }
        </div>
      </div>
    </Resizable>
  );
}

export default CodeCell;
