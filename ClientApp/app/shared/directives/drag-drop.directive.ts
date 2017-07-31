import { Directive, HostListener, ElementRef, OnInit, AfterViewInit } from '@angular/core';

import * as Rx from 'rxjs/Rx';


@Directive({
    selector: '[drag-and-drop]'
})
export class DragDropDirective implements AfterViewInit, OnInit {


    private mouseup$ = Rx.Observable.fromEvent<MouseEvent>(this.elRef.nativeElement, 'mouseup');
    private mousedown$ = Rx.Observable.fromEvent<MouseEvent>(this.elRef.nativeElement, 'mousedown');
    private mousemove$ = Rx.Observable.fromEvent<MouseEvent>(document, 'mousemove');
    private mousedrag$;
    /*
    @HostListener('mouseup', ['$event'])
    onMouseup(event: MouseEvent) {
        this.mousedrag$ = this.mousedown$.map
    }
    @HostListener('mousedown', ['$event'])
    onMousedown(event: MouseEvent) {
        this.mousedown$..emit(event);
        return false;
    }
    @HostListener('document:mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        this.mousemove.emit(event);
    }*/

    constructor(public elRef: ElementRef) {
        this.elRef.nativeElement.style.position = 'relative';
        this.elRef.nativeElement.style.cursor = 'pointer';

        this.mousedrag$ = this.mousedown$.flatMap((md) => {

            var startX = md.offsetX;
            var startY = md.offsetY;
            return this.mousemove$.map((mm) => {
                mm.preventDefault();
                return {
                    left: mm.clientX - startX,
                    top: mm.clientY - startY
                };
            }).takeUntil(this.mouseup$);
        });
    }

    public mouseDrag$(loc: MouseEvent) {
        let startX = loc.offsetX;
        let startY = loc.offsetY;    
    }

    ngAfterViewInit() {}

    ngOnInit() {
        this.mousedrag$.subscribe({
            next: pos => {
                this.elRef.nativeElement.style.top = pos.top + 'px';
                this.elRef.nativeElement.style.left = pos.left + 'px';
            }
        });  
    }
}
