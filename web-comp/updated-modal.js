class UpdatedModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML = `
            <style>
                #overlay {
                    background: rgba(0, 0, 0, 0.5);
                    position: fixed;
                    left: 0;
                    top: 0;
                    width: 100%;
                    z-index: 10;
                    height: 100vh;
                    opacity: 0;
                }

                #content {
                    position: fixed;
                    z-index: 100;
                    width: 50rem;
                    height: 100em;
                    opacity: 0;
                }

            </style>
            <div id="overlay"></div>
            <div id="content">
                <slot></slot>
            </div>
        `;
    }

}

customElements.define('uc-modal-updated', UpdatedModal)