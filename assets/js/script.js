// // Vars========================================================================================
// // security tken smtpjs d8550441-dec0-40c8-b841-9743e0615874
//
//
// $(document).ready(function () {
//
//     //Makes the table into a data table
//     $("#table1").DataTable();
//
//
//     //Bing API
//     apiKey_Bing = "",
//         apiKey_emailsmtpjs = ""
//     Contat = [{
//         address: "",
//         phone: "",
//         provider: "",
//     }],
//         cUser = "";
//
//     var emailToken = "d8550441-dec0-40c8-b841-9743e0615874";
//
//
//     // Initialize Firebase
//     var config = {
//         apiKey: "AIzaSyDwL23NKiNpWRbuJcX0LQHTpsu1-aSlryY",
//         authDomain: "licensetracker-13f89.firebaseapp.com",
//         databaseURL: "https://licensetracker-13f89.firebaseio.com",
//         projectId: "licensetracker-13f89",
//         storageBucket: "",
//         messagingSenderId: "738130896123"
//     };
//     firebase.initializeApp(config);
//     database = firebase.database();
//
//
//     //load gmail
//     //load google api
//     //webfont loader
//
//     WebFont.load({
//         google: {
//             families: ['Droid Sans', 'Droid Serif']
//         }
//     });
//
//
//     //load()
//     //listeners======================================================================================
//
//     //openRecord in Div
//     // var currentRow=$(this).closest("tr");
//
//     //     var col1=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
//     //     var col2=currentRow.find("td:eq(1)").text(); // get current row 2nd TD
//     //     var col3=currentRow.find("td:eq(2)").text(); // get current row 3rd TD
//     //     var data=col1+"\n"+col2+"\n"+col3;
//
//
//     $('#update-user').click( function () {
//
//         table.row('.selected').draw( false );
//
//         //clear form
//         $(".details").empty();
//         //update form values
//         //firstName
//         $('#firstName-input').text(firstName);
//         //lname
//         $('#lastName-input').text(lastName);
//         //email
//         $('#email-input').text(email);
//         //phoneNumber
//         $('#phoneNumber-input').text(phoneNumber);
//         //provider
//         $('#pr').text(provider);
//         //ExpirationDate
//         $('?').text(expirationDate);
//
//
//     });
//
//
//
//
//     //search for record
//     $(document).on("click", , function () {
//         var results = database.ref(users / user).equalTo($("#?").val());
//         // Load in to table
//         var count = 0;
//         $("#?").empty();
//         for (var i = 0; i < results.length; i++) {
//
//
//             var fName = results[i].fName,
//                 lName = results[i].lName,
//                 email = results[i].email,
//                 phoneNumber = results[i].phoneNumber,
//                 provider = results[i].provider,
//                 experationDate = results[i].experationDate,
//                 timeStamp = results[i].timeStamp;
//
//
//             $("#?").append("<tr id='" + count + "'><td class=''>" + fName + "</td><td class=''>" + lName + "</td><td class=''>" + email + "</td><td class=''>" + phoneNumber + "</td><td class=''>" + provider + "</td><td class='' data-timestamp'" + timeStamp + "'>" + experationDate + "</td></tr>");
//         }
//
//     });
//
//
//     //save Record
//     $(document).on("click", , function () {
//
//         var checker = $("#?").attr("data-key");
//
//         if (checker) {
//             database.ref("users/" + userName).push({
//                 fName: $("#?").val(),
//                 lName: $("#?").val(),
//                 email: $("#?").val(),
//                 phoneNumber: $("#?").val(),
//                 provider: $("#?").val(),
//                 experationDate: $("#?").val(),
//                 timeStamp: $("#?").val();
//         })
//             ;
//         } else {
//                 ? database.ref("users/" + userName).set({
//                     fName: $("#?").val(),
//                     lName: $("#?").val(),
//                     email: $("#?").val(),
//                     phoneNumber: $("#?").val(),
//                     provider: $("#?").val(),
//                     experationDate: $("#?").val(),
//                     timeStamp: $("#?").val();
//         })
//             ;
//         }
//     });
//
//     //new Record
//     $(document).on("click", , function () {
//         $("#?").empty();
//     });
//
//     // On load Function
//     database.ref("/users/" + user).once("value", function (snapshot) {
//
//         var key = snapshot.key;
//         var count = 0;
//         var fName = snapshot.val().fName;
//         var lName = snapshot.val().lName;
//         var email = snapshot.val().email;
//         var phoneNumber = snapshot.val().phoneNumber;
//         var provider = snapshot.val().provider;
//         var experationDate = snapshot.val().experationDate;
//         var timeStamp = snapshot.val().timeStamp;
//
//         $('?').append("<tr data-key'" + key + "' id='row" + count + "'>" +
//             "<td class=>" + fName + "</td> <td class=>" + lName + "</td> <td class=>"
//             + email + "</td> <td class=>" + phoneNumber + "</td> <td class=>" + provider
//             + "</td> <td data-timestamp'" + timeStamp + "' class=>" + experationDate + "</td></tr>")
//     });
//
//     // Renew
//     $(document).on("click", ?, function () {
//         var url = "https://api.cognitive.microsoft.com/bingv5.0/search";
//     })
//
//
//     //functions
//     // generic email template
//     function emailTemp(contact, license, experationDate) {
//
//         if () {
//             Email.send("licensetracker@gmail.com",
//                 contact,
//                 "Your " + license + " is about to expire",
//                 "Our records indicate that your " + license + " will expire on " + experationDate
//                 + ". Please make preperations to renew license if you need help finding a place" +
//                 " to renew please click ? or copy and past into your browser",
//                 "smtp.gmail.com",
//                 {token: emailToken});
//         }
//
//     }
//
// });