const node = 'ln00000024';  // Node 1
// const node = 'isibonelo_node_2'; // Node 2

const xhr = new XMLHttpRequest();
const url = 'http://solestial.live/db/' + node + '/_design/views/_view/timestamp?descending=true&limit=10';

xhr.responseType = 'json';
xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        console.log(xhr.response)
    }
}
xhr.open('GET', url);

const loadData = () => {
    xhr.send()
};