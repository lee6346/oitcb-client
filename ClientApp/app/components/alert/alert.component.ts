import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'alert-window',
    templateUrl: 'alert.component.html'
})
export class AlertComponent implements OnInit {

    constructor(private alertService: AlertService) { }

    ngOnInit() {
       
    }
}