import React, { Component } from "react"

const Context = () => {
  const[theme, changeTheme, ] = React.useState({color: "red", text: "Hi"})
  const setTheme = () => {
    console.log('hi :)');
    changeTheme(theme.color == "red"?{color: "blue", text: "OK"}:{color: "red", text: "Hi"})
  }

  return (
    <div>
      <Text color={theme.color} text={theme.text} />
      <button onClick={setTheme}>Change Theme</button>
    </div>
  )
}

const Text = ({ color, text }) => (
  <h1 style={{color}}>{ text }</h1>
)

export default Context
