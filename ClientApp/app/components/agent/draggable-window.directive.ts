import { Directive, ElementRef, HostListener, EventEmitter, OnInit } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Directive({
    selector: '[draggable-window]'
})
export class DraggableWindowDirective implements OnInit {
    mouseover = new EventEmitter < MouseEvent>();
    mouseup = new EventEmitter<MouseEvent>();
    mousedown = new EventEmitter<MouseEvent>();
    mousemove = new EventEmitter<MouseEvent>();
    mousedrag;


    @HostListener('mouseover', ['$event'])
    onMouseover(event: MouseEvent) {
        this.mouseup.emit(event);
    }

    @HostListener('document:mouseup', ['$event'])
    onMouseup(event: MouseEvent) {
        this.mouseup.emit(event);
    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event: MouseEvent) {
        this.mousedown.emit(event);
        return false; 
    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        this.mousemove.emit(event);
    }



    constructor(private elref: ElementRef) {
        this.elref.nativeElement.style.position = 'absolute';

        this.elref.nativeElement.style.cursor = 'pointer';
        
        this.mousedrag = this.mousedown.flatMap((md)=> {
            
            var startX = md.offsetX;
            var startY = md.offsetY;
            return this.mousemove.map((mm) => {
                mm.preventDefault();
                return {
                    left: mm.clientX - startX,
                    top: mm.clientY - startY
                };
            }).takeUntil(this.mouseup);
        })
        
    }

    ngOnInit() {
        this.mousedrag.subscribe({
            next: pos => {
                this.elref.nativeElement.style.top = pos.top + 'px';
                this.elref.nativeElement.style.left = pos.left + 'px';
            }
        }
        );
    }

    /*
    this.mousedrag = this.mousedown.map(event => {
            return {
                top: event.clientY - this.elref.nativeElement.getBoundingClientRect().top,
                left: event.clientX - this.elref.nativeElement.getBoundingClientRect().left
            };
        })
            .flatMap(imageOffset => this.mousemove.map(pos => ({
                top: pos..clientY - imageOffset.top,
                left: pos.clientX - imageOffset.left
            }))
                .takeUntil(this.mouseup)
            );


    */

}