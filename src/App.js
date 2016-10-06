import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './bootstrap-3.3.7-dist/css/bootstrap-theme.css';
class App extends Component {
    constructor(){
        super()
        this.state={
            text:"",
            list:[{text:"jet",check:true},{text:"ski",check:false}]
        }

    }
    deleteList(index)
    {
        this.setState({list:[...this.state.list.slice(0,index),...this.state.list.slice(index+1,this.state.list.length)]})
    }
    changeText(e)
    {
        this.setState({text:e.target.value})
    }
    submit(){
        if(this.state.text!="")
        {
            this.state.list.push({text:this.state.text,check:false})
            this.setState({text:""})
            this.refs.inputbox.value=""
        }
    }
    enter(e)
    {
        if(e.key=='Enter')
        {
            this.submit();
        };
    }
    setCheck(k)
    {
        let tempList=this.state.list
        tempList[k].check=!tempList[k].check;
        this.setState({list:tempList})
    }
    render(){
        console.log(this.state.list);
        return (
            <div className="row">
                <ul className="list-group col-md-8  col-md-offset-2 list-group col-xs-8  col-xs-offset-2">
                    <li className="list-group-item active">
                        <div className="row">
                        <input className="col-md-7 col-xs-7 col-md-offset-1 col-xs-offset-1"
                            ref="inputbox"
                            style={{
                                //width:'85%',
                                color:'#000000'}}
                            type="text"
                            onKeyDown={this.enter.bind(this)}
                            onChange={this.changeText.bind(this)}
                            />
                        <button className="col-md-2 col-xs-2 col-md-offset-1 col-xs-offset-1"
                                style={{
                                    // width:'10%',
                                    color:'#000000',
                                    position:'absolute',
                                //    left:'85%'
                                }}
                                onClick={this.submit.bind(this)}
                        >
                            Add
                        </button>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <ul style={{overflow:'auto',height:(screen.height-400)+'px'}}>
                                    {this.state.list.map((v,k)=>(
                        <Todo   lo={k}
                                del={this.deleteList.bind(this,k)}
                                check={v.check}
                                fuckCheck={this.setCheck.bind(this,k)}
                        >
                                {v.text}
                        </Todo>)
                    )}
                        </ul>
                    </li>
                </ul>
            </div>

        )
    }
}

class Todo extends Component{
    constructor(props)
    {
        console.log(props);
        super(props);
        this.state={check:props.check}
    }
    check(e){
        //:this.setState({check:this.props.fuckCheck()});
        this.props.fuckCheck();
    }

    render(){
        return (
            <div>
                <li className="list-group-item">
                    <input  type="checkbox"
                            onClick={this.props.fuckCheck}
                            checked={this.props.check} />
                    <span style={{
                        color:(this.props.check?'#B22222':'#000000')
                    }}>
                        {this.props.children}
                    </span>

                    <button style={{
                                position:'absolute',
                                right:'8px'
                            }}
                            onClick={this.props.del}>
                            Delete
                    </button>
                </li>
            </div>)

    }
    componentWillUnmount()
    {
        console.log(this.props.lo);
    }

}
export default App;
