const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const MessageOne = document.querySelector("#one");
const MessageTwo = document.querySelector("#two");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;

    MessageOne.textContent = "Loading...";
    MessageTwo.textContent = "";

    fetch(`/weather?address=${location}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        if (data.error){
            MessageOne.textContent = data.error;
        } else {
            MessageOne.textContent = data.location;
            MessageTwo.textContent = data.summary;
        }
    })

})