// TO DO

const divertPage = './ecoi-ded.html';

const initialize = () => {

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      window.location = divertPage;
    }
    else{
      hideContent('content-user');
      displayContent('default-content');
    }
  });
}

const divertUser = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      window.location = divertPage;
    }
    else{
      hideContent('content-user');
      displayContent('default-content');
    }
  })  
}

const firebaseCheckUser = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const userDB = firebase.firestore().collection('users');
      const userUID = user.uid;
      userDB.doc(userUID)
        .get()
        .then((doc) => {
          if (doc.exists) {
            let userRole = doc.data().userType;
            showUserInfo(userUID, doc.data().name);
            if (userRole === 'client') {
              getClientOfUser(userUID);
            }
            showContent(userRole);
          }
        })

    }
    else{
      hideContent('content-user');
      displayContent('default-content');
    }
  });
}

// Show content related to user
// userRole = admin, user client
// method = divert, statechange
const showContent = (userRole) => {
  switch (userRole) {
    case 'admin':
      // Admin user logged in
      
      displayContent('content-admin');
      displayContent('content-user');
      displayContent('content-client');
      hideAllContent();
      
    //hideContent('content-default');
    break;
  case 'user':
    // Standard user logged in
    displayContent('content-user');
    displayContent('content-client');
    hideAllContent();
    
    break;
  case 'client':
    // Client user logged in
    displayContent('content-client');
    hideAllContent();
    
    break;
  default:
    // No user logged in
    break;
  }
}

const showUserInfo = (userUID, displayName) => {
  document.getElementById('navUserName').innerHTML = displayName;
  document.getElementById('navUID').innerHTML = userUID;
}

const loginButton = () => {
  window.location.href = './login.html';
}

const login = () => {
  const userEmail = document.getElementById('userEmail').value;
  const userPassword = document.getElementById('password').value;
  document.getElementById('loaderSpinner').style.display = 'block';
  document.getElementById('loginForm').style.display = 'none';

  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
  .then(() => {
    divertUser();
  })
  .catch((error) => {
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

const registerNewUser = () => {
  const userDB = firebase.firestore().collection("users");

  const userName = document.getElementById('userName').value;
  const userTel = document.getElementById('userTel').value;
  const userEmail = document.getElementById('userEmail').value;
  const userPassword = document.getElementById('userPassword').value;
  const userType = document.getElementById('userType').value;

  document.getElementById('newUserFrom-SubmitButton').innerHTML = 'Submitting...';
  document.getElementById('newUserFrom-SubmitButton').disabled = true;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;
      
      userDB.doc(uid).set({
        name: userName,
        email: userEmail,
        telephone: userTel,
        userType: userType
      })
      .then(() => {
        console.log('DB write done');
        document.getElementById('newUserFrom-SubmitButton').innerHTML = 'Submit';
        document.getElementById('newUserFrom-SubmitButton').disabled = false;
  
        document.getElementById('userName').value = ''; 
        document.getElementById('userTel').value = '';
        document.getElementById('userEmail').value = '';
        document.getElementById('userPassword').value = '';
      })
      .then(() => {
        let user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: userName
        })     
      })
      .then(() => {
        logout();
        })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error with code: ${errorCode}. Error Message: ${errorMessage}`);
      document.getElementById('newUserFrom-SubmitButton').innerHTML = 'Submit';
      document.getElementById('newUserFrom-SubmitButton').disabled = false;
    }) 

}

const registerNewClient = () => {
  const clientDB = firebase.firestore().collection('clients');
  const userDB = firebase.firestore().collection("users");

  const clientCompany = document.getElementById('clientCompany').value;
  const clientContactPerson = document.getElementById('clientContactPerson').value;
  const clientTel = document.getElementById('clientTel').value;
  const clientEmail = document.getElementById('clientEmail').value;
  const clientPassword = document.getElementById('clientPassword').value;

  document.getElementById('newClientFrom-SubmitButton').innerHTML = 'Submitting...';
  document.getElementById('newClientFrom-SubmitButton').disabled = true;

  firebase.auth().createUserWithEmailAndPassword(clientEmail, clientPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      const userUID = user.uid;
      
      // Write Client info to Firebase
      clientDB.add({
        company: clientCompany
      })
      .then((docRef) => {
        clientDB.doc(docRef.id).collection('users').doc(userUID).set({
          main_contact: true
        })
      })
      .then(() => {
        // Write Client to Users DB
        userDB.doc(userUID).set({
          name: clientContactPerson,
          email: clientEmail,
          telephone: clientTel,
          userType: 'client'
        })
      })
      .then(() => {
        document.getElementById('newClientFrom-SubmitButton').innerHTML = 'Submit';
        document.getElementById('newClientFrom-SubmitButton').disabled = false;
  
        document.getElementById('clientCompany').value = ''; 
        document.getElementById('clientContactPerson').value = ''; 
        document.getElementById('clientTel').value = '';
        document.getElementById('clientEmail').value = '';
        document.getElementById('clientPassword').value = '';
      })
      .then(() => {
        logout();
      })

      

      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error with code: ${errorCode}. Error Message: ${errorMessage}`);
      document.getElementById('newClientFrom-SubmitButton').innerHTML = 'Submit';
      document.getElementById('newClientFrom-SubmitButton').disabled = false;
    }) 
}

const sendResetPasswordLink = (userUID) => {
  userDB.doc(userUID)
    .get()
    .then((doc) => {
      let email = doc.data().email;
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          window.alert(`Reset link sent to ${email}`)
        })
        .catch((error) => {
          console.error('Could not send reset link email: ', error);
          window.alert('Could not send reset link email: ', error);
        })
    })
    .catch((error) => {
        console.error('Could not read User ID in DB: ', error);
        window.alert('Could not read User ID in DB: ', error);
    })
}

const deleteUser = (userUID) => {
  let r = confirm(`Are you sure want to delete the user with UID: \n${userUID}`);
  if (r) {
    clientDB
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Delete user from All Client DB
        clientDB.doc(doc.id).collection('users').doc(userUID)
          .delete()
          .then(() => {
            // Delete user from Users DB
              userDB.doc(userUID)
                .delete()
                .then(() => {})
                .catch((error) => {
                  console.error(`Error deleting user ${userUID} from User DB: ${error}`);
                  window.alert(`Error deleting user ${userUID} from User DB: ${error}`);
                })
            })
            .catch((error) => {
              console.error(`Error deleting user ${userUID} from Client DB: ${error}`);
              window.alert(`Error deleting user ${userUID} from Client DB: ${error}`);
            })          
          })    
      })
      .then(() => {
        // TO-DO: Delete User from Authentication
        //reloadTable(type, tableID)
        window.alert(`Please ask Neel to delete user ${userUID} from Authentication`);
        populateUserTable('editUsersTable', 'users_edit');
        
      })
  }
  
}

const tableListSearch = (tableID, inputID, column) => {
  let table = document.getElementById(tableID);
  let input = document.getElementById(inputID);

  let filter = input.value.toUpperCase();
  let tr = table.getElementsByTagName('tr');

  for (let i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[column];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

const setSiteBackButton = (clientUID) => {
    document.getElementById('siteBackButton').setAttribute('onclick', `selectClient('${clientUID}')`);
}