import { api, LightningElement, track } from 'lwc';
import generateXml from '@salesforce/apex/XmlGenerator.generateXml';
//import getLightningComponents1 from '@salesforce/apex/getLWCComponents.getLightningComponents1';
import getAllMetadata from '@salesforce/apex/getLWCComponents.getAllMetadata';
import getAllMetadata1 from '@salesforce/apex/getLWCComponents.getAllMetadata1';

const COLS = [{ label: 'Name', fieldName: 'name' }, { label: 'Type', fieldName: 'type' }, { label: 'Last Modified Date', fieldName: 'lastModifiedDate' }];

export default class SampleComponent extends LightningElement {
    @api recordId;
    @track dataRow;
    tableElement;
    @track options;
    @track selectedValue;
    @track column = COLS;
    sessionId;
    @track typeOptions;
    usId;


    handleValueChange(event) {
        this.selectedValue = event.target.value;
    }
    connectedCallback() {
        console.log('RecordId - ' + this.recordId);
        this.usId = this.recordId;
        this.getRecord();
    }

    getSelectedRows() {
        var selected = [];
        selected = JSON.stringify(this.template.querySelector('lightning-datatable').getSelectedRows());
        console.log(selected);
        console.log('usId : ' + this.usId);
        console.log('rId : ' + this.recordId);
        generateXml({ selectedMetadata: selected, userStoryId: this.recordId }).then(response => { }).catch(error => {
            console.error(error);
        });
    }

    getRecord() {
        getAllMetadata().then(d => {
            this.dataRow = d;
        }).catch(error => {
            console.error('Error Message ' + error.message);
        });
        /*let p = [];
        p = this.dataRow;
        let temp = [];
        p.forEach(element=>{
            if(element.type == 'Apex Class') {
                temp.push(element);
            }
        });
        for(let i=0;i<this.dataRow.size();i++) {
            if(this.dataRow[i].type == 'Apex Class') {
                temp.push(this.dataRow[i]);
            }
        }
        this.options = temp;*/
    }
    getRecord1() {
        getAllMetadata1().then(d => {
            this.dataRow = d;
            d.forEach(element => {
                console.log('Name - '+ element.Name +', Last Modified date - '+element.lastModifiedDate);
            });
            // let dd = [];
            // d.forEach(element => {
            //     let newObject = {};
            //     newObject.name = element.Id;
            //     newObject.type = element.attributes.type;
            //     dd.push(newObject);
               
            // });
            // console.log('Apex Classes - ' + dd);
            // this.dataRow = dd;
        }).catch(error => {
            console.error('Error Message ' + error.message);
        });
    }

    handleSearch(event) {
        // searchMetadata({search : event.target.value}).then(response=>{
        //     if(response == null) {
        //         this.dataRow = response;
        //     } else {
        //         this.dataRow = response;
        //     }
        // }).catch(error=>{
        //     console.error(error);
        // });
    }

    /*loadMoreData(event) {
        console.log('Load more JS made');
        //Display a spinner to signal that data is being loaded
        if(event.target){
            event.target.isLoading = true;
        }
        this.tableElement = event.target;
        //Display "Loading" when more data is being loaded
        this.loadMoreStatus = 'Loading';

        wireCall( {recToReturn : 10} )
            .then((data) => {
                console.log('Load more Call made');  
                    const currentData = this.dataRow;
                    //Appends new data to the end of the table
                    this.dataRow = this.dataRow.concat(data); 
                    this.loadMoreStatus = '';
                    this.totalRecords = this.dataRow.length; 
                    if (this.dataRow.length  >= this.maxRows) {
                        this.tableElement.enableInfiniteLoading = false;
                        this.loadMoreStatus = 'No more data to load';
                    }

                if(this.tableElement){
                    this.tableElement.isLoading = false;
                } 
            }
        );
    }*/
}