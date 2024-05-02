import { Link, useRoute } from "wouter";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils"

const propTypes = {
    href: PropTypes.string
}

const NavLink = (({ children, href }) => {
    const [isActive] = useRoute(href);

    return (
        <div className="flex justify-center">
            <Link href={href} className={cn("hover:text-foreground", isActive ? "text-foreground" : "text-muted-foreground")} data-testid="nav-link">{children}</Link>
        </div>
    )
})

NavLink.propTypes = propTypes;
export default NavLink;