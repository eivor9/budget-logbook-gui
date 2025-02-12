import '../styles/Home.css'
import { Link } from 'react-router-dom';
import stockPhoto from "../assets/stock-photo.jpeg";

export default function Home() {
    return (
        <div className='Home'>
            <img src={stockPhoto} alt="stock photo" />
            <div className="details">
                <h2>RESTAURANT</h2>
                <hr/>
                <p>Saga is an elegant take on contemporary cuisine curated by WNBA All-Star, Caitlin Clark and  Alan Wake, New York Times bestselling author.</p>
                <p>The exclusive 12 seater, concealed by an art gallery, offers an intimate dining experience with an open kitchen overlooking the chef’s work.</p>
                <p>This website is the record-keeping system that tracks financial transactions for Saga, including sales, expenses, payroll, and inventory costs. This administrative tool provides an accurate overview of the restaurant's financial health.</p>
                <Link to="/logbook">
                    <div id="background" className="background"></div>
                    Financial Log Book
                </Link>
                <div className="icons">
                    <i className="fa-brands fa-instagram"></i>
                    <p>PRESS</p>
                    <i className="fa-regular fa-envelope"></i>
                </div>
            </div>
        </div>
    )
}