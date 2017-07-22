export class LiveRequest {
    public conv_id: string;
    public action: string;

    public date: string;
    public user: string;
    constructor(conv_id: string, action: string, user: string = "student") {
        this.conv_id = conv_id;
        this.action = action;
        
        this.date = this.getCurrentDateTime();
        this.user = user;
    }

    public getCurrentDateTime() : string {
        let today = new Date();
        let date = today.getDate() + "/" + (today.getMonth() + 1) + "/"  + today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        //let ampm = today.getHours() > 12 ? "pm" : "am";
        //let hours = today.getHours() % 12;
        return date + ' ' + time;
    }
}