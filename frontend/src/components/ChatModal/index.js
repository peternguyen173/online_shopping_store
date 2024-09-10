import { useSocket } from '../../hooks/useSocket';
import { FaTimes } from 'react-icons/fa';
import ChatBox from '../Chat/ChatBox';
import './ChatModal.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { getAdmin } from '~/redux/Auth/Action';
import { useFetchData } from '~/hooks/useFetchData';

const ChatModal = (props) => {
    const { selectedUser, closeChatBox } = props;
    const dispatch = useDispatch();
    const { user, admin } = useSelector((state) => state.auth);

    const currentUser = user;
    const [chosenUser, setChosenUser] = useState(null);

    const isFetched = useFetchData(() => {
        return dispatch(getAdmin());
    });

    useEffect(() => {
        setChosenUser(admin);
        console.log(admin);
        return () => {
            setChosenUser(null);
            console.log(chosenUser);
        };
    }, [admin]); // Thêm selectedUser vào dependency array của useEffect để trigger khi selectedUser thay đổi

    const sendMessage = useSocket(currentUser?.user?.userId); // Kiểm tra currentUser tồn tại trước khi truy cập user.userId

    const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

    // Kiểm tra xem user đã đăng nhập chưa, nếu chưa thì chuyển hướng đến trang đăng nhập
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div>
            {isFetched && (
                <div className="modal-container">
                    <div className="chat-modal">
                        <ChatBox selectedUser={chosenUser} sendMessage={sendMessage} />
                        <FaTimes className="modal-close" onClick={closeChatBox} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatModal;
