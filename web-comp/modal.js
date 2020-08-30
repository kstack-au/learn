class Modal extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                }
                
                :host([opened]) #backdrop,
                :host([opened]) #content {
                    opacity: 1;
                    pointer-events: all;
                }

                :host([opened]) #content {
                    top: 15vh;
                }
                #backdrop {
                    background: rgba(0, 0, 0, 0.5);
                    position: fixed;
                    height: 100vh;
                    width: 100%;
                    z-index: 1;
                    top: 0;
                    left: 0;
                    opacity: 0;
                    pointer-events: none;
                    
                }
                #content {
                    top: 10vh;
                    width: 50%;
                    margin-left: 25%;
                    background: white;
                    border-radius: 3px;
                    position: fixed;
                    z-index: 10;
                    min-height: 200px;
                    opacity: 0;
                    pointer-events: none;
                    padding: 1em;
                    transition: all 0.3s ease-out;
                }
                header {
                    border-bottom: 1px solid #ccc;
                }
                footer {
                    border-top: 1px solid #ccc;
                }
                ::slotted(h2) {
                    color: blue;
                }
            </style>
            <div id="backdrop"></div>
            <div id="content">
                <header>
                    <slot name="title">Title of the modal</slot>
                </header>
                <section>
                    <slot></slot>
                </section>
                <footer>
                    <button id="cancel">Cancel</button>
                    <button id="confirm">Okay</button>
                </footer>
            </div>
        `;

        const cancelBtn = this.shadowRoot.querySelector('#cancel');
        const confirmBtn = this.shadowRoot.querySelector('#confirm');
        const backdrop = this.shadowRoot.querySelector('#backdrop');
        const slots = this.shadowRoot.querySelectorAll('slot');

        cancelBtn.addEventListener('click', this._hideCancel.bind(this));
        confirmBtn.addEventListener('click', this._hideConfirm.bind(this));
        backdrop.addEventListener('click', this.hide.bind(this));
        
        slots[1].addEventListener('slotchange', event => {
            console.dir(slots[1].assignedNodes());
        });
        
    }

    hide() {
        if(this.hasAttribute('opened')){
            this.removeAttribute('opened');
            this.isOpen = false;
        }
    }

    open() {
        this.setAttribute('opened', '');
        this.isOpen = true;
    }

    _hideCancel(event) {
        this.hide();
        this.dispatchEvent(new Event('cancel'));
    }

    _hideConfirm(event) {
        this.hide();
        this.dispatchEvent(new Event('confirm'));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // console.log('attribute change callback from modal comp', name);
    }

    static get observedAttributes() {
        return ['opened'];
    }
}

// export Modal
customElements.define('uc-modal', Modal);