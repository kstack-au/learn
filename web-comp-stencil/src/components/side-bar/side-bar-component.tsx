import { Component, Prop, h, Method, State } from "@stencil/core";


@Component({
    tag: 'side-bar',
    styleUrl: 'side-bar-component.css',
    shadow: true
})


export class SideBarComponent {
    @Prop({reflect: true}) title: string;
    @Prop({reflect: true}) opened = false;
    @State() contactTab = false;
    constructor() {
        
    }

    @Method()
    open() {
        this.opened = true;
    }
    
    @Method()
    close() {
        this.opened = false;
    }

    tabClick(tabname: string) {
        this.contactTab = tabname === 'contact';
    }

    render() {
        const myContent = this.contactTab ? (<p>Phone: 1300 5557 998 <br/>
            email: <a href="mailto:hello@kstack.com.au">hello@kstack.com.au</a>
        </p>) : (<slot/>);
        const html = [(
            <aside>
                <button onClick={this.close.bind(this)} id="close">x</button>
                <h1>{this.title}</h1>
                <div>
                    <button  
                        class={!this.contactTab ? "active btn": "btn"}
                        onClick={this.tabClick.bind(this, 'nav')}>Navigation</button>
                    <button
                        class={this.contactTab ? "active btn": "btn"} 
                        onClick={this.tabClick.bind(this, 'contact')}>Contact</button>
                    { myContent }
                </div>
            </aside>
        ),
        (
        <div id="backdrop" onClick={this.close.bind(this)}></div>
        )];
        return html;
    }
}