((window, document, Vue, $) => {
    // Vue 3 app
    const app = Vue.createApp({
        data() {
            return {
                inputValue: '',
            };
        },
        template: `<div class="app">
        <form id="formAuthentication" class="mb-3">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="text"
            class="form-control {% if error %} is-invalid {% endif %}"
            id="email"
            name="email"
            placeholder="Enter your email"
            autofocus />

            {% if error %}
        <span class="invalid-feedback animate__animated animate__flash" role="alert">
          <strong>{{error.msg}}</strong>
        </span>
        {% endif %}
        </div>
        
        <button class="btn btn-primary d-grid w-100">Send Reset Link</button>
      </form>
      <div class="text-center">
        <a href="/login" class="d-flex align-items-center justify-content-center">
          <i class="ti ti-chevron-left scaleX-n1-rtl"></i>
          Back to login
        </a>
      </div>
        </div>`,
        methods: {
            handleSubmit() {
                // Perform the POST request to the server here
                const data = { input: this.inputValue };
                fetch('/password/forgot', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then((response) => response.json())
                .then((data) => {
                    // Handle the server response here
                    console.log(data);
                })
                .catch((error) => {
                    // Handle any errors here
                    console.error('Error:', error);
                });
            },
        },
    });

    app.mount('#app');
})(window, document, Vue, jQuery)
    
   

// ((window, document, Vue, $) => {
 
//     console.log('vue')
//     // $(() => {
//     //     $('#formAuthentication').on({
//     //         submit: async event => {
//     //             event.preventDefault();
//     //             const data = {}
//     //             data['email'] = $('#email').val();
//     //              try{
//     //                 const response = await axios.post('/password/forgot', data)
//     //                 if(response.data){
//     //                     console.log(response.data)
//     //                 }else{
//     //                     console.log('Nothing!')
//     //                 }
//     //              }catch(error){
//     //                 console.log(error.message)
//     //              }

//     //         }
//     //     })
//     // })
// })(window, document, Vue, jQuery)