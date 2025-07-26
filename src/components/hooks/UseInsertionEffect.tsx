import Tag from '../Tag'
import Case from '../Case'
import Reminder from '../Reminder'
import { useInsertionEffect } from 'react';

const UseInsertionEffect = () => {
    useInsertionEffect(() => {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
        .my-component {
            color: white;
            background:#58c4dc;
            font-size: 20px;
            padding:4px;
            }
            `;
        document.head.appendChild(styleTag);

        return () => {
            document.head.removeChild(styleTag);
        };
    });

    return (
        <div className='flex flex-col gap-4 items-center sm:items-start'>
            <Tag title='UseInsertionEffect' />
            <Case title="Case 1: insert style to component">
                <div className='flex flex-col items-start gap-2'>
                    <p className=" text-sm text-gray-600">result</p>
                    <div className="my-component">Hello, styled component!</div>
                </div>
            </Case>
        </div>
    )
}

export default UseInsertionEffect