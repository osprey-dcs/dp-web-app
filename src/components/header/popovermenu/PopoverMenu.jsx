import { useState } from "react";
import { FloatingFocusManager, offset, useClick, useDismiss, useFloating, useInteractions, useRole, useTransitionStyles } from "@floating-ui/react";
import NavLink from "../navlink/NavLink";

function PopoverMenu() {
    const [isOpen, setIsOpen] = useState();
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'bottom-end',
        middleware: [offset(8)]
    });
    const { isMounted, styles: transitionStyles } = useTransitionStyles(context);

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context)
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

    return (
        <div className="flex justify-end items-center sm:hidden">
            <button ref={refs.setReference} {...getReferenceProps()}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 50 50">
                    <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
                </svg>
            </button>
            {
                isMounted && (
                    <FloatingFocusManager context={context} modal={false}>
                        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
                            <div style={transitionStyles} className="p-3 flex flex-col items-start border rounded bg-white">
                                <NavLink text="Browse Data" href="/" />
                                <NavLink text="Saved Sets" href="saved-sets" />
                                <NavLink text="Account" href="account" />
                            </div>
                        </div>
                    </FloatingFocusManager>
                )
            }
        </div>
    )

}

export default PopoverMenu;