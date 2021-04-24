var firebaseConfig = {
    apiKey: "AIzaSyCzo1yc14j8ECh96mHY5DXds7oxL1KTBzI",
    authDomain: "project-93-c6cfa.firebaseapp.com",
    databaseURL: "https://project-93-c6cfa-default-rtdb.firebaseio.com",
    projectId: "project-93-c6cfa",
    storageBucket: "project-93-c6cfa.appspot.com",
    messagingSenderId: "925696218191",
    appId: "1:925696218191:web:941e0139f97dc85ef8c63a",
    measurementId: "G-P6RK9BV56C"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//YOUR FIREBASE LINKS

room_name = localStorage.getItem("room_name");

user_name = localStorage.getItem("user_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
//Start code
    console.log(firebase_message_id);
    console.log(message_data)
    name = message_data['name']
    message = message_data['message']
    like = message_data['like']
    name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
    message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
    like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
    span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";


    row = name_with_tag + message_with_tag +like_button + span_with_tag;
    document.getElementById("output").innerHTML += row;
//End code
    } });  }); }
getData();

function updateLike(message_id)
{
    console.log("clicked on the like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes)

    firebase.database().ref(room_name).child(message_id).update({
     like : updated_likes
    });
}

function send()
{
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name:user_name,
          message:msg,
          like:0
    });

    document.getElementById("msg").value = "";
}

function logout()
{
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");  
    window.location.replace("kwitter.html");    
}
