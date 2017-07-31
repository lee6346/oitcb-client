import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'agent',
    templateUrl: './agent.component.html',
    styleUrls: ['./agent.component.css']
})
export class AgentComponent {

    constructor(private router: Router) { }
    
    public authLogout() {
        this.router.navigate(['/agent']/*[/agent, agent['id']]*/);
    }
}