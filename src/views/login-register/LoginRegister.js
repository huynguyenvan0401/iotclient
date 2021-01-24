import React, { useState, useEffect } from 'react';
import './style.css';

import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { register, login } from 'actions/auth';

const LoginRegister = () => {
  // Hàm chuyển trạng thái đăng nhập
  const actSignin = () => {
    var container = document.querySelector('.contain');
    container.classList.remove('sign-up-mode');
  };
  // Hàm chuyển trạng thái đăng ký
  const actSignup = () => {
    var container = document.querySelector('.contain');
    container.classList.add('sign-up-mode');
  };

  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //register
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  function handleRegisterFormChange(e) {
    const { name, value } = e.target;
    setRegisterForm((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  }

  async function signUp() {
    const res = await dispatch(
      register(registerForm.username, registerForm.email, registerForm.password)
    );
    if (res) {
      window.location.reload();
    }
  }
  //login
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  function handleLoginFormChange(e) {
    const { name, value } = e.target;
    setLoginForm((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  }

  async function signIn() {
    const res = await dispatch(login(loginForm.username, loginForm.password));
    if (res) {
      history.push('/');
    }
  }

  return (
    <div className="contain">
      <div className="forms-contain">
        <div className="signin-signup">
          {/* Form đăng nhập */}
          <form className="sign-in-form">
            <h2 className="title">Đăng nhập</h2>
            <div className="input-field">
              <i className="fas fa-user" />
              <input
                type="text"
                placeholder="Tài khoản"
                name="username"
                value={loginForm.username}
                onChange={(e) => handleLoginFormChange(e)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={loginForm.password}
                onChange={(e) => handleLoginFormChange(e)}
              />
            </div>
            <input
              type="button"
              value="Đăng nhập"
              className="btn solid"
              onClick={() => signIn()}
            />
            <p className="social-text">Liên hệ với chúng tôi</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google" />
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </form>
          {/* Form đăng ký */}
          <form className="sign-up-form">
            <h2 className="title">Đăng ký</h2>
            <div className="input-field">
              <i className="fas fa-user" />
              <input
                type="text"
                placeholder="Tài khoản"
                name="username"
                value={registerForm.username}
                onChange={(e) => handleRegisterFormChange(e)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope" />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={registerForm.email}
                onChange={(e) => handleRegisterFormChange(e)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={registerForm.password}
                onChange={(e) => handleRegisterFormChange(e)}
              />
            </div>
            <input
              type="button"
              className="btn"
              value="Đăng ký"
              onClick={() => signUp()}
            />
            <p className="social-text">Liên hệ với chúng tôi</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google" />
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
      {/* Thông tin thêm */}
      <div className="panels-contain">
        <div className="panel left-panel">
          <div className="content">
            <h3>Bạn chưa có tài khoản ?</h3>
            <p>Hãy đăng ký ngay để quản lý thông minh cho ngôi nhà bạn!</p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={actSignup}
            >
              Đăng ký
            </button>
          </div>
          <img src={require('./img/log.svg')} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Bạn đã có tài khoản ?</h3>
            <p>Hãy đăng nhập ngay để quản lý ngôi nhà của bạn!</p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={actSignin}
            >
              Đăng nhập
            </button>
          </div>
          <img src={require('./img/register.svg')} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

LoginRegister.propTypes = {};

export default LoginRegister;
