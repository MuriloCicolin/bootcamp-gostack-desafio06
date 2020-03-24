import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

// import { Container } from './styles';


export default function Repository({ route }) {

  const { star } = route.params;

  return <WebView source={{ uri: star.html_url }} style={{ flex: 1 }} />;

}

Repository.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      star: PropTypes.shape({
        html_url: PropTypes.string,
      }),
    }),
  }).isRequired,
};
