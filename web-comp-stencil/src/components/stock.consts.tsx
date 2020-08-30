const APIKEY = 'U6EJ2OS21T63D5A6';

export const GET_STOCKURL = (symbol) => `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${APIKEY}`;
export const GET_STOCK_SEARCH = (text) => `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${text}&apikey=${APIKEY}`;