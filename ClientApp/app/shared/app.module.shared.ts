import { NgModule } from '@angular/core';

//angular modules w/o service providers (widgets, UI, etc)
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



//environment variables


//components, directives, and pipes in this directory
import { } from './components';
import { } from './directives';
import { } from './pipes';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports:[FormsModule, CommonModule]

})
export class SharedModule { }