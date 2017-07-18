import { Component, Directive, HostListener, ElementRef, EventEmitter, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
@Directive({
    selector: '[draggable-element]'
})
export class DraggableElementDirective implements OnInit{

    mousedrag;
    mouseup = new EventEmitter<MouseEvent>();
    mousedown = new EventEmitter<MouseEvent>();
    mousemove = new EventEmitter<MouseEvent>();

    @HostListener('document:mouseup', ['$event']) onMouseUp(event: MouseEvent) {
        this.mouseup.emit(event);
    }

    @HostListener('document:mousedown', ['$event']) onMouseDown(event: MouseEvent) {
        this.mousedown.emit(event);
    }

    @HostListener('document:mousemove', ['$event']) onMouseMove(event: MouseEvent) {
        this.mousemove.emit(event);
    }

    
    constructor(public elRef: ElementRef) {
     
        this.elRef.nativeElement.style.position = 'relative';
        this.elRef.nativeElement.style.cursor = 'pointer';

        this.mousedrag = this.mousedown.map(event => {
            return {
                left: event.clientX - this.elRef.nativeElement.getBoundingClientRect().left,
                top: event.clientY - this.elRef.nativeElement.getBoundingCLientRect().top
            };
        }).flatMap(imageOffset => this.mousemove.map(pos => ({
            top: pos.clientY - imageOffset.top,
            left: pos.clientX - imageOffset.left
        }))).takeUntil(this.mouseup);
            
    }

    ngOnInit() {
        this.mousedrag.subscribe({
            next: post => {
                this.elRef
            }
        })
    }
}


/**

@Input(): bind current directive property
@HostListener: events
ElementRef: references a specific element

1)
Changine the css style (color, size, etc) of element
    elRef.nativeElement.style.<property> = 'value';

Can do multiple changes inside constructor 


2) directives can have properties and input() from user
    <div myDirective myColor="blue">

    ...
    @Input() myColor:string;

3. use lifecyclehooks
    ngInit
    ngOnChanges
    ngOnDestroy
    ngDoCheck
    ngAfterContentInit(): after external content is projected into the components view (after a componets creates its child views)

4. 2 ways to @input()
    [alias]="blue"
    @Input(alias) name:string


5. multiple inputs and defaults
    @Input()textcolor:string;
    @Input()backgroundcolor:string;

    constructor(){
        this.textcolor  = this.textcolor || 'green'
        this.backgroundcolor = this.backgroundcolor || 'blue'
        this.elRef.NativeElement.style.color = this.textcolor
        this.elRef.NativeElement.style.backgroundcolor = this.backgroundcolor
    }


6. event listeners:
    @HostListener('event') func_name(){
        this.chageBackgroundColor
}


7. event listener and input (handle an input evnet!)


8

*/