import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ipfs from '../ipfs'
import { Input } from 'antd';
const { TextArea } = Input;


//     string IPFS_hash;
//     string Title;
//     // story
//     string Description;
//     string Type;
//     string Emotion;
//     uint Timestamp;

class NewStorys extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ipfsHash: '',
            buffer: null
        };
        this.captureFile = this.captureFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    captureFile(event) {
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result) },()=>{
                ipfs.files.add(this.state.buffer, (error,result) => {
                    if(error) {
                        console.error(error);
                        return
                    }
                    this.setState({ipfsHash: result[0].hash});
                    console.log(this.state.ipfsHash);
                });
            });
            console.log('buffer here', this.state.buffer)
        };
    }

    //async addStorys(ipfs_hash, title, description, type, emotion)
    onSubmit(e) {
        e.preventDefault();
        var hash = this.state.ipfsHash;
        var title = e.target.elements[0].value;
        var discription = e.target.elements[1].value;
        var type = e.target.elements[2].value;
        var emotion = e.target.elements[3].value;
        console.log(hash, title, discription, type, emotion);

        console.log('ipfs here',this.state.ipfsHash);

        this.props.addStorys(
            hash, title, discription, type, emotion
        );
    }

    render() {
        return (
            <div className="card">
                <div className="row">
                    <div className="col-sm-12">
                        <h2 className="orange">Create</h2>
                    </div>
                </div>
                <div className="row">
                    <form id="new-task" className="col-sm-12" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label for="task-title">Title</label>
                            <input id="task-title" type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="task-discription">Discription</label>
                            <TextArea id="task-discription" rows={4} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="task-type">Type</label>
                            <input id="task-type" type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="task-emotion">Emotion</label>
                            <input id="task-emotion" type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label for="task-ipfs">Select File</label>
                            <input id="task-ipfs" type="file" className="form-control" onChange={this.captureFile}  width="200px"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default NewStorys;