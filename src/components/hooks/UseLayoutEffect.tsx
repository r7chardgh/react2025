import Tag from '../Tag'
import Case from '../Case'
import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const UseLayoutEffect = () => {
    const buttonRef = useRef<any>(null);
    const [targetRect, setTargetRect] = useState<any>(null);

    return (
        <div className='flex flex-col gap-4 items-center sm:items-start'>
            <Tag title='UseLayoutEffect' />
            <Case title="Case 1: measure tooltip height before repaint to get correct position">
                <div className='flex flex-col items-start gap-2'>
                    <p className=" text-sm text-gray-600 mb-9">result</p>
                    <div>
                        <button
                            ref={buttonRef}
                            onPointerEnter={() => {
                                const rect = buttonRef.current.getBoundingClientRect();
                                setTargetRect({
                                    left: rect.left,
                                    top: rect.top,
                                    right: rect.right,
                                    bottom: rect.bottom,
                                });
                            }}
                            onPointerLeave={() => {
                                setTargetRect(null);
                            }}
                        >hover to see tooltip</button>
                        {targetRect !== null && (
                            <Tooltip targetRect={targetRect} />
                        )}
                    </div>
                </div>
            </Case>
        </div>
    )
}

export default UseLayoutEffect


const Tooltip = ({ targetRect }: { targetRect: any }) => {
    const toolTipRef = useRef<any>(null);
    const [tooltipHeight, setTooltipHeight] = useState(0);

    useLayoutEffect(() => {
        if (!!toolTipRef.current) {
            const { height } = toolTipRef.current.getBoundingClientRect();
            setTooltipHeight(height);
            console.log('Measured tooltip height: ' + height);
        }
    }, []);

    let tooltipX = 0;
    let tooltipY = 0;
    if (targetRect !== null) {
        tooltipX = targetRect.left;
        tooltipY = targetRect.top - tooltipHeight - 8;
        if (tooltipY < 0) {
            // It doesn't fit above, so place below.
            tooltipY = targetRect.bottom + 8;
        }
    }
    return createPortal(

        <div
            style={{
                position: 'fixed',
                pointerEvents: 'none',
                left: 0,
                top: 0,
                transform: `translate3d(${tooltipX}px, ${tooltipY}px, 0)`
            }}
            className=''>
            <div
                ref={toolTipRef}
                className='tooltip bg-gray-300 text-black px-2 py-1 rounded-sm'
            >
                this is tooltip
            </div>
        </div>
        , document.body)
}