import React, { Component, useState, useContext } from "react"


const Context = () => {
  const[theme, changeTheme, ] = useState({color: "red", text: "Hi"})
  const setTheme = (e) => {
    // changeTheme(theme.color == "red"?{color: "blue", text: "OK"}:{color: "red", text: "Hi"})
    changeTheme({color: e.target.value, text: "this.refs.text"})
  }

  return (
    <div>
      <Text color={theme.color} text={theme.text} />
      <input placeholder="color" defaultValue="green" onChange={setTheme} />
      <input placeholder="text" defaultValue="Hello" />
      <Button setTheme={setTheme} />
    </div>
  )
}

const Text = ({ color, text }) => (
  <h1 style={{color}}>{ text }</h1>
)

const Button = ({setTheme}) => (
  <button onClick={setTheme}>Change</button>
)

export default Context
