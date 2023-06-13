import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ChatEngine, getOrCreateChat } from'react-chat-engine'
import { selectUserAuth } from '../../redux/features/userAuthSlice'
import { Button } from 'primereact/button';
import axios from 'axios';

const ChatsUser = (props) => {
    let token  =useSelector(selectUserAuth)

    
	const [username, setUsername] = useState('')
    console.log("cred",token.token.data.firstName)
    
	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}

	function renderChatForm(creds) {
		return (
			<div>
				
				<Button style={{marginTop:"1%",marginLeft:"2%",marginBottom:"3%"}} label="Start Chat" severity="info" onClick={() => (createDirectChat(creds), setUsername("AntisurgeCustomerSupport"))}>
			
				</Button>
			</div>
		)
	}

	return (
		<ChatEngine
			height='100vh'
			userName={`${token.token.data.firstName}`}
			userSecret={`${token.token.data.firstName}`}
			projectID='733476cf-5f4a-49d6-bd0c-d2b34f80ecb8'
			renderNewChatForm={(creds) => renderChatForm(creds)}
		/>
	)
}

export default ChatsUser;