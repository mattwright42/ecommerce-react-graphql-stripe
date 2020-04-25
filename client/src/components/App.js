import React, { Component } from 'react';
import { Container, Box, Heading, Card, Image } from 'gestalt';
import './App.css';

import Strapi from 'strapi-sdk-javascript/build/main';
const apiurl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiurl);

class App extends Component {
  state = {
    brands: [],
  };
  async componentDidMount() {
    try {
      const response = await strapi.request('POST', '/graphql', {
        data: {
          query: `query {
            brands {
            _id
            Name
            Description
            Image {
              url
            }
          }
        }`,
        },
      });
      //console.log(response);
      this.setState({ brands: response.data.brands });
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    const { brands } = this.state;

    return (
      <Container>
        {/*Brands Sction*/}
        <Box display="flex" justifyContent="center" marginBottom={2}>
          {/* Brands Header */}
          <Heading color="midnight" size="md">
            Brew Brands
          </Heading>
        </Box>
        {/* Brands */}
        <Box display="flex" justifyContent="around">
          {brands.map((brand) => (
            <Box key={brand._id}>
              <Card
                image={
                  <Box height={200} width={200}>
                    <Image
                      alt="Brand"
                      naturalHeight={1}
                      naturalWidth={1}
                      src={`${apiurl}${brand.Image.url}`}
                    />
                  </Box>
                }
              />
            </Box>
          ))}
        </Box>
      </Container>
    );
  }
}

export default App;
