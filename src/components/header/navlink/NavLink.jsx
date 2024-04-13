import { Link, useRoute } from "wouter";
import PropTypes from "prop-types";

const propTypes = {
    text: PropTypes.string,
    href: PropTypes.string
}

function NavLink(props) {
    const [isActive] = useRoute(props.href);

    return (
        <div className="flex justify-center">
            <Link href={props.href} className={isActive ? "text-foreground" : "text-muted-foreground"} data-testid="nav-link">{props.text}</Link>
        </div>
    )
}

NavLink.propTypes = propTypes;
export default NavLink;