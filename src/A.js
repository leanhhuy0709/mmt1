
import Peer from 'peerjs';
import React, {useEffect, useState} from 'react';
import {Container, Button, InputGroup, Form, Row, Col} from 'react-bootstrap';
import Message from './Message';
import { useNavigate } from "react-router-dom";

import {
	initiateSocket
   } from "./client";

function A() {
	const [myPeer, setMyPeer] = useState(null);
	const [otherPeerId, setOtherPeerId] = useState('Admin');
	const [messages, setMessages] = useState([{'otheruser': 'Admin', 'message': [{'username': 'Admin', 'message': 'Hello world!', 'type': 'text'}]}]);
	//messages = {'otheruser': 'Admin', 'message': [{'username': 'Admin', 'message': 'Hello world!', 'type': 'text'}]}
	const [users, setUsers] = useState([]);
	let navigate = useNavigate();
	
	//{'username': 'ttt', 'message': 'hello boizz'}
	useEffect(()=>{
		const peer = new Peer(localStorage.getItem('usr'), {
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
				if (data.type == 'link')
				{
					console.log(data.message);
					messages[messages.findIndex((item) => item.otheruser == conn.peer)].message.push({'username': conn.peer, 'message': data.message, 'type': 'link'});
					setMessages([...messages]);
				}
				else {
					messages[messages.findIndex((item) => item.otheruser == conn.peer)].message.push({'username': conn.peer, 'message': data.message, 'type': 'text'});
					setMessages([...messages]);
				}
			});
		});
		initiateSocket(localStorage.getItem('usr'));
	}, []);
	useEffect(() => {
		fetch("http://localhost:8080/users")
			.then((res) => res.json())
			.then((a) => setUsers(a));
		
		//Search in user
		for (let i = 0; i < users.length; i++)
		{
			let tmp = messages.findIndex((item) => item.otheruser == users[i].username);
			if (tmp == -1)
			{
				messages.push({'otheruser': users[i].username, 'message': []});
			}
		}
		});

	const test = (message) =>
	{
		var temp2 = document.getElementById('file_input').value;
		if (temp2 != '')
		{
			let tmp = messages.findIndex((item) => item.otheruser == otherPeerId);
			if (tmp == -1)
			{
				messages.push({'otheruser': otherPeerId, 'message': []});
			}
			
			var reader = new FileReader();
			reader.readAsDataURL(document.querySelector('#file_input').files[0]); 
			reader.onloadend = function() {
				var base64data = reader.result;            
				messages[tmp].message.push({'username': myPeer.id, 'message': base64data, 'type': 'link'});
				const conn = myPeer.connect(otherPeerId);
				conn.on('open', function() {	
	  			// Send messages
	  			//conn.send(document.querySelector('#file_input').files[0]);
	  				conn.send({'type': 'link', 'message': base64data});
	  			});
			}
			
			setMessages([...messages]);
			document.getElementById('file_input').value = '';
			
			return;
		}


		//
		let tmp = messages.findIndex((item) => item.otheruser == otherPeerId);
		if (tmp == -1)
		{
			messages.push({'otheruser': otherPeerId, 'message': []});
		}
		messages[tmp].message.push({'username': myPeer.id, 'message': message, 'type': 'text'});
		setMessages([...messages]);
		
		const conn = myPeer.connect(otherPeerId);
		conn.on('open', function() {	
	  		// Send messages
	  		conn.send({'type': 'text', 'message': message});
	  	});

	}
	const handleLogout = () => {
		localStorage.clear();
		navigate('/login');
	};
	const searchOther = () => {
		let tmp = messages.findIndex((item) => item.otheruser == otherPeerId);
		if (tmp == -1)
		{
			messages.push({'otheruser': otherPeerId, 'message': []});
		}
		return tmp;
	}
return (
	<div>
		<Row className="m-0 p-0"> 
			<Col xs lg = '3' className = 'p-0'>
				<Container className = 'bg-primary p-0 m-0'>
				<h1 className="text-center text-white">USER LIST</h1>
				{users.map((item, idx) => (
				<Button key = {idx} className = 'w-100 rounded-0' onClick = {() => {setOtherPeerId(item.username)}}>
					{item.username} {item.isLogin ? 'Online' : 'Offline'}
				</Button>
				))
				}
				</Container>
			</Col>
			<Col xs lg = '6' className = 'p-0'>
			<Container><h1>{otherPeerId}</h1></Container>
			{
			messages[searchOther()].message.map((ele, idx) => {
				return (
					<Message
						key = {idx}
						isMe = {localStorage.getItem('usr') === ele.username}
						nickname = {ele.username}
						message = {ele.message}
						type = {ele.type}
					/>
				);
			})}
			<Container style = {{height: '50px'}}></Container>
			<InputGroup className = "fixed-bottom">
			<input id = 'file_input' type = 'file' onChange = {() => {
				//var temp = URL.createObjectURL(document.querySelector('#file_input').files[0]);
				//console.log(temp);

			}}/>

				<Form.Control
					id = 'input'
					placeholder="Chat something"
				/>
				<Button variant="outline-secondary" onClick = {() => {test(document.getElementById('input').value);document.getElementById('input').value = ''}} type = 'button'>Send</Button>
			</InputGroup>
			</Col>
			<Col xs lg = '3' className = 'p-0'>
				<Container className = 'p-0 m-0'>
					<h1 className="text-center">TOOL</h1>
					<h2 className="text-center">Username: {localStorage.getItem('usr')}</h2>
					<Button className = 'w-100 rounded-0 mt-sm-2 border-1 border-dark' onClick = {handleLogout}>
					Logout
					</Button>
				</Container>
			</Col> 
		</Row> 
		

	</div>
);
}

export default A;
