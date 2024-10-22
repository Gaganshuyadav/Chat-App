import { getLast7Days} from "../../lib/features";
import { Line, Doughnut} from "react-chartjs-2";
import { ArcElement, CategoryScale, Chart, LinearScale, LineElement, PointElement, Legend, plugins, Tooltip } from "chart.js";
  Chart.register( LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Legend, plugins, Tooltip);


const LineChart = ( { dataArray}) => { 
    const lineChartData = {
        type:"line",
        labels: getLast7Days(),
        datasets:[{
            label:'Messages',
            data: dataArray,
            fill:true,
            borderColor:["purple"],
            backgroundColor:["rgb(255, 211, 255)","red","blue", "green", "yellow", "pink", "orange"],
            hoverBackgroundColor:["gray"],
        },]
    };

    const lineChartOptions = {
        responsive:true,
        plugins:{
            legend:{
                display:false,
                position:"bottom",
                fontSize:14,
            },
            title:{
                display:false,
            }
        },
        scales:{
            x:{
                // display:false,
                grid:{
                    display:false,
                }
            },
            y:{
                beginAtZero:true,
                // display:false,
                grid:{
                    display:false,
                }
            }
        }
    };

    return(
        <div>
            <Line 
                data={lineChartData}
                options={lineChartOptions}
            />
        </div>
    )
}

const DoughnutChart = ( { value=[], labels=[]} ) => {

    const doughnutChartData = {
        labels: labels,
        datasets:[{
            label:"Total Chats vs Group Chats",
            data: value,
            fill:true,
            borderColor:["purple"],
            backgroundColor:["rgb(255, 211, 255)","rgb(255, 145, 126)"],
            hoverBackgroundColor:["purple", "tomato"],
            offset:30
        },]
    };

    const doughnutChartOptions = {
        responsive:true,
        plugins:{
            legend:{
                display:true,
                position:"bottom",
                fontSize:14,
            },
            title:{
                display:true,
            }
        },
    
    };

    return(
        <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
    )
}

export { LineChart, DoughnutChart};