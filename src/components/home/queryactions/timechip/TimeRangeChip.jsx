import PropTypes from "prop-types";
import TimeRangeActions from "./timeactions";
import { Fragment, useEffect, useState } from "react";
import { FloatingFocusManager, offset, useClick, useDismiss, useFloating, useInteractions, useRole, useTransitionStyles } from "@floating-ui/react";
import { AddFilled, CloseFilled } from "@carbon/icons-react";

const propTypes = {
    setTimeRange: PropTypes.func
}

function TimeRangeChip(props) {
    const [startDatetime, setStartDatetime] = useState('');
    const [endDatetime, setEndDatetime] = useState('');
    const [startNanos, setStartNanos] = useState('');
    const [endNanos, setEndNanos] = useState('');
    const [timeRangeString, setTimeRangeString] = useState('');

    const [isOpen, setIsOpen] = useState();
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'bottom-start',
        middleware: [offset(4)]
    });
    const { isMounted, styles: transitionStyles } = useTransitionStyles(context);

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

    function handleClear() {
        setStartDatetime('');
        setEndDatetime('');
        setTimeRangeString('');
        props.setTimeRange({});
    }

    return (
        <Fragment>
            <div ref={refs.setPositionReference} className={"mr-4 px-2 max-w-sm overflow-hidden sm:max-w-none flex items-center border border-sub-text rounded-full hover:cursor-pointer" + (timeRangeString !== '' ? '' : ' border-dashed')}>
                <button>{
                    isOpen || (timeRangeString !== '') ?
                        <CloseFilled className="text-sub-text" onClick={handleClear} /> :
                        <AddFilled className="text-sub-text" onClick={() => setIsOpen(true)} />
                }</button>
                <button ref={refs.setReference} {...getReferenceProps()} className="pl-1 text-sm text-sub-text font-medium">
                    {
                        timeRangeString !== '' ? <>
                            <span className=" mr-1 pr-1 border-r border-sub-text text-nowrap">Time Range</span>
                            <span className="text-main-text text-nowrap">{timeRangeString}</span>
                        </> :
                            "Time Range"
                    }
                </button>
            </div>
            {
                isMounted && (
                    <FloatingFocusManager context={context} modal={true}>
                        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
                            <div style={transitionStyles} className="p-5 border rounded bg-white shadow-md">
                                <TimeRangeActions setTimeRange={props.setTimeRange} startDatetime={startDatetime} setStartDatetime={setStartDatetime}
                                    endDatetime={endDatetime} setEndDatetime={setEndDatetime}
                                    startNanos={startNanos} setStartNanos={setStartNanos}
                                    endNanos={endNanos} setEndNanos={setEndNanos}
                                    setTimeRangeString={setTimeRangeString} setIsOpen={setIsOpen} />
                            </div>
                        </div>
                    </FloatingFocusManager>
                )
            }
        </Fragment >
    )
}

TimeRangeChip.propTypes = propTypes;
export default TimeRangeChip;