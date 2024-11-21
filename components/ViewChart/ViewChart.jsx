'use client';
import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class ViewChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [
                {
                    name: props.name,
                    data: props.data.data,
                },
            ],
            options: {
                chart: {
                    id: 'line',
                    zoom: {
                        enabled: false,
                    },
                    dropShadow: {
                        enabled: true,
                        top: 5,
                        left: 0,
                        blur: 3,
                        color: '#000',
                        opacity: 0.35,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth',
                    width: 1,
                    colors: ['#2563eb'],
                },
                title: {
                    text: props.title,
                    align: 'left',
                },
                xaxis: {
                    type: 'category',
                    categories: props.data.categories,
                },
            },
        };
    }

    render() {
        return (
            <Chart
                options={this.state.options}
                series={this.state.series}
                type={this.props.type}
                width="100%"
                height={'100%'}
            />
        );
    }
}

export default ViewChart;
