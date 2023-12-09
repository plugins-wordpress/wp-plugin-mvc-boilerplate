export default () => `<div class="app">
<form @submit.prevent="handleSubmit" class="mb-3" id="formAuthentication">
<div class="mb-3">
  <label for="email" class="form-label">Email</label>
  <input v-if="error"
    type="text"
    class="form-control is-invalid"
    id="email"
    name="email"
    v-model="inputValue"
    placeholder="Enter your email"
    autofocus />

    <input v-else
    type="text"
    class="form-control"
    id="email"
    name="email"
    v-model="inputValue"
    placeholder="Enter your email"
    autofocus />

    <span v-if="error" class="invalid-feedback animate__animated animate__flash" role="alert">
          <strong>{{error.message}}</strong>
    </span>
</div>

<button class="btn btn-primary d-grid w-100">Send Reset Link</button>
</form>
<div class="text-center">
<a href="/login" class="d-flex align-items-center justify-content-center">
  <i class="ti ti-chevron-left scaleX-n1-rtl"></i>
  Back to login
</a>
</div>
</div>`