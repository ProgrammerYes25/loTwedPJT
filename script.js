import { initializeApp } from 'firebase/app';
import { getData, ref, onValue, push, set } from 'firebase/database';

// var config = {
//   apiKey: "AIzaSyAGm8gM-0L-fev59dJUYcZSZlgXJOQyUkM",
//   authDomain: "iot-wab.firebaseapp.com",
//   databaseURL: "https://iot-wab-default-rtdb.firebaseio.com",
//   projectId: "iot-wab",
//   storageBucket: "iot-wab.firebasestorage.app",
//   messagingSenderId: "121398688855",
//   appId: "1:121398688855:web:cb49bf6bb9144a8d02b712"
// };

const config = {
  apiKey: "AIzaSyAXZKdkx72F2GvM7qaynr5r9agAMAiVX2s",
  authDomain: "commonpjt-fd9ed.firebaseapp.com",
  databaseURL: "https://commonpjt-fd9ed-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "commonpjt-fd9ed",
  storageBucket: "commonpjt-fd9ed.firebasestorage.app",
  messagingSenderId: "653463134970",
  appId: "1:653463134970:web:8301b6f3a2bde8da201f43"
};


//Firebase 데이터베이스 만들기
const firebase = initializeApp(config);
const database  = getDatabase(firebase);

// Firebase 데이터베이스 정보 가져오기
function loadHistoricalSensorData() {
  var dataref = ref(database, '/');
  onValue(dataref, getData);  
}

function getData (data){
  var dataAll= data.val();

  const dataArray = [];

  historicalSensorDataTableBody.innerHTML = '';
  
  if (snapshot.exists()) {
    // Firebase의 데이터는 객체이므로, 각 기록을 배열에 담습니다.
    for (let data in dataAll) {
    dataArray.push({
        temperature : data.sensehat.temperature,
        humidity : data.sensehat.humidity,
        pressure : data.sensehat.pressure,
        gyro_x : data.sensehat.gyro.x,
        gyro_y : data.sensehat.gyro.y,
        gyro_z : data.sensehat.gyro.z,
        accel_x : data.sensehat.accel.x,
        accel_y : data.sensehat.accel.y,
        accel_z : data.sensehat.accel.z,
        timestaemp : data.sensehat.timestaemp,
      });
    }
  } else {
    // 데이터가 없을 때 표시할 내용
    historicalSensorDataTableBody.innerHTML = '<tr><td colspan="6">저장된 센서 기록이 없습니다.</td></tr>';
  }
  console.log(dataArray)
}




// // ==== 일반 메시지 목록 실시간 로드 함수 ====
// function loadMessages() {
//     const messagesRef = ref(database, 'messages');
//     onValue(messagesRef, (snapshot) => {
//         messageList.innerHTML = '';
//         const messages = snapshot.val();

//         if (messages) {
//             // 메시지를 배열로 변환하고 timestamp_readable을 사용하여 역순 정렬 (최신 메시지가 위로)
//             const messageArray = Object.keys(messages).map(key => ({
//                 id: key,
//                 ...messages[key]
//             }));
            
//             // 문자열 시간도 정렬 가능하지만, timestamp_unix가 있다면 더 정확합니다.
//             messageArray.sort((a, b) => b.timestamp_readable.localeCompare(a.timestamp_readable));

//             messageArray.forEach(message => {
//                 const li = document.createElement('li');
//                 const displayAuthor = message.authorEmail || message.authorId;
                
//                 li.innerHTML = `
//                     <strong>${displayAuthor}</strong>
//                     <p>${message.text}</p>
//                     <span>${message.timestamp_readable}</span>
//                 `;
//                 messageList.appendChild(li);
//             });
//         } else {
//             messageList.innerHTML = '<li>아직 저장된 메시지가 없습니다.</li>';
//         }
//     });
// }