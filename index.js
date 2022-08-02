const url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=4pCbIkzrX75qDLPyhvCvGL4ijmyhsWMm'

fetch(url)
    .then(res => res.json())
    // .then(renderNewsFeed(data))
    .then((data) => { 
        let arr = data.results;
        arr.forEach((article) => {
            renderNewsFeed(article)
        })
    })

function renderNewsFeed(article) {
    // getthe newsfeed container
    const newsFeedContainer = document.querySelector('#article-feed')

    //get the newsfeed elements
    ////story card div, headline, img
    const storyCard1 = document.querySelector('#feed-story-card-1')
    const headline1 = document.querySelector('#feed-headline-1')
    const img1 = document.querySelector('#feed-img-1')

    //[populate the story card with data for headline and image]
    headline1.innerText = article.section
    console.log(headline1)

}
