import React from "react"
class JoinForm extends React.Component {
  state = {
    name: "",
    joined: false
  }

  handleChange = event => {
    this.setState({ name: event.target.value })
  }

  handleSubmit = event => {
    this.props.signIn({
      name: this.state.name
    })
    this.setState({ joined: true })
    event.preventDefault()
  }

  render() {
    return this.state.joined ? (
      <div>Thank you! The game will begin shortly</div>
    ) : (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            value={this.state.value}
            onChange={this.handleChange}
            type="text"
            disabled={this.state.joined}
          />
        </label>
        <input type="submit" value="Join" disabled={this.state.joined} />
      </form>
    )
  }
}
export default JoinForm
