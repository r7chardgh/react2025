import { IoMdInformationCircleOutline } from 'react-icons/io';
const Reminder = ({ title }: { title: string }) => {
    return (
        <p className=' bg-gray-600 px-2 py-1 rounded-sm flex justify-center items-start gap-1 text-left'><IoMdInformationCircleOutline className='mt-1' />{title}</p>
    )
}

export default Reminder