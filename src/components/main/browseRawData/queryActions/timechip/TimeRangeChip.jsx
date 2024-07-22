import { cn } from "@/lib/utils";
import { AddFilled, CloseFilled } from "@carbon/icons-react";
import {
    FloatingFocusManager,
    offset,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useRole,
    useTransitionStyles,
} from "@floating-ui/react";
import PropTypes from "prop-types";
import { Fragment, memo, useState } from "react";
import TimeRangeActions from "./timeactions";

const propTypes = {
    setTimeRange: PropTypes.func,
};

const TimeRangeChip = memo(function TimeRangeChip(props) {
    const [startDatetime, setStartDatetime] = useState("");
    const [endDatetime, setEndDatetime] = useState("");
    const [startNanos, setStartNanos] = useState("");
    const [endNanos, setEndNanos] = useState("");

    const [isOpen, setIsOpen] = useState();
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "bottom-start",
        middleware: [offset(4)],
    });
    const { isMounted, styles: transitionStyles } =
        useTransitionStyles(context);

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role,
    ]);

    function handleClear() {
        setStartDatetime("");
        setEndDatetime("");
        setStartNanos("");
        setEndNanos("");
        props.setTimeRange({});
    }

    return (
        <Fragment>
            <div
                ref={refs.setPositionReference}
                className={cn(
                    "mr-4 chip-input",
                    startDatetime !== "" || endDatetime !== ""
                        ? ""
                        : " border-dashed"
                )}
            >
                <button className="text-muted-foreground hover:text-muted-foreground/80">
                    {isOpen || startDatetime !== "" || endDatetime !== "" ? (
                        <CloseFilled onClick={handleClear} />
                    ) : (
                        <AddFilled onClick={() => setIsOpen(true)} />
                    )}
                </button>
                <button
                    ref={refs.setReference}
                    {...getReferenceProps()}
                    className="pl-1 max-w-xs sm:max-w-none text-sm text-muted-foreground font-medium"
                >
                    {startDatetime !== "" || endDatetime !== "" ? (
                        <Fragment>
                            <span className=" mr-1 pr-1 border-r border-muted-foreground text-nowrap">
                                Time Range
                            </span>
                            <span className="text-foreground text-nowrap">
                                {startDatetime} - {endDatetime}
                            </span>
                        </Fragment>
                    ) : (
                        "Time Range"
                    )}
                </button>
            </div>
            {isMounted && (
                <FloatingFocusManager context={context} modal={true}>
                    <div
                        ref={refs.setFloating}
                        style={floatingStyles}
                        {...getFloatingProps()}
                    >
                        <div
                            style={transitionStyles}
                            className="p-5 border rounded bg-background shadow-md"
                        >
                            <TimeRangeActions
                                setTimeRange={props.setTimeRange}
                                startDatetime={startDatetime}
                                setStartDatetime={setStartDatetime}
                                endDatetime={endDatetime}
                                setEndDatetime={setEndDatetime}
                                startNanos={startNanos}
                                setStartNanos={setStartNanos}
                                endNanos={endNanos}
                                setEndNanos={setEndNanos}
                                setIsOpen={setIsOpen}
                            />
                        </div>
                    </div>
                </FloatingFocusManager>
            )}
        </Fragment>
    );
});

TimeRangeChip.propTypes = propTypes;
export default TimeRangeChip;
