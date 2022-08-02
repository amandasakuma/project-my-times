let i = 1; //establish counter for story card in renderNewsFeed
const url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=4pCbIkzrX75qDLPyhvCvGL4ijmyhsWMm'
init(); //preps topic-bar selection

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
    let storyCard = document.querySelector(`#feed-story-card-${i}`)
    let headline = document.querySelector(`#feed-headline-${i}`)
    let img = document.querySelector(`#feed-img-${i}`)

    //[populate the story card with data for headline and image]
    headline.innerText = article.title;
    console.log(headline);

}

//Adds 'click' event to each topic listed on the div id="topic-bar"
function init() {
    let allTopics = document.getElementsByClassName("topic")
    for (let topic of allTopics) {
        topic.addEventListener('click', topicClicked);
    }
}
//Checks whether or not a topic is selected
function topicClicked(e) {
    let topic = e.target;
    let topicStatus = topic.classList.contains('selected');
    if (topicStatus) {
        topic.classList.remove('selected')
    } else {
        topic.classList.add('selected')
    }
}
//INCOMPLETE FUNCTION BELOW///
//To display stories for only the topics selected...
function displayStories() {
    let allSelectedTopics = document.getElementsByClassName("selected")
    for (let topic of allSelectedTopics) {
        let section = button.getAttribute('section');

        //STILL TO DO:
        //get story card
        //iterate over 'sections' key from our api data to only retrieve topics that === what we want
        //add populated story card to newsfeed div

    }
}
