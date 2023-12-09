/**
 * App Email
 */

'use strict';


document.addEventListener('DOMContentLoaded', function () {
  (function () {
    const socket = io('http://localhost:3000/email',{secure: true})


    
    // socket.on('connect', () => {
    //   console.log('email socket connected', user)
    // })
    // console.log('mail ', mails);
    socket.emit('user-mail-contacts', user)
    socket.emit('user-mail-inbox', user)
    socket.emit('user-mail-draft', user)
    socket.emit('user-mail-inbox', user)
    socket.emit('user-mail-sent', user)
    socket.emit('user-mail-received', user)
    socket.emit('user-mail-spam', user)
    socket.emit('user-mail-starred', user)
    socket.emit('user-mail-trash', user)
    socket.emit('user-mail-work', user)
    socket.emit('user-mail-company', user)
    socket.emit('user-mail-important', user)
    socket.emit('user-mail-private', user)


    const emailList = document.querySelector('.email-list'),
      emailReplyToContainer = $(`#email-reply-to-container`),
      userEmailContainer = $(`#user-email-content`),
      emailListItems = [].slice.call(document.querySelectorAll('.email-list-item')),
      emailListItemInputs = [].slice.call(document.querySelectorAll('.email-list-item-input')),
      emailView = document.querySelector('.app-email-view-content'),
      emailFilters = document.querySelector('.email-filters'),
      emailFilterByFolders = [].slice.call(document.querySelectorAll('.email-filter-folders li')),
      emailEditor = document.querySelector('.email-editor'),
      appEmailSidebar = document.querySelector('.app-email-sidebar'),
      appOverlay = document.querySelector('.app-overlay'),
      emailReplyEditor = document.querySelector('.email-reply-editor'),
      bookmarkEmail = [].slice.call(document.querySelectorAll('.email-list-item-bookmark')),
      selectAllEmails = document.getElementById('email-select-all'),
      emailSearch = document.querySelector('.email-search-input'),
      toggleCC = document.querySelector('.email-compose-toggle-cc'),
      toggleBCC = document.querySelector('.email-compose-toggle-bcc'),
      emailCompose = document.querySelector('.app-email-compose'),
      emailListDelete = document.querySelector('.email-list-delete'),
      emailListRead = document.querySelector('.email-list-read'),
      emailListEmpty = document.querySelector('.email-list-empty'),
      refreshEmails = document.querySelector('.email-refresh'),
      emailViewContainer = document.getElementById('app-email-view'),
      emailFilterFolderLists = [].slice.call(document.querySelectorAll('.email-filter-folders li')),
      emailListItemActions = [].slice.call(document.querySelectorAll('.email-list-item-actions li'));

      emailReplyToContainer.hide()

    // Initialize PerfectScrollbar
    // ------------------------------
    // Email list scrollbar
    if (emailList) {
      let emailListInstance = new PerfectScrollbar(emailList, {
        wheelPropagation: false,
        suppressScrollX: true
      });
    }

    // Sidebar tags scrollbar
    if (emailFilters) {
      new PerfectScrollbar(emailFilters, {
        wheelPropagation: false,
        suppressScrollX: true
      });
    }

    // Email view scrollbar
    if (emailView) {
      new PerfectScrollbar(emailView, {
        wheelPropagation: false,
        suppressScrollX: true
      });
    }

    // Initialize Quill Editor
    // ------------------------------
    if (emailEditor) {
      new Quill('.email-editor', {
        modules: {
          toolbar: '.email-editor-toolbar'
        },
        placeholder: 'Write your message... ',
        theme: 'snow'
      });
    }

    if (emailReplyEditor) {
      new Quill('.email-reply-editor', {
        modules: {
          toolbar: '.email-reply-toolbar'
        },
        placeholder: 'Write your message... ',
        theme: 'snow'
      });
    }

    // Bookmark email
    if (bookmarkEmail) {
      bookmarkEmail.forEach(emailItem => {
        emailItem.addEventListener('click', e => {
          let emailItem = e.currentTarget.parentNode.parentNode;
          let starredAttr = emailItem.getAttribute('data-starred');
          e.stopPropagation();
          if (!starredAttr) {
            emailItem.setAttribute('data-starred', 'true');
          } else {
            emailItem.removeAttribute('data-starred');
          }
        });
      });
    }

    // Select all
    if (selectAllEmails) {
      selectAllEmails.addEventListener('click', e => {
        if (e.currentTarget.checked) {
          emailListItemInputs.forEach(c => (c.checked = 1));
        } else {
          emailListItemInputs.forEach(c => (c.checked = 0));
        }
      });
    }

    // Select single email
    if (emailListItemInputs) {
      emailListItemInputs.forEach(emailListItemInput => {
        emailListItemInput.addEventListener('click', e => {
          e.stopPropagation();
          // Check input count to reset the indeterminate state
          let emailListItemInputCount = 0;
          emailListItemInputs.forEach(emailListItemInput => {
            if (emailListItemInput.checked) {
              emailListItemInputCount++;
            }
          });

          if (emailListItemInputCount < emailListItemInputs.length) {
            if (emailListItemInputCount == 0) {
              selectAllEmails.indeterminate = false;
            } else {
              selectAllEmails.indeterminate = true;
            }
          } else {
            if (emailListItemInputCount == emailListItemInputs.length) {
              selectAllEmails.indeterminate = false;
              selectAllEmails.checked = true;
            } else {
              selectAllEmails.indeterminate = false;
            }
          }
        });
      });
    }

    // Search email based on searched text
    if (emailSearch) {
      emailSearch.addEventListener('keyup', e => {
        let searchValue = e.currentTarget.value.toLowerCase(),
          searchEmailListItems = {},
          selectedFolderFilter = document.querySelector('.email-filter-folders .active').getAttribute('data-target');

        // Filter emails based on selected folders
        if (selectedFolderFilter != 'inbox') {
          searchEmailListItems = [].slice.call(
            document.querySelectorAll('.email-list-item[data-' + selectedFolderFilter + '="true"]')
          );
        } else {
          searchEmailListItems = [].slice.call(document.querySelectorAll('.email-list-item'));
        }

        // console.log(searchValue);
        searchEmailListItems.forEach(searchEmailListItem => {
          let searchEmailListItemText = searchEmailListItem.textContent.toLowerCase();
          if (searchValue) {
            if (-1 < searchEmailListItemText.indexOf(searchValue)) {
              searchEmailListItem.classList.add('d-block');
            } else {
              searchEmailListItem.classList.add('d-none');
            }
          } else {
            searchEmailListItem.classList.remove('d-none');
          }
        });
      });
    }

    // Filter based on folder type (Inbox, Sent, Draft etc...)
    emailFilterByFolders.forEach(emailFilterByFolder => {
      emailFilterByFolder.addEventListener('click', e => {
        let currentTarget = e.currentTarget,
          currentTargetData = currentTarget.getAttribute('data-target');

        appEmailSidebar.classList.remove('show');
        appOverlay.classList.remove('show');

        // Remove active class from each folder filters
        Helpers._removeClass('active', emailFilterByFolders);
        // Add active class to selected folder filters
        currentTarget.classList.add('active');
        emailListItems.forEach(emailListItem => {
          // If folder filter is Inbox
          if (currentTargetData == 'inbox') {
            emailListItem.classList.add('d-block');
            emailListItem.classList.remove('d-none');
          } else if (emailListItem.hasAttribute('data-' + currentTargetData)) {
            emailListItem.classList.add('d-block');
            emailListItem.classList.remove('d-none');
          } else {
            emailListItem.classList.add('d-none');
            emailListItem.classList.remove('d-block');
          }
        });
      });
    });

    // Toggle CC/BCC input
    if (toggleBCC) {
      toggleBCC.addEventListener('click', e => {
        Helpers._toggleClass(document.querySelector('.email-compose-bcc'), 'd-block', 'd-none');
      });
    }

    if (toggleCC) {
      toggleCC.addEventListener('click', e => {
        Helpers._toggleClass(document.querySelector('.email-compose-cc'), 'd-block', 'd-none');
      });
    }

    // Empty compose email message inputs when modal is hidden
    emailCompose.addEventListener('hidden.bs.modal', event => {
      document.querySelector('.email-editor .ql-editor').innerHTML = '';
      $('#emailContacts').val('');
      initSelect2();
    });

    // Delete multiple email
    if (emailListDelete) {
      emailListDelete.addEventListener('click', e => {
        emailListItemInputs.forEach(emailListItemInput => {
          if (emailListItemInput.checked) {
            emailListItemInput.parentNode.closest('li.email-list-item').remove();
          }
        });
        selectAllEmails.indeterminate = false;
        selectAllEmails.checked = false;
        var emailListItem = document.querySelectorAll('.email-list-item');
        if (emailListItem.length == 0) {
          emailListEmpty.classList.remove('d-none');
        }
      });
    }

    // Mark as read
    if (emailListRead) {
      emailListRead.addEventListener('click', e => {
        emailListItemInputs.forEach(emailListItemInput => {
          if (emailListItemInput.checked) {
            emailListItemInput.checked = false;
            emailListItemInput.parentNode.closest('li.email-list-item').classList.add('email-marked-read');
            let emailItemEnvelop = emailListItemInput.parentNode
              .closest('li.email-list-item')
              .querySelector('.email-list-item-actions li');

            if (Helpers._hasClass('email-read', emailItemEnvelop)) {
              emailItemEnvelop.classList.remove('email-read');
              emailItemEnvelop.classList.add('email-unread');
              emailItemEnvelop.querySelector('i').classList.remove('ti-mail-opened');
              emailItemEnvelop.querySelector('i').classList.add('ti-mail');
            }
          }
        });
        selectAllEmails.indeterminate = false;
        selectAllEmails.checked = false;
      });
    }

    // Refresh Mails

    if (refreshEmails && emailList) {
      let emailListJq = $('.email-list'),
        emailListInstance = new PerfectScrollbar(emailList, {
          wheelPropagation: false,
          suppressScrollX: true
        });
      // ? Using jquery vars due to BlockUI jQuery dependency
      refreshEmails.addEventListener('click', e => {
        emailListJq.block({
          message: '<div class="spinner-border text-primary" role="status"></div>',
          timeout: 1000,
          css: {
            backgroundColor: 'transparent',
            border: '0'
          },
          overlayCSS: {
            backgroundColor: '#000',
            opacity: 0.1
          },
          onBlock: function () {
            emailListInstance.settings.suppressScrollY = true;
          },
          onUnblock: function () {
            emailListInstance.settings.suppressScrollY = false;
          }
        });
      });
    }

    // Earlier msgs
    // ? Using jquery vars due to jQuery animation (slideToggle) dependency
    let earlierMsg = $('.email-earlier-msgs');
    if (earlierMsg.length) {
      earlierMsg.on('click', function () {
        let $this = $(this);
        $this.parents().find('.email-card-last').addClass('hide-pseudo');
        $this.next('.email-card-prev').slideToggle();
        $this.remove();
      });
    }

    // Email contacts (select2)
    // ? Using jquery vars due to select2 jQuery dependency
    let emailContacts = $('#emailContacts');
    function initSelect2() {
      if (emailContacts.length) {
        function renderContactsAvatar(option) {
          if (!option.id) {
            return option.text;
          }
          let $avatar =
            "<div class='d-flex flex-wrap align-items-center'>" +
            "<div class='avatar avatar-xs me-2 w-px-20 h-px-20'>" +
            "<img src='" +
            assetsPath +
            'img/avatars/' +
            $(option.element).data('avatar') +
            "' alt='avatar' class='rounded-circle' />" +
            '</div>' +
            option.text +
            '</div>';

          return $avatar;
        }
        emailContacts.wrap('<div class="position-relative"></div>').select2({
          placeholder: 'Select value',
          dropdownParent: emailContacts.parent(),
          closeOnSelect: false,
          templateResult: renderContactsAvatar,
          templateSelection: renderContactsAvatar,
          escapeMarkup: function (es) {
            return es;
          }
        });
      }
    }
    initSelect2();

    // Scroll to bottom on reply click
    // ? Using jquery vars due to jQuery animation dependency
    let emailViewContent = $('.app-email-view-content');
    emailViewContent.find('.scroll-to-reply').on('click', function () {
      if (emailViewContent[0].scrollTop === 0) {
        emailViewContent.animate(
          {
            scrollTop: emailViewContent[0].scrollHeight
          },
          1500
        );
      }
    });

    // Close view on email filter folder list click
    if (emailFilterFolderLists) {
      emailFilterFolderLists.forEach(emailFilterFolderList => {
        emailFilterFolderList.addEventListener('click', e => {
          emailViewContainer.classList.remove('show');
        });
      });
    }

    // Email List Items Actions
    if (emailListItemActions) {
      emailListItemActions.forEach(emailListItemAction => {
        emailListItemAction.addEventListener('click', e => {
          e.stopPropagation();
          let currentTarget = e.currentTarget;
          if (Helpers._hasClass('email-delete', currentTarget)) {
            currentTarget.parentNode.closest('li.email-list-item').remove();
            var emailListItem = document.querySelectorAll('.email-list-item');
            if (emailListItem.length == 0) {
              emailListEmpty.classList.remove('d-none');
            }
          } else if (Helpers._hasClass('email-read', currentTarget)) {
            currentTarget.parentNode.closest('li.email-list-item').classList.add('email-marked-read');
            Helpers._toggleClass(currentTarget, 'email-read', 'email-unread');
            Helpers._toggleClass(currentTarget.querySelector('i'), 'ti-mail-opened', 'ti-mail');
          } else if (Helpers._hasClass('email-unread', currentTarget)) {
            currentTarget.parentNode.closest('li.email-list-item').classList.remove('email-marked-read');
            Helpers._toggleClass(currentTarget, 'email-read', 'email-unread');
            Helpers._toggleClass(currentTarget.querySelector('i'), 'ti-mail-opened', 'ti-mail');
          }
        });
      });
    }
    // User Contact 

     if(!window.selecteInboxMail) {
      window.selecteInboxMail = mailId => {
        const mail = mails.find(mail => mail._id === mailId)
        if(mail) {
          $(`#mail-card-content-last-avatar`).attr({src: mail.from.avatar})
          $(`#mail-card-content-last-name`).text(`${mail.from.firstname} ${mail.from.firstname}`)
          $(`#mail-card-content-last-email`).text(mail.from.email)
          $(`#mail-card-content-last-subject`).text(mail.subject)
          $(`#mail-card-content-last-body`).text(mail.body)
          $(`#mail-card-content-last-reply-to`).text(`Reply to ${mail.from.firstname} ${mail.from.firstname}`)
          socket.emit('user-selected-mail-replies', mail)
          socket.on('user-selected-mail-replies-result', replies => {
            window.localStorage.setItem('replies', JSON.stringify(replies))
            $(`#user-email-content`).append(emailReplyTemplate(replies[0]))
             for(let reply  of replies) {
              userEmailContainer.append(emailReplyTemplate(reply))
             }
        
          })
        }
      }
     }

     function selectedMailReplyForm (id) {
      const mail = JSON.parse(window.localStorage.getItem('replies')).find(reply=> reply._id === id)
       if(mail){
        const  emailReplyEditor = document.querySelector(`.email-reply-editor-${id}`)
        if (emailReplyEditor) {
          new Quill(`.email-reply-editor-${id}`, {
            modules: {
              toolbar: `.email-reply-toolbar-${id}`
            },
            placeholder: 'Write your message... ',
            theme: 'snow'
          });
        }
        return ` <h6 class="card-header border-0" id="mail-card-content-last-reply-to">Reply to </h6>
       <div class="card-body pt-0 px-3">
           <div class="d-flex justify-content-start">
               <div class="email-reply-toolbar-${id} border-0 w-100 ps-0">
                   <span class="ql-formats me-0">
                       <button class="ql-bold"></button>
                       <button class="ql-italic"></button>
                       <button class="ql-underline"></button>
                       <button class="ql-list" value="ordered"></button>
                       <button class="ql-list" value="bullet"></button>
                       <button class="ql-link"></button>
                       <button class="ql-image"></button>
                   </span>
               </div>
           </div>
           <div class="email-reply-editor-${id}"></div>
           <div class="d-flex justify-content-end align-items-center">
               <div class="me-3">
                   <label class="cursor-pointer" for="attach-file-1"><i class="ti ti-paperclip me-2"></i><span class="align-middle">Attachments</span></label>
                   <input type="file" name="file-input" class="d-none" id="attach-file-1" />
               </div>
               <button class="btn btn-primary">
                   <i class="ti ti-send ti-xs me-1"></i>
                   <span class="align-middle">Send</span>
               </button>
           </div>
       </div>`
       }
       
     }
     if(!window.replyToSelectedMail){
      window.replyToSelectedMail = id => {
        console.log('mail', id);
        $(`#email-reply-to-container-${id}`).html(selectedMailReplyForm(id))
      }
     }


     function emailReplyTemplate (mail) {
  
       return `<div class="card email-card-last mx-sm-4 mx-3 mt-4">
       <div class="card-header d-flex justify-content-between align-items-center flex-wrap">
           <div class="d-flex align-items-center mb-sm-0 mb-3">
               <img src="${mail.from.avatar}" alt="user-avatar" class="flex-shrink-0 rounded-circle me-3" height="40" width="40" id="mail-card-content-last-avatar" />
               <div class="flex-grow-1 ms-1">
                   <h6 class="m-0" id="mail-card-content-last-name">${mail.from.firstname} ${mail.from.lastname}</h6>
                   <small class="text-muted" id="mail-card-content-last-email">${mail.from.email}</small>
               </div>
           </div>
           <div class="d-flex align-items-center">
               <p class="mb-0 me-3 text-muted">June 20th 2020, 08:10 AM</p>
               <i class="ti ti-paperclip cursor-pointer me-2"></i>
               <i class="email-list-item-bookmark ti ti-star ti-sm cursor-pointer me-2"></i>
               <div class="dropdown me-3 d-flex align-self-center">
                   <button class="btn p-0" type="button" id="dropdownEmailTwo" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                       <i class="ti ti-dots-vertical"></i>
                   </button>
                   <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownEmailTwo">
                       <a class="dropdown-item scroll-to-reply" href="javascript:void(0)" onclick="replyToSelectedMail('${mail._id}')">
                           <i class="ti ti-corner-up-left me-1"></i>
                           <span class="align-middle">Reply</span>
                       </a>
                       <a class="dropdown-item" href="javascript:void(0)">
                           <i class="ti ti-corner-up-right me-1"></i>
                           <span class="align-middle">Forward</span>
                       </a>
                       <a class="dropdown-item" href="javascript:void(0)">
                           <i class="ti ti-alert-octagon me-1"></i>
                           <span class="align-middle">Report</span>
                       </a>
                   </div>
               </div>
           </div>
       </div>
       <div class="card-body">
           <p class="fw-medium" id="mail-card-content-last-subject">${mail.subject}</p>
           <p id="mail-card-content-last-body">${mail.body}</p>
   
           <p class="mb-0">Sincerely yours,</p>
           <p class="fw-medium mb-0">Envato Design Team</p>
           <hr />
           <p class="email-attachment-title mb-2">Attachments</p>
           <div class="cursor-pointer">
               <i class="ti ti-file"></i>
               <span class="align-middle ms-1">report.xlsx</span>
           </div>
       </div>
   </div>
   <div class="email-reply card mt-4 mx-sm-4 mx-3" id="email-reply-to-container-${mail._id}"></div>
   `
     }
  })();
});
