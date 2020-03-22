import React, { Component} from 'react';
import api from '../../services/api';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

import { Container,
   Header,
   Avatar,
   Name,
   Bio,
   Stars,
   Starred,
   OwnerAvatar,
   Info,
   Title,
   Author,
   Loading
  }
   from './styles';

export default class User extends Component  {
  static propTypes = {
    navigation: PropTypes.shape({
      setOptions: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
    route: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.shape({
          login: PropTypes.string,
          name: PropTypes.string,
          avatar: PropTypes.string,
          bio: PropTypes.string,
        }),
      }),
    }).isRequired,
  };

  state = {
    stars: [],
    loading: true,
  }

  async componentDidMount() {
    const { route } = this.props;
    const { user } = route.params;

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data, loading: false });
  }



  render() {
    const { route } = this.props;
    const { user } = route.params;
    const { stars, loading } = this.state;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        { loading ?
          (<Loading>
            <ActivityIndicator color="#000" size="large" />
          </Loading>) : (
            <Stars
            data={stars}
            keyExtractor={ star => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
          )}
      </Container>
    )
  }
}
