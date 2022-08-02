//let i = 1; //establish counter for story card in renderNewsFeed
const url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=4pCbIkzrX75qDLPyhvCvGL4ijmyhsWMm'
init(); //preps topic-bar selection

fetch(url)
    .then(res => res.json())
    .then((data) => { //create a for loop that iterates through the object
    for(let i=0; i<data.results.length; i++){
        renderNewsFeed(data.results[i]);
    }

    })
    // })
    // .then((data) => {
    //     data.results.forEach((article) => {
    //         renderNewsFeed(article);
    //         i++;
    //     })
function renderNewsFeed(article) {
    // getthe newsfeed container
    const newsFeedContainer = document.querySelector('#article-feed')

    //get the newsfeed elements
    ////story card div, headline, img
    let storyCard = document.createElement("div");
    let headline = document.createElement("p");
    let img = document.createElement("img");

    
    

    //[populate the story card with data for headline and image]

    headline.innerText = article.title;
    let tempimg = article.multimedia[1]; //0-jumbo, 1-normal 2-thumbnail 
    img.src = tempimg.url;
    console.log(article.multimedia.url);
    console.log(headline);
    storyCard.append(headline, img);
    newsFeedContainer.append(storyCard);

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
