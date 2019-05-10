import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import axios from "axios";



class Chart extends Component{


    constructor(props){
        super(props);
        this.state = {
            user: [],
            chartData : { 
                labels:[],
                datasets:[{
                    label:"Weekly Profit",
                    data:[],
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
        let token = localStorage.getItem("TOKEN");
        let user = JSON.parse(localStorage.getItem("USER"));
        this.setState({
            user,
        });
        console.log(user);                  
        if (!token) {
            window.location = "http://localhost:3000/";
        }   
        console.log(user.isAdmin==false)               
        if (user.isAdmin) {
            window.location = "http://localhost:3000/";
        }
        axios.get('http://127.0.0.1:8001/api/profits/',{
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem('TOKEN'),
            },  
        }).then(res => {
                if (res.data) {
                    let result = res.data.profit;
                    let weeksNames = [];
                    let resultArray = [];
                    resultArray = result.map(d=>{
                        return Number(d.weekly_profit);
                    })
                    
                    console.log(resultArray) 
                    for (let i =0; i<result.length; i++){
                        weeksNames.push(result[i].NumofWeek.toString().replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,''));
                    }
                    let NewchartData = {...this.state.chartData};
                    NewchartData.datasets[0].data = resultArray;
                    NewchartData.labels = weeksNames;
                    this.setState({
                        chartData:NewchartData
                    });
                } else {
                    alert("No Profits");
                }
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