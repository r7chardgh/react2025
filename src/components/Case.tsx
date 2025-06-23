import type { IWrapper } from '../lib/definitions'
import * as ReactDOMServer from 'react-dom/server';
interface ICase extends IWrapper {
    title: string;
    code?: string;
}
const Case = ({ children, className, title, code }: ICase) => {

    return (
        <div className={className + " w-full flex flex-col gap-2 border-2 border-white p-6 rounded-s"}>
            <h5 className=' font-semibold'>{title}</h5>
            {!!code && <code className='bg-gray-700 p-6 rounded-sm'>{code}</code>}
            {children}
        </div>
    )
}

export default Case