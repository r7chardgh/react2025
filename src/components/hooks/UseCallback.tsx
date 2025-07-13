import { memo, useCallback, useState } from 'react'
import Case from '../Case';
import Tag from '../Tag';
import { RiResetLeftFill } from "react-icons/ri";
import { FaPlus } from 'react-icons/fa';
import { IoMdInformationCircleOutline } from 'react-icons/io';
const UseCallback = () => {
    return (
        <div className='flex flex-col gap-4 items-center sm:items-start'>
            <Tag title='UseCallback' />
            <p className=' bg-gray-600 px-2 py-1 rounded-sm flex justify-center items-start sm:items-center gap-1 text-left'><IoMdInformationCircleOutline className='mt-1 sm:mt-0' size={18}/>To see the result, please open browser console</p>
            <Case title='Case 1: test re-render performance with useCallback'>
                <ParentComponentWithUseCallback />
            </Case>
            <Case title='Case 2: test re-render performance WITHOUT useCallback'>
                <ParentComponentWithOutUseCallback />
            </Case>
        </div>
    )
}

const ParentComponentWithUseCallback = () => {
    const [count, setCount] = useState(0);
    console.log('render parent with usecallback');

    const cachedFn = useCallback(() => {
        //return same function , or return updated function when dependencies have changed!
        setCount(0);
    }, []);
    return <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2 items-start'>
            <p className='text-gray-600 text-sm'>parent button</p>
            <button className='flex gap-2 justify-center items-center capitalize' onClick={() => setCount(count + 1)}><FaPlus/>count: {count}</button>
        </div>
        <ChildComponent fn={cachedFn} />
    </div>
}
const ParentComponentWithOutUseCallback = () => {
    const [count, setCount] = useState(0);
    console.log('render parent without usecallback');

    return <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2 items-start'>
            <p className='text-gray-600 text-sm'>parent button</p>
            <button className='flex gap-2 justify-center items-center capitalize' onClick={() => setCount(count + 1)}><FaPlus/>count: {count}</button>
        </div>
        <ChildComponent fn={() => { setCount(0) }} />
    </div>
}

const ChildComponent = memo(({ fn }: { fn: VoidFunction }) => {

    console.log('render child component with memo');

    return <div className='flex flex-col gap-2 items-start'><p className='text-gray-600 text-sm'>child button</p><button className=' flex gap-2 justify-center items-center capitalize' onClick={fn}><RiResetLeftFill /> reset button</button></div>
})

export default UseCallback
