import { useNavigate } from "react-router-dom";

export default function Transaction({ transaction }) {
    const { id, date, description, category, otherParty, amountInCents } = transaction;
    const month = date.substring(5,7);
    const day = date.substring(8);
    const year = date.substring(0,4);
    const sale = category === "Customer Sales";

    const navigate = useNavigate();

    const dollars = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });

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
          <td className={sale ? "sale price": "price"}>
            {dollars.format(amountInCents/100)}
          </td>
        </tr>
      );
}