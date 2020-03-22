import React, { Component} from 'react';
import { View } from 'react-native';
import api from '../../services/api';
import PropTypes from 'prop-types';

// import { Container } from './styles';

export default class User extends Component  {
  static propTypes = {
    navigation: PropTypes.shape({
      route: PropTypes.object,
    }).isRequired
  }

  state = {
    stars: [],
  }

  async componentDidMount() {
    const { route } = this.props;
    const { user } = route.params;

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data});
  }



  render() {
    return (
      <View />

    )
  }
}
