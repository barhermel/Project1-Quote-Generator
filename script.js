const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('qoute');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const authorButton = document.getElementById('author-button');

let apiQuotes = [];

// Console Log All of the current author Quote
function logAllQuotesOfCurrentAuthor(){
    let author = authorText.textContent;
    apiQuotes.forEach(quote => {
        if (quote.author === author ){
            console.log(quote);
        }
    })
}

// Show Loading
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// Show New Quote
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    let random = Math.random() * apiQuotes.length;
    let index = Math.floor(random);
    const quote = apiQuotes[index];
    // Check if author field is blank and replace it with 'Unknown'
    console.log(quote.author)
    if (quote.author !== 'Anonymous') {
        authorButton.hidden = false;
        quoteText.textContent = quote.text;
        authorText.textContent = quote.author;
    } else {
        authorButton.hidden = true;
        quoteText.textContent = quote.text;
        authorText.textContent = 'Unknown'
    }
    // Check Quote length to determine styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    removeLoadingSpinner();
}

// Get Quotes From API
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    authorButton.hidden = true;
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert(error);
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.text}`;
    window.open(twitterUrl,'_blank');
}

// event Listners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
authorButton.addEventListener('click', logAllQuotesOfCurrentAuthor)

getQuotes();
