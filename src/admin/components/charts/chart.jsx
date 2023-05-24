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

function Charts({ dataChart }) {

    return (
        <div className='charts'>
            <div className='chartsTitleContainer'>
                <span className="chartsTitle">Bài viết theo từng tháng năm 2023</span>
            </div>
            <ResponsiveContainer width="100%" height="20%" aspect={3.5}>
                <LineChart
                    width={500}
                    height={300}
                    data={dataChart}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" name='Tháng' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" name='Bài viết' dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Charts;