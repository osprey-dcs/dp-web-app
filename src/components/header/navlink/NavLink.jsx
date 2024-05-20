import { cn } from "@/lib/utils";
import PropTypes from "prop-types";
import { Link, useRoute } from "wouter";

const propTypes = {
    href: PropTypes.string,
};

const NavLink = ({ children, href, ...props }) => {
    const [isActive] = useRoute(href);

    return (
        <div className="flex justify-center" {...props}>
            <Link
                href={href}
                className={cn(
                    "hover:text-foreground",
                    isActive ? "text-foreground" : "text-muted-foreground"
                )}
                data-testid="nav-link"
            >
                {children}
            </Link>
        </div>
    );
};

NavLink.propTypes = propTypes;
export default NavLink;
