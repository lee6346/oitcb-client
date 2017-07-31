import { Directive, ViewContainerRef, ComponentRef, ElementRef, ComponentFactoryResolver, ReflectiveInjector, Type, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Directive({ selector: '[requestTimer]' })
export class TimerDirective implements OnInit, OnDestroy {

    constructor(elref: ElementRef) { }

    ngOnInit() {


    }
    ngOnDestroy() { }

}