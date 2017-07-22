import { Directive, ElementRef, Input, HostListener, Renderer } from '@angular/core';

@Directive({ selector: '[blinking-directive]' })
export class BlinkingDirective {


    private startBlink: boolean = false;

    constructor(private el: ElementRef, private renderer: Renderer) {
        
    }

    /** 1. blink when unavailabe
        2. transition effect when agent clicks, or on exiting
        3. transition effect to 
     * /
     */
    
    @HostListener('mouseenter') onMouseEnter() {
        
    }

    @HostListener('mouseover') onMouseOver() {
        setInterval(() => {
            let style = "hidden";
            if (this.el.nativeElement.style.visibility && this.el.nativeElement.style.visibility == "hidden") {
                style = "visible";
            }
            this.renderer.setElementStyle(this.el.nativeElement, 'visibility', style);
        }, 750);
    }
}