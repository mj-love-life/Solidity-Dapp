import React, { Component } from 'react';
import NewStorys from '../Story/NewStorys';
import Storys from '../Story/Storys';


class Main2 extends Component {

    render() {
        const { storys,  addStorys} = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <NewStorys addStorys = {addStorys} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <Storys storys = {storys}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default Main2;
