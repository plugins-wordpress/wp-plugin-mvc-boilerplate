import css from './css.js'
export default () => `
${css()}
<form id="formAuthentication" class="mb-3" action="index" method="POST">
<div class="mb-3">
  <label for="email" class="form-label">Email or Username</label>
  <input
    type="text"
    class="form-control"
    id="email"
    name="email-username"
    placeholder="Enter your email or username"
    autofocus />
</div>
<div class="mb-3 form-password-toggle">
  <div class="d-flex justify-content-between">
    <label class="form-label" for="password">Password</label>
    <a href="/passord/forgot">
      <small>Forgot Password?</small>
    </a>
  </div>
  <div class="input-group input-group-merge">
    <input
      type="password"
      id="password"
      class="form-control"
      name="password"
      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
      aria-describedby="password" />
    <span class="input-group-text cursor-pointer"><i class="ti ti-eye-off"></i></span>
  </div>
</div>
<div class="mb-3">
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="remember-me" />
    <label class="form-check-label" for="remember-me"> Remember Me </label>
  </div>
</div>
<button class="btn btn-primary d-grid w-100">Sign in</button>
</form> `