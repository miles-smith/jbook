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

  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.data);
    }, 1000);

    return () => { clearTimeout(timer); }
  }, [cell.id, cell.data, createBundle]);

  return(
    <Resizable direction='vertical'>
      <div style={{height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction='horizontal'>
          <CodeEditor initialValue={cell.data} onChange={value => updateCell(cell.id, value)} />
        </Resizable>
        {bundle && <CodePreview code={bundle.code} error={bundle.error} />}
      </div>
    </Resizable>
  );
}

export default CodeCell;
