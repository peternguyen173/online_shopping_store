import { CompatClient, Stomp } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SockJS from 'sockjs-client';
import { addMessage, getContacted } from '~/redux/Message/Action';

export const useSocket = (user) => {
    const url = 'http://localhost:8080/ws';
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [sendMessage, setSendMessage] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const tmpStompCLient = Stomp.over(() => new SockJS(url));
        setStompClient(tmpStompCLient);
        console.log('connecting...');
        return () => {
            stompClient?.unsubscribe(`/user/${user}/queue/messages`);
            tmpStompCLient.disconnect(() => {
                console.log('Disconnect ...');
            });
            setStompClient(null);
        };
    }, [user]);

    const onMessageReceive = (payload) => {
        try {
            const messageReceived = JSON.parse(payload.body);
            console.log(messageReceived);
            dispatch(addMessage(messageReceived));
            dispatch(getContacted());
        } catch (error) {
            console.log('error');
            console.error(error);
        }
    };
    const onConnected = () => {
        if (stompClient) {
            stompClient.subscribe(`/user/${user}/queue/messages`, onMessageReceive);
            console.log('connected');
            setIsConnected(true);
        }
    };
    const onError = () => {
        console.log('Connecting Error');
    };
    useEffect(() => {
        if (stompClient) {
            stompClient?.connect({}, onConnected, onError);
        }
    }, [stompClient]);

    useEffect(() => {
        if (isConnected && stompClient) {
            const onSendMessage = (message) => {
                stompClient.send('/app/send-message', {}, JSON.stringify(message));
                console.log(JSON.stringify(message));
                dispatch(addMessage(message));
            };
            setSendMessage((prev) => onSendMessage);
        } else {
            setSendMessage(null);
        }
    }, [isConnected]);
    return sendMessage;
};
