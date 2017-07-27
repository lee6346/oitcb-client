import {
    Component, ViewChild, ViewContainerRef, HostListener, HostBinding, EventEmitter, OnInit,
    Input, Output, ComponentFactoryResolver, Compiler, ComponentRef, Type, ReflectiveInjector
} from '@angular/core';

import { AgentChatWindowComponent } from './agent-chat-window.component';

//make relative so absolute chat window components can move around sinde this
@Component({
    selector: 'chatbox-factory',
    entryComponents: [AgentChatWindowComponent],
    template: `
            <div #factoryContainer></div>
            `
    
})
export class ChatboxFactoryComponent implements OnInit {


    //rather than using directives, we will use services to pass in the conv_id to the factory component and use ngOnChanges to initialze the construction
    private chatcomponents: any[];
    @ViewChild('factoryContainer', { read: ViewContainerRef }) factoryContainer: ViewContainerRef;

    //setter that takes a component type to dynamically load
    @Input() set componentData(data: { component: any, inputs: any }) {
        if (!data) {
            return;
        }

        let inputProviders = Object.keys(data.inputs).map((inputName) => { return { provide: inputName, useValue: data.inputs[inputName] }; });
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
        //to inject data and custom service providers
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.factoryContainer.parentInjector);

        //make the factory for the specific component to create
        let factory = this.resolver.resolveComponentFactory(data.component);

        //create component using factory and injector
        let component = factory.create(injector);

        //insert the new component into the DOM template container
        this.factoryContainer.insert(component.hostView);

        //push into holding
        this.chatcomponents.push(component);

    }

    //@Input() set remove

    constructor(private resolver: ComponentFactoryResolver) {
    }
    /*
    @Input() type: Type<Component>;
    @Input() conv_id: string;
    @Input() visible: boolean;

    @Output() loaded = new EventEmitter();



    cmpRef: ComponentRef<Component>;

    constructor(private componentFactory: ComponentFactoryResolver, private compiler: Compiler) {
        const chatBox = this.componentFactory.resolveComponentFactory(AgentChatWindowComponent);
    }

    createComponent() {

    }
    */
    ngOnInit() { }

}