((window, document, $, io) => {

    $(document).ready(function () {
        // Your code here
        $(`#formPasswordReset`).on({
            submit: function(event){
                event.preventDefault();
            }
        })
        $(`#password-reset-form-btn`).on({
            click: function (e) {
                // e.preventDefault();
                console.log('it works!')
            }
        })
    });
      
})(window, document, jQuery, io)