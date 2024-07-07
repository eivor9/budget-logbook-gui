import { useState, useEffect } from "react";
import Transaction from "../Components/Transaction";
import Loading from "../Components/Loading ";
import PieChartContainer from "../Components/PieChartContainer";
import "../styles/Index.css";
import logo from "../assets/logo.svg";

const API = import.meta.env.VITE_API;

export default function Index(){
    const [totals, setTotals] = useState([
        {title: "Food and Beverage Purchases", value: 0, color: "transparent"},
        {title: "Facilities and Overheads", value: 0, color: "transparent"},
        {title: "Customer Sales", value: 0, color: "transparent"},
        {titl: "Payroll", value: 0, color: "transparent"},
        {title: "Other", value: 0, color: "transparent"}
    ]);
    const pieColors = ["#F4B886", "#CBE896", "#A18276", "#FCDFA6", "#AAC0AA"];
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
            const categories = calculateCategories(responseJSON);
            setTotals(categories);
        })
        .catch((error) => console.error(error));
    }, []);

    function calculateCategories (a) {
        let total = 0;
        const totals = {};
        for (const transaction of a){
            total += Number(transaction.amountInCents);

            if (!totals[transaction.category])
                totals[transaction.category] = 0;
            totals[transaction.category] += Number(transaction.amountInCents);
        }

        let result = [];
        let i = 0;
        for (const key in totals){
            result.push({
                title: key,
                value: (totals[key]/total) * 100,
                color: pieColors[i]
            })
            i++;
        }
        result = result.sort((x, y) => y.value - x.value);
        return result;
    }

    function sortTransactions(method){
        if (method === sortMethod){
            setTransactions(transactions.reverse());
            setAscDesc(!ascDesc);
        } else {
            if(method === "amountInCents"){
                setSortMethod(method);
                setTransactions(transactions.sort((x, y) => {
                    if (x[method] < y[method]) return -1;
                    else if (x[method] > y[method]) return 1;
                }))
            }else{
                setSortMethod(method);
                setTransactions(transactions.sort((x, y) => {
                    let a = x[method].toLowerCase();
                    let b = y[method].toLowerCase();
                    if (x.category === "Customer Sales" && method === "otherParty")
                        a = "saga"
                    if (y.category === "Customer Sales" && method === "otherParty")
                        b = "saga"
                    if (a < b) return -1;
                    else if (a > b) return 1;
                }))
            }
        }
    }

    return (<>
        {loading ? <Loading loading="loading"/> 
        :<div className="Index">
            {transactions.length ? 
            <>
                <div className="sticky-container">
                    <PieChartContainer totals={totals}/>
                </div>
            
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
                        {transactions.map((transaction) => <Transaction key={transaction.id} transaction={transaction}/>)}
                    </tbody>
                </table>
            </>: <div className="zero-transactions">
                <img src={logo} alt="Bear Logo SVG" />
                <h2>Nothing to see here - yet...</h2>
                <div className="frosted"></div>
                </div>}
        </div>
    }
    </>)
}