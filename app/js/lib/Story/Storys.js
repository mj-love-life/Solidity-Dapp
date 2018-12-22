import React, { Component } from 'react';
import { formatDate } from "../../formatdate";


// 可添加用户信息，比如antuor 以及key值
// struct Picture {
//     string IPFS_hash;
//     string Title;
//     // story
//     string Description;
//     string Type;
//     string Emotion;
//     uint Timestamp;
// }

class Storys extends Component{
    constructor(props) {
        super(props);
        this.renderStory = this.renderStory.bind(this);
    }

    renderStory(story, i) {
        console.log("Storys", story);
        return (
            <tr key={i}>
                <td className="story-id" width="20px">{story[0]}</td>
                <td className="story-picture" width="150px"><img src={`https://ipfs.io/ipfs/${story[1]}` } alt="coin" height="140px" width="140px"/></td>
                <td className="story-title" width="70px">{story[2]}</td>
                <td className="story-description" width="400px">{story[3]}</td>
                <td className="story-type" width="70px">{story[4]}</td>
                <td className="story-emotion" width="70px" >{story[5]}</td>
                <td className="story-Timestamp" width="70px">{story[6]}</td>
            </tr>
        );
    }


    getStorys(){

    }
    render() {
        const { storys } = this.props;


        return (
            <div className="card">
                <div className="row">
                    <div className="col-sm-12">
                        <h2 className="orange">History</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <table className="table">
                            <thead>
                            <tr>
                                <th width="20px">id</th>
                                <th width="150px">Picture</th>
                                <th width="70px">Title</th>
                                <th width="400px">Descriptipon</th>
                                <th width="70px">Type</th>
                                <th width="70px">Emotion</th>
                                <th width="70px">Timestamp</th>
                            </tr>
                            </thead>
                            <tbody id="storys">
                            {storys.map((story, i) => this.renderStory(story, i))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

}

export default Storys;