import React, {useState, useEffect} from "react";
import {Container} from 'react-bootstrap';


function Message({ isMe, nickname, message, type }) {
    var tmp = 'left';
    if (isMe) tmp = 'right';

    if (type == 'link')
    {
      if (message.indexOf('image') != -1)
        return (<Container className = "p-2" style = {{backgroundColor: '#f2f0f1', textAlign: tmp}}>
        <label>{nickname}</label><br/>
        <img src = {message} width = '80px' height = '80px' alt ='No'/>
        </Container>)
      else
        return (<Container className = "p-2" style = {{backgroundColor: '#f2f0f1', textAlign: tmp}}>
        <label>{nickname}</label><br/>
        <div className = "bg-white p-2 rounded w-50" style = {{display: 'inline-block'}}>
            {type == 'text' ? message : React.createElement('a', {href: message}, 'Link')}
        </div>
      </Container>)
    }
    


    return (<Container className = "p-2" style = {{backgroundColor: '#f2f0f1', textAlign: tmp}}>
    <label>{nickname}</label><br/>
    <div className = "bg-white p-2 rounded w-50" style = {{display: 'inline-block'}}>
        {message}
    </div>
  </Container>
  )
}


export default Message;