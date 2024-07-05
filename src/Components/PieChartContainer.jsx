import { PieChart } from "react-minimal-pie-chart";
import "../styles/PieChartContainer.css";

export default function PieChartContainer({totals}) {
    return(
        <div className="pie-chart-container">
                <PieChart
                    className="pie-chart"
                    data={totals}
                    startAngle={270}
                    animate={true}
                    background={"white"}
                />

                <div className="legend">
                    {totals.map(category => (
                        <div key={"*" + category.title + "*"} className="row">
                            <div style={{background: category.color}} className="color"></div>
                            <p>{category.title}</p>
                        </div>
                    ))
                    }
                </div>
        </div>
    )
}