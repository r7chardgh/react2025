import { memo, useCallback, useState } from 'react'
import Case from './Case';

const UseCallback = () => {
    return (
        <div className='flex flex-col gap-4 items-center sm:items-start'>
            <h3 className=' px-4 py-2 rounded-2xl bg-blue-400'>UseCallback</h3>
            <p>To see the result, please open browser console</p>
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
    return <>
        <button className=' capitalize' onClick={() => setCount(count + 1)}>{'[ Parent ]'} count: {count}</button>
        <ChildComponent fn={cachedFn} />
    </>
}
const ParentComponentWithOutUseCallback = () => {
    const [count, setCount] = useState(0);
    console.log('render parent without usecallback');

    return <>
        <button className=' capitalize' onClick={() => setCount(count + 1)}>{'[ Parent ]'} count: {count}</button>
        <ChildComponent fn={() => { setCount(0) }} />
    </>
}

const ChildComponent = memo(({ fn }: { fn: VoidFunction }) => {

    console.log('render child component with memo');

    return <div><button className=' capitalize' onClick={fn}>{`[ Child ]`} reset button</button></div>
})

export default UseCallback
