const node = 'ln00000024'; // Node 1
// const node = 'isibonelo_node_2'; // Node 2

const xhr = new XMLHttpRequest();

const url = 'http://solestial.live/db/' + node + '/_design/views/_view/timestamp?descending=true&limit=10';


/*
const loadData = () => {
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response)
        }
    }
    xhr.open('GET', url);
    xhr.send()
};
*/

/*
const loadData = () => {
    fetch(url, {
        method: 'GET',
        mode: 'no-cors'
    })
    .then(function(response) {
        if (response.status !== 200) {
            console.log('Look like there was a problem. Status Code: ' + response.status);
            return;
        }

        response.json().then(function(data) {
            console.log(data);
        });
    })
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}
*/

const loadData = () => {
    
}