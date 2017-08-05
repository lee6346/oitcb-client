
//ng libs
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

//rxjs lib
import * as Rx from 'rxjs/Rx';
import { ISubscription } from "rxjs/Subscription";

//services
import { WebsocketService, LiveRequestService } from '../../core';

//models
import { LiveRequest } from '../../model';


@Component({
    selector: 'data-portal',
    templateUrl: './data-portal.component.html',
    styleUrls: ['./data-portal.component.css'],
    
})
export class DataPortalComponent {

    constructor() { }



}