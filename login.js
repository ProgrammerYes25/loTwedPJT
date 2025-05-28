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
// var ref = database.ref("userData");
// ref.on("value", gotData);

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

lgoinForm.addEventListener('submit', async (e) =>{
    e.preventDefault();

    const userEamil = emailInput.value;
    const userPassword = passwordInput.value;

    var ref = database.ref("userData");

    ref.push({
        email:userEamil,
        password:userPassword
    });

    window.location.href = 'home.html'; 
})

