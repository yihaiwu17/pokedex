import { Select } from "antd";
import React from "react";

const { Option } = Select;

export default function SortBar(props) {
    const {pokemonData} = props

    // console.log(pokemonData)
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Sort to Select"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      filterSort={(optionA, optionB) =>
        optionA
          .toLowerCase()
          .localeCompare(optionB.children.toLowerCase())
      }
    >
      <Option value="name">Name</Option>
      <Option value="id">Id</Option>

    </Select>
  );
}
