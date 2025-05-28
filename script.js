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
var dataref = database.ref("data");
dataref.on("value", getData);  


function getData (data){
  var val = data.val();
  document.getElementById("tempval").textContent = val.temper;
  document.getElementById("humval").textContent = val.humidity;
  document.getElementById("pumval").textContent = val.pressure;
  document.getElementById("gyro-pitch-val").textContent = val.gyro.pitch;
  document.getElementById("gyro-roll-val").textContent = val.gyro.roll;
  document.getElementById("gyro-yaw-val").textContent = val.gyro.yaw;
  document.getElementById("accel-x-val").textContent = val.accel.x;
  document.getElementById("accel-y-val").textContent = val.accel.y;
  document.getElementById("accel-z-val").textContent = val.accel.z;
  document.getElementById("timeval").textContent = val.timestaemp;
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


// ==== 일반 메시지 목록 실시간 로드 함수 ====
function loadMessages() {
    const messagesRef = ref(database, 'messages');
    onValue(messagesRef, (snapshot) => {
        messageList.innerHTML = '';
        const messages = snapshot.val();

        if (messages) {
            // 메시지를 배열로 변환하고 timestamp_readable을 사용하여 역순 정렬 (최신 메시지가 위로)
            const messageArray = Object.keys(messages).map(key => ({
                id: key,
                ...messages[key]
            }));
            
            // 문자열 시간도 정렬 가능하지만, timestamp_unix가 있다면 더 정확합니다.
            messageArray.sort((a, b) => b.timestamp_readable.localeCompare(a.timestamp_readable));

            messageArray.forEach(message => {
                const li = document.createElement('li');
                const displayAuthor = message.authorEmail || message.authorId;
                
                li.innerHTML = `
                    <strong>${displayAuthor}</strong>
                    <p>${message.text}</p>
                    <span>${message.timestamp_readable}</span>
                `;
                messageList.appendChild(li);
            });
        } else {
            messageList.innerHTML = '<li>아직 저장된 메시지가 없습니다.</li>';
        }
    });
}