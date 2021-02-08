// TO DO


const initialize = () => {

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      //const user = firebase.auth().currentUser;
      let userName, userEmail, userCompany, userEmailVerifed;
      userName = user.displayName;
      userEmail = user.email;
      userCompany = user.company;
      userEmailVerified = user.emailVerified;
      console.log(userName);
      window.location = divertUser(checkUserEmail(userEmail));
      displayUserContent();
      hideDefaultContent();
    }
    else{
      hideUserContent();
      displayDefaultContent();
    }
  });
}

// Checks the user email and assign status to user
const checkUserEmail = (email) => {
  switch (email) {
    case 'neel@geoi.co.za':
      return('bigBoss');
      break;
    case 'henno@ecoe.co.za':
      return('smallBoss');
      break;
    default:
      window.alert('User not assigned. Please contact Eco-i Support');
  }
}

const divertUser = (userType) => {
  switch (userType) {
    case 'bigBoss':
      return('./ecoi-admin.html');
      break;
    case 'smallBoss':
      return('./station-pages/ecoi-demo.html');
      break;
      default:
        window.alert('Page for User ' + email + ' not Available');
        return('./index.html');
  }
}

const firebaseCheckUser = () => {
  console.log('firebase check user')
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      displayUserContent();
      hideDefaultContent();
    }
    else{
      hideUserContent();
      displayDefaultContent();
    }
  });
}

const displayDefaultContent = () => {
  let content = document.getElementsByClassName('defaultContent')
  for (let i = 0; i < content.length; i++) {
    dContent[i].style.display = 'block';
  }
}

const hideDefaultContent = () => {
  let content = document.getElementsByClassName('defaultContent')
  for (let i = 0; i < content.length; i++) {
    content[i].style.display = 'none';
  }
}

const displayUserContent = () => {
  console.log('display user content');
  let content = document.getElementsByClassName('userContent')
  for (let i = 0; i < content.length; i++) {
    content[i].style.display = 'block';
  }
}

const hideUserContent = () => {
  console.log('hide user content');
  let content = document.getElementsByClassName('userContent')
  for (let i = 0; i < content.length; i++) {
    content[i].style.display = 'none';
  }
}

const loginButton = () => {
  window.location.href = './login.html';
}

const login = () => {
  const userEmail = document.getElementById('userEmail').value;
  const userPassword = document.getElementById('password').value;
  document.getElementById('loaderSpinner').style.display = 'block';
  document.getElementById('loginForm').style.display = 'none';

  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    document.getElementById('loaderSpinner').style.display = 'none';
    document.getElementById('loginForm').style.display = 'flex';

    window.alert('Error : ' + errorCode + ' - ' + errorMessage);
  });
}

const logout = () => {
  firebase.auth().signOut();
  window.location.href = './login.html';
}