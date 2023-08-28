const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('qoute');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

// Get Quotes From API

// Show New Quote
function newQuote() {
    // Pick a random quote from apiQuotes array
    let random = Math.random() * apiQuotes.length;
    let index = Math.floor(random);
    const quote = apiQuotes[index];
    // Check if author field is blank and replace it with 'Unknown'
    if (quote.author){
        quoteText.textContent = quote.text;
    } else {
        quoteText.textContent = 'Unknown';
    }
    // Check Quote length to determine styling
    console.log(quote.text.length)
    if (quote.text.length > 50){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    } 
    authorText.textContent = quote.author;
}

// Get Quotes From API
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert(error);
    }
} 

getQuotes();