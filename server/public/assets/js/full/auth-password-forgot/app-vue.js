 // Vue 3 app
 import template from './template.js';
 const app = Vue.createApp({
    data() {
        return {
            inputValue: '',
            error: ''
      };
    },
    template: template(),
    methods: {
        async handleSubmit() {
            // Perform the POST request to the server here
            const data = { email: this.inputValue };
            try {
              const response = await axios.post('/password/forgot', data)
                if(response.data){
                  if(response.data.error){
                    console.log(response.data.error)
                    this.error = response.data.error;
                  }else{
                    console.log('good to go')
                  }
                }
            } catch(eror){
              console.log(eror)
            }
        },
    },
});
app.mount('#app');