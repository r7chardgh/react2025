import { Suspense, use, useCallback, useDeferredValue, useState } from "react"
import Case from "../Case"
import { fetchLocations } from "../../lib/data";
import { debounce } from "../../lib/debounce";
import Tag from "../Tag";
import { BiCool } from "react-icons/bi";
const UseDeferredValue = () => {
    const [query, setQuery] = useState('');
    const [queryTwo, setQueryTwo] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [debouncedQueryTwo, setDebouncedQueryTwo] = useState('');
    const deferredQuery = useDeferredValue(debouncedQuery);
    const handleSearch = useCallback(
        debounce((value: string) => {
            setDebouncedQuery(value);
        }, 500),
        []
    );
    const handleSearchTwo = useCallback(
        debounce((value: string) => {
            setDebouncedQueryTwo(value);
        }, 500),
        []
    );
    return (
        <div className='flex flex-col gap-4 items-center sm:items-start'>
            <Tag title='UseDeferredValue' />
            <Case title="Case 1: search WITH useDeferredValue (debounce)">
                <div className="flex flex-col items-start gap-4">
                    <p className="text-sm text-gray-600">input</p>
                    <div className="flex flex-col gap-2 items-start">
                        <label htmlFor="data">location search</label>
                        <input id="data" placeholder="enter hk street name" className="border p-2 rounded-xl " value={query} type="text" onChange={(e) => { handleSearch(e.target.value); setQuery(e.target.value) }} />
                    </div>
                    <p className="text-sm text-gray-600 flex gap-2 items-center">result {debouncedQuery !== deferredQuery && <BiCool />}</p>
                    <div style={{
                        opacity: debouncedQuery !== deferredQuery ? 0.5 : 1,
                    }}>search query: {deferredQuery}</div>
                    <Suspense fallback={<h3>searching...</h3>}>
                        <LocationList query={deferredQuery} indicate={debouncedQuery !== deferredQuery} />
                    </Suspense>
                </div>
            </Case>
            <Case title="Case 2: search WITHOUT useDeferredValue (debounce)">
                <div className="flex flex-col items-start gap-4">
                    <div className="flex flex-col gap-2 items-start">
                        <p className="text-sm text-gray-600">input</p>
                        <label htmlFor="dataTwo">location search</label>
                        <input id="dataTwo" placeholder="enter hk street name" className="border p-2 rounded-xl " value={queryTwo} type="text" onChange={(e) => { handleSearchTwo(e.target.value); setQueryTwo(e.target.value) }} />
                    </div>
                    <div className="flex flex-col gap-2 items-start">

                        <p className="text-sm text-gray-600">result</p>
                        <div>search query: {queryTwo}</div>
                        <Suspense fallback={<h3>searching...</h3>}>
                            <LocationList query={debouncedQueryTwo} />
                        </Suspense>
                    </div>
                </div>
            </Case>
        </div>
    )
}

const LocationList = ({ query, indicate }: { query: string, indicate?: boolean }) => {
    if (query === '') {
        return null;
    }
    const locations: any = use(fetchLocations(query));

    if (locations?.length === 0) {
        return <p>No matches for <i>"{query}"</i></p>;
    }

    return <div className={`text-left ${indicate ? ' opacity-50' : 'opacity-100'}`}>
        {locations?.map((location: any, index: any) => {
            return <div key={index}>
                <p>{index + 1}: {location.nameEN}</p>
            </div>
        })}</div>

}

export default UseDeferredValue