const urlParams = new URLSearchParams(window.location.search);
const link = urlParams.get('web');

if (links[link]){
    window.location.href = web[link];
}