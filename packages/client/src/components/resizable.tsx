import './resizable.css';
import { useState, useEffect } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth]   = useState(window.innerWidth);
  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    const onResize = () => {
      setInnerHeight(window.innerHeight);
      setInnerWidth(window.innerWidth);
    }

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  if(direction === 'vertical') {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      minConstraints: [Infinity, innerHeight * 0.1],
      maxConstraints: [Infinity, innerHeight * 0.9],
      className: 'resize-vertical',
    }
  } else {
    resizableProps = {
      height: Infinity,
      width: innerWidth * 0.75,
      resizeHandles: ['e'],
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
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
