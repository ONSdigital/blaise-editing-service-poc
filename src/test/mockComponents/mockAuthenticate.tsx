import { ReactElement } from "react";
import { Authenticate } from "blaise-login-react-client";
import userMockObject from "../mockObjects/userMockObject";


export default class MockAuthenticate extends Authenticate {

  override render(): ReactElement {
    return (
      <div data-testid="authenticated">
        <h1>{this.props.title}</h1>
        <div>{this.props.children(userMockObject, true, () => {})}</div>
      </div>
    );
  }
}
