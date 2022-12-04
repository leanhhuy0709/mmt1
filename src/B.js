
import Peer from 'peerjs';
import React, {useEffect, useState} from 'react';

function B() {
	const [myPeer, setMyPeer] = useState(null);
	const [otherPeerId, setOtherPeerId] = useState('iama');
	const [messages, setMessages] = useState([{'username': 'Admin', 'message': 'Hello world!'}]);
	//{'username': 'ttt', 'message': 'hello boizz'}
	useEffect(()=>{
		const peer = new Peer('iamb', {
		host: 'localhost',
		port: 9000,
		path: '/myapp'
		});
		peer.on('open', function(id) {
			console.log('My peer ID is: ' + id);
			setMyPeer(peer);
		});
		peer.on('connection', function(conn) { 
			conn.on('data', function(data) {
				console.log(conn.peer + ':' + data);
				messages.push({'username': conn.peer, 'message': data});
				setMessages([...messages]);
			});
		});
	}, []);

	const test = (message) =>
	{
		messages.push({'username': myPeer.id, 'message': message});
		setMessages([...messages]);
		const conn = myPeer.connect(otherPeerId);
		conn.on('open', function() {	
	  		// Send messages
	  		conn.send(message);
	  	});
	}

return (
	<div>
		<h1>I am B</h1>
		<input id = 'ip'/>
		<br/>
		<button onClick = {() => {test(document.getElementById('ip').value)}}>Click me</button>
		{React.createElement('div', null, messages.map((ele, idx) => {
			return (
				<p key = {idx}>{ele.username + ': ' + ele.message}</p>
			);
		}))}
	</div>
);
}

export default B;
