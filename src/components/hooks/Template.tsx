import Tag from '../Tag'
import Case from '../Case'
import Reminder from '../Reminder'

const Template = () => {
    return (
        <div className='flex flex-col gap-4 items-center sm:items-start'>
            <Tag title='UseTemplate' />
            <Reminder title="To see the result, please open browser console" />
            <Case title="Case 1: title">
                <p className=" text-sm text-gray-600">input</p>
                <div>example</div>
            </Case>
        </div>
    )
}

export default Template