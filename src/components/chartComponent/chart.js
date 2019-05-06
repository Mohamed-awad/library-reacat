import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import axios from "axios";



class Chart extends Component{


    constructor(props){
        super(props);
        this.state = {
            chartData : { 
                labels:[],
                datasets:[{
                    label:"Weekly Profit",
                    data:[19,2,4,99],
                    backgroundColor:[
                        'rgba(255,99,132,0.6)',
                        'rgba(54,162,235,0.6)',
                        'rgba(255,206,86,0.6)',
                        'rgba(75,192,192,0.6)',
                    ],
                    borderColor :['rgba(0, 0, 0, 0.5)']
                }]
            },
        }
    } 
    

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/profits/')
            .then(res => {
                if (res.data) {
                    let result = res.data.profit;
                    let weeksNames = [];
                    let resultArray = [];
                    for (let i =0; i<result.length; i++){
                        resultArray.push(Number(result[i].weekly_profit));
                    }
                    for (let i =0; i<result.length; i++){
                        weeksNames.push(result[i].NumofWeek.toString().replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,''));
                    }
                    let chartData = Object.assign({}, this.state.chartData);
                    chartData.datasets.data = resultArray;
                    chartData.labels = weeksNames;
                    this.setState({
                        chartData
                    });
                } else {
                    alert("No Profits");
                }
                console.log(this.state.chartData.datasets.data);
                console.log(this.state.chartData.labels);
            });
    }



    static defaultProps={
        displayTitle: true,
        displayLegend: false,
        legendPosition: 'right'
    }


    render(){
        return(
            <div className="chart">
            <Bar 
                data ={this.state.chartData}
                options={{
                     title:{
                         display:this.props.displayTitle,
                         text:"Bookstore Monthly Profit",
                         fontSize:25
                     },
                     legend:{
                         display:this.props.displayLegend,
                         position:this.props.legendPosition,
                     },
                }}            
            />
            </div>
        )
    }
}

export default Chart;