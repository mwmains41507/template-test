const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loader
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//show new quote
function newQuote() {
    loading();
    //pick random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author is null
    if (!quote.author) {
        authorText.textContent = 'Unknown Author';
    } else {
        authorText.textContent = quote.author;
    }
    //check quote length to mod style
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        //console.log(apiQuotes);
        newQuote();
    } catch (error) {
        //handle error
    }
}

//tweet quote
function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On load
getQuotes();