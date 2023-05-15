import './charts.css';
import {
    LineChart,
    Line,
    Legend,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function Charts() {
    const data = [
        { name: "Tháng 1", Total: 1200 },
        { name: "Tháng 2", Total: 2100 },
        { name: "Tháng 3", Total: 800 },
        { name: "Tháng 4", Total: 1600 },
        { name: "Tháng 5", Total: 900 },
        { name: "Tháng 6", Total: 1700 },
        { name: "Tháng 7", Total: 300 },
        { name: "Tháng 8", Total: 800 },
        { name: "Tháng 9", Total: 500 },
        { name: "Tháng 10", Total: 1700 },
        { name: "Tháng 11", Total: 1000 },
        { name: "Tháng 12", Total: 1200 },
    ];

    return (
        <div className='charts'>
            <div className='chartsTitleContainer'>
                <span className="chartsTitle">Bài viết theo từng tháng năm 2023</span>
            </div>
            <ResponsiveContainer width="100%" height="20%" aspect={3.5}>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" name='Bài viết' dataKey="Total" stroke="#8884d8" activeDot={{ r: 8 }} />

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Charts;