import React, {useState, useEffect} from 'react';
import {fetchDailyData} from "../../api";
import {Card} from "@material-ui/core";
import {Line, Bar} from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({data: {confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDailyData] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        };
        fetchAPI();
    }, []);
    const lineChart = (
        dailyData.length ? (
            <Line data={{
                labels: dailyData.map(({date}) => date),
                datasets: [{
                    data: dailyData.map(({confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: '#85C1E9',
                    fill: true
                }, {
                    data: dailyData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: '#CF6679',
                    fill: true
                }]
            }}/>
        ) : null);

    const barChart = (
        confirmed ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [
                        {
                            label: 'People',
                            backgroundColor: ['#85C1E9', '#52BE80', '#CF6679'],
                            data: [confirmed.value, recovered.value, deaths.value],
                        },
                    ],
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}` },
                }}
            />
        ) : null
    );


    return (<Card className={styles.container}>
        {country ? barChart : lineChart}
    </Card>)
}
export default Chart;
