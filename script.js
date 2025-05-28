function ledOn() {
  // console.log("led 켜짐");
  var ref = database.ref("led");
  ref.update({
    led: 1
  })
}
function ledOff() {
  // console.log("led 꺼짐");
  var ref = database.ref("led");
  ref.update({
    led: 0
  })
}


var config = {
  apiKey: "AIzaSyAGm8gM-0L-fev59dJUYcZSZlgXJOQyUkM",
  authDomain: "iot-wab.firebaseapp.com",
  databaseURL: "https://iot-wab-default-rtdb.firebaseio.com",
  projectId: "iot-wab",
  storageBucket: "iot-wab.firebasestorage.app",
  messagingSenderId: "121398688855",
  appId: "1:121398688855:web:cb49bf6bb9144a8d02b712"
};


//Firebase 데이터베이스 만들기
firebase.initializeApp(config);
database = firebase.database();

// Firebase 데이터베이스 정보 가져오기
var ref = database.ref("led");
ref.on("value", gotData);
var tempref = database.ref("temperature");
tempref.on("value", getTemp);  


function getTemp (data){
  var val = data.val();
  document.getElementById("tempval").textContent = "🌡️ 온도 : "+val.temp;
  console.log(val)
}

function gotData(data) {

  var val = data.val();
  if (val.led == 0) {
    //document.getElementById("ledstatus").innerHTML = "led가 현재 꺼짐";
    document.getElementById("img").src = "ledoff.png";
  }
  else {
    //document.getElementById("ledstatus").innerHTML = "led가 현재 켜짐";
    document.getElementById("img").src = "ledon.png";
  }

  console.log(val)
}