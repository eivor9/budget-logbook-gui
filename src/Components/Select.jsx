export default function Select({ defaultValue }) {
    const categories = ["Food and Beverage Purchases", "Facilities and Overheads", "Customer Sales", "Payroll", "Other"];
    return (
        <select defaultValue={defaultValue} name="category" id="category">
            {categories.map(category => <option value={category}>{category}</option>)}
        </select>
    )
}