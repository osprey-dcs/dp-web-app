import PropTypes from "prop-types";
import TimeRangeActions from "./timeactions";
import { Fragment, useEffect, useState } from "react";
import { FloatingFocusManager, offset, useClick, useDismiss, useFloating, useInteractions, useRole, useTransitionStyles } from "@floating-ui/react";
import { AddFilled, CloseFilled } from "@carbon/icons-react";

const propTypes = {
    setTimeRange: PropTypes.func
}

function TimeRangeChip(props) {
    const [timeRangeSet, setTimeRangeSet] = useState(false);
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

    return (
        <Fragment>
            <button ref={refs.setReference} {...getReferenceProps()} className={"mr-4 px-2 flex items-center border border-sub-text rounded-full hover:cursor-pointer" + (timeRangeSet ? '' : ' border-dashed')}>
                {
                    isOpen || timeRangeSet ?
                        <CloseFilled className="text-sub-text" /> :
                        <AddFilled className="text-sub-text" />
                }
                <span className="ml-1 text-sm text-sub-text font-medium">
                    {
                        timeRangeSet ? <>
                            <span className=" mr-1 pr-1 border-r border-sub-text">Time Range</span>
                            <span className="text-main-text">{timeRangeString}</span>
                        </> :
                            "Time Range"
                    }
                </span>
            </button>
            {
                isMounted && (
                    <FloatingFocusManager context={context} modal={true}>
                        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
                            <div style={transitionStyles} className="p-5 border rounded bg-white shadow-md">
                                <TimeRangeActions setIsOpen={setIsOpen} setTimeRange={props.setTimeRange} setTimeRangeSet={setTimeRangeSet} setTimeRangeString={setTimeRangeString} />
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