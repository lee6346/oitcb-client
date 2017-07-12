
import { Component} from '@angular/core';

import { TestModal } from '../test-modal/test-modal';




@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {

    private showModal: boolean = false;

    constructor() {
        
    }
    showConver() {
        this.showModal = true;
    }

    removeConver(showModal: boolean) {
        this.showModal = showModal;
    }



}
