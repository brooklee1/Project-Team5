//Global Vars
    let apiKeyBing = "", //Bing API
        emailToken = "d8550441-dec0-40c8-b841-9743e0615874", //Security Token SMTPJS
        cUser = ""; //Current logged-in user

//main
    //transition table into "DataTables"
    $("#table1").DataTable();

    //load firebase and initialize
    const config = {
            apiKey: "AIzaSyDwL23NKiNpWRbuJcX0LQHTpsu1-aSlryY",
            authDomain: "licensetracker-13f89.firebaseapp.com",
            databaseURL: "https://licensetracker-13f89.firebaseio.com",
            projectId: "licensetracker-13f89",
            storageBucket: "",
            messagingSenderId: "738130896123"
        };
    firebase.initializeApp(config);
    database = firebase.database(); //shortcut ref

    //load WebFont
    WebFont.load({
        google:{
            families: ['Droid Sans', 'Droid Serif'] //fonts to be loaded
        }
    });


// listeners

    //load data
    database.ref("users/" + cUser + "/").on("value", function (snapshot) {

        //clears table for updated values to be loaded
        $("#tableBody").empty();

        // vars
        var key = snapshot.key; // key value for current record
        var fName = snapshot.val().fName; 
        var lName = snapshot.val().lName;
        var email = snapshot.val().email;
        var phoneNumber = snapshot.val().phoneNumber;
        var provider = snapshot.val().provider;
        var experationDate = snapshot.val().experationDate;
        var timeStamp = snapshot.val().timeStamp;

        // loads values into table
        $('#tableBody').append("<tr data-key'" + key + "' data-timestamp'" + timeStamp + "' id='row" + count + "'>" +
            "<td class=>" + fName + "</td> <td class=>" + lName + "</td> <td class=>"
            + email + "</td> <td class=>" + phoneNumber + "</td> <td class=>" + provider
            + "</td> <td class=>" + experationDate + "</td><td><button class='btn btn-sm'>Renew</button></td></tr>")
    });


    //delte button
    $('#delete-user').on("click", function(){

        //loads database key into var
        let key =  $(".selected").data("key");

        //removes key form the database
        database.ref("users/").child(key).remove();

    });


    //save button
    $('#update-user').on("click", function(){

        //update firebase data
        let fName = $('#firstName-input').val(), // firstName
            lName = $('#lastName-input').val(), //lname
            email = $('#email-input').val(), //email
            phoneNumber = $('#phoneNumber-input').val(), //phoneNumber
            provider = $('#pr').val(), //provider
            experationDate = $('licenseExpiration-input').val(); //ExpirationDate
            timeStamp = moment();

        database.ref("useres/" + cUser + "/" + key + "/").set({

            fname: fName,
            lName: lName,
            email: email,
            phoneNumber: phoneNumber,
            provider: provider,
            experationDate: experationDate,
            timeStamp: timeStamp

        });

        //clear form
        $(".details").empty();

    });

    //record selected
    $("#table1 tbody").on( 'click', 'tr', function (event) {

        exposeRecord(event);

        });

    //renew
    $('?button').click(function() {
                bingSearch({
                    apiKey: '750b5059619f4815b940215b929846f1', //api Key
                    keyword: license + "renew" + ?location , // keyword lookup
                    onSuccess: function(response) {
                        var data = response.webPages.value; //webpage look up
                        $('?result').html('');
                        for (var i = 0; i < data.length; i++) { // Loop through data and print to page 
                            let situs = data[i];
                            let element = `<div class="siteList">
                                <a href="${situs.url}" target="_blank">${situs.name}</a> <br/>
                                <span class="displayUrl">${situs.displayUrl}</span> <br/> 
                                ${situs.snippet}
                                </div>`;
                            $('.?result').append(element);
                        }
                    }
                });
            });

    //add new lincese
    $("#add-user").on("click", function(){
        //clear the from
        $(".details").empty();

        //clear selected in table
        $(".selected").class("");

        });

    //add 
    $("#").on("click", function(){

        let userName = $("#?").val();
        let cheker = false;

        database.child('login').orderByChild('userName').equalTo(userName).once("value", function(snapshot) {
            if(snapshot != null || snapshot != ""){
                cheker = true;
            };
        });

        let userName = database.ref("login/").orderByChild.equalTo("key");
        let userName = $("#?").val();

        if(checker){
            database.ref("login/").push({
                userName: userName,
                Password: $("#?").val()
                });
        }else{
            $("#").text("This user name is already taken. Please choose another.");
        };
        
    });

    //event listner for provider selector

    //login
    $("#?login").on("click", function(){

        //capture val user put in
        let checker = false;
        let userName = $("#?").val();
        let password = $("#?").val();
        //check against firebase
         database.child('login').orderByChild('userName').equalTo(userName).once("value", function(snapshot) {
            if(snapshot != null || snapshot != ""){
                cheker = true;
            };
        });

         database.child('login').orderByChild('password').equalTo(password).once("value", function(snapshot) {
            if(snapshot != null || snapshot != ""){
                cheker = true;
            } else{
                cheker = false;
            };
        });
        //if carry data to next page
         //if match load next page
        if(checker){
            localStorage.setItem('userName', userName)
            window.location.replace('...');
        } else{
            $('#?').text('your password or email is incorrect') //else dont match return message
        }

    })




    //email template for cellphone
    function email(emaiAddress, license, experationDate){

        let email = emailAddress;

        if (email != null || email != "") {
            console.log("there was an issue with the email function. The requested domain is either null or empty")
        }else{
                Email.send("licensetracker@gmail.com",
                email,
                "Your " + license + " is about to expire",
                "Our records indicate that your " + license + " will expire on " + experationDate
                + ". Please make preperations to renew license if you need help finding a place" +
                " to renew please click " + ? + " or copy and past into your browser",
                "smtp.gmail.com",
                {token: emailToken});
        }

    }


    //email template for cellphone
    function emailSMS(phoneNumber, provider, license, experationDate){

        let domain = database.ref("providers/" + provider).once('value', show);
        let email = phoneNumber + domain;

        if (domain != null || domain != "") {
            console.log("there was an issue with the emailSMS function. The requested domain is either null or empty")
        }else{
                Email.send("licensetracker@gmail.com",
                email,
                "Your " + license + " is about to expire",
                "Our records indicate that your " + license + " will expire on " + experationDate
                + ". Please make preperations to renew license if you need help finding a place" +
                " to renew please click ? or copy and past into your browser",
                "smtp.gmail.com",
                {token: emailToken});
        }

    }

    //Save / Update Record
    function save(tableRowObj){

        //checks to see if the data exists in firebase by checking if it has a user key
        var checker = $(tableRowObj).attr("data-key");

        //checks if the information exists in firebase. If it does it updates it. If not it adds a new reocrd
        if (checker) { // add new record
            database.ref("users/" + userName).push({
                fName: $("#firstName-input").val(),
                lName: $("#lastName-input").val(),
                email: $("#email-input").val(),
                phoneNumber: $("#phoneNumber-input").val(),
                provider: $("ul li[data-state='selected']").val(),
                experationDate: $("#licenseExpiration-input").val(),
                timeStamp: moment().unix().format("X")
        })
        } else { // update existing record
                database.ref("users/" + userName + "/" + checker).set({
                    fName: $("#firstName-input").val(),
                    lName: $("#lastName-input").val(),
                    email: $("#email-input").val(),
                    phoneNumber: $("#phoneNumber-input").val(),
                    provider: $("ul li[data-state='selected']").val(),
                    experationDate: $("#licenseExpiration-input").val(),
                    timeStamp: moment().unix().format("X")
        })
            ;
        }
    }

    //load selected record into div
    function exposeRecord(tableRowObj){
        
        $("#table1 tbody").on( 'click', 'tr', function (e) {

        //determan if selected record was already selected if
            //if alerady selected deselect and clear div
            if($(tableRowObj).hasClass('selected')){
                $(tableRowObj).removeClass('selected'); // remove selected from form div
                $("#firstName-input").val(""); // clear first name from form div
                $("#lastName-input").val(""); // clear last name from form div
                $("#licenseName-input").val(""); //clear license name from form div
                $("#licenseExpiration-input").val(""); //clear license experation date from form div
                $("#email-input").val(""); // clear email from form div
                $("#phoneNumber-input").val(""); // clear phone number from form div
            }
            //add selected class to tr and load information into div
            else{
                table.$('tr.selected').removeClass('selected'); // remove selected class from priro selectrion
                $(tableRowObj).addClass('selected'); // adds selected class to currently selected tr
                var firstName = $(tableRowObj).eq(0).children("td").eq(0)[0].innerText; // loads first name td into var
                var lastName = $(tableRowObj).eq(0).children("td").eq(1)[0].innerText; // loads last name td into var
                var licenseName = $(tableRowObj).eq(0).children("td").eq(2)[0].innerText; // loads license name td into var
                var expirationDate = $(tableRowObj).eq(0).children("td").eq(3)[0].innerText; // loads license experation date td into var
                console.log($(tableRowObj).eq(0).children("td").eq(0)["0"].innerHTML); // console logs td's of selected tr

                // updates form view text to that of the selected tr
                $("#firstName-input").val(firstName); 
                $("#lastName-input").val(lastName); 
                $("#licenseName-input").val(licenseName); 
                $("#licenseExpiration-input").val(expirationDate); 
            }
        });
    
    //Bing search
    // search function 
    bingSearch = function(option) {
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
                success: function(response) {
                    if ($.isFunction(options.onSuccess)) {
                        options.onSuccess.call(this, response);
                    }
                },
                error: function(response) {
                    console.log(response.responseJSON);
                    return;
                }
            });
        }            
    //====================================