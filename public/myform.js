$(document).ready(function() {

    let newTodos = 1;

    $('#addButton').on('click', function() {

        newTodos++;
        $('#addTo').append(`<br> Todo Item ${newTodos} <input id='item_${newTodos}' type='text' name='value' />`);
        $('#addTo').attr("key", newTodos);

        console.log(newTodos); //test
        console.log($('#addTo').html()); //test
        console.log("key: " + $('#addTo').attr("key")); //test
    })

    $('#submit').on('click', function() {
        let myData = [];
        for (let i = 1; i <= newTodos; i++) {
            myData.push({
                value: $(`#item_${i}`).val(),
                value_lower: $(`#item_${i}`).val().toLowerCase()
            });
        }
        console.log(myData); // test

        fetch('/addItems', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(myData)
        })
        .then(
            window.location.assign('/')
        )
    })

    $('#')

})