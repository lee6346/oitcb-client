export class LiveRequest {
    public conv_id: string;
    public user: string;
    public action: string;
    public date: string;
    constructor(conv_id: string, user: string, action: string) {
        this.conv_id = conv_id;
        this.user = user;
        this.action = action;
        this.date = new Date().toISOString();
    }
}