import { Component, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs';
import { LiveRequest } from '../../model/LiveRequest';


@Component({
    selector: 'comments',
    templateUrl: './comments.component.html',
})

export class CommentsComponent {
    public requestUrl: string = '/api/AgentTransfer/PendingRequests';
    public queueEmpty: boolean;
    public users: LiveRequest[];
    constructor(private http: Http) {
        this.queueEmpty = true;
    }

    addtoList() {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.requestUrl, options).subscribe(res => { this.users = res.json() as LiveRequest[]; }, error => console.log("Error: " + error));
        //this.getList().subscribe(x => { console.log(x) });
    }

    getList() {
        return this.http.get(this.requestUrl);//.map(data => data.json());
        
    } 

}