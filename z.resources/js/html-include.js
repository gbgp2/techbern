const includeHTML = async () => {
    let elements = document.querySelectorAll('[w3-include-html]');
    let promises = []; // Array to hold all promises

    for (let element of elements) {
        let file = element.getAttribute("w3-include-html");
        if (file) {
            let fetchPromise = fetch(file)
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    } else if (response.status === 404) {
                        throw new Error('File not found');
                    } else if (response.status === 500) {
                        throw new Error('Server error');
                    } else {
                        throw new Error('Unknown error occurred');
                    }
                })
                .then(html => {
                    element.innerHTML = html;
                    element.removeAttribute('w3-include-html');
                })
                .catch(error => {
                    console.error(error);
                    element.innerHTML = `Failed to load content`;
                    element.removeAttribute('w3-include-html');
                });

            promises.push(fetchPromise);
        }
    }

    await Promise.all(promises);
};

const processHTMLRecursively = async (level = 1, maxLevels = 50) => {
    await includeHTML();
    console.log(`Finished level ${level}.`);
    await new Promise(resolve => setTimeout(resolve, 100));

    let elements = document.querySelectorAll('[w3-include-html]');
    if (elements.length === 0) {
        console.log(`No more. Ended at level ${level}.`);
        return;
    }
    if (level >= maxLevels) {
        console.log(`Reached maximum recursion level (Level ${maxLevels}).`);
        return;
    }
    await processHTMLRecursively(level + 1, maxLevels);
};

/* this is jsut so the code from p-post-detect-blog.techbern.js is continued
which basically means we hide the code of one for the other and vice versa
*/
let promiseagain = new Promise((resolve, reject) => {
    resolve(processHTMLRecursively());
    reject('Failed to load content');
});

promiseagain
.then(() => 
    {
        if (posts[post]){
            containerDefaultEmpty.style.display = 'none';
            containerPost.style.display = 'block';
            let postContent = document.getElementById('maincenter1');
            postContent.setAttribute('w3-include-html', `${posts[post]}`);
            processHTMLRecursively();
        }
    }
)
.catch(error => { /* do nothing */ });