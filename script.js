import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getDatabase, ref, onValue, set, push, remove} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';
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

let app ;
let database;
let tableBody;
let uploadDataButton;


// Firebase 데이터베이스 정보 가져오기
function loadHistoricalSensorData() {
  var dataref = ref(database);
  onValue(dataref, getData,  (error) => { // 에러 콜백 추가
    console.error("센서 기록 로드 오류:", error);
    if (tableBody) {
      tableBody.innerHTML = `<tr><td colspan="6">센서 기록 로드 중 오류 발생: ${error.message}</td></tr>`;
    }
});  
}

async function getData (dataList){
  var dataAll= dataList.val();
  console.log( "데이터 확인:",dataAll)
  const dataArray = [];
  // const pathToDelete= "-OSP-U5TDJdogx5H-Mhh";
  // const dataRef = ref(database, pathToDelete); // 'pathToDelete'는 삭제할 데이터의 경로입니다.

  //   try {
  //       await remove(dataRef); // remove() 메서드를 사용하여 데이터를 삭제합니다.
  //       console.log(`Firebase 경로 '${pathToDelete}'의 데이터가 성공적으로 삭제되었습니다.`);
  //   } catch (error) {
  //       console.error(`Firebase 데이터 삭제 오류 (${pathToDelete}):`, error);
  //   }

  if (tableBody) {
    tableBody.innerHTML = ''; 
  }else {
    console.warn("tableBody를 찾을 수 없습니다. HTML ID가 'historicalSensorDataTableBody'인지 확인하거나 DOM 로딩 시점을 확인하세요.");
    // tbodyElement가 null이면 더 이상 진행할 수 없으므로 함수 종료
    return; 
  }
  
  if (dataList.exists()) {
    //Firebase의 데이터는 객체이므로, 각 기록을 배열에 담습니다.
    for (let key in dataAll) {
      console.log( "데이터 확인(data):",key) 
      if(key != "message"){
        const data = dataAll[key]
        console.log( "데이터 확인(data):",data.sensehat);
        dataArray.push({
          name : key,
          temperature : data.sensehat.temperature,
          humidity : data.sensehat.humidity,
          pressure : data.sensehat.pressure,
          gyro_x : data.sensehat.gyro.x,
          gyro_y : data.sensehat.gyro.y,
          gyro_z : data.sensehat.gyro.z,
          accel_x : data.sensehat.accel.x,
          accel_y : data.sensehat.accel.y,
          accel_z : data.sensehat.accel.z,
          timestamp : data.sensehat.timestamp,
        });
      }
    }
    console.log( "데이터 확인:",dataArray)

    dataArray.forEach((record) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
      <td data-label="이름">${record.name}</td>
      <td data-label="온도">${typeof record.temperature === 'number' ? record.temperature.toFixed(2) + " °C" : record.temperature}</td>
      <td data-label="습도">${typeof record.humidity === 'number' ? record.humidity.toFixed(2) + " %" : record.humidity}</td>
      <td data-label="기압">${typeof record.pressure === 'number' ? record.pressure.toFixed(2) + " hPa" : record.pressure}</td>
      <td data-label="자이로">${record.gyro_x !== 'N/A' ? `X: ${record.gyro_x.toFixed(2)}, Y: ${record.gyro_y.toFixed(2)}, Z: ${record.gyro_z.toFixed(2)}` : 'N/A'}</td>
      <td data-label="가속도">${record.accel_x !== 'N/A' ? `X: ${record.accel_x.toFixed(3)}, Y: ${record.accel_y.toFixed(3)}, Z: ${record.accel_z.toFixed(3)}` : 'N/A'}</td>
      <td data-label="시간">${record.timestamp}</td>`;
      tableBody.appendChild(tr);
    });

  } else {
    // 데이터가 없을 때 표시할 내용
    tableBody.innerHTML = '<tr><td colspan="6">저장된 센서 기록이 없습니다.</td></tr>';
  }
  console.log( "데이터 확인:",dataArray)


}

async function uploadData() {
  const dataRef = ref(database);
  const dataToUpload = {
      "info": {학번: '2024800016'},
      "sensehat":{ 
        "accel": {
          "x": 0.0174, 
          "y": 0.0019, 
          "z": 0.9989},
      "gyro": {
        "x": 358.31, 
        "y": 2.21, 
        "z": 158.59},
      "humidity": 41.46,
      "pressure": 998.26,
      "temperature": 35.94,
      "timestamp": "2025-06-09T 21:43:36"} 
  };
  try {
    const user = ref(database,'조예서');
      await set(user, dataToUpload);
      console.log("JSON 데이터 업로드 성공:", dataToUpload);

  } catch (error) {
      console.error("JSON 데이터 업로드 오류:", error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  app = initializeApp(config);
  database  = getDatabase(app);
  tableBody = document.getElementById('tableBody');
  uploadDataButton = document.getElementById('uploadDataButton');
  loadHistoricalSensorData();
  
  if (uploadDataButton) {
    uploadDataButton.addEventListener('click', uploadData);
  }
  
});

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