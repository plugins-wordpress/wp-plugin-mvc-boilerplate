/**
 * App Chat
 */

'use strict';

// const { registerConsoleShortcuts } = require("vitest/node");

document.addEventListener('DOMContentLoaded', function () {
  (function () {
    const socket = io('https://nodecraftsman.com/chat', { secure: true })

    const main = io('http://localhost:3000', { secure: true })
    main.on('connect', () => {
      console.log('connected to main socket')
    })
    // main.on('userStatusChange', user => {
    //   console.log('user status change ', user)
    // })
    main.on('userHasLoggedIn', user => {
      console.log('use has logged in ', user)
    })

  
  //  app.emit('style', {name: 'me and you'})
 

    socket.emit('user-chat-users', user)
    socket.emit('user-contacts', user)
    socket.emit('user-chats', user)

    const chatUser = () => JSON.parse(window.localStorage.getItem('selected-chat-user'))
    const authUser = () => window.user || JSON.parse(window.localStorage.getItem('user'))
    const authChatsWithUser = (auth, user) => window.chats.filter(chat => (chat.sender.email === auth.email && chat.receiver.email === user.email) || (chat.sender.email === user.email && chat.receiver.email === auth.email))

    const authChatUser  = user =>   `<li class="chat-contact-list-item" onclick="selectedChatUser('${user._id}')">
    <a class="d-flex align-items-center">
        <div class="flex-shrink-0 avatar avatar-${user.status}">
            <img src="${user.avatar}" alt="Avatar" class="rounded-circle" />
        </div>
        <div class="chat-contact-info flex-grow-1 ms-2">
            <h6 class="chat-contact-name text-truncate m-0">${user.firstname} ${user.lastname}</h6>
            <p class="chat-contact-status text-muted text-truncate mb-0">
                Refer friends. Get rewards.
            </p>
        </div>
        <small class="text-muted mb-auto">5 Minutes</small>
    </a>
</li>`
    const authChatUsers = (users = []) => {
      let chatContactHTML = ''// initChatContactHTML();
      for(let user of users) chatContactHTML += authChatUser(user)
      $('#chat-list').html('')
      $('#chat-list').html(chatContactHTML)
      // for(let contact of contacts) $('#contact-list').append(authChatContact(contact))
      //   for(let user of users) $('#chat-list').append(authChatUser(user))
    }
    const authChatContact = contact => `<li class="chat-contact-list-item" onclick="selectedChatContact('${contact._id}')" id="${contact._id}">
    <a class="d-flex align-items-center">
        <div class="flex-shrink-0 avatar avatar-${contact.status}">
            <img src="${contact.avatar}" alt="Avatar" class="rounded-circle" />
        </div>
        <div class="chat-contact-info flex-grow-1 ms-2">
            <h6 class="chat-contact-name text-truncate m-0">${contact.firstname} ${contact.lastname}</h6>
            <p class="chat-contact-status text-muted text-truncate mb-0">${contact.jobTitle}</p>
        </div>
    </a>
</li>`
const initChatContactHTML = () => ` <li class="chat-contact-list-item chat-contact-list-item-title">
<h5 class="text-primary mb-0">Contacts</h5>
</li>
<li class="chat-contact-list-item contact-list-item-0 d-none">
<h6 class="text-muted mb-0">No Contacts Found</h6>
</li>`


 // let chatContactHTML = initChatContactHTML();
  // for(let contact of contacts) chatContactHTML += authChatContact(contact)
  // $('#contact-list').html('')
  // $('#contact-list').html(chatContactHTML)


const authChatContacts = (contacts = []) => {
  // let chatContactHTML = ''// initChatContactHTML();
  // for(let contact of contacts) chatContactHTML += authChatContact(contact)
  // $('#contact-list').html('')
  // $('#contact-list').html(chatContactHTML)
  for(let contact of contacts) $('#contact-list').append(authChatContact(contact))
}

authChatUsers(users)
authChatContacts(contacts)

    const chatContactsBody = document.querySelector('.app-chat-contacts .sidebar-body'),
      chatContactListItems = [].slice.call(
        document.querySelectorAll('.chat-contact-list-item:not(.chat-contact-list-item-title)')
      ),
      chatHistoryBody = document.querySelector('.chat-history-body'),
      chatSidebarLeftBody = document.querySelector('.app-chat-sidebar-left .sidebar-body'),
      chatSidebarRightBody = document.querySelector('.app-chat-sidebar-right .sidebar-body'),
      chatUserStatus = [].slice.call(document.querySelectorAll(".form-check-input[name='chat-user-status']")),
      chatSidebarLeftUserAbout = $('.chat-sidebar-left-user-about'),
      formSendMessage = document.querySelector('.form-send-message'),
      messageInput = document.querySelector('.message-input'),
      searchInput = document.querySelector('.chat-search-input'),
      speechToText = $('.speech-to-text'), // ! jQuery dependency for speech to text
      userStatusObj = {
        active: 'avatar-online',
        offline: 'avatar-offline',
        away: 'avatar-away',
        busy: 'avatar-busy'
      };

    // Initialize PerfectScrollbar
    // ------------------------------

    // Chat contacts scrollbar
    if (chatContactsBody) {
      new PerfectScrollbar(chatContactsBody, {
        wheelPropagation: false,
        suppressScrollX: true
      });
    }

    // Chat history scrollbar
    if (chatHistoryBody) {
      new PerfectScrollbar(chatHistoryBody, {
        wheelPropagation: false,
        suppressScrollX: true
      });
    }

    // Sidebar left scrollbar
    if (chatSidebarLeftBody) {
      new PerfectScrollbar(chatSidebarLeftBody, {
        wheelPropagation: false,
        suppressScrollX: true
      });
    }

    // Sidebar right scrollbar
    if (chatSidebarRightBody) {
      new PerfectScrollbar(chatSidebarRightBody, {
        wheelPropagation: false,
        suppressScrollX: true
      });
    }

    // Scroll to bottom function
    function scrollToBottom() {
      chatHistoryBody.scrollTo(0, chatHistoryBody.scrollHeight);
    }
    scrollToBottom();

    // User About Maxlength Init
    if (chatSidebarLeftUserAbout.length) {
      chatSidebarLeftUserAbout.maxlength({
        alwaysShow: true,
        warningClass: 'label label-success bg-success text-white',
        limitReachedClass: 'label label-danger',
        separator: '/',
        validate: true,
        threshold: 120
      });
    }

    // Update user status
    chatUserStatus.forEach(el => {
      el.addEventListener('click', e => {
        let chatLeftSidebarUserAvatar = document.querySelector('.chat-sidebar-left-user .avatar'),
          value = e.currentTarget.value;
        //Update status in left sidebar user avatar
        console.log('status value', value)
        socket.emit('auth-update-status', authUser(), value)
        chatLeftSidebarUserAvatar.removeAttribute('class');
        Helpers._addClass('avatar avatar-xl ' + userStatusObj[value] + '', chatLeftSidebarUserAvatar);
        //Update status in contacts sidebar user avatar
        let chatContactsUserAvatar = document.querySelector('.app-chat-contacts .avatar');
        chatContactsUserAvatar.removeAttribute('class');
        Helpers._addClass('flex-shrink-0 avatar ' + userStatusObj[value] + ' me-3', chatContactsUserAvatar);
      });
    });

    // Select chat or contact
    chatContactListItems.forEach(chatContactListItem => {
      // Bind click event to each chat contact list item
      chatContactListItem.addEventListener('click', e => {
        // Remove active class from chat contact list item
        chatContactListItems.forEach(chatContactListItem => {
          chatContactListItem.classList.remove('active');
        });
        // Add active class to current chat contact list item
        e.currentTarget.classList.add('active');
      });
    });

    // Filter Chats
    if (searchInput) {
      searchInput.addEventListener('keyup', e => {
        let searchValue = e.currentTarget.value.toLowerCase(),
          searchChatListItemsCount = 0,
          searchContactListItemsCount = 0,
          chatListItem0 = document.querySelector('.chat-list-item-0'),
          contactListItem0 = document.querySelector('.contact-list-item-0'),
          searchChatListItems = [].slice.call(
            document.querySelectorAll('#chat-list li:not(.chat-contact-list-item-title)')
          ),
          searchContactListItems = [].slice.call(
            document.querySelectorAll('#contact-list li:not(.chat-contact-list-item-title)')
          );

        // Search in chats
        searchChatContacts(searchChatListItems, searchChatListItemsCount, searchValue, chatListItem0);
        // Search in contacts
        searchChatContacts(searchContactListItems, searchContactListItemsCount, searchValue, contactListItem0);
      });
    }

    // Search chat and contacts function
    function searchChatContacts(searchListItems, searchListItemsCount, searchValue, listItem0) {
      searchListItems.forEach(searchListItem => {
        let searchListItemText = searchListItem.textContent.toLowerCase();
        if (searchValue) {
          if (-1 < searchListItemText.indexOf(searchValue)) {
            searchListItem.classList.add('d-flex');
            searchListItem.classList.remove('d-none');
            searchListItemsCount++;
          } else {
            searchListItem.classList.add('d-none');
          }
        } else {
          searchListItem.classList.add('d-flex');
          searchListItem.classList.remove('d-none');
          searchListItemsCount++;
        }
      });
      // Display no search fount if searchListItemsCount == 0
      if (searchListItemsCount == 0) {
        listItem0.classList.remove('d-none');
      } else {
        listItem0.classList.add('d-none');
      }
    }

    // Send Message
    formSendMessage.addEventListener('submit', e => {
      e.preventDefault();
      console.log('event')
      if (messageInput.value) {
        // Create a div and add a class
        // let renderMsg = document.createElement('div');
        // renderMsg.className = 'chat-message-text mt-2';
        // renderMsg.innerHTML = '<p class="mb-0 text-break">' + messageInput.value + '</p>';
        // document.querySelector('li:last-child .chat-message-wrapper').appendChild(renderMsg);
        const chat = {
          message: messageInput.value, sender: authUser(), receiver: chatUser()
         }
         socket.emit('send-chat-message', chat)
        messageInput.value = '';
        // console.log('message', messageInput.value)
         
        scrollToBottom();
      }
    });

    socket.on('selected-chat-user-chats', chatsWithUser => {
      loadFullChatHistory(chatsWithUser)
      scrollToBottom();
    })

    socket.on('user-sent-chat', chats => {
      socket.emit('selected-chat-user', {
        user: chatUser(), auth: authUser()
      });
      // authChatUsers(users)
      // authChatContacts(contacts)
      loadFullChatHistory(chats)
      scrollToBottom();
      const childElement = $(`#${chatUser()._id}`).detach()
      const isInUsers  = users.find(user => user._id ==  chatUser()._id);
      // $('#chat-list').prepend(childElement);
      if(!isInUsers) {
        $('#chat-list').prepend(childElement);
        socket.emit('selected-chat-user', {
          user: chatUser(), auth: authUser()
        });
      }
      // loadFullChatHistory(chats)
      
    })

    // on click of chatHistoryHeaderMenu, Remove data-overlay attribute from chatSidebarLeftClose to resolve overlay overlapping issue for two sidebar
    let chatHistoryHeaderMenu = document.querySelector(".chat-history-header [data-target='#app-chat-contacts']"),
      chatSidebarLeftClose = document.querySelector('.app-chat-sidebar-left .close-sidebar');
    chatHistoryHeaderMenu.addEventListener('click', e => {
      chatSidebarLeftClose.removeAttribute('data-overlay');
    });
    // }

    // Speech To Text
    if (speechToText.length) {
      var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
      if (SpeechRecognition !== undefined && SpeechRecognition !== null) {
        var recognition = new SpeechRecognition(),
          listening = false;
        speechToText.on('click', function () {
          const $this = $(this);
          recognition.onspeechstart = function () {
            listening = true;
          };
          if (listening === false) {
            recognition.start();
          }
          recognition.onerror = function (event) {
            listening = false;
          };
          recognition.onresult = function (event) {
            $this.closest('.form-send-message').find('.message-input').val(event.results[0][0].transcript);
          };
          recognition.onspeechend = function (event) {
            listening = false;
            recognition.stop();
          };
        });
      }
    }



    const selectedChatSidebarUser = user => {
      $(`#selected-chat-sidebar-user-status`).removeClass();
      $(`#selected-chat-sidebar-user-status`).addClass(`avatar avatar-xl avatar-${user.status}`);
      $(`#selected-chat-sidebar-user-name`).text(`${user.firstname} ${user.lastname}`);
      $(`#selected-chat-sidebar-user-avatar`).attr({
          src: user.avatar
      });
      // $(`#selected-chat-sidebar-user-job-title`).text(`${user.jobTitle}`);
      $(`#selected-chat-sidebar-user-about`).text(`${user.bio}`);
      $(`#selected-chat-sidebar-user-email`).text(`${user.email}`);
      $(`#selected-chat-sidebar-user-phone`).text(`${user.phone}`);
      // socket.emit('chat-contact-selected', user)
  }

  const selectedChatSidebarUserHeader =  user => {
    $(`#selected-chat-sidebar-user-header-name`).text(`${user.firstname} ${user.lastname}`);
    $(`#selected-chat-sidebar-user-header-avatar`).attr({
        src: user.avatar
    });
    $(`#selected-chat-sidebar-user-header-job-title`).text(`${user.jobTitle}`);
  }

  selectedChatSidebarUser(chatUser() || authUser())
  selectedChatSidebarUserHeader(chatUser() || authUser())

  function roundToDecimal(number, decimalPlaces) {
    const factor = 10 ** decimalPlaces;
    return Math.round(number * factor) / factor;
  }

const timestampping = (date = new Date()) => {
  // Calculate the time difference in seconds
const secondsAgo = moment().diff(date, 'seconds');

if (secondsAgo < 60) {
    return Math.floor(secondsAgo) + ' seconds ago';
} else if(secondsAgo < 3600) {
    // Handle other cases (e.g., minutes, hours, days, etc.) as needed
    return Math.floor(secondsAgo/60) + ' minutes ago';
}else if(secondsAgo < 216000){
  return Math.floor(secondsAgo/3600) + ' hours ago';
} else if(secondsAgo < 12960000) {
  return Math.floor(secondsAgo/216000) + ' days ago';
}
}
   const chatLeft = chat => `<li class="chat-message">
   <div class="d-flex overflow-hidden">
       <div class="user-avatar flex-shrink-0 me-3">
           <div class="avatar avatar-sm">
               <img src="${chat.sender.avatar}" alt="Avatar" class="rounded-circle" />
           </div>
       </div>
       <div class="chat-message-wrapper flex-grow-1">
           <div class="chat-message-text">
               <p class="mb-0">${chat.data.message}</p>
           </div>
           <div class="text-muted mt-1">
               <small>${timestampping(chat.data.createdAt)}</small>
           </div>
       </div>
   </div>
</li>`
   const chatRight = chat => `
   <li class="chat-message chat-message-right">
    <div class="d-flex overflow-hidden">
        <div class="chat-message-wrapper flex-grow-1 w-50">
            <div class="chat-message-text">
                <p class="mb-0">${chat.data.message}</p>
            </div>
            <div class="text-end text-muted mt-1">
                <i class="ti ti-checks ti-xs me-1"></i>
                <small>${timestampping(chat.data.createdAt)}</small>
            </div>
        </div>
        <div class="user-avatar flex-shrink-0 ms-3">
            <div class="avatar avatar-sm">
                <img src="${chat.sender.avatar}" alt="Avatar" class="rounded-circle" />
            </div>
        </div>
    </div>
</li>`
    const fullChatHistoryTemplate = (chats = [], currentChatUser = chatUser()) => {
      let mainHTML = '';
      if (chats && chats.length) {
          for (let chat of chats) {
              if (chat.sender.email != currentChatUser.email ) {
                  mainHTML += chatLeft(chat)
              }else{
                  mainHTML += chatRight(chat) 
              }
             
          }
      }
      return mainHTML
  }

    const loadFullChatHistory = (chats = []) => {
      $(`#user-chat-history-container`).html('')
      $(`#user-chat-history-container`).html(fullChatHistoryTemplate(chats))
  }
  const selectedChatUserHistory = (selectedUser) => {
    let chatHistoryUser;
    //window.contacts//
    if (selectedUser) {
        chatHistoryUser = selectedUser
    } else if (JSON.parse(window.localStorage.getItem('selected-chat-user'))) {
        chatHistoryUser = JSON.parse(window.localStorage.getItem('selected-chat-user'));
    }
    else if (window.contacts[window.contacts.length - 1]) {
        chatHistoryUser = window.contacts[window.contacts.length - 1]
    } else if (window.users[window.contacts.length - 1]) {
        chatHistoryUser = window.users[window.contacts.length - 1]
    }
    else {
        chatHistoryUser = authUser()
    }

    $(`#selected-chat-sidebar-user-header-avatar`).attr({
        src: chatHistoryUser.avatar
    })
    $(`#selected-chat-sidebar-user-header-name`).text(`${chatHistoryUser.firstname} ${chatHistoryUser.lastname}`)
    $(`#selected-chat-sidebar-user-header-job-title`).text(`${chatHistoryUser.jobTitle}`)
    $(`#selected-chat-user-history-status`).removeClass()
    $(`#selected-chat-user-history-status`).addClass(`flex-shrink-0 avatar avatar-${chatHistoryUser.status}`)
}
    window.selectedChatUser = id => {
      const selectedChatUser = users.find(user => user._id == id)
      if (selectedChatUser) {
          window.localStorage.setItem('selected-chat-user', JSON.stringify(selectedChatUser));
          socket.emit('selected-chat-user', {
            user: selectedChatUser, auth: authUser()
          });
          selectedChatSidebarUserHeader(selectedChatUser)
          selectedChatSidebarUser(selectedChatUser)
          selectedChatUserHistory(selectedChatUser);
      }
  }
  


  window.selectedChatContact = id => {
    const selectedContact = contacts.find(contact => contact._id === id)
    if(selectedContact){
      window.localStorage.setItem('selected-chat-user', JSON.stringify(selectedContact));

      socket.emit('selected-chat-user', {
        user: selectedContact, auth: authUser()
      });
      selectedChatSidebarUserHeader(selectedContact)
      selectedChatSidebarUser(selectedContact)
      selectedChatUserHistory(selectedContact);

      // selectedChatSidebarUserHeader(selectedContact)
      // selectedChatSidebarUser(selectedContact)
      // const authChatWithUser = authChatsWithUser(authUser(), chatUser())
      // selectedChatUserHistory(selectedContact);
      // loadFullChatHistory(authChatWithUser);
      
    }
  }


    //selectedChatUser
  })();
});
