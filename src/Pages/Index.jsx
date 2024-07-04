import { useState, useEffect } from "react";
import Transaction from "../Components/Transaction";
import Loading from "../Components/Loading ";
import "../styles/Index.css";

const API = import.meta.env.VITE_API;

export default function Index(){
    const [transactions, setTransactions] = useState([]);
    const [sortMethod, setSortMethod] = useState("");
    const [ascDesc, setAscDesc] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch(`${API}/logbook`)
        .then((response) => {
            return response.json();
        })
        .then((responseJSON) => {
            setLoading(false); 
            setTransactions(responseJSON);
        })
        .catch((error) => console.error(error));
    }, []);

    function sortTransactions(method){
        if (method === sortMethod){
            setTransactions(transactions.reverse());
            setAscDesc(!ascDesc);
        } else {
            setSortMethod(method);
            setTransactions(transactions.sort((x, y) => {
                if (x[method] < y[method]) return -1;
                else if (x[method] > y[method]) return 1;
            }))
        }
    }

    return (<>
        {loading ? <Loading loading="loading"/> :
            <table>
                <thead>
                <tr>
                    <th onClick={() => sortTransactions("date")}>Date</th>
                    <th onClick={() => sortTransactions("description")}>Description</th>
                    <th onClick={() => sortTransactions("otherParty")}>Recipient</th>
                    <th onClick={() => sortTransactions("category")}>Category</th>
                    <th onClick={() => sortTransactions("amountInCents")}>Amount</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => {
                    return <Transaction key={transaction.id} transaction={transaction}/>;
                })}
                </tbody>
            </table>
    }
    </>)
}