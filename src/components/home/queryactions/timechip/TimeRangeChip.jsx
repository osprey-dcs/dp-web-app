import TimeRangeActions from "./timeactions";
import { Fragment, useEffect, useState } from "react";
import { FloatingFocusManager, offset, useClick, useDismiss, useFloating, useInteractions, useRole, useTransitionStyles } from "@floating-ui/react";
import { AddFilled, CloseFilled } from "@carbon/icons-react";

function TimeRangeChip() {
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
            <button ref={refs.setReference} {...getReferenceProps()} className="mr-4 px-2 flex items-center border border-black border-dashed rounded-full hover:cursor-pointer">
                {
                    isOpen ?
                        <CloseFilled /> :
                        <AddFilled />
                }
                <span className="ml-1 text-sm font-medium">Time Range</span>
            </button>
            {
                isMounted && (
                    <FloatingFocusManager context={context} modal={true}>
                        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
                            <div style={transitionStyles} className="p-5 border rounded bg-white shadow-md">
                                <TimeRangeActions setIsOpen={setIsOpen} />
                            </div>
                        </div>
                    </FloatingFocusManager>
                )
            }
        </Fragment>
    )
}

export default TimeRangeChip;