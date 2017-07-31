import { NgModule } from '@angular/core';


import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//components, directives, and pipes in this directory



@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [
    ],
    exports: [
        FormsModule,
        CommonModule,
    ]

})
export class SharedModule { }