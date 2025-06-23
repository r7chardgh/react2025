import type { IWrapper } from '../lib/definitions'

const Grid = ({ children, className }: IWrapper) => {
    return (
        <div className={className + ' grid grid-cols-1 md:grid-cols-3'}>
            {children}
        </div>
    )
}

export default Grid