import { useEffect, useState } from "react"
import Case from "../Case"
import Tag from "../Tag"
import Reminder from "../Reminder";
const UseEffect = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [iconNumber, setIconNumber] = useState(0);

    const displayIcon = (index: number) => {
        switch (index) {
            case 1:
                return '😉';
            case 2:
                return '🦖';
            case 3:
                return '🍜';
            case 4:
                return '🚀';

            default:
                return '';
        }
    }
    useEffect(() => {
        //subscription
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        //side effect  
        document.title = 'React 2025 v19.1.0 ' + displayIcon(iconNumber);
    }, [iconNumber])

    return (
        <div className='flex flex-col gap-4 items-center sm:items-start p-2 hover:shadow-2xl hover:bg-gray-600 transition-all'>
            <Tag title='UseEffect' />
            <Case title="Case 1: subscription - add event listener to detect device is online or not">
                <div className="flex flex-col items-start gap-2">
                    <Reminder title="switch on/off your device to see the result" />
                    <div className="flex flex-col items-start">
                        <h2>Network Status:</h2>
                        {isOnline ? (
                            <p style={{ color: 'green' }}>Online</p>
                        ) : (
                            <p style={{ color: 'red' }}>Offline</p>
                        )}
                    </div>
                </div>
            </Case>
            <Case title="Case 2: side effect - update web title">
                <div className='flex flex-col items-start gap-2'>
                    <p className='text-sm text-gray-600'>button</p>
                    <button onClick={() => { if (iconNumber > 3) { setIconNumber(0) } else { setIconNumber(iconNumber + 1) } }}>switch title icon</button>
                    {iconNumber != 0 && <p className='text-sm text-gray-600'>just look at the browser tab</p>}
                </div>
            </Case>
        </div>
    )
}

export default UseEffect