'use client';
import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class ViewChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [
                {
                    name: 'VIEW',
                    data: [
                        '132',
                        '165',
                        '180',
                        '230',
                        '580',
                        '210',
                        '280',
                        '600',
                        '560',
                        '720',
                        '430',
                        '690',
                    ],
                },
            ],
            options: {
                chart: {
                    type: 'area',
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
                    width: 5,
                    colors: ['#2563eb'],
                },
                title: {
                    text: 'Visit Statistics',
                    align: 'left',
                },
                xaxis: {
                    type: 'category',
                    categories: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                    ],
                },
                // yaxis: {
                //     opposite: true,
                // },
                // legend: {
                //     horizontalAlign: 'left',
                // },
            },
        };
    }

    render() {
        return (
            <Chart
                options={this.state.options}
                series={this.state.series}
                type="area"
                width="100%"
                height={'100%'}
            />
        );
    }
}

export default ViewChart;
