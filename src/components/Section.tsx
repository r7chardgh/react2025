import type { IWrapper } from '../lib/definitions'
interface ISection extends IWrapper {
    title: string;
}
const Section = ({ children, title }: ISection) => {
    return (
        <section className=' flex flex-col items-start gap-9'>
            <h2 className=' text-3xl'>{title}</h2>
            {children}
            <hr className="w-full my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"  />
        </section>
    )
}

export default Section