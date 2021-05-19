import './resizable.css';
import { useState, useEffect } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const widthScaling = 0.75;

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight]   = useState(window.innerHeight);
  const [innerWidth, setInnerWidth]     = useState(window.innerWidth);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth * 0.75);
  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    let timer: any;
    const onResize = () => {
      if(timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);

        if(window.innerWidth * widthScaling < currentWidth) {
          setCurrentWidth(window.innerWidth * widthScaling)
        }
      }, 100)
    }

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, [currentWidth]);

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
      width: currentWidth,
      resizeHandles: ['e'],
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * widthScaling, Infinity],
      className: 'resize-horizontal',
      onResizeStop: (_event, data) => { setCurrentWidth(data.size.width) }
    }
  }

  return(
    <ResizableBox { ...resizableProps }>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
