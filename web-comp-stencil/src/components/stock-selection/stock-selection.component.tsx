import { Component, h, Prop, State, EventEmitter, Event } from "@stencil/core";
import * as consts from "../stock.consts";

@Component({
    tag: 'stock-search',
    styleUrl: 'stock-selection.component.css',
    shadow: true
})
export class StockSearch {
    @Prop({reflect: true}) stockName: string;
    @State() resultsList: {symbol: string; name: string;}[] = [];
    @State() loading: boolean;
    @Event() stockselect: EventEmitter<string>;
    onUpdate(event: Event) {
        const val = (event.target as HTMLInputElement).value;
        if (val.trim().length > 2) {
            this.stockName = val;
            this.fetchResults(this.stockName);
        }
    }

    componentDidLoad() {
        if(this.stockName) {
            this.fetchResults(this.stockName);
        }
    }

    // @Watch('stockName')
    // watchHandler(newValue, oldValue) {
    //     console.log('The value of stockName is: ', newValue);
    //     if (newValue !== oldValue && newValue.length >= 3 ) {
    //         this.fetchResults(this.stockName);
    //     }
    // }

    fetchResults(name: string) {
        this.loading = true;
        fetch(consts.GET_STOCK_SEARCH(name))
            .then(res => res.json())
            .then(res => {
                this.loading = false;
                this.resultsList = res['bestMatches'] ? 
                    res['bestMatches'].map(item => ({name: `${item['1. symbol']} - ${item['2. name']}`, symbol: item['1. symbol']}))
                    : []
                console.log('search results', res)
            })
            .catch(err => {
                this.loading = false;
                console.log(err);
            })
    }
    
    resultSelect(event: Event) {
        const test = (event.target as HTMLElement);
        console.log(test.dataset.sym);
        this.stockName = test.dataset.sym;
        this.resultsList = null;
        this.stockselect.emit(this.stockName);
    }


    formSubmit (event: Event) {
        event.preventDefault();
    }

    onKeyDown() {
        this.resultsList = null;
        this.loading = false;
    }

    onFormSubmit(event: Event) {
        event.preventDefault();
    }

    render() {
        let results = null;
        if (this.resultsList && this.resultsList.length > 0) {
            results = <ul onClick={this.resultSelect.bind(this)}>{
                this.resultsList.map(item => {
                    return (<li data-sym={item.symbol}> { item.name } </li>);
                })}
            </ul>;
        }
        
        if (this.loading) {
            results = <loading-spinner></loading-spinner>
        }
        
        return [
            (
                <form onSubmit={this.onFormSubmit.bind(this)}>
                    <input type="text" value={this.stockName} 
                        placeholder="Type to search"
                        onChange={this.onUpdate.bind(this)} 
                        onKeyDown={this.onKeyDown.bind(this)}/>
                    <button type="submit">Search</button>
                </form>
            ),
            (
                results 
            )
        ];
    }
}