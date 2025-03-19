const urlParams = new URLSearchParams(window.location.search);
const permalink = urlParams.get('page');

if (permalinks[permalink]){
    window.location.href = permalinks[permalink];
}