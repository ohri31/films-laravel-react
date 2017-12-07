import React, { Component } from 'react';
import axios from 'axios';

import { getAuthToken } from '../../_services/Authenticate';

class CommentForm extends Component {
    constructor () {
        super();

        this.state = {
            content: ''
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    handleSuccess(response) {
        console.log(response);
    }

    handleError(error) {
        console.log(error);
    }

    postComment (e) {
        e.preventDefault();
        this.props.postComment(this.state.content)
        this.setState({content: ''});
    }

    render () {
        return (
            <div className="comment-form">
                <form action="" method="post">
                    <div className="form-group">
                        <textarea className="form-control" name="content" value={this.state.content} onChange={this.onChange} placeholder="Input your comment">
                        </textarea>
                    </div>
                    <input type="submit" className="btn btn-primary pull-right" value="Post comment" onClick={this.postComment.bind(this)} />
                </form>
            </div>
        )
    }
}

export default CommentForm;