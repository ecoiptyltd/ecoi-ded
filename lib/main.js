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
      // If user email = neel@geoi.co.za then set STATE to ALL access
      // If user email = henno@ecoe.co.za then set STATE to ALMOST ALL access
      // If user email = *@anglo.co.za then STATE to Anglo Isibonelo Access
      window.location = './demo.html';
      displayUserContent();
      hideDefaultContent();
    }
    else{
      hideUserContent();
      displayDefaultContent();
    }
  });
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