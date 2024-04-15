import { Link } from "wouter";
import NavLink from "./navlink/NavLink";
import PopoverMenu from "./popovermenu/PopoverMenu";

function Header() {

    return (
        <header className="w-screen flex items-center justify-center border-b" data-testid="main-header">
            <div className="w-11/12 py-3 flex justify-between">
                <h1><Link href="/" className="text-2xl font-semibold">Data Platform</Link></h1>
                <nav className="w-5/12 lg:w-4/12 xl:w-3/12 hidden sm:flex justify-between items-end">
                    <NavLink text="Browse Data" href="/" />
                    <NavLink text="Saved Sets" href="saved-sets" />
                    <NavLink text="Account" href="account" />
                </nav>
                <PopoverMenu />
            </div>
        </header>
    );
}

export default Header;