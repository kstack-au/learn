import { Component, Prop, h, State } from "@stencil/core";

@Component({
    tag: 'tool-tip',
    shadow: true,
    styleUrl: 'tool-tip.component.css'
})
export class ToolTipComponent {
    @Prop() text: string;
    @State() showToolTip = false;
    toggleTip() {
        this.showToolTip = !this.showToolTip;
    }

    render() {
        let toolTip = null;
        
        if (this.showToolTip) {
            toolTip = (<span class="helpertext">{this.text}</span>);
        } 
        return (
            <div>
                <slot />
                <span class="tip" onClick={this.toggleTip.bind(this)}>
                    <span class="question">?</span>
                    {toolTip}
                </span>
            </div>
        );
    }


}