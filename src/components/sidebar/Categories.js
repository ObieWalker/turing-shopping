import React from 'react';
import { Menu } from 'antd';


const Categories = ({ state }) => {
  return (
    <React.Fragment>
    {
      state === 'regional' ?
      <Menu>
        <Menu.Item key="1">French</Menu.Item>
        <Menu.Item key="2">Italian</Menu.Item>
        <Menu.Item key="3">Irish</Menu.Item>
      </Menu>
      :
      state === 'nature' ?
        <Menu>
          <Menu.Item key="4">Animal</Menu.Item>
          <Menu.Item key="5">Flower</Menu.Item>
        </Menu>
      :
      state === 'seasonal' ?
        <Menu>
          <Menu.Item key="6">Christmas</Menu.Item>
          <Menu.Item key="7">Valentines</Menu.Item>
        </Menu>
      :
      <Menu>
        <Menu.Item key="1">French</Menu.Item>
        <Menu.Item key="2">Italian</Menu.Item>
        <Menu.Item key="3">Irish</Menu.Item>
        <Menu.Item key="4">Animal</Menu.Item>
        <Menu.Item key="5">Flower</Menu.Item>
        <Menu.Item key="6">Christmas</Menu.Item>
        <Menu.Item key="7">Valentines</Menu.Item>
      </Menu>
    }
    </React.Fragment>
  )
}

export default Categories
