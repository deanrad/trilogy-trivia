import React from "react";

import Cookies from "universal-cookie";
const cookies = new Cookies();

class JoinForm extends React.Component {
  state = {
    name: "",
    joined: false
  };

  auth_url = document.location.href.includes("localhost")
    ? "//localhost:3001/auth/github"
    : "/auth/github";

  // When our page loads from the OAuth redirect, we'll have a cookie indicating who they are
  // Emit the signin event if that's the case
  componentDidMount() {
    let userCookie = cookies.get("trilobytes-user");

    if (userCookie) {
      // component state
      this.setState({
        name: userCookie,
        joined: true
      });

      // tell redux store
      this.props.identifyClient({ username: userCookie });

      // tell server
      this.props.signIn({ id: userCookie, name: userCookie });
    }
  }

  render() {
    const { title } = this.props;

    return this.state.joined ? (
      <div>
        Thank you, {this.state.name}! The game will begin shortly...
        <div>
          <img src="/img/spinner.gif" alt="Waiting for the game to start" />
        </div>
        {document.location.hostname.match(/localhost/) && (
          <div
            style={{ float: "right", top: 10, right: 10, position: "absolute" }}
          >
            <a target="_blank" href="/remote">
              🎛
            </a>
          </div>
        )}
      </div>
    ) : (
      <div style={{ textAlign: "center", height: 300, position: "relative" }}>
        <h1>{title}</h1>
        <a
          href={this.auth_url}
          role="button"
          className="btn btn-secondary btn-lg btn-block"
          style={{ position: "absolute", top: "50%" }}
        >
          <span style={{ marginRight: 10 }} className="align-text-top">
            <svg
              aria-hidden="true"
              className="octicon octicon-mark-github"
              height="24"
              version="1.1"
              viewBox="0 0 16 16"
              width="24"
            >
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </span>
          Login with GitHub
        </a>
      </div>
    );
  }
}
export default JoinForm;
