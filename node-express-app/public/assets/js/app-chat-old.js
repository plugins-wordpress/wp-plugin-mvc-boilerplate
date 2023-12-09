/**
 * App Chat
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
    (function () {

        const socket = io('http://localhost:3000/chat', { secure: true, autoConnect: false })
      
        // socket.onAny((event, ...args) => {
        //     console.log(event, args);
        //   });
        socket.emit('user-chat-users', user)
        socket.emit('user-contacts', user)
        socket.emit('user-chats', user)
      

        // const sendPrivateMessage = () => {}
        
        const authChatsWithUser = (auth, user) => window.chats.filter(chat => (chat.sender.email === auth.email && chat.receiver.email === user.email) || (chat.sender.email === user.email && chat.receiver.email === auth.email))
        const chatUser = () => JSON.parse(window.localStorage.getItem('selected-chat-user'))
        const authUser = () => window.user || JSON.parse(window.localStorage.getItem('user'))
        const authContacts = () => window.contacts;
        const authChats = () => window.chats;
        const authUsers = () => window.users


        // const updateSidebar  = contact => $(`#chat-list`).prepend($(`#${contact._id}`))


        const initContactHTML = () => ` 
            <li class="chat-contact-list-item chat-contact-list-item-title">
                <h5 class="text-primary mb-0">Contacts</h5>
            </li>
            <li class="chat-contact-list-item contact-list-item-0 d-none">
                <h6 class="text-muted mb-0">No Contacts Found</h6>
            </li>`

        // $(`#contact-list`).append(initContactHTML())

        const contactList = contact => `
            <li class="chat-contact-list-item" onclick="selectedChatContact('${contact._id}')" id="${contact._id}">
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

        const contactListHTML = contacts => {
            let contactHTML = initContactHTML();
            for (let contact of contacts) contactHTML += contactList(contact)
            return contactHTML;
        }

        const LoadContactList = contacts => $(`#contact-list`).html(contactListHTML(contacts))
        socket.on('user-contacts-result', contacts => LoadContactList(contacts))


        const initChatUser = () => `
         <li class="chat-contact-list-item chat-list-item-0 d-none">
            <h6 class="text-muted mb-0">No Chats Found</h6>
        </li>`

        const singleChatUser = user => `
            <li class="chat-contact-list-item" onclick="selectedChatUser('${user._id}')">
                <a class="d-flex align-items-center">
                    <div class="flex-shrink-0 avatar avatar-${user.status}">
                        <img src="${user.avatar}" alt="Avatar" class="rounded-circle" />
                    </div>
                    <div class="chat-contact-info flex-grow-1 ms-2">
                        <h6 class="chat-contact-name text-truncate m-0">${user.firstname} ${user.lastname}</h6>
                        <p class="chat-contact-status text-muted text-truncate mb-0"></p>
                    </div>
                    <small class="text-muted mb-auto"></small>
                </a>
            </li>`

        const userChatUserListHTML = users => {
            let singleUserHTML = initChatUser()
            for(let user of users) singleUserHTML += singleChatUser(user)
            return singleUserHTML
        }

        const LoadChatUserList = users => $(`#chat-list`).html(userChatUserListHTML(users))
        socket.on('user-chat-users-result', users=> LoadChatUserList(users))
        //LoadChatUserList(window.users)
        
 

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

            $(`#selected-chat-user-history-avatar`).attr({
                src: chatHistoryUser.avatar
            })
            $(`#selected-chat-user-history-name`).text(`${chatHistoryUser.firstname} ${chatHistoryUser.lastname}`)
            $(`#selected-chat-user-history-job-title`).text(`${chatHistoryUser.jobTitle}`)
            $(`#selected-chat-user-history-status`).removeClass()
            $(`#selected-chat-user-history-status`).addClass(`flex-shrink-0 avatar avatar-${chatHistoryUser.status}`)
        }
        selectedChatUserHistory(chatUser() || authUser())

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

        selectedChatSidebarUser(chatUser() || authUser())

    
        const singleChatHTML  = (chat, className = '') => `
        <li class="chat-message ${className}">
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
                    <small>10:08 AM</small>
                </div>
            </div>
        </div>
    </li>`
        const fullChatHistoryTemplate = (chats = [], currentAuthUser = authUser(), currentChatUser = chatUser()) => {
            let mainHTML = '';
            if (chats && chats.length) {
                for (let chat of chats) {
                    if (chat.sender.email == currentChatUser.email ) {
                        mainHTML += singleChatHTML(chat)
                    }else{
                        mainHTML += singleChatHTML(chat, 'chat-message-right') 
                    }
                   
                }
            }
            return mainHTML
        }

        const loadFullChatHistory = (chats = []) => {
            $(`#user-chat-history-container`).html('')
            $(`#user-chat-history-container`).html(fullChatHistoryTemplate(chats))
        }

        window.selectedChatContact = id => {
            const contact = window.contacts.find(contact => contact._id === id)
            if (contact) {
                window.localStorage.setItem('selected-chat-user', JSON.stringify(contact));
                selectedChatUserHistory(contact);
                selectedChatSidebarUser(contact);
                const chatsWithUser = authChatsWithUser(authUser(), contact)
                loadFullChatHistory(chatsWithUser)
                // updateSidebar(contact);
              
                
            }
        }

        window.selectedChatUser = id => {
            const selectedChatUser = window.users.find(user => user._id === id)
            if (selectedChatUser) {
                window.localStorage.setItem('selected-chat-user', JSON.stringify(selectedChatUser));
                selectedChatUserHistory(selectedChatUser);
                selectedChatSidebarUser(selectedChatUser);
                const chatsWithUser = authChatsWithUser(authUser(), selectedChatUser)
                loadFullChatHistory(chatsWithUser);
            }
        }

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
                socket.emit('user-selected-status', { id: authUser()._id, value })
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

        const firstMsgHTML = chat => `<div class="d-flex overflow-hidden">
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

        const firstChatMessageWithUser = (chat) => {
            let renderFirstMs = document.createElement('li');
            if (chat.sender.email === authUser().email && chat.receiver.email === chatUser().email) {
                renderFirstMs.className = 'chat-message chat-message-right'
            } else {
                renderFirstMs.className = 'chat-message'
            }
            renderFirstMs.innerHTML = firstMsgHTML(chat)
            if(chat.receiver.email === chatUser().email) $(`#user-chat-history-container`).append(renderFirstMs)
            scrollToBottom();
        }


        // Send Message
        formSendMessage.addEventListener('submit', e => {
            e.preventDefault();
            if (messageInput.value) {
                socket.emit('send-message', { chatSender: user, chatReceiver: chatUser(), message: messageInput.value })
                messageInput.value = '';
                scrollToBottom();
            }
        });

        socket.on('new-chat-created', chat => {
            firstChatMessageWithUser(chat)
            // updateSidebar(chat.receiver);
            // if (chat) {
            //     const contactFirstChat = contacts.find(contact => contact._id === chat.receiver._id);
            //     if (contactFirstChat) {
            //         contacts = contacts.filter(contact => contact._id !== contactFirstChat._id)
            //         users.push(contactFirstChat);
            //         updateSidebar(contact._id)
            //     }
            // }
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
    })();
});
