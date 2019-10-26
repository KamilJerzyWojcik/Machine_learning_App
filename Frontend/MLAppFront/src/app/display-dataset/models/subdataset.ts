export class SubDataSet{
    id: number
    name: string
    size: number
    upload_date: Date
    last_modified_date: Date
    create_date: Date;
    url: string
    dataset_id: number

    constructor(subdataset){
        this.id = subdataset.id;
        this.name = subdataset.name;
        this.size = Number.parseFloat((subdataset.size/(1024*1024)).toPrecision(2));
        this.upload_date = new Date(subdataset.upload_date);
        this.last_modified_date = new Date(subdataset.last_modified_date);
        this.url = subdataset.url;
        this.dataset_id = subdataset.id;
        this.create_date = subdataset.create_date;
    }

}