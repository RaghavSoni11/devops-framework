import { api, LightningElement, track, wire } from 'lwc';
//importing the Chart library from Static resources
import chart from '@salesforce/resourceUrl/Chart'; 
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import projectSprints from '@salesforce/apex/LwcChartController.getProjectSprints'

export default class ProjectSprintsChart extends LightningElement {
    @api recordId;
    @track checkSprints = false;
    // @wire(projectSprints,{projectId:'$recordId'}) results({error,data})
    // {
    //     if(data)
    //     {
    //         for(var key in data)
    //         {
    //             this.updateChart(key.count,key.label);
    //         }
    //         this.error=undefined;
    //     }
    //     else if(error)
    //     {
    //         this.error = error;
    //         this.results = undefined;
    //     }
    // }
    chart;
    chartjsInitialized = false;
    config={
    type : 'doughnut',
    data :{
    datasets :[
    {
    data: [
    ],
    backgroundColor :[
        'rgb(133,0,39)',
        'rgb(0,168,255)',
        'rgb(221,99,255)',
        'rgb(160,158,26)',
        'rgb(255,99,132)',
        'rgb(255,159,64)',
        'rgb(255,205,86)',
        'rgb(75,192,192)',
        'rgb(80,140,40)',
        'rgb(76,186,255)',
        'rgb(16,185,86)',
        'rgb(0,133,255)'
    ],
    label:'Dataset 1'
    }
    ],
    labels:[]
    },
    options: {
        responsive : true,
    legend : {
        position :'right'
    },
    animation:{
    animateScale: true,
    animateRotate : true
    }
    }
    };

    connectedCallback() {
        projectSprints({projectId:this.recordId}).then(response=>{
            //console.log('DataSet : '+response);
            // if(response.length>0) {
            //     this.checkSprints = true;
                for(var key in response)
                {
                    //console.log('Key : '+key);
                    //console.log('Key : '+response[key]);
                    this.updateChart(response[key].count,response[key].label);
                }
            // }else {
            //     this.checkSprints = false;
            // }
        }).catch(error=>{
            console.error(error);
        });
        
    }

    renderedCallback()
    {
        // if(this.checkSprints){
            if(this.chartjsInitialized)
            {
                return;
            }
            this.chartjsInitialized = true;
            Promise.all([
            loadScript(this,chart)
            ]).then(() =>{
                const ctx = this.template.querySelector('canvas.donut')
                .getContext('2d');
                this.chart = new window.Chart(ctx, this.config);
            })
            .catch(error =>{
                this.dispatchEvent(
                new ShowToastEvent({
                title : 'Error loading ChartJS',
                message : error.message,
                variant : 'error',
            }),
            );
            });
        //}
    }
    updateChart(count,label)
    {
        this.chart.data.labels.push(label);
        this.chart.data.datasets.forEach((dataset) => {
            dataset.data.push(count);
        });
        this.chart.update();
    }
}