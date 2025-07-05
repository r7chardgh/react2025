import { Suspense, use, useCallback, useDeferredValue, useState } from "react"
import Case from "./Case"
import { fetchLocations } from "../lib/data";
import { debounce } from "../lib/debounce";

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
            <h3 className=' px-4 py-2 rounded-2xl bg-blue-400'>UseDeferredValue</h3>
            <Case title="Case 1: search WITH useDeferredValue (debounce)">
                <input className="border " value={query} type="text" onChange={(e) => { handleSearch(e.target.value); setQuery(e.target.value) }} />
                <div>search query: {deferredQuery}</div>
                <Suspense fallback={<h3>searching...</h3>}>
                    <LocationList query={deferredQuery} />
                </Suspense>
            </Case>
            <Case title="Case 2: search WITHOUT useDeferredValue (debounce)">
                <input className="border " value={queryTwo} type="text" onChange={(e) => { handleSearchTwo(e.target.value); setQueryTwo(e.target.value) }} />
                <div>search query: {queryTwo}</div>
                <Suspense fallback={<h3>searching...</h3>}>
                    <LocationList query={debouncedQueryTwo} />
                </Suspense>
            </Case>
        </div>
    )
}

const LocationList = ({ query }: { query: string }) => {
    if (query === '') {
        return null;
    }
    const locations: any = use(fetchLocations(query));

    if (locations?.length === 0) {
        return <p>No matches for <i>"{query}"</i></p>;
    }

    return <div>{locations?.map((location: any, index: any) => {
        return <div key={index}>
            <p>{index + 1}: {location.nameEN}</p>
        </div>
    })}</div>

}

export default UseDeferredValue