import React, { useState, useEffect } from "react";
import { List, Input, Card, Row, Col, Tag, BackTop, Image } from "antd";
import { Link } from "react-router-dom";
import { tagColor } from "../lib/colorList";
import styled from "styled-components";
import HeaderBar from "../lib/headerPage";

const H1 = styled.h1`
  font-size: 1em;
  color: grey;
`;

const Search = styled(Input.Search)`
  width: 30%;
  display: block;
`;

const BarSection = styled(Row)`
  width: 100%;
  padding: 24px;
  text-align: center;
`;

const StyleDiv = styled.div`
  min-height: 280px;
  padding: 3em;
  background: #fff;
`;

const UpDiv = styled.div`
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 4;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 14;
`;

/**
 * This function is the main page to showing 151 pokemon. It is including the search and sort component.
 *
 * Tips:
 * import Antd material to create UI component. More info please visit https://ant.design/components/overview/
 * <Link> component from react-router-dom and must use inside of <Router>. Please go to App.js to see the construction
 */

function PokedexPage() {
  const [dataInfo, setDataInfo] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");

  /**
   * fetchAllPokemonData function is to catch all data resources from API and after that,
   * the fetchPokemonData function is going to take every single pokemon detail.
   */

  const fetchAllPokemonData = () => {
    fetch(" https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((allpokemon) => {
        allpokemon.results.forEach((pokemon) => {
          fetchPokemonData(pokemon, arr);
        });
      });
  };

  let arr = [];
  const fetchPokemonData = (pokemon) => {
    let url = pokemon.url; // <--- this is saving the pokemon url to a variable to use in the fetch.
    //Example: https://pokeapi.co/api/v2/pokemon/1/"
    fetch(url)
      .then((response) => response.json())
      .then((pokeData) => {
        arr.push(pokeData);
        setDataInfo([...arr]);
        setDefaultData([...arr]); // Same data with DataInfo, it is back up resource and used in the search function
      });
  };

  //sortArray is descending order

  const sortArray = (type) => {
    const types = {
      weight: "weight",
      height: "height",
      id: "id",
    };
    const sortProperty = types[type];
    const sorted = [...dataInfo].sort(
      (a, b) => b[sortProperty] - a[sortProperty]
    );
    setDataInfo(sorted);
  };

  // search function with name

  const searchArray = () => {
    const results = defaultData.filter((value) => {
      return value.name.toLowerCase().includes(searchTerm); //If find the result, it going to return true
    });
    setDataInfo(results);
  };

  useEffect(() => {
    fetchAllPokemonData();
  }, []);

  useEffect(() => {
    sortArray(sortType);
  }, [sortType]);

  useEffect(() => {
    searchArray();
  }, [searchTerm]);

  return (
    <>
      <HeaderBar>
        <BarSection justify="space-between" align="middle">
          <Col flex={1}>
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={(value) => {
                setSearchTerm(value);
              }}
            />
          </Col>
          {/* sort function here */}
          <Col>
            <select onChange={(e) => setSortType(e.target.value)}>
              <option value="id">ID</option>
              <option value="weight">Weight</option>
              <option value="height">Height</option>
            </select>
          </Col>
        </BarSection>
        <StyleDiv>
          {/* antd List component, more detail https://ant.design/components/list/#header */}
          <List
            pagination={{
              onChange: (page) => {},
              pageSize: 8,
            }}
            grid={{
              gutter: 5,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 4,
              xl: 4,
              xxl: 4,
            }}
            dataSource={dataInfo}
            rowKey="id"
            size="small"
            renderItem={(item, index) => {
              return (
                <Row justify="center" key={index}>
                  <List.Item key={item.id}>
                    <Link to={`/${item.name}`}>
                      {/* antd Card component, more detail https://ant.design/components/card/#header */}
                      <Card
                        hoverable
                        bordered={false}
                        cover={
                          <Image
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              objectFit: "contain",
                              height: "200px",
                            }}
                            preview={false}
                            alt="example"
                            src={`https://pokeres.bastionbot.org/images/pokemon/${item.id}.png`}
                          />
                        }
                      >
                        <Row>
                          <H1>{item.id}</H1>
                        </Row>

                        <Row style={{ fontSize: "25px" }}>
                          <b>{item.name}</b>
                        </Row>
                        <Row>
                          {item.types.map((item, index) => {
                            return (
                              <Col key={index}>
                                <Tag key={index + item} color={tagColor[index]}>
                                  {item.type.name}
                                </Tag>
                              </Col>
                            );
                          })}
                        </Row>
                      </Card>
                    </Link>
                  </List.Item>
                </Row>
              );
            }}
          />

          <BackTop>
            <UpDiv>UP</UpDiv>
          </BackTop>
        </StyleDiv>
      </HeaderBar>
    </>
  );
}

export default PokedexPage;
