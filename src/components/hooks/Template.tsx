import Tag from '../Tag'
import Case from '../Case'

const Template = () => {
    return (
        <div className='flex flex-col gap-4 items-center sm:items-start'>
            <Tag title='UseTemplate' />
            <Case title="Case 1: title">
                <div>example</div>
            </Case>
        </div>
    )
}

export default Template