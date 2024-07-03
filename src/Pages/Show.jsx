import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading ";

const API = import.meta.env.VITE_API;

export default function Show() {
    const [date, setDate] = useState()
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
            return responseJSON
        })
        .then((responseJSON) => {
            setDate(responseJSON.date);
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

    const alphaDate = (s) => {
        if(!s) return "";
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
        const month = s.substring(5,7);
        const day = s.substring(8);
        const year = s.substring(0,4);

        const result = `${months[Number(month) - 1]} ${Number(day)}, ${year}`;
        return result;
    }

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
                <h3>Date</h3>
                {alphaDate(date)}
                <h3>Description</h3>
                <p>{transaction.description}</p>
                <div className="extras">
                    <div className="extra">
                        <p>Category</p>
                        <input type="select"/>
                    </div>
                    <div className="extra">
                        <p>Amount</p>
                        <p style={transaction.otherParty === "Customers" ?{color: "green"}:{color: "black"}} className="price">
                            {dollars.format(transaction.amountInCents/100)}
                        </p>
                    </div>
                    <div className="extra">
                        <p>Recipient</p>
                        <p>
                            {transaction.otherParty === "Customers" ? "The Bear" : transaction.otherParty}
                        </p>
                    </div>
                </div>
                <p>Transaction ID: {transaction.id}</p>
            </div>
        }
    </>)
}