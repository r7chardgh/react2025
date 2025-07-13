import { TbFishHook } from "react-icons/tb";
interface ITag {
    title: string;
}
const Tag = ({ title }: ITag) => {
    return (
        <div className="px-4 py-2 rounded-xl bg-primary_text  text-react flex gap-2 te items-center text-sm "><TbFishHook/>{title}</div>
    )
}

export default Tag