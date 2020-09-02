$(document).ready(function() {

    $('#update-button').on('click', function() {
        console.log("update: " + $('#checkValue').val() + ", " + $('#newValue').val())
        fetch('/update', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              checkValue: $('#checkValue').val().toLowerCase(),
              newValue: $('#newValue').val(),
              newValue_lower: $('#newValue').val().toLowerCase()
            })
        })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            // window.location.reload(true)
        })
    })

    $('#delete-button').on('click', function() {
        console.log("delete: " + $('#checkValue').val())
        fetch('/delete', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                checkValue: $('#checkValue').val().toLowerCase()
              })
        })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            if (response === 'No todo to delete') {
                console.log("No todo to delete")
            } else {
                // window.location.reload(true)
            }
        })
        .catch(console.error)
    })

})