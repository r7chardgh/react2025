import React, { useActionState } from 'react'
import Case from './Case';

const UseActionState = () => {
    //actions
    async function increment(prev: number) {
        return prev + 1;
    }
    async function addToCart(prevState: any, queryData: any) {
        const itemID = queryData.get('itemID');

        await new Promise(resolve => {
            setTimeout(resolve, 2000);
        });
        return "Added to cart";

    }

    const [state, formActionOne] = useActionState(increment, 0);
    const [message, formActionTwo, isPending] = useActionState(addToCart, null);
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
                <form action={formActionTwo} className='flex flex-col gap-2'>
                    <button type="submit">Add to Cart</button>
                    {isPending ? "Loading..." : message}
                </form>
            </Case>
        </div>
    )
}

export default UseActionState