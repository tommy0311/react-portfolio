import React from 'react';

export default function Login() {
  return (
    <div className="login-container">
      <div className="card">
        <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="avatar" />
        <p id="profile-name" className="profile-name-card"></p>
        <form className="form-signin">
          <span id="reauth-email" className="reauth-email"></span>
          <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
          <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}