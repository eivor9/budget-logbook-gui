import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading ";
import "../styles/Show.css";
import Select from "../Components/Select";
import logo from "../assets/logo.svg";

const API = import.meta.env.VITE_API;

export default function Show() {
    const [editAmount, setEditAmount] = useState(false);
    const [transaction, setTransaction] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    // On page load, load log details
    useEffect(() => {
        setLoading(true);

        fetch(`${API}/logbook/${id}`)
        .then((response) => {
            return response.json();
        })
        .then((responseJSON) => {
            setTransaction(responseJSON);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
            navigate("/error");
        });
    }, []);

    // Be able to delete a color. Return to index view.
    const handleDelete = () => {
    fetch(`${API}/logs/${id}`, { method: "DELETE" })
    .then(() => {navigate("/logbook");})
    .catch((error) => console.error(error));
    };

    const dollars = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return (<>
        {loading ? <Loading/> : 
            <div className="transaction-details">
                <header>
                    <h2>Transaction Details</h2>
                    <i className="fa-regular fa-trash-can"></i>
                </header>
                <div className="info">
                    <h3>Date</h3>
                    <input value={transaction.date} type="date"/>
                </div>
                <div className="info">
                    <h3>Description</h3>
                    <textarea value={transaction.description} >{transaction.description}</textarea>
                </div>
                <div className="extras">
                    <div className="extra">
                        <p>Category</p>
                        <Select defaultValue={transaction.category}/>
                    </div>
                    <div className="extra">
                        {editAmount ? <>
                            <p>Amount (in cents)</p>
                            <p>
                                <i onClick={() => setEditAmount(false)} className="fa-regular fa-circle-xmark"></i>
                                <input value={transaction.amountInCents} type="number" />
                            </p>
                        </>
                        :<>
                            <p>Amount</p>
                            <p style={{cursor:"pointer"}} onClick={() => setEditAmount(true)}>{dollars.format(transaction.amountInCents/100)}</p>
                        </>}
                    </div>
                    <div className="extra">
                        <p>Other Party</p>
                        <input value={transaction.otherParty} type="text" />
                    </div>
                </div>
                <footer>
                <p className="transaction-id">
                    <div><img src={logo} alt="The Bear Logo"/></div>
                    Transaction ID: {transaction.id}
                </p>
                <div className="buttons">
                    <Link to="/logbook">Home</Link>
                    <button>Save</button>
                </div>
                </footer>
            </div>
        }
    </>)
}