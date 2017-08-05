import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChange } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { NgStyle } from '@angular/common';

@Directive({
    selector: '[minWindowDirective]'
})
export class MinimizeWindowDirective implements OnChanges {

    @Input() connStatus: boolean;
    @Input() idleMessages: number;



    @HostListener('mouseenter') onMouseEnter(){
        this.highlightButton('blue');
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.highlightButton(null);
    }
    constructor(private elRef: ElementRef) {
        this.elRef.nativeElement.style.transition = 'all 0.3s ease';
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        if (changes['connStatus'] && (changes['connStatus'].currentValue == false)) {
            this.highlightButton('red');
        }
        if (changes['idleMessages'] && (changes['idleMessages'].currentValue > changes['idleMessages'].previousValue)) {
            this.blinkButton();
        }
    }

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