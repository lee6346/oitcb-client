import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//replace with shared later..
import { SharedModule } from '../../shared';

import { DataPortalComponent } from './data-portal.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        DataPortalComponent
    ],
    exports: [
        DataPortalComponent
    ],

})
export class DataPortalModule { }