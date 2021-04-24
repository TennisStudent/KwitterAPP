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

  user_name = localStorage.getItem("user_name");

  document.getElementById("username").innerHTML = "Welcome " + user_name + "!";

  function addRoom()
  {
        room_name = document.getElementById("room_name").value;
  
  
        firebase.database().ref("/").child(room_name).update({
              purpose : "adding room name"
        });
  
        localStorage.setItem("room_name", room_name);
  
        window.location = "kwitter_page.html";
  }

  function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {
      childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;    
      //End code
      });});}
getData();


function redirectToRoomName(name)
{
      console.log(name)
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
            window.location = "kwitter.html";
}