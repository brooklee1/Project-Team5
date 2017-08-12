$(document).ready(function () {

    var sideslider = $('[data-toggle=collapse-side]');
    var sel = sideslider.attr('data-target');
    var sel2 = sideslider.attr('data-target-2');
    sideslider.click(function (event) {
        $(sel).toggleClass('in');
        $(sel2).toggleClass('out');
    });

    var table = $("#table1").DataTable();

    $("#table1 tbody").on('click', 'tr', function (e) {

        if ($(this).hasClass('selected')) {


            $(this).removeClass('selected');

            $("#firstName-input").val("");
            $("#lastName-input").val("");
            $("#licenseName-input").val("");
            $("#licenseExpiration-input").val("");
            $("#email-input").val("");
            $("#phoneNumber-input").val("");

        }

        else {


            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            var firstName = $(this).eq(0).children("td").eq(0)[0].innerText;

            var lastName = $(this).eq(0).children("td").eq(1)[0].innerText;

            var licenseName = $(this).eq(0).children("td").eq(2)[0].innerText;

            var expirationDate = $(this).eq(0).children("td").eq(3)[0].innerText;

            console.log($(this).eq(0).children("td").eq(0)["0"].innerHTML);

            $("#firstName-input").val(firstName);
            $("#lastName-input").val(lastName);
            $("#licenseName-input").val(licenseName);
            $("#licenseExpiration-input").val(expirationDate);

            $('#update-user').on('click', function () {

                var firstName = $("#firstName-input").val();
                var lastName = $("#lastName-input").val();
                var licenseName = $("#licenseName-input").val();
                var expirationDate = $("#licenseExpiration-input").val();


                $(".selected").eq(0).children("td").eq(0)[0].innerHTML(firstName);
                $(".selected").eq(0).children("td").eq(1)[0].innerHTML(lastName);
                $(".selected").eq(0).children("td").eq(2)[0].innerHTML(licenseName);
                $(".selected").eq(0).children("td").eq(3)[0].innerHTML(expirationDate);

            });

        }


    });


    $('#delete-user').click(function () {
        table.row('.selected').remove().draw(false);
    });

    $('#add-user').on('click', function () {

        table.row.add([$("#firstName-input").val(),
            $("#lastName-input").val(),
            $("#licenseName-input").val(),
            $("#licenseExpiration-input").val()]).draw(false);

    });

});


// Initialize Firebase=================================================================================================================================================
var config = {
    apiKey: "AIzaSyAxJKb68oS4OtyRyWuwNtJ39XFcuCAkVSc",
    authDomain: "licensetracker-13f89-a629a.firebaseapp.com",
    databaseURL: "https://licensetracker-13f89-a629a.firebaseio.com",
    projectId: "licensetracker-13f89-a629a",
    storageBucket: "licensetracker-13f89-a629a.appspot.com",
    messagingSenderId: "492716446247"
};
firebase.initializeApp(config);
console.log(firebase);


//Global variables===================================================================================================================================================

let emailToken = " 24bbb5ae-2e4e-4134-b6c5-c99d05d67ea3 ",
    cUser = localStorage.getItem("userName"),
    // connects to database
    database = firebase.database(),
    ref = database.ref('Users/' + cUser),
    refProviders = database.ref('Providers'),
    flagOld = false,
    flagHidden = false;

//Main================================================================================================================================================================

// //loads providers list
// refProviders.on("value", providersData, errData);

//loads main table
ref.on("value", loadData, errData);

//listeners==========================================================================================================================================================


//load selected record into div----------------------------------------------------------------------------------------------------------------------------------
$(document).on('click', '#table1 tbody tr', function (e) {

    //hide delete and add buttons
    if (flagHidden) {
        hideDeleteBtn();
        hideAddBtn();
        flagHidden = false;
    }
    ;

    //clear selected in table
    $("tr.selected").attr("class", "");

    //sets the flag for existing license to true
    flagOld = true;

    //determan if selected record was already selected if
    //if alerady selected deselect and clear div
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected'); // remove selected from form div
        $("#firstName-input").val(""); // clear first name from form div
        $("#lastName-input").val(""); // clear last name from form div
        $("#licenseName-input").val(""); //clear license name from form div
        $("#licenseExpiration-input").val(""); //clear license experation date from form div
        $("#email-input").val(""); // clear email from form div
        // $("#phoneNumber-input").val(""); // clear phone number from form div
    }
    //add selected class to e and load information into div
    else {

        var tdList = this.getElementsByTagName('td');
        console.log("selected fired")
        // table.$('e.selected').removeClass('selected'); // remove selected class from priro seleceion
        $(this).attr("class", 'selected'); // adds selected class to currently selected e
        var firstName = tdList[0].innerHTML; // loads first name td into var
        var lastName = tdList[1].innerHTML; // loads last name td into var
        var licenseName = tdList[2].innerHTML; // loads license name td into var
        var expirationDate = tdList[3].innerHTML; // loads license experation date td into var
        let email = $(this).attr("data-email"); // loads email address data into var
        // let phoneNumber = $(this).attr("data-phonenumber"); // loads phoneNumber data into var
        // let provider = $(this).attr("data-provider"); // loads provider data into var

        // updates form view text to that of the selected tr
        $("#firstName-input").val(firstName);
        $("#lastName-input").val(lastName);
        $("#licenseName-input").val(licenseName);
        $("#licenseExpiration-input").val(expirationDate);
        $("#email-input").val(email);
        // $("#phoneNumber-input").val(phoneNumber);
        // $('*[data-sms="' + provider + '"]').attr("class", "selector");

        for (var i = 0; i < tdList.length - 1; i++) {
            console.log(tdList[i].innerHTML);
        }
        ;
    }
    ;
});

