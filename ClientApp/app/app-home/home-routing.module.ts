import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ChatBotComponent } from './chatbot/chatbot.component';

const homeRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: ChatBotComponent
            },
            {
                path: '**',
                component: ChatBotComponent
            }
        ],
    }
];


@NgModule({
    imports: [
        RouterModule.forChild(
            homeRoutes,
        )

    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule { }