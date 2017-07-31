import { NgModule } from '@angular/core';
import { AgentRoutingModule } from './agent-routing.module';

import { AgentComponent } from './agent.component';
import { LivePortalModule } from './liveportal/live-portal.module';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        LivePortalModule,
        AgentRoutingModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [
        AgentComponent,
    ]
})
export class AgentModule { }