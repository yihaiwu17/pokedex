import React, { useState, useEffect } from "react";
import HeaderBar from "../lib/headerPage";
import { useParams } from "react-router-dom";
import { tagColor } from "../lib/colorList";
import styled from "styled-components";
import { Row, Col, Tag, Image, Descriptions, Badge } from "antd";

const H1 = styled.h1`
  font-size: 3em;
  text-align: center;
`;

const H2 = styled.h2`
  font-size: 2em;
  text-align: center;
  color: grey;
`;

const ImgSection = styled(Row)`
  width: 100%;
  padding: 24px;
`;

/**
 * This function is fetching single pokemon detail and rendering them by antd component.
 * More Antd info please visit https://ant.design/components/overview/
 */

export default function SinglePokemon() {
  const [pokemonData, setPokemonData] = useState([]);

  let { name } = useParams(); //dynamic to catch every single pokemon's name and used in API

  //fetch dynamic data by name
  const SinglePokomonData = async () => {
    await fetch(` https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json())
      .then((pokeData) => {
        setPokemonData(pokeData);
      });
  };

  useEffect(() => {
    SinglePokomonData();
  }, []);

  return (
    <div>
      <HeaderBar>
        <H1> {name} </H1>
        <H2> #{pokemonData.id} </H2>
        <ImgSection gutter={[16, 16]}>
          <Col span={12} style={{ textAlign: "center" }}>
            <Image
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                objectFit: "contain",
                height: "350px",
              }}
              preview={false}
              alt="example"
              src={`https://pokeres.bastionbot.org/images/pokemon/${pokemonData.id}.png`}
            />
          </Col>
          <Col span={12}>
            <Descriptions title="User Info" layout="vertical" bordered>
              <Descriptions.Item label="Height">
                {pokemonData.height} inch
              </Descriptions.Item>

              <Descriptions.Item label="Weight">
                {pokemonData.weight / 10} kg
              </Descriptions.Item>

              <Descriptions.Item label="Type">
                {pokemonData.types?.map((item, index) => {
                  return (
                    <Tag key={index + item} color={tagColor[index]}>
                      {item.type.name}
                    </Tag>
                  );
                })}
              </Descriptions.Item>

              <Descriptions.Item label="Abilities">
                {pokemonData.abilities?.map((item, index) => {
                  return (
                    <Tag key={index + item} color={tagColor[index + 3]}>
                      {item.ability.name}
                    </Tag>
                  );
                })}
              </Descriptions.Item>

              <Descriptions.Item label="Status">
                <Badge status="processing" text="Running" />
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </ImgSection>
      </HeaderBar>
    </div>
  );
}
