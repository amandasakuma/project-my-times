//let i = 1; //establish counter for story card in renderNewsFeed
// const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=4pCbIkzrX75qDLPyhvCvGL4ijmyhsWMm`
const url = 'https://api.nytimes.com/svc/topstories/v2'
const apiKey = '.json?api-key=4pCbIkzrX75qDLPyhvCvGL4ijmyhsWMm'
let clickedStory = 0
const newsFeedContainer = document.querySelector('#article-feed');

init(); //preps topic-bar selection


function fetchFeed(section) {
    fetch(`${url}/${section}${apiKey}`)
        .then(res => res.json())
        .then((data) => { //create a for loop that iterates through the object
            console.log(data)
            for (let i = 0; i < data.results.length; i++) {
                renderNewsFeed(data.results[i], section, i);
            }
        })

}

function renderNewsFeed(article, section, id) {
    const storyCard = document.createElement("div");
    const headline = document.createElement("h4");
    // const img = document.createElement("img");

    headline.innerText = article.title
    newsFeedContainer.append(storyCard);
    headline.setAttribute('class', article.section);
    headline.setAttribute('url', article.url);
    headline.setAttribute('headline', article.title);
    headline.setAttribute('img', article.multimedia[1].url); //0-jumbo, 1-normal 2-thumbnail
    headline.setAttribute('abstract', article.abstract);
    storyCard.setAttribute('id', `card${id}`)

    storyCard.append(headline);

    storyCard.addEventListener('click', (e) => {
        renderFeature(e.target)

    })

}

function renderFeature(article) {

    const featureHed = document.querySelector('#feature-headline')
    const featureLink = document.querySelector("#feature-link");
    const featureImage = document.querySelector('#feature-image')

    const featureInfo = document.querySelector('.feature-info-container')
    const featureAbstract = document.querySelector('#feature-abstract')

    let urldata = article.getAttribute('url');

    featureLink.setAttribute("href", urldata);
    featureLink.innerHTML = article.getAttribute('headline')
    featureImage.src = article.getAttribute('img');

    featureAbstract.innerText = article.getAttribute('abstract');

    featureInfo.append(featureImage, featureHed, featureAbstract)

}

//Adds 'click' event to each topic listed on the div id="topic-bar"
function init() {
    let allTopics = document.getElementsByClassName("topic")
    for (let topic of allTopics) {
        topic.addEventListener('click', topicClicked);
    }
    fetchFeed('home')
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
    displayStories()
}

//INCOMPLETE FUNCTION BELOW///
//To display stories for only the topics selected...
function displayStories() {
    //resetting the story list
    newsFeedContainer.innerText = ''
    // storyList = []
    let allSelectedTopics = document.getElementsByClassName("selected")
    for (let topic of allSelectedTopics) {
        let section = topic.getAttribute('section');

        fetchFeed(section)
    }

    // for (let story of storyList) {
    //     // for (let i = 0; i < 10; i++) {
    //     console.log(story)
    //     // renderNewsFeed(storyList[i]);

    // }
    //data.results.find()
    //function politicsSection(section)

}
