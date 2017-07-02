import { Component } from '@angular/core';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html'
})

//contains a count variable and an increment counter method that increments the count varaible 
// for rendering in the html page
// NOTE: this component is instantiated and destryoed everytime we exit this particular component
export class CounterComponent {
    public currentCount = 0;

    public incrementCounter() {
        this.currentCount++;
    }
}
