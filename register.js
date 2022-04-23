// LANDING PAGE 2 - Creating ID and UserName
var createAccount = document.querySelector("#create-account");
var userID = document.querySelector("#userID");
var userName = document.querySelector("input[name='userName']");

ff.collection("users").add({}).then((docRef) => { // goes to firestore database to collection of users, then adds 
    
    userID.innerHTML = docRef.id; //Prints out unique user ID // For Copy
   
    createAccount.addEventListener("click",function(){
        if(userName.value != "") {  // if the user inputted nothing for their username
            ff.collection("users").doc(docRef.id).set({ // goes to the collection of users, then sets the generated ID key
                name: userName.value, // collects the name and assigns it to the firebase
                userID: docRef.id, // collects the ID and assigns it to the firebase
            },{merge:true}); // then sends to the firebase
            window.location.href = "login.html"; // after the button is clicked it will redirect to the login page
        } else {
            alert("Please type your name in the box."); // if the user inserts no name then it gives alerts
        }
    });
});