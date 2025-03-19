const urlParams = new URLSearchParams(window.location.search);
const post = urlParams.get('post');
console.log(post);
let containerDefaultEmpty = document.getElementById('containerDefault');;
let containerPost = document.getElementById('containerPost');   ;

if (posts[post] == '' || posts[post] == null || posts[post] == undefined){
    containerDefaultEmpty.style.display = 'block';
    containerPost.style.display = 'none';
    console.log(posts[post]);
}