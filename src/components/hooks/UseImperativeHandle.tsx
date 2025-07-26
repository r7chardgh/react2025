import Tag from '../Tag'
import Case from '../Case'
import { useImperativeHandle, useRef } from 'react'

const UseImperativeHandle = () => {
    const myRef = useRef<any>(null);
    const myRefTwo = useRef<any>(null);
    const handleClick = () => {
        myRef.current.customFocus();
        myRefTwo.current.scrollToBottom();
    }
    return (
        <div className='flex flex-col gap-4 items-center sm:items-start'>
            <Tag title='UseImperativeHandle' />
            <Case title="Case 1: button to handle imperative behaviors of child element">
                <div className='flex flex-col items-start gap-2'>
                    <p className="text-sm text-gray-600">button</p>
                    <button onClick={handleClick}>scroll down the list & focus on input</button>
                    <p className="text-sm text-gray-600">childs</p>
                    <div className='flex flex-col items-start gap-2'>
                        <ChildList ref={myRefTwo} />
                        <ChildComponent ref={myRef} />
                    </div>
                </div>
            </Case>
        </div>
    )
}

export default UseImperativeHandle

const ChildList = ({ ref }: { ref: any }) => {
    const listRef = useRef<any>(null);
    const data = [
        '🤠', '👀', '🧑‍💻', '⛹🏽', '🐈', '🐳'
    ]
    useImperativeHandle(
        ref,
        () => {
            return {
                scrollToBottom() {
                    const node = listRef.current;
                    node.scrollTop = node.scrollHeight;
                }
            }
        },
        [],
    )
    return <ul ref={listRef} className=' bg-white w-full h-24 overflow-scroll'>{data.map((d, i) => <li key={i}>{d}</li>)}</ul>
}

const ChildComponent = ({ ref }: { ref: any }) => {
    const inputRef = useRef<any>(null);
    useImperativeHandle(
        ref,
        () => {
            return {
                customFocus() {
                    inputRef.current.focus();
                }
            }
        },
        [],
    )
    return <div className='w-full flex flex-col gap-1 items-start'>
        <label htmlFor="firstname">firstname:</label>
        <input name='firstname' id='firstname' placeholder='enter first name' className='w-full p-1 rounded-sm border ' ref={inputRef} />
    </div>
}