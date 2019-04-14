$("#submit-btn").on("click", function () {
    var userData = {
        name: $("#name").val(),
        photo: $("#pic").val(),
        scores: [
            $("#q1").val(),
            $("#q2").val(),
            $("#q3").val(),
            $("#q4").val(),
            $("#q5").val(),
            $("#q6").val(),
            $("#q7").val(),
            $("#q8").val(),
            $("#q9").val(),
            $("#q10").val()
        ]
    }
    $.post("/api/friends", userData).then(function (data) {
        $("#match-name").text(data.name);
        $("#match-img").attr("src", data.photo);
    })

});
