import { h, Component } from "@stencil/core";

@Component({
    tag: 'loading-spinner',
    shadow: true,
    styleUrl: 'loading-spinner.css'
})

export class LoadingSpinner {

    render() {
        return <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    }
}