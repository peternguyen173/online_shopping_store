import { useSelector } from 'react-redux';
import { useSocket } from '../../hooks/useSocket';
import './Chat.scss';
import { useState } from 'react';
import UserList from './UserList';
import ChatBox from './ChatBox';

const Chat = () => {
    const { user } = useSelector((state) => state.auth);
    const sendMessage = useSocket(user?.user?.userId);
    const [selectedUser, setSelectedUser] = useState(null);
    return (
        <div className="chat">
            <UserList selectUser={setSelectedUser} />
            <div className="seperator-column"></div>
            <ChatBox selectedUser={selectedUser} sendMessage={sendMessage} />
        </div>
    );
};

export default Chat;
