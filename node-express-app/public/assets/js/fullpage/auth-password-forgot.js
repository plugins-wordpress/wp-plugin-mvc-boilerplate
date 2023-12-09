'use strict';


const formAuthentication = document.querySelector('#formAuthentication');

const notificationHTML = user => `
<h5 class="alert-heading mb-2 text-info" >Password Reset Linked Sent!</h5>
<p class="mb-0 text-info">
  We have email you the password reset link to your email <strong style="color:red;">${user.email}</strong>. Please go to your email and follow the instrucions we sent you to reset your password.
</p>
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
`

document.addEventListener('DOMContentLoaded', function (e) {
  (function () {
    // Form validation for Add new record
    if (formAuthentication) {
      const fv = FormValidation.formValidation(formAuthentication, {
        fields: {
          username: {
            validators: {
              notEmpty: {
                message: 'Please enter username'
              },
              stringLength: {
                min: 6,
                message: 'Username must be more than 6 characters'
              }
            }
          },
          email: {
            validators: {
              notEmpty: {
                message: 'Please enter your email'
              },
              emailAddress: {
                message: 'Please enter valid email address'
              }
            }
          },
          'email-username': {
            validators: {
              notEmpty: {
                message: 'Please enter email / username'
              },
              stringLength: {
                min: 6,
                message: 'Username must be more than 6 characters'
              }
            }
          },
          password: {
            validators: {
              notEmpty: {
                message: 'Please enter your password'
              },
              stringLength: {
                min: 6,
                message: 'Password must be more than 6 characters'
              }
            }
          },
          'confirm-password': {
            validators: {
              notEmpty: {
                message: 'Please confirm password'
              },
              identical: {
                compare: function () {
                  return formAuthentication.querySelector('[name="password"]').value;
                },
                message: 'The password and its confirm are not the same'
              },
              stringLength: {
                min: 6,
                message: 'Password must be more than 6 characters'
              }
            }
          },
          terms: {
            validators: {
              notEmpty: {
                message: 'Please agree terms & conditions'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap5: new FormValidation.plugins.Bootstrap5({
            eleValidClass: '',
            rowSelector: '.mb-3'
          }),
          submitButton: new FormValidation.plugins.SubmitButton(),

          defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          autoFocus: new FormValidation.plugins.AutoFocus()
        },
        init: instance => {
          instance.on('plugins.message.placed', function (e) {
            if (e.element.parentElement.classList.contains('input-group')) {
              e.element.parentElement.insertAdjacentElement('afterend', e.messageElement);
            }
          });
        }
      });
    }

    //  Two Steps Verification
    const numeralMask = document.querySelectorAll('.numeral-mask');

    // Verification masking
    if (numeralMask.length) {
      numeralMask.forEach(e => {
        new Cleave(e, {
          numeral: true
        });
      });
    }

    document.getElementById('passwordResetLinkFormBtn').addEventListener('click', event => {

      event.preventDefault();
      const email = $('#email').val()
      const socket = io('http://localhost:3000/account',{secure: true})
      socket.on('connect', () => {
        console.log('Connected');
      })
     socket.emit('password-reset-link-requested', {email}) 
     socket.on('error-not-account-found', data => {
      const emailElement = $('#email');
      emailElement.addClass('is-invalid');
      var specificParent = emailElement.parent();
      const {error} = data;
      //alert alert-success mb-0 alert-dismissible
      specificParent.append(`<span class="invalid-feedback animate__animated animate__flash" role="alert"><strong>${error.message}</strong></span>`)
     })

     socket.on('account-user', user => {
      const notificatonDiv = $('#success-notification');
      notificatonDiv.addClass('alert alert-success mb-0 alert-dismissible animate__animated animate__slideInRight');
      notificatonDiv.append(notificationHTML(user))
     })

    })
    
   
  })();
});
