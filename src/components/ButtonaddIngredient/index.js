import React, { Component } from 'react';
import { FiUserMinus } from "react-icons/fi";


class Like extends Component {
  render() {
    const style = { color: "green", fontSize: "3em" }
    return <FiUserMinus style={style}  />
  }
}

export default Like;