import { Directive, ElementRef, Input, HostListener, Renderer } from '@angular/core';

@Directive({ selector: '[blinking-directive]' })
export class BlinkingElementDirective {


    private startBlink: boolean = false;

    constructor(private el: ElementRef, private renderer: Renderer) {
        
    }


    
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