import { useActionState } from 'react'
import Case from './Case';

const UseActionState = () => {
    const [state, formActionOne] = useActionState(increment, 0);

    async function increment(prev: number) {
        return prev + 1;
    }

    return (
        <div className='flex flex-col gap-4 items-center sm:items-start'>
            <h3 className=' px-4 py-2 rounded-2xl bg-blue-400'>UseActionState</h3>
            <Case title="Case 1: form button increase state by 1">
                <form className='flex flex-col gap-2'>
                    state: {state}
                    <button formAction={formActionOne}>Increment</button>
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
    const [message, AddToCartFormAction, isPending] = useActionState(addToCart, 'default message');

    async function addToCart(prevState: string, queryData: any) {
        const itemID = queryData.get('itemID');

        if (itemID === '1') {
            console.log('the prevState is: ', prevState);

            await new Promise(resolve => {
                setTimeout(resolve, 2000);
            });
            return "Added to cart";
        }
        return 'no item id'
    }

    return <form action={AddToCartFormAction} itemID='1' className='flex flex-col gap-2'>
        <input type='hidden' name='itemID' value={itemID} />
        <button type="submit">Add to Cart</button>
        {isPending ? "Loading..." : message}
    </form>
}

export default UseActionState