import { useDebugValue, useState } from 'react';
import Case from './Case'

const UseDebugValue = () => {
    const [count, setCount] = useState(0);
    useDebugValue(count)
    return (
        <div className='flex flex-col gap-4 items-center sm:items-start'>
            <h3 className=' px-4 py-2 rounded-2xl bg-blue-400'>UseDebugValue</h3>
            <Case title="Case 1: label count value to react dev tool">
                <p>To see the result, check in React Dev Tool</p>
                <button onClick={() => setCount(count + 1)}>count {count}</button>
            </Case>
        </div>
    )
}

export default UseDebugValue