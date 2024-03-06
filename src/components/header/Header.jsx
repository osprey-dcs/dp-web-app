import { Link } from "wouter";
import NavLink from "./navlink/NavLink";
import { useState } from "react";
import { useClick, useFloating, useInteractions } from "@floating-ui/react";

function Header() {
    const [isOpen, setIsOpen] = useState();
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'bottom-end'
    });

    const click = useClick(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([click]);

    return (
        <header className="w-screen flex items-center justify-center border-b border-[#F5F4F4]" data-testid="main-header">
            <div className="w-11/12 py-3 flex justify-between">
                <Link href="/" className="text-2xl font-semibold">Data Platform</Link>
                <nav className="w-5/12 lg:w-4/12 xl:w-3/12 hidden sm:flex justify-between between-4 items-end">
                    <NavLink text="Browse Data" href="/" />
                    <NavLink text="Saved Sets" href="saved-sets" />
                    <NavLink text="Account" href="account" />
                </nav>
                <div className="flex justify-end items-center sm:hidden">
                    <button ref={refs.setReference} {...getReferenceProps()}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 50 50">
                            <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
                        </svg>
                    </button>
                    {
                        isOpen && (
                            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className="p-3 border bg-white">Popover</div>
                        )
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;