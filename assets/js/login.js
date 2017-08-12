


var sideslider = $('[data-toggle=collapse-side]');
var sel = sideslider.attr('data-target');
var sel2 = sideslider.attr('data-target-2');


sideslider.click(function (event) {
    $(sel).toggleClass('in');
    $(sel2).toggleClass('out');
});

$(':submit').on("click", function (event) {
    event.preventDefault();

    let userName = $("#username").val().trim();
    localStorage.setItem("userName", userName);
    console.log("localStorage user name has been set to: " + userName);

    if (userName == "" || userName == null || userName == undefined) {
        console.log("User Name was not set")
    } else {
        window.location.href = "home.html";
    }
    ;


});



