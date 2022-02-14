const displayContent = (type) => {
    //console.log(`display ${type} content`);
    let content = document.getElementsByClassName(`${type}`)
    for (let i = 0; i < content.length; i++) {
      content[i].style.display = 'block';
    }
  }
  
  const hideContent = (type) => {
    //console.log(`hide ${type} content`);
    let content = document.getElementsByClassName(`${type}`)
    for (let i = 0; i < content.length; i++) {
      content[i].style.display = 'none';
    }
  }

const hideAllContent = () => {
    hideContent('content-client-edit-site');
    hideContent('content-client-edit');
    hideContent('content-client-edit-list');
    hideContent('content-clients-list');
    hideContent('content-register-client');
    hideContent('content-register-user');
    hideContent('content-admin-section');
    hideContent('content-admin-client-section');
    hideContent('content-default-settings');
    hideContent('content-user-edit');
    hideContent('content-view-client');
    hideContent('content-view-site');
    hideContent('content-view-doc-table');
    hideContent('content-view-pdf-preview');
  }
  
  const viewRegisterNewUser = () => {
    hideAllContent();
    displayContent('content-register-user');
  }
  
  const viewRegisterNewClient = () => {
    hideAllContent();
    displayContent('content-register-client');
  }
  
  const viewDefaultSettings = () => {
    hideAllContent();
    readDefaultDB('defaultDocTypesTable', 'documents');
    readDefaultDB('defaultMonitorTypesTable', 'monitor_type');
    // Add Surface Water Monitor Types
    displayContent('content-default-settings');
  }
  
  const viewAdminMain = () => {
    hideAllContent();
  }
  
  const viewClientsSection = () => {
    hideAllContent();
    readClientDB('clientsTable', 'view');
    displayContent('content-clients-list');
  }
  
  const viewEditClientListSection = () => {
    hideAllContent();
    readClientDB('clientListEditTable', 'edit');
    displayContent('content-client-edit-list');
  }
  
  const viewEditClientSection = () => {
    hideAllContent();
    editClientDB('clientListEditTable', 'edit');
    displayContent('content-client-edit-list');
  }
  
  const viewEditClient = () => {
    displayContent('content-client-edit');
  }
  
  const viewEditClientSite = () => {
    displayContent('content-client-edit-site');
  }
  
  const viewEditUserList = () => {
    hideAllContent();
    populateUserTable('editUsersTable', 'users_edit')
    displayContent('content-user-edit');
  }
