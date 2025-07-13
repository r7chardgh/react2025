import type { IWrapper } from '../lib/definitions'
interface ICase extends IWrapper {
    title: string;
    code?: string;
}
const Case = ({ children, className, title, code }: ICase) => {

    return (
        <div className={className + " w-full flex flex-col gap-6 bg-primary_text p-6 rounded-sm items-start"}>
            <h5 className=' font-semibold text-left'>{title}</h5>
            {!!code && <code className='bg-gray-700 p-6 rounded-sm'>{code}</code>}
            <div className='bg-black p-2 rounded-sm w-full'>
                {children}
            </div>
        </div>
    )
}

export default Case