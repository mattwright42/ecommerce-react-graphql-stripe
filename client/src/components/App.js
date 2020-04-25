import React, { Component } from 'react';
import { Container, Box, Heading } from 'gestalt';
import './App.css';

import Strapi from 'strapi-sdk-javascript/build/main';
const apiurl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiurl);

class App extends Component {
  async componentDidMount() {
    const response = await strapi.request('POST', '/graphql', {
      data: {
        query: `query {
          brands {
          _id
          Name
          Description
          Image {
            name
          }
        }
      }`,
      },
    });
    console.log(response);
  }
  render() {
    return (
      <Container>
        {/*Brands Sction*/}
        <Box display="flex" justifyContent="center" marginBottom={2}>
          {/* Brands Header */}
          <Heading color="midnight" size="md">
            Brew Brands
          </Heading>
        </Box>
      </Container>
    );
  }
}

export default App;
