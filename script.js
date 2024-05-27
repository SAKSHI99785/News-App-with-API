const apiKey = '6b3b6ae75a8e4d07830d77ac2ccc986e';
const newsContainer = document.getElementById('news-container');

async function fetchNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=tesla&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

function displayNews(articles) {
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');

        const img = document.createElement('img');
        img.src = article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/300x200';
        img.alt = article.title;

        const title = document.createElement('h2');
        title.textContent = article.title;

        const description = document.createElement('p');
        description.textContent = article.description ? article.description : 'No description available';

        const source = document.createElement('p');
        source.textContent = `Source: ${article.source.name}`;

        newsCard.appendChild(img);
        newsCard.appendChild(title);
        newsCard.appendChild(description);
        newsCard.appendChild(source);

        newsContainer.appendChild(newsCard);
    });
}

async function initialize() {
    try {
        const articles = await fetchNews();
        displayNews(articles);
    } catch (error) {
        console.error('Error initializing news:', error);
    }
}

initialize();
