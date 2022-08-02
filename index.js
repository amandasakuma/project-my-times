let i = 1;
const url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=4pCbIkzrX75qDLPyhvCvGL4ijmyhsWMm'

fetch(url)
    .then(res => res.json())
    // .then(renderNewsFeed(data))
    .then((data) => { 
        data.results.forEach((article) => {
            renderNewsFeed(article);
            i++;
        })
    })

function renderNewsFeed(article) {
    // getthe newsfeed container
    const newsFeedContainer = document.querySelector('#article-feed')

    //get the newsfeed elements
    ////story card div, headline, img
    const storyCard1 = document.querySelector(`#feed-story-card-${i}`)
    const headline1 = document.querySelector(`#feed-headline-${i}`)
    const img1 = document.querySelector(`#feed-img-${i}`)

    //[populate the story card with data for headline and image]
    headline1.innerText = article.title;
    console.log(headline1)

}
