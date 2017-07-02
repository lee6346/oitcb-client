// the root component modue for all other compponets

import { Component } from '@angular/core';
//selector: <app>, returns the template file app.component.html, styles the template with app.component.css
@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
}
