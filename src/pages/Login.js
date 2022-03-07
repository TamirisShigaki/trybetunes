import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const INITIAL_STATE = {
  name: '',
  btnLoading: true,
  isLoaded: false,
  loading: false,
};

class Login extends Component {
  constructor() {
    super();

    this.state = INITIAL_STATE;
  }

  // verifica se o input name tem mais de 3 caráter e habilita o botão.
  handleChange = (event) => {
    const min = 3;

    this.setState(() => ({
      name: event.target.value,
      btnLoading: event.target.value.length < min,
    }));
  }

  // renderiza a msg de 'carregando' até a API ser chamada
  btnSubmit = (event) => {
    event.preventDefault();

    const { name } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name });
      this.setState({
        loading: false,
        isLoaded: true,
      });
    });
  }

  render() {
    const { btnLoading, isLoaded, loading } = this.state;

    return (
      <div data-testid="page-login">
        {
          loading ? <Loading /> : (
            <form>
              <label htmlFor="name-input">
                Nome:
                <input
                  type="text"
                  name="name"
                  id="name-input"
                  data-testid="login-name-input"
                  onChange={ this.handleChange }
                />
              </label>

              <button
                type="submit"
                name="btnLoading"
                id="submit-button"
                data-testid="login-submit-button"
                onClick={ this.btnSubmit }
                disabled={ btnLoading }
              >
                Entrar
              </button>
            </form>
          )
        }
        {/* renderiza pra search */}
        { isLoaded && <Redirect to="/search" /> }
      </div>
    );
  }
}
export default Login;
