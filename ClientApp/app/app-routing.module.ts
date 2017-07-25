import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'contact', pathMatch: 'full' },
    { path: 'home', loadChildren: 'app/home/home.module#HomeModule' },
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
    { path: 'agent', loadChildren: 'app/agent/agent.module#AgentModule' },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
