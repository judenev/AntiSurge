import { useState } from "react";

import "./ChatMain.css";


import ChatsPage from "./ChatsPage";
import DirectChatPage from "./DirectChatPage";
import AuthPage from "./AuthPage";

function ChatMain() {
  const [user, setUser] = useState(undefined);
  console.log({user})

  if (!user) {
    return <AuthPage onAuth={(user) => setUser(user)} />;
  } else {
    return <DirectChatPage/>
  }
}

export default ChatMain;