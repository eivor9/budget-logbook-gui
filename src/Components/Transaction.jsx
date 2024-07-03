import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Log({ transaction }) {
    const { id, date, description, category, otherParty, amountInCents } = transaction;
    const month = date.substring(5,7);
    const day = date.substring(8);
    const year = date.substring(0,4);
    const sale = otherParty === "Customers";

    const navigate = useNavigate();
    return (
        <tr onClick={() => navigate(`/logbook/${id}`)}>
          <td>
            {`${month}/${day}/${year}`}
          </td>
          <td>
            {description}
          </td>
          <td>
            {sale ? "The Bear" : otherParty}
          </td>
          <td>
            {category}
          </td>
          <td style={sale?{color: "green"}:{color: "black"}} class="price">
            {`${sale ? "+" : ""}$${amountInCents/100}`}
          </td>
        </tr>
      );
}