import React, { Component } from "react";
import { addArticle } from "../../utils/api";
import TopicSelector from "./topicSelector";

class AddNewArticle extends Component {
  state = {
    title: "",
    belongs_to: "",
    body: "",
    error: null
  };
  render() {
    const invalidInput = this.state.error === 1;
    return (
      <div className="addArticle">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title"> give it a name...</label>
          </div>
          <div>
            <input
              disabled={!this.props.user}
              value={this.state.title}
              onChange={this.handleChange}
              type="text"
              id="title"
            />
          </div>
          <div>
            <label htmlFor="topic">what's the topic?</label>
          </div>
          <TopicSelector
            onTopicSelect={this.onChangeTopic}
            topicsArray={this.props.topicsArray}
          />
          <div>
            <label htmlFor="body">your article</label>
          </div>

          <div className="formRow">
            <textarea
              disabled={!this.props.user}
              value={this.state.body}
              onChange={this.handleChange}
              type="text-area"
              id="body"
            />
          </div>
          <button disabled={!this.props.user}>Add an article!</button>
        </form>
        <hr />
        {invalidInput && (
          <div className="invalidInput">Please enter all fields</div>
        )}
        {!this.props.user && <div className="invalidInput">Please log in</div>}
      </div>
    );
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let article = { ...this.state };
    if (
      article.title.trim() === "" ||
      article.belongs_to.trim() === "" ||
      article.body.trim() === ""
    ) {
      this.setState({
        error: 1
      });
    } else {
      article.created_by = this.props.user._id;
      addArticle(article).then(newArticle => {
        newArticle.createdBy.id = this.props.user._id;
        newArticle.createdBy.name = this.props.user.name;

        this.props.onCreateArticle(newArticle);
        this.setState({
          title: "",
          belongs_to: "",
          body: ""
        });
      });
    }
  };
  onChangeTopic = topic => {
    this.setState({ belongs_to: topic });
  };
}
export default AddNewArticle;
