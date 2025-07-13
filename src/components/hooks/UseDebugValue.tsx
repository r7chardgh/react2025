import { useDebugValue, useState } from 'react';
import Case from '../Case'
import Tag from '../Tag';
import { IoMdInformationCircleOutline } from 'react-icons/io';

const UseDebugValue = () => {
    const [count, setCount] = useState(0);
    useDebugValue(count)
    return (
        <div className='flex flex-col gap-4 items-center sm:items-start'>
            <Tag title='UseDebugValue' />
            <p className=' bg-gray-600 px-2 py-1 rounded-sm flex justify-center items-start gap-1 text-left'><IoMdInformationCircleOutline className='mt-1'/>To see the result, check in React Dev Tool</p>
            <Case title="Case 1: label count value to react dev tool">
                <div className='flex flex-col items-start gap-2'>
                    <p className='text-sm text-gray-600'>button</p>
                    <button onClick={() => setCount(count + 1)}>count {count}</button>
                </div>
            </Case>
        </div>
    )
}

export default UseDebugValue