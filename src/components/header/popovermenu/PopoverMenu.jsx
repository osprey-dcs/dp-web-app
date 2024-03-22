import { useRef, useState } from "react";
import { FloatingFocusManager, offset, useClick, useDelayGroupContext, useDismiss, useFloating, useInteractions, useListNavigation, useRole, useTransitionStyles } from "@floating-ui/react";
import { Link, useRoute } from "wouter";
import NavLink from "../navlink/NavLink";

function PopoverMenu() {
    const [homeActive] = useRoute("/");
    const [setsActive] = useRoute("saved-sets");
    const [accountActive] = useRoute("account");

    const [isOpen, setIsOpen] = useState();
    const [activeIndex, setActiveIndex] = useState(null);
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'bottom-end',
        middleware: [offset(4)]
    });
    const { isMounted, styles: transitionStyles } = useTransitionStyles(context);

    const listRef = useRef([]);
    const listNavigation = useListNavigation(context, {
        listRef,
        activeIndex,
        onNavigate: setActiveIndex,
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context)
    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([click, dismiss, role, listNavigation]);
    const items = [
        ["Browse Data", "/", homeActive],
        ["Saved Sets", "saved-sets", setsActive],
        ["Account", "account", accountActive]
    ];

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
                                {items.map((item, index) => (
                                    <Link
                                        key={item[0]}
                                        tabIndex={activeIndex === index ? 0 : -1}
                                        ref={(node) => {
                                            listRef.current[index] = node;
                                        }}
                                        {...getItemProps()}
                                        href={item[1]}
                                        onClick={() => setIsOpen(false)}
                                        className={item[2] ? "text-black" : "text-gray-500"}
                                    >
                                        {item[0]}
                                    </Link>
                                ))}
                                {/* <div onClick={() => setIsOpen(false)}><NavLink text="Browse Data" href="/" /></div>
                                <div onClick={() => setIsOpen(false)}><NavLink text="Saved Sets" href="saved-sets" /></div>
                                <div onClick={() => setIsOpen(false)}><NavLink text="Account" href="account" /></div> */}
                            </div>
                        </div>
                    </FloatingFocusManager>
                )
            }
        </div>
    )

}

export default PopoverMenu;