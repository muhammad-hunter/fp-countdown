// getting input --> using data + setting information
var inputUserID = document.querySelector("input[name='userID']");
var inputUserName = document.querySelector("input[name='userName']");
var loginButton = document.querySelector("#login");
var ff = firebase.firestore();



loginButton.addEventListener("click", function(){
    ff.collection("users").doc(inputUserID.value).get().then((doc) => { // directs to the users collection, checks for user input ID
        if(doc.exists){ // checks if the id exists
            if(doc.data().name == inputUserName.value){ // if inputed data matches with the database collection
                sessionStorage.setItem("document", inputUserID.value); // if exists, sets key "document" with value of "inputUserID.value"
                sessionStorage.setItem("name", inputUserName.value); // if exists, sets key "name" with value of "inputUserName.value"
                window.location.href = "countdown.html";
            } else {
                alert("Invalid username.  Make sure to type in exactly same as your created one."); // the user inputed wrong username
            }
        } else {
            alert("Invalid userID. Generate new one if you have lost it."); // the user inputted wrong userID
        }
    });

});