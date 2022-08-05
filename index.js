const url = 'https://api.nytimes.com/svc/topstories/v2'
//API key for myTimes use only.  Or face the wrath of Amanda Sakuma and Daniel Edward Lucas
const apiKey = '.json?api-key=4pCbIkzrX75qDLPyhvCvGL4ijmyhsWMm'
let clickedStory = 0
const newsFeedContainer = document.querySelector('#article-feed');

init(); //preps topic-bar selection

//Adds 'click' event to each topic listed on the div id="topic-bar"
function init() {
    let allTopics = document.getElementsByClassName("topic")
    for (let topic of allTopics) {
        topic.addEventListener('click', topicClicked);
    }
    //defaults homepage to all top stories upon load
    fetchFeed('home')
}

//async fetch function, takes in section, returns respective top stories
async function fetchFeed(section) {
    try {
        const res = await fetch(`${url}/${section}${apiKey}`)
        const data = await res.json()
        //iterate through article results and populate the newsfeed
        for (let i = 0; i < data.results.length; i++) {
            renderNewsFeed(data.results[i], section, i);
        }
    }
    catch (err) {
        console.log(err);
    }
}
//RIP .then
//a lover, a fetcher, a friend
// August 2022-August 2022

// function fetchFeed(section) {
//     fetch(`${url}/${section}${apiKey}`)
//         .then(res => res.json())
//         .then((data) => { //create a for loop that iterates through the object
//             // console.log(data)
//             for (let i = 0; i < data.results.length; i++) {
//                 renderNewsFeed(data.results[i], section, i);
//             }
//         })
// }

//populate newsfeed with article headlines...
function renderNewsFeed(article, section, id) {
    const storyCard = document.createElement("div");
    const headline = document.createElement("h4");

    //store article attributes in storyCard div to later populate feature story container
    headline.innerText = article.title
    newsFeedContainer.append(storyCard);
    headline.setAttribute('class', article.section);
    headline.setAttribute('url', article.url);
    headline.setAttribute('headline', article.title);
    headline.setAttribute('img', article.multimedia[1].url); //0-jumbo, 1-normal 2-thumbnail
    headline.setAttribute('abstract', article.abstract);
    storyCard.setAttribute('id', `card${id}`)

    storyCard.append(headline);

    //adds click event to storyCard, when clicked, story populates feature container
    storyCard.addEventListener('click', (e) => {
        renderFeature(e.target)
    })
    //when new topic button is selected, the first story in that array populates feature story container
    if (id == 0) {
        renderFeature(headline)
    }

}
//adds key event to return to top stories
document.addEventListener('keyup', function (e) {
    window.location.reload();
});

//populates feature story container, adds it to the DOM
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


//Checks whether or not a topic is selected
function topicClicked(e) {
    //selected class changes button background color in CSS
    let previousTopic = document.querySelector('.selected')
    previousTopic.classList.remove('selected')

    let newTopic = e.target;
    newTopic.classList.add('selected')
    
    //populates the newsfeed when button is clicked
    displayStories()
}


//To display stories for only the topics selected...
function displayStories() {
    //resetting the story list
    newsFeedContainer.innerText = ''
    //when topic is selected, update the section variable used in fetch
    let selectedTopic = document.querySelector(".selected")
    let section = selectedTopic.getAttribute('section');
    //re-fetches that selected section, which also repopulates feed with said section
    fetchFeed(section)

}

 