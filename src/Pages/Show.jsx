import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import Loading from "../Components/Loading ";
import "../styles/Show.css";
import logo from "../assets/logo.svg";

const API = import.meta.env.VITE_API;

export default function Show() {
    const categories = ["Food and Beverage Purchases", "Facilities and Overheads", "Customer Sales", "Payroll", "Other"];
    const [cancelEdit, setCancelEdit] = useState(false);
    const [changesMade, setChangesMade] = useState(false);
    const [editAmount, setEditAmount] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [transaction, setTransaction] = useState({
        id: "",
        date: "",
        description: "",
        category: "",
        otherParty: "",
        amountInCents: 0
    });
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
            responseJSON.amountInCents = Number(responseJSON.amountInCents)
            setTransaction(responseJSON);
            setLoading(false);
            setEditAmount(false);
            setChangesMade(false);
        })
        .catch((error) => {
            console.error(error);
            navigate("/error");
        });
    }, [cancelEdit]);

    // Be able to delete a color. Return to index view.
    const handleDelete = () => {
        console.log()
        fetch(`${API}/logbook/${id}`, { method: "DELETE" })
        .then(() => {navigate("/logbook");})
        .catch((error) => console.error(error));
    }

    const dollars = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const handleTextChange = (event) => {
        setChangesMade(true);
        setTransaction({ ...transaction, [event.target.id]: event.target.value });
    };

    const handleNumberChange = (event) => {
        setChangesMade(true);
        setTransaction({ ...transaction, [event.target.id]: Number(event.target.value)});
    }

    const updateTransaction = () => {
        setLoading(true);

        fetch(`${API}/logbook/${id}`, {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transaction)
        })
        .then(() => {
          setLoading(false);
          setCancelEdit(false);
          setEditAmount(false);
          setChangesMade(false);
        })
        .catch((error) => console.error("bad edit form", error));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateTransaction();
    };

    return (<>
        {loading ? <Loading loading="updating"/> : 
            <form onSubmit={handleSubmit} className="transaction-details">
                <header>
                    <h2>Transaction Details</h2>
                    <i onClick={() => setConfirmDelete(true)} className="fa-regular fa-trash-can"></i>
                    {confirmDelete ? 
                        <div className="greyed-out">
                            <div className="popup">
                                <h2>
                                    Confirm Delete
                                    <p>Are you sure? Deleting this transaction cannot be undone.</p>
                                </h2>
                                <div>
                                    <button onClick={() => handleDelete()}>Ok</button>
                                    <button onClick={() => setConfirmDelete(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    :null}
                </header>
                <div className="info">
                    <label htmlFor="date">Date</label>
                    <input required id="date" onChange={handleTextChange} value={transaction.date} type="date"/>
                </div>
                <div className="info">
                    <label htmlFor="description">Description</label>
                    <textarea required id="description" onChange={handleTextChange} value={transaction.description} >{transaction.description}</textarea>
                </div>
                <div className="extras">
                    <div className="extra">
                        <label htmlFor="category">Category</label>
                        <select required onChange={handleTextChange} value={transaction.category} name="category" id="category">
                            {categories.map(category => <option key={category} value={category}>{category}</option>)}
                        </select>
                    </div>
                    <div className="extra">
                        <label htmlFor="otherParty">Other Party</label>
                        <input className="line-it-up" required placeholder="e.g., Farmer's Market, Geico" onChange={handleTextChange} id="otherParty" value={transaction.otherParty} type="text" />
                    </div>
                    <div className="extra">
                        {editAmount ? <>
                            <label htmlFor="amountInCents">Amount (in cents)</label>
                            <p>
                                <i onClick={() => setEditAmount(false)} className="fa-regular fa-circle-xmark"></i>
                                <input className="line-it-up" required min="0" onChange={handleNumberChange} id="amountInCents" value={transaction.amountInCents} type="number" />
                            </p>
                        </>
                        :<>
                            <p>Amount</p>
                            <p style={{cursor:"pointer"}} onClick={() => setEditAmount(true)}>{dollars.format(transaction.amountInCents/100)}</p>
                        </>}
                    </div>
                </div>
                <footer>
                <p className="transaction-id">
                    <img src={logo} alt="The Bear Logo"/>
                    Transaction ID: {transaction.id}
                </p>
                <div className="buttons">
                    {changesMade ? <>
                        <Link onClick={() => setCancelEdit(!cancelEdit)}>Cancel</Link>
                        <button>Save</button>
                    </>:<>
                        <Link to="/logbook">Home</Link>
                    </>}
                </div>
                </footer>
            </form>
        }
    </>)
}