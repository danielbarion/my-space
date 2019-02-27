import React from 'react'

export const MySpaceContext = React.createContext()

class MySpaceProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <MySpaceContext.Provider value={{}}>
        { this.props.children }
      </MySpaceContext.Provider>
    )
  }
}

export default MySpaceProvider