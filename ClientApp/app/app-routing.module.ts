import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './app-home/home.component';
import { AgentComponent } from './app-agent/agent.component';

export const routes: Routes = [
    //{ path: 'agent', component: AgentComponent }, 
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    //{ path: '**', component: HomeComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
