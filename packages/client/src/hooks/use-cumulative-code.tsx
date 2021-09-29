import { useSelector } from './use-typed-selector';

export const useCumulativeCode = (id: string) => {
  return useSelector((state) => {
    const { data, order } = state.cells;

    const showNoop = 'var show = () => {}';
    const show =
      `
        import _React from 'react';
        import _ReactDOM from 'react-dom';

        const root = document.querySelector('#root');

        var show = (value) => {
          if(typeof value === 'object') {
            if(value.$$typeof && value.props) {
              _ReactDOM.render(value, root);
            } else {
              root.innerHTML = JSON.stringify(value);
            }
          } else {
            root.innerHTML = value;
          }
        }
      `;
    const cells = order.map(id => data[id]);
    const code = [

    ];

    for(let cell of cells) {
      if(cell.type === 'code') {
        if(cell.id === id) {
          code.push(show);
        } else {
          code.push(showNoop);
        }

        code.push(cell.data);
      }

      if(cell.id === id) {
        break;
      }
    }

    return code.join('\n');
  });
}