//delte button---------------------------------------------------------------------------------------------------------------------
$(document).on("click", '#delete-user', function () {

    //loads database key into var
    let key = $(".selected").attr("data-key");

    //removes key form the database
    ref.child(key).remove();

});

//add new lincese----------------------------------------------------------------------------------------------------------------------------------------------
$(document).on("click", "#add-user", function () {
    //clear the from
    $("#firstName-input").val(""); // clear first name from form div
    $("#lastName-input").val(""); // clear last name from form div
    $("#licenseName-input").val(""); //clear license name from form div
    $("#licenseExpiration-input").val(""); //clear license experation date from form div
    $("#email-input").val(""); // clear email from form div
    // $("#phoneNumber-input").val(""); // clear phone number from form div

    //clear selected in table
    $("tr.selected").attr("class", "");
    flagOld = false;

});

//save button-------------------------------------------------------------------------------------------------------------------------------------------------
$(document).on("click", '#update-user', function () {

    //update firebase data
    let fName = $('#firstName-input').val(), // firstName
        lName = $('#lastName-input').val(), //lname
        license = $('#licenseName-input').val(),
        email = $('#email-input').val(), //email
        // phoneNumber = $('#phoneNumber-input').val(), //phoneNumber
        // provider = $('ul li a.selector').attr("data-sms"), //provider
        experationDate = $('#licenseExpiration-input').val(); //ExpirationDate
    timeStamp = moment().unix("X"), //timestamp
        key = $("tr.selected").attr("data-key"); //key
    console.log(key);
    console.log(fName);
    console.log(lName);
    console.log(email);
    // console.log(phoneNumber);
    // console.log(provider);
    console.log(experationDate);
    console.log(timeStamp);


    //checks if the record already exists
    if (flagOld) {
        console.log("set fired");

        //updates record if one already exists
        let current = database.ref('Users/' + cUser + "/" + key);
        current.set({
            licenseName: license,
            fName: fName,
            lName: lName,
            email: email,
            // phoneNumber: phoneNumber,
            // provider: provider,
            experationDate: experationDate,
            timeStamp: timeStamp

        });
    } else {
        console.log("push fired");
        //adds record if new
        ref.push({
            licenseName: license,
            fName: fName,
            lName: lName,
            email: email,
            // phoneNumber: phoneNumber,
            // provider: provider,
            experationDate: experationDate,
            timeStamp: timeStamp
        });
    }
    ;

    //clear form
    $(".details").empty();

});

// //updates selector for provider-------------------------------------------------------------------------------------------------------------------------------
// $(document).on("click",'.dropdown-menu li a', function(){

//   //remvoes selector from last selection
//   $('ul li a.selector').removeClass('selector');

//   //adds selector to new selection
//   $(this).closest('li a').addClass('selector');

// });

// bing-------------------------------------------------------------------------------------------------------------------------------------------------------
$(document).on("click", '.renew', function () {

    bingSearch({
        // var license = $('#licenseName-input').val();

        apiKey: '750b5059619f4815b940215b929846f1', //api Key
        keyword: license + "renew", // keyword lookup
        onSuccess: function (response) {
            var data = response.webPages.value; //webpage look up
            $('#renewingLicenseBox').html('');
            for (var i = 0; i < data.length; i++) { // Loop through data and print to page
                let situs = data[i];
                let element = `<div class="siteList">
                                <a href="${situs.url}" target="_blank">${situs.name}</a> <br/>
                                <span class="displayUrl">${situs.displayUrl}</span> <br/> 
                                ${situs.snippet}
                                </div>`;
                $('#renewingLicenseBox').append(element);
            }
            ;
        }
    });
});
//     //load WebFont
// WebFont.load({
//     google:{
//         families: ['Droid Sans', 'Droid Serif'] //fonts to be loaded
//     }
// });

//functions==================================================================================================================================================

//Reports error to console-------------------------------------------------------------------------------------------------------------------------------
function errData(err) {

    console.log('error!');
    console.log(err);

}

