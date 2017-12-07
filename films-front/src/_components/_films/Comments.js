import React, { Component } from 'react';
import axios from 'axios';

class Comments extends Component {
    constructor () {
        super();

        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        let film = this.props.id;
        this.setState({comments: this.props.comments});
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        this.setState({comments: this.props.comments});
    }

    render () {
        const comments = this.state.comments;

        return (
            <div>
                <h3>Comments</h3>
                    <hr/>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                    {
                        comments.map((e, i) => 
                            <div key={i}>
                                <div style={{fontSize:"14px"}}>
                                    {e.content}
                                </div>
                                <div style={{fontSize:"12px", color: "#d5d5d5"}}>
                                    Comment posted by: <b>{e.name}</b> at <b>{e.created_at}</b>
                                </div>     
                                <hr />
                            </div>   
                        )
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default Comments;