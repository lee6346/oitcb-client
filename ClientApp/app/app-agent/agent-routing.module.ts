import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentComponent } from './agent.component';
import { LivePortalComponent } from './liveportal/live-portal.component';

const agentRoutes: Routes = [
    {
        path: 'agent',
        component: AgentComponent,
        children: [
            {
                path: '',
                component: LivePortalComponent
            },
            {
                path: '**',
                component: LivePortalComponent
            }
        ],
    }
];


@NgModule({
    imports: [
        RouterModule.forChild(
            agentRoutes,
        )

    ],
    exports: [
        RouterModule
    ]
})
export class AgentRoutingModule { }