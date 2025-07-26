import { useId } from 'react'
import Case from '../Case';
import Tag from '../Tag';

const UseId = () => {
    const id = useId();
    return (
        <div className='flex flex-col gap-4 items-center sm:items-start p-2 hover:shadow-2xl hover:bg-gray-600 transition-all'>
            <Tag title='UseId' />
            <Case title="Case 1: add id to accessibility attribute">
                <div className="flex flex-col items-start gap-2">
                    <p className='text-sm text-gray-600'>input</p>
                    <label className='flex flex-col items-start gap-2'>
                        Password:
                        <input
                            className='border rounded-sm p-1'
                            placeholder='enter the password'
                            type="password"
                            aria-describedby={id}
                        />
                    </label>
                    <p id={id} className='text-sm text-left'>
                        The password should contain at least 18 characters
                    </p>

                </div>
            </Case>
        </div>
    )
}

export default UseId