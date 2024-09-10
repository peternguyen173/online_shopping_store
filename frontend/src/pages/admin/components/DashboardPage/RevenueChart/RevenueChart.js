import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import axios from 'axios';

const chartSetting = {
    yAxis: [
        {
            label: 'Doanh thu (triệu đồng)',
        },
    ],
    width: 540,
    height: 320,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-10px, 0)',
        },
        [`.${axisClasses.tickLabel}`]: { fontSize: '20px' },
    },
};

const valueFormatter = (value) => `${value} triệu đồng`;

function RevenueChart() {
    const jwt = localStorage.getItem('jwt');
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/admin/orders/daily', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then((response) => {
                const data = response.data;
                setChartData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [jwt]);

    return (
        <BarChart
            dataset={chartData}
            xAxis={[
                {
                    scaleType: 'band',
                    dataKey: 'day',
                    categoryGapRatio: 0.4,
                },
            ]}
            series={[
                {
                    dataKey: 'revenue',
                    valueFormatter,
                    color: '#51829B',
                },
            ]}
            {...chartSetting}
        />
    );
}

export default RevenueChart;
