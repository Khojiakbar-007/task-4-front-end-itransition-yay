import React from 'react';
import './Counter.styles.css'
import './reset.css'

import Decoration from './Decoration';
import BigCountNumber from './BigCountNumber';

function Counter() {
  const [count, setCount] = React.useState(0);
  
  return (
    <main>
      <BigCountNumber count={count} />
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <Decoration />
    </main>
  );
}

export default Counter;