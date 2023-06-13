import { Button } from '@mui/material'
import React, { useState } from 'react'

import { ChatEngine, getOrCreateChat } from'react-chat-engine'

const DirectChatPage = () => {
	const [username, setUsername] = useState('')

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
				<input 
					placeholder='Username' 
					value={username} 
					onChange={(e) => setUsername(e.target.value)} 
				/>
				<Button  onClick={() => createDirectChat(creds)}>
					Create
				</Button>
			</div>
		)
	}

	return (
		<ChatEngine
			height='100vh'
			userName='AntisurgeCustomerSupport'
			userSecret='AntisurgeCustomerSupport'
			projectID='733476cf-5f4a-49d6-bd0c-d2b34f80ecb8'
			renderNewChatForm={(creds) => renderChatForm(creds)}
		/>
	)
}

export default DirectChatPage;