//let i = 1; //establish counter for story card in renderNewsFeed
const newsFeedContainer = document.querySelector('#article-feed');
// let storyList = []
init(); //preps topic-bar selection

function fetchFeed(section) {
    const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=4pCbIkzrX75qDLPyhvCvGL4ijmyhsWMm`
    fetch(url)
        .then(res => res.json())
        .then((data) => { //create a for loop that iterates through the object
            for (let i = 0; i < data.results.length; i++) {
                // storyList.push(data.results[i])
                renderNewsFeed(data.results[i], section);
            }

        })
}


function renderNewsFeed(article, section) {
    //get the newsfeed elements
    ////story card div, headline, img
    let storyCard = document.createElement("div");
    let headline = document.createElement("h4");
    // let img = document.createElement("img");
    let linkurl = document.createElement("a");
    let urldata = article.url;


    //[populate the story card with data for headline and image]
    headline.appendChild(linkurl);
    linkurl.setAttribute("href", urldata);
    linkurl.innerHTML = article.title
    // let tempimg = article.multimedia[1]; //0-jumbo, 1-normal 2-thumbnail 
    // img.src = tempimg.url;
    storyCard.append(headline);
    // storyCard.append(img)
    newsFeedContainer.append(storyCard);
    storyCard.setAttribute('class', article.section);

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

}
