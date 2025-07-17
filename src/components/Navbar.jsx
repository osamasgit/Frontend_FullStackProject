import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const isAdmin = location.pathname === "/admin";

    return (
        <nav className="navbar">
            <img src="/assets/cropped-Esca-Logo.png" alt="Logo ESCA" />
            <Link to={isAdmin ? "/" : "/admin"}>
                {isAdmin ? "Inicio" : "Admin"}
            </Link>
        </nav>
    )
}

export default Navbar;
