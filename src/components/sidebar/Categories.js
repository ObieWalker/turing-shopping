import React from 'react';
import { Menu } from 'antd';

const Categories = ({ state, chooseCategory }) => {
  const menuItems = [
    <Menu.Item onClick={chooseCategory} key="1">French</Menu.Item>,
    <Menu.Item onClick={chooseCategory} key="2">Italian</Menu.Item>,
    <Menu.Item onClick={chooseCategory} key="3">Irish</Menu.Item>,
    <Menu.Item onClick={chooseCategory} key="4">Animal</Menu.Item>,
    <Menu.Item onClick={chooseCategory} key="5">Flower</Menu.Item>,
    <Menu.Item onClick={chooseCategory} key="6">Christmas</Menu.Item>,
    <Menu.Item onClick={chooseCategory} key="7">Valentines</Menu.Item>
  ]

  return (
    <React.Fragment>
    {
      state === 1 ?
      <Menu>
        {menuItems.slice(0,3)}
      </Menu>
      :
      state === 2 ?
        <Menu>
          {menuItems.slice(3,5)}
        </Menu>
      :
      state === 3 ?
        <Menu>
          {menuItems.slice(5,7)}
        </Menu>
      :
      <Menu>
        {menuItems.slice(0)}
      </Menu>
    }
    </React.Fragment>
  )
}

export default Categories
