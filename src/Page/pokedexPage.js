import React, { useState, useEffect } from "react";
import { List, Card, Row, Col, Tag, BackTop, Image } from "antd";
import { Link } from "react-router-dom";
import { tagColor } from "../lib/colorList";
import styled from "styled-components";
import HeaderBar from "../lib/headerPage";
import SearchFunction from "../component/searchFunction";

const H1 = styled.h1`
  font-size: 1em;
  color: grey;
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
  const [sortType, setSortType] = useState("");
  const [paginationSize, setPaginationSize] = useState(8);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const SearchUpdate = (value) => {
    setDataInfo(value);
  };

  useEffect(() => {
    /**
     * fetchAllPokemonData function is to catch all data resources from API and after that,
     * the fetchPokemonData function is going to take every single pokemon detail.
     */

    const fetchAllPokemonData = () => {
      setIsLoading(true);
      try {
        fetch(" https://pokeapi.co/api/v2/pokemon?limit=151")
          .then((response) => response.json())
          .then((allpokemon) => {
            allpokemon.results.forEach((pokemon) => {
              fetchPokemonData(pokemon);
            });
          })
          .catch((err) => {
            setIsError(true);
            console.log(err);
          });
      } catch (error) {
        throw error;
      }
    };

    let arr = [];
    const fetchPokemonData = (pokemon) => {
      let url = pokemon.url; // <--- this is saving the pokemon url to a variable to use in the fetch.
      //Example: https://pokeapi.co/api/v2/pokemon/1/"
      try {
        fetch(url)
          .then((response) => response.json())
          .then((pokeData) => {
            arr.push(pokeData);
            setDataInfo([...arr]);
            setDefaultData([...arr]); // Same data with DataInfo, it is back up resource and used in the search function
            setIsLoading(false);
          })
          .catch((err) => {
            setIsError(true);
            console.log(err);
          });
      } catch (error) {
        throw error;
      }
    };

    fetchAllPokemonData();
  }, []);

  useEffect(() => {
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

    sortArray(sortType);
  }, [sortType]);

  return (
    <>
      <HeaderBar>
        <BarSection justify="space-between" align="middle">
          <Col flex={1}>
            <SearchFunction resource={defaultData} onChange={SearchUpdate} />
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
          {isError && <div>Something went wrong ...</div>}
          {isLoading ? (
            <div>Loading ...</div>
          ) : (
            <List
              pagination={{
                onChange: (page,pageSize) => {
                  console.log(pageSize)
                  console.log(page)
                  setPaginationSize(pageSize);
                  //antd bug here, they set wrong definition between page and pagesize
                },
                pageSize: paginationSize,
                total: 151,
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
                                  <Tag
                                    key={index + item}
                                    color={tagColor[index]}
                                  >
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
          )}

          <BackTop>
            <UpDiv>UP</UpDiv>
          </BackTop>
        </StyleDiv>
      </HeaderBar>
    </>
  );
}

export default PokedexPage;
