/**
 * App Chat
 */

'use strict';

// const chat = require("../../../routes/apps/chat");

document.addEventListener('DOMContentLoaded', function () {
  (function () {


    const selectedUserChatUserChats = $(`#selected-chat-user-chats`)

    const chatHistoryRight = (chat) => `
    <li class="chat-message chat-message-right">
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
                <small>10:15 AM</small>
            </div>
        </div>
    </div>
</li>`


const chatHistoryLeft = (chat) => ` <li class="chat-message">
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
            <small>10:15 AM</small>
        </div>
    </div>
</div>
</li>
`
const fullChats = (chats, chatUser) => {

    let allChats = ''; 
    for(let chat of chats){ 
        if(chat.sender.email !== window.user.email){
          allChats += chatHistoryLeft(chat)
        }else{
            allChats += chatHistoryRight(chat)

        }
        
    }
    return allChats;
}


const renderNewChatRight = chat => `<div class="d-flex overflow-hidden">
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
        <small>10:15 AM</small>
    </div>
</div>
</div>`

const renderNewChatLeft = chat => `<div class="d-flex overflow-hidden">
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
        <small>10:15 AM</small>
    </div>
</div>
</div>`
const renderNewChat  = chat => {


  let renderMsg = document.createElement('li');

  if(chat.sender.email !== window.user.email){
    renderMsg.className = 'chat-message chat-message-right';
    renderMsg.innerHTML = renderNewChatLeft(chat);
    return renderMsg
  }else{
    renderMsg.className = 'chat-message';
    renderMsg.innerHTML = renderNewChatRight(chat);
    return renderMsg
  }

  
 

  // if(chat.sender.email !== window.user.email){
  //   return renderNewChatLeft(chat)
  // }else{
  //  return renderNewChatRight(chat)

  // }
}

    const socket = io('http://localhost:3000/chat', { secure: true })
    // socket.on('connect', () => console.log('Connected to server'));
    // console.log('chats', chats)
    const selectedChatUserHistory = (selectedUser) =>{
        let chatHistoryUser ; 
        //window.contacts//
        if(selectedUser){
            chatHistoryUser = selectedUser
        }else if (JSON.parse(window.localStorage.getItem('selected-chat-user'))){
            chatHistoryUser = JSON.parse(window.localStorage.getItem('selected-chat-user'));
        }
        else if(window.contacts[window.contacts.length - 1]){
            chatHistoryUser = window.contacts[window.contacts.length - 1]
        }else if(window.users[window.contacts.length - 1]){
            chatHistoryUser = window.users[window.contacts.length - 1]
        }
        else{
            chatHistoryUser = user
        }
    
        $(`#selected-chat-user-history-avatar`).attr({
            src: chatHistoryUser.avatar
        })
        $(`#selected-chat-user-history-name`).text(`${chatHistoryUser.firstname} ${chatHistoryUser.lastname}`)
        $(`#selected-chat-user-history-job-title`).text(`${chatHistoryUser.jobTitle}`)
        $(`#selected-chat-user-history-status`).removeClass()
        $(`#selected-chat-user-history-status`).addClass(`flex-shrink-0 avatar avatar-${chatHistoryUser.status}`)
    }

     //     const childCount = $("#chat-user-history-tracking").children().length;
            //     if(chatsWithSelectedUser.length == 0){
            //         return $("#chat-user-history-tracking").empty()
            //     }
            //     $("#chat-user-history-tracking").empty()
            //     for(let chat of chatsWithSelectedUser){
            //         let userChat = chatHistoryMessage(chat);
            //         $('#chat-user-history-tracking').append(userChat)
            //         if(childCount  === chatsWithSelectedUser.length + 1){
            //            break;
            //         }
            //   }
   
    
    const selectedChatSidebarUser = user => {
        $(`#selected-chat-sidebar-user-status`).removeClass();
        $(`#selected-chat-sidebar-user-status`).addClass(`avatar avatar-xl avatar-${user.status}`);
        $(`#selected-chat-sidebar-user-name`).text(`${user.firstname} ${user.lastname}`);
        $(`#selected-chat-sidebar-user-avatar`).attr({
            src: user.avatar
        });
        $(`#selected-chat-sidebar-user-job-title`).text(`${user.jobTitle}`);
        $(`#selected-chat-sidebar-user-about`).text(`${user.bio}`);
        $(`#selected-chat-sidebar-user-email`).text(`${user.email}`);
        $(`#selected-chat-sidebar-user-phone`).text(`${user.phone}`);
    }



    const chatHistoryMessages = $('#chat-user-history-tracking');
    const chatHistoryMessage  = chat => {
        if(chat.sender.email == user.email){
            return ` <li class="chat-message chat-message-right">
            
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
                        <small>10:15 AM</small>
                    </div>
                </div>
            </div>
        </li> `
        }else{
            return ` <li class="chat-message">
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
                        <small>10:15 AM</small>
                    </div>
                </div>
            </div>
        </li> `
        }
    } 
    
    // const getAllChatWithUserHistory = () => {
    //     const chatUser = JSON.parse(window.localStorage.getItem('selected-chat-user'));
    //     const chatsWithSelectedUser = chats.filter(chat => (chat.sender.email === user.email && chat.receiver.email === chatUser.email) || (chat.sender.email === chatUser.email && chat.receiver.email === user.email))
    //         for(let chat of chatsWithSelectedUser){
    //         let userChat = chatHistoryMessage(chat);
    //         $('#chat-user-history-tracking').append(userChat)
    //     }
    // }
    socket.on('message', userChats => {

    //     chats = userChats;
    //    console.log('messageed', userChats, 'chats', chats)
        
    })
    // getAllChatWithUserHistory();
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
        console.log('status', valu)
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
        if (messageInput.value) {
          // Create a div and add a class
          const chatUser = JSON.parse(window.localStorage.getItem('selected-chat-user'))
          socket.emit('send-message', { chatSender: user, chatReceiver: chatUser, message: messageInput.value })
          let renderMsg = document.createElement('div');
          renderMsg.className = 'chat-message-text mt-2';
          renderMsg.innerHTML = '<p class="mb-0 text-break">' + messageInput.value + '</p>';
          document.querySelector('li:last-child .chat-message-wrapper').appendChild(renderMsg);
          messageInput.value = '';
          scrollToBottom();
        }
      });
  
    // // Send Message
    // formSendMessage.addEventListener('submit', e => {
    //   e.preventDefault();
    //   if (messageInput.value) {
    //     // Create a div and add a class
    //     const chatUser = JSON.parse(window.localStorage.getItem('selected-chat-user'))

       
    //     socket.emit('send-message', { chatSender: window.user, chatReceiver: chatUser, message: messageInput.value })
    //     socket.on('new-chat-sent', chat=> {
    //       const chatUser = JSON.parse(window.localStorage.getItem('selected-chat-user'))
    //       socket.emit('send-message', { chatSender: user, chatReceiver: chatUser, message: messageInput.value })
    //       let renderMsg = document.createElement('div');
    //       renderMsg.className = 'chat-message-text mt-2';
    //       renderMsg.innerHTML = '<p class="mb-0 text-break">' + messageInput.value + '</p>';
    //       document.querySelector('li:last-child .chat-message-wrapper').appendChild(renderMsg);
    //       messageInput.value = '';
    //       scrollToBottom();
    //     })

    //     // let renderMsg = document.createElement('div');
    //     // renderMsg.className = 'chat-message-text mt-2';
    //     // renderMsg.innerHTML = '<p class="mb-0 text-break">' + messageInput.value + '</p>';
    //     // document.querySelector('li:last-child .chat-message-wrapper').appendChild(renderMsg);
    //     // messageInput.value = '';
    //     // scrollToBottom();

       
        
    //   }
    // });

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

    const authChatsWithUser = (auth, user) => window.chats.filter(chat => (chat.sender.email === auth.email && chat.receiver.email === user.email) || (chat.sender.email === user.email && chat.receiver.email === auth.email))
    const selectedChatsUserHistory = (auth, user, chats) => {
        const allChatsWithUser = chats.filter(chat => (chat.sender.email === auth.email && chat.receiver.email === user.email) || (chat.sender.email === user.email && chat.receiver.email === auth.email))
            //  if(allChatsWithUser.length == 0) return $("#chat-user-history-tracking").empty()
             
             const childCount = $("#chat-user-history-tracking").children().length;
             if(allChatsWithUser.length == 0) return $('#chat-user-history-tracking').html(`<h1>Not Chat Found Found</h1>`)
            //  return $('#chat-user-history-tracking').html(`<h1>Chats Found</h1>`)
                 $("#chat-user-history-tracking").html(``)
                 for(let chat of allChatsWithUser){
                    let userChat = chatHistoryMessage(chat);
                    $('#chat-user-history-tracking').append(userChat)
                    // if(childCount  === allChatsWithUser.length + 1){
                    //    break;
                    // }
              }
            
    }
    // if(!window.selectedChatContact){
        window.selectedChatContact = id => {
            const contact = window.contacts.find(contact => contact._id === id)
            if(contact){
                window.localStorage.setItem('selected-chat-user', JSON.stringify(contact));
                selectedChatUserHistory(contact);
                selectedChatSidebarUser(contact);
                selectedUserChatUserChats.html('');
                selectedUserChatUserChats.html(fullChats(authChatsWithUser(user, contact), contact))
                // window.chats = authChatsWithUser(user, contact);

                // console.log('chat contact', authChatsWithUser(user, contact))
                // selectedChatsUserHistory(user, contact, chats)
            }
        }
    // }
    // if(!window.selectedChatUser){
        window.selectedChatUser = id => {
            
            const chatUser = window.users.find(user => user._id === id)
             
            if(chatUser){
                window.localStorage.setItem('selected-chat-user', JSON.stringify(chatUser));
                selectedChatUserHistory(chatUser);
                selectedChatSidebarUser(chatUser); 
                selectedUserChatUserChats.html('');
                selectedUserChatUserChats.html(fullChats(authChatsWithUser(user, chatUser), chatUser))
                

                // // console.log(chatUser.email, chatUser)
                
                // //fullChats
                // //authChatsWithUser

                // const allUserChats =  window.chats.filter(chat => (chat.sender._id == user._id && chat.receiver._id == chatUser._id));
                // selectedUserChatUserChats.html(fullChats(allUserChats))


                // // console.log({senders, receivers})
                
                // for(let chat of authChatsWithUser(user, chatUser)){
                //     console.log(chat.data.message)
                //     fullChats
                // }
               
                // for(let chat  of authChatsWithUser(user, chatUser)){
                //     if(chat.sender.email == user.email){
                //         selectedUserChatUserChats.append(chatHistoryRight(chat))
                //     }else{
                //         selectedUserChatUserChats.append(chatHistoryRight(chat))
                //     }
                    
                // }
                
                // // console.log('chat user', authChatsWithUser(user, chatUser))
                // window.chats = authChatsWithUser(user, chatUser)
            }
        }
    // }

    // console.log('chats', chats)
  })();
});
