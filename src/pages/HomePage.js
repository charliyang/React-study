import React, { Component } from "react";
import Layout from "./Layout";

class HomePage extends Component {
  render() {
    return (
      <Layout topBar={true} bottomBar={true} title="yang">
        {{
          content: (
            <div>
              <h3>this is a HomePage</h3>
            </div>
          ),
          text: "这是个文本",
          btnClick: () => {
            console.log("btnClick");
          },
        }}
      </Layout>
    );
  }
}

export default HomePage;
