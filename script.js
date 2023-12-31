const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('qoute');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const authorButton = document.getElementById('author-button');
const whatsappButton = document.getElementById('whatsapp');

let apiQuotes = [];

// Console Log All of the current author Quote
function logAllQuotesOfCurrentAuthor() {
    let author = quoteText.textContent;
    apiQuotes.forEach(quote => {
        if (quote.author === author) {
            console.log(quote);
        }
    })
}

// Send whatsApp message with the current Quote
function whatsappQuote() {
    alert('Here We Will Take The Number To Forward This Inspirational Quote To!');
    alert('This Will Only Work On Israel');
    let phoneNumberStr = prompt('Enter The Phone Number: ');
    // Check If contains only numbers
    if (! /^\d+$/.test(phoneNumberStr)) {
        throw "Must contain only numbers";
    }
    if (phoneNumberStr[0] === '0') {
        // Removing the 0 and adding 972
        phoneNumberStr = phoneNumberStr.slice(1);
        phoneNumberStr = '972' + phoneNumberStr;
    } else if (phoneNumberStr[0] === '5') {
        // Adding 972
        phoneNumberStr = '972' + phoneNumberStr;
    }
    // Validating the correct Israel perpendix 
    else if (phoneNumberStr.substring(0, 3) !== '972') {
        throw 'Not a Valid Israel Celuler Phone Number!'
    }

    // Remove all the commas from the PhoneNumberStr
    const quote = quoteText.textContent;
    // Send the text
    const whatsappLink = `https://wa.me/${phoneNumberStr}?text=${quote}`;
    window.open(whatsappLink, '_blank')
}

// Show Loading
function showLoadingSpinner() {
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
    window.open(twitterUrl, '_blank');
}

// event Listners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
authorButton.addEventListener('click', logAllQuotesOfCurrentAuthor);
whatsappButton.addEventListener('click', whatsappQuote)

getQuotes();
