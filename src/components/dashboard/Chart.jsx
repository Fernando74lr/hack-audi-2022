import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Title from './Title';

export const Chart = ({ orders }) => {
    return (
        <>
            <Title>Total containers</Title>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={orders}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="partNumber" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalContainers" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}