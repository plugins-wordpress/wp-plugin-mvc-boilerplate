/**
 *  Pages Password Reset
 */

'use strict';
const formPasswordReset = document.querySelector('#formPasswordReset');
const passwordResetFormBtn = document.getElementById('passwordResetFormBtn')

const notificationHTML = user => `
<h5 class="alert-heading mb-2 text-info text-center" >Password Reset Successfully!</h5>
<p class="mb-0 text-info text-center">
 You may now login <a href="http://localhost:3000/login"><strong style="color:red;">Login</strong></a> 
</p>
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
`
// $(`#formPasswordReset`).on({
//     submit: function(event){event.preventDefault()}
// })
console.log("it works ....")
document.addEventListener('DOMContentLoaded', function (e) {
  (function () {
    // Form validation for Add new record
    if (formPasswordReset) {
      const fv = FormValidation.formValidation(formPasswordReset, {
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
                  return formPasswordReset.querySelector('[name="password"]').value;
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
    // formPasswordReset.addEventListener('submit', event => event.preventDefault());
    document.getElementById('passwordResetFormBtn').addEventListener('click', event => {

        event.preventDefault();
        //event.stopPropagation();
        console.log('it works');
        return;
        const password = $('#password').val()
        const passwordConfirmation = $('#confirm-password').val()
        const socket = io('http://localhost:3000/passord-reset',{secure: true})
        socket.on('connect', () => {
          console.log('Connected');
        })
        const email = $('#password').data('user')

        return console.log({password, email, passwordConfirmation})
        socket.emit('password-reset-data', {password, email, passwordConfirmation}) 

    //    socket.on('account-of-user-not-found', data => {
    //     const emailElement = $('#password');
    //     emailElement.addClass('is-invalid');
    //     var specificParent = emailElement.parent();
    //     const {error} = data;
    //     //alert alert-success mb-0 alert-dismissible
    //     specificParent.append(`<span class="invalid-feedback animate__animated animate__flash" role="alert"><strong>${error.message}</strong></span>`)
    //    })
  
    //    socket.on('account-user-password-reset', user => {
    //     $('#password').val('')
    //     $('#confirm-password').val('')
    //     const notificatonDiv = $('#reset-success-notification');
    //     notificatonDiv.addClass('alert alert-success mb-0 alert-dismissible animate__animated animate__slideInRight');
    //     notificatonDiv.append(notificationHTML(user))
    //    })
  
      })
  })();
});
