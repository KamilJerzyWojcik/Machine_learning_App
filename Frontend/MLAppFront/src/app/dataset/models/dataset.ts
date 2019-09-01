export class DataSet{
    id: number
    name: string
    size: number
    upload_date: Date
    last_modified_date: Date
    url: string

    constructor(dataset){
        this.id = dataset.id;
        this.name = dataset.name;
        this.size = Number.parseFloat((dataset.size/(1024*1024)).toPrecision(2));
        this.upload_date = new Date(dataset.upload_date);
        this.last_modified_date = new Date(dataset.last_modified_date);
        this.url = dataset.url;
    }

}