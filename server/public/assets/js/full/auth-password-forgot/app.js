

((window, document, $) => {

  /**
*  Pages Authentication
*/

  'use strict';
  const passwordResetLinkForm = document.querySelector('#passwordResetLinkForm');


  document.addEventListener('DOMContentLoaded', function (e) {
    $('#email-error-span').hide();
    $('#passwordResetLinkSent').hide();
    (function () {
      // Form validation for Add new record
      if (passwordResetLinkForm) {
        const fv = FormValidation.formValidation(passwordResetLinkForm, {
          fields: {
            email: {
              validators: {
                notEmpty: {
                  message: 'Please enter your email'
                },
                emailAddress: {
                  message: 'Please enter valid email address'
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

      //Verification masking
      if (numeralMask.length) {
        numeralMask.forEach(e => {
          new Cleave(e, {
            numeral: true
          });
        });
      }
    })();
  });

  $('#passwordResetLinkFormBtn').on({

    click: async function (event) {
      event.preventDefault();
      const data = {}
      data['email'] = $('#email').val();
      try {
        const response = await axios.post('/password/forgot', data)
        // if(response.data && response.data.error){
        //   $('#email').addClass('form-control is-invalid')
        //   $('#email-error').text(response.data.error.message)
        //   $('#email-error-span').show();
        //   setTimeout(function(){
        //     $('#email').removeClass('is-invalid')
        //     $('#email-error').text('')
        //     $('#email-error-span').hide();
        //   }, 5000)
        // }

        // if(response.data && response.data.success){
        //   $('#passwordResetLinkSent').show();
        // }

        $('#passwordResetLinkSent').show();

        
        return false;
      } catch (e) {
        console.log(e.message)
      }
    }
  })

})(window, document, jQuery) 