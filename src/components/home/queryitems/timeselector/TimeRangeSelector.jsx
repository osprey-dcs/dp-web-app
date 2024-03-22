import { Fragment, useState } from "react";
import { FloatingFocusManager, offset, useClick, useDismiss, useFloating, useInteractions, useRole, useTransitionStyles } from "@floating-ui/react";

function TimeRangeSelector() {
    const [isOpen, setIsOpen] = useState();
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'bottom-start',
        middleware: [offset(8)]
    });
    const { isMounted, styles: transitionStyles } = useTransitionStyles(context);

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

    return (
        <Fragment>
            <div className="mr-4 px-2 border border-black border-dashed rounded-full hover:cursor-default" ref={refs.setReference} {...getReferenceProps()}>Time Range</div>
            {
                isMounted && (
                    <FloatingFocusManager context={context} modal={false}>
                        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
                            <div style={transitionStyles} className="p-5 border rounded bg-white">
                                Time Range Selector
                            </div>
                        </div>
                    </FloatingFocusManager>
                )
            }
        </Fragment>
    )
}

export default TimeRangeSelector;