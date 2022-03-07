import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: '',
    };
  }

  // recuperar o nome da pessoa logada e exibe na tela, enquanto estiver aguardando a resposta da getUser, exibe apenas a mensagem de Carregando...
  async componentDidMount() {
    const user = await getUser();
    this.setState({
      loading: false,
      user: user.name,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading ? <Loading />
            : (<h1 data-testid="header-user-name">{user}</h1>)
        }
      </header>
    );
  }
}

export default Header;
