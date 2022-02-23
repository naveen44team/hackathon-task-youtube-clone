const videoCardContainer = document.querySelector('.video-container');

/* Api key is generated from the google cloud*/
let api_key = "AIzaSyBwzxF5PcdaojA2qN3U95a8VJFiVHnPyGo";

/* video http url is taken from the youtube Api*/
let video_http = "https://www.googleapis.com/youtube/v3/videos?";

/* channel http section url is taken from the Youtube Api */
let channel_http = "https://www.googleapis.com/youtube/v3/channels?"


/* using fetch function to make request */
fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet', //to get video related data
    chart: 'mostPopular', // to fetch popular videos
    maxResults: 100, // to list max number of videos in the home screen
    regionCode: 'IN' //fetching by region code
}))
.then(res => res.json())
.then(data => {
   data.items.forEach(item => {
       getChannelIcon(item);
   });
   
})
.catch(err => console.log(err));

/* fetching the thumbnail which has the high resolution format */

/* in the fetched data, channel icon is not present */

/* fetching the channel icon sepeartely */
const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        /* talking the thumbnail data*/
       video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
       makeVideoCard(video_data);
    }
    )}


    const makeVideoCard = (data) => {

        // using innerHTML method to attach the HTML element
        // adding the fetched data from google
videoCardContainer.innerHTML += `
<div class="video" onclick= "location.href = 'https://youtube.com/watch?v=${data.id}'">
<img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
<div class="content">
    <img src="${data.channelThumbnail}" class= "channel-icon" alt="">
    <div class="info">
        <h4 class="title">${data.snippet.title}</h4>
        <p class="channel-name" ${data.snippet.channelTitle}></p>
    </div>
</div>
</div>
`;
    }

    const searchInput = document.querySelector(".search-bar");
    const searchBtn = document.querySelector(".search-btn");
    let searchLink = "https://www.youtube.com/results?search_query=";

    searchBtn.addEventListener('click', () => {
        if(searchInput.value.length) {
            location.href = searchLink + searchInput.value;
        }
    })