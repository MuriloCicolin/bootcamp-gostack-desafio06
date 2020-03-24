import React, { Component} from 'react';
import api from '../../services/api';
import PropTypes from 'prop-types';
import { ActivityIndicator  } from 'react-native';

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
    page: 1,
    refreshing: false,
  }

  async componentDidMount() {
    this.loadStarred();
  }


  loadStarred = async (page = 1 ) => {
    const { route } = this.props;
    const { user } = route.params;
    const { stars } = this.state;

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page }
    });

    this.setState({
      loading: false,
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      refreshing: false
    })
  };


  loadMore = async  () => {
    const { page } = this.state;

    const nextPage = page + 1;

    this.loadStarred(nextPage);
  }

  refreshList = async () => {
    this.setState({
      page: 1,
      refreshing: true,
    })

    this.loadStarred();
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
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            onRefresh={this.refreshList}
            refreshing={this.state.refreshing}
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