//loads data returned from Firebase to local table-------------------------------------------------------------------------------------------------------
function loadData(data) {

    //hide delete and add buttons and sets flag hidden to false
    hideDeleteBtn();
    hideAddBtn();
    flagHidden = true;

    //clears table for updated values to be loaded
    $("#tableBody").empty();

    //vars
    let returnObj = data.val(); //returns the data in a readable Object form
    let keys;
    let count = 0; // used for row count

    if (returnObj === null) {


    } else {
        // You have an array
        keys = Object.keys(returnObj); //builds array of keys from returned data


        console.log(returnObj);//logs obj to console for debuging

        //foreEach loop to build table rows
        keys.forEach(function (key, index, keys) {
            //loads obj propertis into var
            let fName = returnObj[key].fName,
                lName = returnObj[key].lName,
                email = returnObj[key].email,
                // phoneNumber = returnObj[key].phoneNumber,
                // provider = returnObj[key].provider,
                license = returnObj[key].licenseName,
                experationDate = returnObj[key].experationDate,
                timeStamp = returnObj[key].timeStamp;
            // providerID = $('*[data-sms="' + provider + '"]').attr("data-sms");
            // console.log("get phoenNumber = " + phoneNumber);


            // loads values into table
            $('#tableBody').append("<tr data-key='" + key + "' data-email='" + email + "' data-timestamp'" + timeStamp + "' id='row" + count + "'>" +
                "<td class=>" + fName + "</td> <td class=>" + lName + "</td><td class=>" + license + "</td><td class=>" + experationDate +
                "</td><td><button class='btn btn-sm renew'>Renew</button></td></tr>");

            count++; // increments the count for each row

            let numDays = moment().diff(experationDate, 'days'); // finds the number of days between now and the experation date (returns as a negitive)
            console.log(numDays); // shows the number of days
            let recent = moment().diff(timeStamp, 'hours'); //determans if an email was sent in the last 24 hours

            if (numDays > -60) {
                if (recent > -24) {
                    //sends email
                    if (email != undefined || email != null || email != "") {

                        let current = database.ref('Users/' + cUser + "/" + key),
                            update = moment().unix("X");
                        current.update({
                            timeStamp: update
                        });

                        Email.send(
                            "licensetrackerapp@gmail.com",
                            email,
                            "Your " + license + " is about to expire",
                            "Our records indicate that your " + license + " will expire on " + experationDate
                            + ". Please make preperations to renew license if you need help finding a place" +
                            " to renew please login to your License Tracker profile, select " + license + " and click on renew.",
                            "smtp.gmail.com",
                            "licensetrackerapp",
                            "NikolaTesla1856");
                    }
                    ;

                    //  //sends sms
                    //  if (phoneNumber != undefined || phoneNumber != null || phoneNumber != ""){

                    //      let sms = phoneNumber + provider;
                    //      console.log(sms);

                    //      Email.send(
                    //          "licensetrackerapp@gmail.com",
                    //          email,
                    //          "Your " + license + " is about to expire",
                    //          "Our records indicate that your " + license + " will expire on " + experationDate
                    //          + ". Please make preperations to renew license if you need help finding a place" +
                    //          " to renew please login to your License Tracker profile, select " + license + " and click on renew.",
                    //          "smtp.gmail.com",
                    //          "licensetrackerapp",
                    //          "NikolaTesla1856");

                    // };

                }
                ;
            }
            ;
        });
    }
    ;
};

// search function----------------------------------------------------------------------------------------------------------------------------------
bingSearch = function (option) {
    let bingUrl = 'https://api.cognitive.microsoft.com/bing/v5.0/search';
    var options = $.extend({
        'keyword': '',
        'apiKey': '',
    }, option || {});
    $.ajax({
        url: bingUrl,
        data: {
            'q': options.keyword,
        },
        headers: {
            'Ocp-Apim-Subscription-Key': options.apiKey
        },
        success: function (response) {
            if ($.isFunction(options.onSuccess)) {
                options.onSuccess.call(this, response);
            }
        },
        error: function (response) {
            console.log(response.responseJSON);
            return;
        }
    });
};

//finds users---------------------------------------------------------------------------------------------------------------------------------------------
function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
};

//expose location-----------------------------------------------------------------------------------------------------------------------------------------
function showPosition(position) {
    latitude = position.coords.latitude;
    console.log(latitude);
    longitude = position.coords.longitude;
    console.log(longitude);
};

//hides or shows Delete button
function hideDeleteBtn() {
    $('#delete-user').toggle();
};

//hides or shows add button
function hideAddBtn() {
    $('#add-user').toggle();
};

//adds providers to providers list
// function providersData(data){
//     //clears table for updated values to be loaded
//         $("#dropdown-menu").empty();

//     //vars
//     let returnObj = data.val(), //returns the data in a readable Object form
//       keys = Object.keys(returnObj), //builds array of keys from returned data
//       count = 0; // used for row count

//     console.log(returnObj);//logs obj to console for debuging

//     //foreEach loop to build table rows
//     keys.forEach(function(key, index, keys){

//         //loads obj propertis into var
//         let value = returnObj[key],
//             idKey = key.split(' ').join('');
//         console.log(value);

//         // loads values into table
//         $('.dropdown-menu').append("<li id='" + idKey + "' data-contact='" + value + "'>" + key + "</li>");

//     });

// };
            

            
