import { Directive, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { NgStyle } from '@angular/common';

@Directive({ selector: '[newRequestDirective]' })
export class NewRequestDirective implements OnInit, OnDestroy {


    constructor(private elRef: ElementRef) {
        this.elRef.nativeElement.style.transition = 'all 0.3s ease';
    }

    ngOnInit() { }
    ngOnDestroy() { }

    public highlightButton(color: string) {
        this.elRef.nativeElement.style.backgroundColor = color;
    }

    public blinkButton() {
        this.elRef.nativeElement.style.backgroundColor = 'rgb(40, 71, 119)';
        this.elRef.nativeElement.style.backgroundColor = '#0c2340';
        this.elRef.nativeElement.style.backgroundColor = 'rgb(40, 71, 119)';
        this.elRef.nativeElement.style.backgroundColor = '#0c2340';

    }


}