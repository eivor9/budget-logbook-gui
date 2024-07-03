import '../styles/NavBar.css';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import { useLocation } from 'react-router-dom';

export default function NavBar() {
    const currentRoute = useLocation().pathname;
    return (
        <nav>
            <div className='background-filter'></div>
            <Link to="/"><h1>The Bear <img src={logo} alt="Bear PNG" /></h1></Link>
            {currentRoute === "/logbook" ? <Link to="logbook/new">NEW TRANSACTION</Link> : null}
        </nav>
    );
}
