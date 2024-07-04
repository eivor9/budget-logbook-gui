import { useState } from "react";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { nanoid } from 'nanoid';

const API = import.meta.env.VITE_API;


export default function New(){
    const categories = ["Food and Beverage Purchases", "Facilities and Overheads", "Customer Sales", "Payroll", "Other"];
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState({
        id: `bls-${nanoid(7)}`,
        date: "",
        description: "",
        category: "Other",
        otherParty: "",
        amountInCents: 0
    });

    const handleTextChange = (event) => {
        setTransaction({ ...transaction, [event.target.id]: event.target.value });
    };

    const handleNumberChange = (event) => {
        setTransaction({ ...transaction, [event.target.id]: Number(event.target.value)});
    }

    const addTransaction = () => {
        fetch(`${API}/logbook`, {
          method: "POST",
          body: JSON.stringify(transaction),
          headers: {"Content-Type": "application/json"}
        })
        .then(() => {
            navigate(`/logbook`);
        })
        .catch((error) => console.error("catch", error));
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        addTransaction();
    };
    return (
        <form onSubmit={handleSubmit} className="transaction-details">
                <header>
                    <h2>New Transaction</h2>
                </header>
                <div className="info">
                    <h3>Date</h3>
                    <input required id="date" onChange={handleTextChange} value={transaction.date} type="date"/>
                </div>
                <div className="info">
                    <h3>Description</h3>
                    <textarea required id="description" onChange={handleTextChange} value={transaction.description} >{transaction.description}</textarea>
                </div>
                <div className="extras">
                    <div className="extra">
                        <p>Category</p>
                        <select onChange={handleTextChange} value={transaction.category} name="category" id="category">
                            {categories.map(category => <option key={category} value={category}>{category}</option>)}
                        </select>
                    </div>
                    <div className="extra">
                        <p>Amount (in cents)</p>
                        <p>
                            <input min="0" required onChange={handleNumberChange} id="amountInCents" value={transaction.amountInCents} type="number" />
                        </p>
                    </div>
                    <div className="extra">
                        <p>Other Party</p>
                        <input required placeholder="e.g., Farmer's Market, Insurance Company" onChange={handleTextChange} id="otherParty" value={transaction.otherParty} type="text" />
                    </div>
                </div>
                <footer>
                <p className="transaction-id">
                    <img src={logo} alt="The Bear Logo"/>
                    Transaction ID: {transaction.id}
                </p>
                <div className="buttons">
                    <Link to="/logbook">Cancel</Link>
                    <button>Save</button>
                </div>
                </footer>
            </form>
    )
}