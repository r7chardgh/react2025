import { useActionState } from 'react'
import Case from '../Case';
import Tag from '../Tag';
import { FaCartPlus, FaPlus } from "react-icons/fa";
const UseActionState = () => {
    const [state, formActionOne] = useActionState(increment, 0);

    async function increment(prev: number) {
        return prev + 1;
    }

    return (
        <div className='flex flex-col gap-4 items-center sm:items-start'>
            <Tag title='UseActionState' />
            <Case title="Case 1: form button increase state by 1">
                <form className='flex flex-col gap-2 items-start'>
                    <p className=' text-gray-600 text-sm'>button</p>
                    <button formAction={formActionOne} className='flex gap-2 items-center justify-center'><FaPlus />Increment</button>
                    <p className=' text-gray-600 text-sm'>result</p>
                    state: {state}
                </form>
            </Case>
            <Case title="Case 2: add to cart with pending">
                <AddToCartForm itemID='1' />
            </Case>
        </div>
    )
}

//second case
const AddToCartForm = ({ itemID }: { itemID?: string }) => {
    const [message, AddToCartFormAction, isPending] = useActionState(addToCart, 'default message'); //main dish

    async function addToCart(prevState: string, queryData: any) {
        const itemID = queryData.get('itemID'); //practical way to add the correct item to cart

        if (itemID === '1') {
            console.log('the prevState is: ', prevState);

            await new Promise(resolve => {
                setTimeout(resolve, 2000);
            }); //delay 2 seconds
            return "Added to cart";
        }
        return 'no item id'
    }

    //hidden input with item id
    return <form action={AddToCartFormAction} itemID='1' className='flex flex-col gap-2 items-start'>
        <input type='hidden' name='itemID' value={itemID} />
        <p className=' text-gray-600 text-sm'>button</p>
        <button type="submit" className='flex gap-2 items-center justify-center'><FaCartPlus />  Add to Cart</button>
        <p className=' text-gray-600 text-sm'>result</p>
        {isPending ? "Loading..." : message}
    </form>
}

export default UseActionState