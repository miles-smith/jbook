import './resizable.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  if(direction === 'vertical') {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      minConstraints: [Infinity, window.innerHeight * 0.1],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      className: 'resize-vertical',
    }
  } else {
    resizableProps = {
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ['e'],
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      className: 'resize-horizontal',
    }
  }

  return(
    <ResizableBox { ...resizableProps }>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
