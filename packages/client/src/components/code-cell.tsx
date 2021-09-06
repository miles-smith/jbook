import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import CodePreview from './code-preview';
import Resizable from './resizable';
import bundle from '../bundler';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface CodeCellProps {
  cell: Cell;
};

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [error, setError] = useState('');
  const [code, setCode]   = useState('');
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.data);
      setCode(output.code);
      setError(output.error);
    }, 1000);

    return () => { clearTimeout(timer); }
  }, [cell.data]);

  return(
    <Resizable direction='vertical'>
      <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction='horizontal'>
          <CodeEditor initialValue={cell.data} onChange={value => updateCell(cell.id, value)} />
        </Resizable>
        <CodePreview code={code} error={error} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
