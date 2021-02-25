import { api, LightningElement, track } from 'lwc';
import generateXml from '@salesforce/apex/XmlGenerator.generateXml';
import getAllMetadata from '@salesforce/apex/RetrieveMetadata.getAllMetadata';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

const COLS = [{ label: 'Name', fieldName: 'name' }, { label: 'Type', fieldName: 'type' }];

export default class MetadataComponent extends LightningElement {
    @api recordId;
    @track dataRow;
    @track column = COLS;
    @track selectedRows;
    @track isModalOpen = false;
    commitDescription;

    //Connected Callback method to retrieve metadata on component load.
    connectedCallback() {
        this.getRecord();
    }

    //handler to get selected records for commit.
    getSelectedRows() {
        this.selectedRows = this.template.querySelector('lightning-datatable').getSelectedRows();
        this.isModalOpen = true;
    }

    //handler to retrieve commit description
    handleDescription(event) {
        this.commitDescription = event.target.value;
    }

    //handler to commit metadata.
    handleCommit() {
        generateXml({ selectedMetadata: JSON.stringify(this.selectedRows), userStoryId: this.recordId, commitDesc: this.commitDescription }).then(response => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Commit for User Story '+this.recordId+' Done Successfully',
                    variant: 'success',
                }),
            );
            this.closeModal();
        }).catch(error => {
            console.error(error);
        });
    }

    //Method to close modal
    closeModal() {
        this.isModalOpen = false;
    }

    //Method to retrieve metadata from salesforce org.
    getRecord() {
        getAllMetadata().then(d => {
            this.dataRow = d;
        }).catch(error => {
            console.error('Error Message ' + error);
        });
    }
}