import { Component } from '@angular/core';
// component that renders the home component hmtl when clicking <home> or [route /home]
@Component({
    selector: 'contact',
    templateUrl: './contact.component.html'
})
export class ContactComponent {
    contact_info = {
        phone: '111-111-1111',
        email: 'testing@gmail.com',
        location: '1',
        available_hours: '0800-1500'
    }
    

}