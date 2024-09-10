import './ChatBox.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoSend } from 'react-icons/io5';
import { useFetchData } from '~/hooks/useFetchData';
import { getMessages } from '~/redux/Message/Action';

const ChatBox = (props) => {
    const { selectedUser, sendMessage } = props;
    console.log(selectedUser);
    const { user } = useSelector((state) => state.auth);
    const currentUser = user;
    const token = localStorage.jwt;
    const dispatch = useDispatch();
    const messages = useSelector((state) => {
        return state.message.messages;
    });
    const isFetched = useFetchData(() => {
        return Promise.all([dispatch(getMessages(token))]);
    });
    console.log(messages, isFetched);
    const [content, setContent] = useState('');
    const handledChange = (e) => {
        setContent(e.target.value);
    };
    const handledSubmit = (e) => {
        e.preventDefault();
        if (content !== '') {
            const message = {
                messageId: uuidv4(),
                senderId: currentUser.user.userId,
                receiverId: selectedUser?.userId,
                time: new Date(),
                content: content,
            };
            sendMessage(message);
            setContent((prev) => '');
            // e.currentTarget.reset();
        }
    };
    const scrollableContainerRef = useRef(null);
    useEffect(() => {
        // console.log("SCROLLABLE");
        // console.log(selectedUser);
        // console.log(scrollableContainerRef.current);
        if (selectedUser && scrollableContainerRef.current) {
            // console.log("begin to scroll");
            const scrollableContainer = scrollableContainerRef.current;
            scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
        }
    }, [selectedUser, messages]);
    const renderMessages = () => {
        console.log(messages);
        return (
            <ul>
                {messages
                    ?.filter(
                        (message) =>
                            message.senderId === selectedUser?.userId || message.receiverId === selectedUser?.userId,
                    )
                    .map((message) => {
                        let classes;
                        if (message.senderId === currentUser?.user.userId) {
                            classes = 'sender';
                        } else {
                            classes = 'receiver';
                        }
                        return (
                            <li key={message.messageId} className={classes}>
                                <p>{message.content}</p>
                            </li>
                        );
                    })}
            </ul>
        );
    };
    return (
        <>
            {!selectedUser && <div className="non-selected">Chọn người dùng để hiển thị khung chat</div>}
            {selectedUser && (
                <div className="chat-box">
                    <div className="chat-box-header">
                        <img
                            alt="avatar"
                            src="https://res.cloudinary.com/ddiudyz6q/image/upload/v1705380139/hms/avatars/6yvpkj_d98mou.jpg"
                        />
                        <div className="chat-box-header-detail">
                            <p>{selectedUser.userDetailList[0].name}</p>
                            {/* <p>{selectedUser.id}</p> */}
                        </div>
                    </div>
                    <div className="seperator-row"></div>
                    <div className="chat-box-display">
                        <div className="chat-box-messages" ref={scrollableContainerRef}>
                            {isFetched && renderMessages()}
                        </div>
                        <form className="chat-box-input" onSubmit={handledSubmit}>
                            <input
                                type="text"
                                placeholder="Nhập tin nhắn của bạn..."
                                onChange={handledChange}
                                value={content}
                            />
                            <button className="chat-button">
                                <IoSend className="send-icon" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBox;
