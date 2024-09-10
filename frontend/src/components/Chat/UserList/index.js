import { useDispatch, useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import './UserList.scss';
import { ChangeEvent, ReactNode, useState } from 'react';
import { useFetchData } from '~/hooks/useFetchData';
import { getContacted } from '~/redux/Message/Action';

const UserList = (props) => {
    const { selectUser } = props;
    const { user } = useSelector((state) => state.auth);
    const currentUser = user;
    console.log('curretn:', currentUser);
    const token = localStorage.jwt;
    const dispatch = useDispatch();
    const userList = useSelector((state) => {
        return state.message.contacted;
    });
    // const [filterUserList, setFilterUserList] = useState<Doctor[] | Patient[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const isFetched = useFetchData(() => {
        return Promise.all([dispatch(getContacted(token))]);
    });
    const handleClick = (user) => {
        selectUser(user);
        console.log(user);
        const listItems = document.querySelectorAll('#user-list li');
        listItems.forEach((li) => li.classList.remove('activeMessage'));
        const selectedLi = document.getElementById(`${user.userId}`);
        selectedLi?.classList.add('activeMessage');
    };
    // if (!userList.length()) {
    //     userList.push()
    // }
    console.log(userList);
    const renderUserList = () => {
        if (userList.length === 0) {
            let content;
            content = 'Chưa từng liên hệ';
            return <p className="no-user">{content}</p>;
        }
        return (
            <ul id="user-list">
                {userList
                    .filter((user) => user.userDetailList[0]?.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .filter((user) => user.userId !== currentUser?.user?.userId)
                    .map((user) => {
                        return (
                            <li
                                key={user.userId}
                                id={user.userId}
                                className="chat-list-user-item"
                                onClick={() => handleClick(user)}
                            >
                                <img src="https://res.cloudinary.com/ddiudyz6q/image/upload/v1705380139/hms/avatars/6yvpkj_d98mou.jpg" />
                                <div className="chat-list-item-detail">
                                    <p>{user.userDetailList[0].name}</p>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        );
    };
    return (
        <div className="chat-list">
            <div className="chat-list-search">
                <span>
                    <FaSearch />
                </span>
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
            <div className="chat-list-user">{isFetched && renderUserList()}</div>
        </div>
    );
};

export default UserList;
