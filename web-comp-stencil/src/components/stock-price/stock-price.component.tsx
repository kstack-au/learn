import { h, Component, State, Prop, Watch, Listen } from "@stencil/core";
import * as consts from "../stock.consts";
@Component({
    tag: 'stock-price',
    styleUrl: 'stock-price.component.css',
    shadow: true
})
export class StockPriceComponent {
    @Prop({reflect: true}) stockName: string;
    @State() stockPrice: number;
    @State() loading = false;
    @State() error: string;
    
    userInput: string;
    inputInvalid: boolean;
    fetchButton: HTMLButtonElement;
    fetchStockName: string;

    formSubmit(event: Event) {
        event.preventDefault();
        const val = (((event.target as HTMLFormElement)
            .elements as HTMLFormControlsCollection)
            .namedItem('stockinput') as HTMLInputElement)
            .value;
        if (this.validateInput(val)) {
            this.stockName = val;
        }
    }

    validateInput(val: string) {
        return val.trim() !== '';
    }

    inputKeyPress(event: Event) {
        if ((event.target as HTMLInputElement).value !== '') {
            this.fetchButton.disabled = false;
        } else {
            this.fetchButton.disabled = true;
        }
    }


    hostData() {
        return { 'class': this.error ? 'error' : '' }
    }
    
    componentDidLoad() {
        if (this.stockName && this.validateInput(this.stockName)) {
            this.fetch(this.stockName);
        }
    }

    @Watch('stockName')
    stockNameWatcher(newValue, oldValue) {
        if (newValue !== oldValue && this.validateInput(this.stockName)) {
            this.fetch(newValue);
        }
    }

    @Listen('body:stockselect')
    customEventHandler(event) {
        console.log('Received the custom event: ', event);
        if (this.stockName !== event.detail) {
            this.stockName = event.detail;
        }
    }

    fetch(stockName: string) {
        this.fetchButton.disabled = true;
        this.loading = true;
        this.fetchStockName = stockName;
        // setTimeout(() => {
        //     this.stockPrice = 255.00;
        //     this.loading = false;
        // }, 3000);
        
        fetch(consts.GET_STOCKURL(stockName))
            .then(res => res.json())
            .then(res => {
                console.log(res);
                const price = res['Global Quote'] || res['Note'];
                this.loading = false;
                this.error = null;
                if (price['05. price']) {
                    this.stockPrice = +price['05. price'];
                } else {
                    throw new Error("Invalid entry");
                }
            })
            .catch(err => {
                console.log(err);
                this.error = err.message;
                this.fetchButton.disabled = true;
            })
    }

    render() {
        
        let stockpriceHTML = this.error ? 
            (<h3> {this.fetchStockName}: {this.error}</h3>) : 
            (<h3>Stock Price of {this.fetchStockName} is: ${this.stockPrice}</h3>);
        
        if (this.loading) {
            stockpriceHTML = <loading-spinner></loading-spinner>
        }

        return [
            (
                <form onSubmit={this.formSubmit.bind(this)}>
                    <input 
                        type="text" 
                        name="stockinput"
                        value={this.stockName}
                        onKeyUp={this.inputKeyPress.bind(this)}/>
                        <br />
                    <button 
                        type="submit"
                        ref={el => this.fetchButton = el}
                    >Fetch</button>
                </form>
            ),
            (
                stockpriceHTML 
            )
        ];
    }
}