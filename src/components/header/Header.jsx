import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import BrowseMenu from "./browseMenu/BrowseMenu";
import NavLink from "./navlink/NavLink";
import PopoverMenu from "./popovermenu/PopoverMenu";

function Header() {
    const params = useLocation();
    const [breadcrumb, setBreadcrumb] = useState();

    useEffect(() => {
        let location = params[0].substring(1);
        if (location === "") {
            location = "Raw Data";
        } else {
            location = location.charAt(0).toUpperCase() + location.slice(1);
        }

        location = "Browse " + location;

        setBreadcrumb(location);
    }, [params]);

    return (
        <header
            className="w-screen flex items-center justify-center bg-background border-b z-20"
            data-testid="main-header"
        >
            <div className="w-11/12 py-3 flex justify-between">
                <div className="flex flex-row items-center">
                    <h1 className="mr-5 h-full">
                        <Link href="/" className="text-2xl font-semibold">
                            Data Platform
                        </Link>
                    </h1>
                    <span className="text-muted-foreground">{breadcrumb}</span>
                </div>
                <nav className="w-5/12 lg:w-4/12 xl:w-3/12 hidden sm:flex justify-between items-end">
                    <BrowseMenu />
                    <NavLink href="saved-sets">Saved Sets</NavLink>
                    <NavLink href="account">Account</NavLink>
                </nav>
                <PopoverMenu />
            </div>
        </header>
    );
}

export default Header;
