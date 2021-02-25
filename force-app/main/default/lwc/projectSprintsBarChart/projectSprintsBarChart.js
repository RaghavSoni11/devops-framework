import { api, LightningElement, wire } from 'lwc';
import chartjs from '@salesforce/resourceUrl/Chart'; 
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import projectSprints from '@salesforce/apex/LwcChartController.getProjectSprints'

export default class ProjectSprintsBarChart extends LightningElement {
    @api recordId;
    chartjsInitialized = false;
    chartConfiguration;

    connectedCallback() {
        // projectSprints({projectId:this.recordId}).then(response=>{
        //     if(response) {
        //         let draftSprintData = [];
        //         let plannedSprintData = [];
        //         let inProgressSprintData = [];
        //         let completedSprintData = [];
        //         let chartLabel = [];
        //         data.forEach(sprint => {
        //             if(sprint.status == 'Draft') {
        //                 draftSprintData.push(sprint.count);
        //             } else if(sprint.status == 'Planned') {
        //                 plannedSprintData.push(sprint.count);
        //             } else if(sprint.status == 'In Progress') {
        //                 inProgressSprintData.push(sprint.count);
        //             } else if(sprint.status == 'Completed') {
        //                 completedSprintData.push(sprint.count);
        //             }
        //             chartLabel.push(sprint.label);
        //         });

        // this.chartConfiguration = {
        //     type: 'bar',
        //     data: {
        //         labels: ['One', 'Two', 'Three'],
        //         datasets: [
        //             {
        //                 label: 'Dataset 1',
        //                 backgroundColor: '#848484',
        //                 data: [4, 2, 6]
        //             },
        //             {
        //                 label: 'Dataset 2',
        //                 backgroundColor: '#848484',
        //                 data: [1, 6, 3]
        //             },
        //             {
        //                 label: 'Dataset 3',
        //                 backgroundColor: '#848484',
        //                 data: [7, 5, 2]
        //             }
        //         ]
        //     },
        //     options: {
        //         title: {
        //             display: false,
        //             text: 'Stacked Bars'
        //         },
        //         tooltips: {
        //             mode: 'label'
        //         },
        //         responsive: true,
        //         maintainAspectRatio: false,
        //         scales: {
        //             xAxes: [
        //                 {
        //                     stacked: true
        //                 }
        //             ],
        //             yAxes: [
        //                 {
        //                     stacked: true
        //                 }
        //             ]
        //         },
        //         //onClick: handleClick
        //     }
        // };
    
        //         this.chartConfiguration = {
        //             type: 'bar',
        //             data: {
        //                 datasets: [{
        //                         label: 'Draft',
        //                         backgroundColor: "grey",
        //                         data: draftSprintData,
        //                     },
        //                     {
        //                         label: 'Planned',
        //                         backgroundColor: "orange",
        //                         data: plannedSprintData,
        //                     },
        //                     {
        //                         label: 'In Progress',
        //                         backgroundColor: "blue",
        //                         data: inProgressSprintData,
        //                     },
        //                     {
        //                         label: 'Completed',
        //                         backgroundColor: "green",
        //                         data: completedSprintData,
        //                     },
        //                 ],
        //                 labels: chartLabel,
        //             },
        //             options: {},
        //         };
        //         console.log('data => ', response);
        //     }
        // }).catch(error=>{
        //     console.error(error);
        // });
    }

    // renderedCallback(){
    //     if (this.isChartJsInitialized) {
    //         return;
    //     }
    //     // load chartjs from the static resource
    //     Promise.all([loadScript(this, chartjs)]).then(() => {
    //         this.isChartJsInitialized = true;
    //         const ctx = this.template.querySelector('canvas.barChart').getContext('2d');
    //         this.chart = new window.Chart(ctx, this.chartConfiguration);
    //     }).catch(error => {
    //             this.dispatchEvent(
    //                 new ShowToastEvent({
    //                     title: 'Error loading Chart',
    //                     message: error.message,
    //                     variant: 'error',
    //                 })
    //             );
    //     });
    // }
    // handleClick() {

    // }
}