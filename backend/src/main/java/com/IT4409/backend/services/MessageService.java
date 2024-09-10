package com.IT4409.backend.services;

import com.IT4409.backend.dtos.MessageDTO.MessageResponseDTO;
import com.IT4409.backend.entities.ChatRoom;
import com.IT4409.backend.entities.Message;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.ChatRoomRepository;
import com.IT4409.backend.repositories.MessageRepository;
import com.IT4409.backend.services.interfaces.IMessageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.IT4409.backend.Utils.Constants.messages;

public class MessageService implements IMessageService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ChatRoomRepository chatRoomRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public MessageResponseDTO saveMessage(Message message) {
        Optional<ChatRoom> chatRoomOptional = chatRoomRepository.findBySenderIdAndReceiverId(message.getSenderId(), message.getReceiverId());
        if(chatRoomOptional.isEmpty()){
            String newConversationID = UUID.randomUUID().toString();
            ChatRoom chatRoom1 = ChatRoom
                    .builder()
                    .conversationId(newConversationID)
                    .senderId(message.getSenderId())
                    .receiverId(message.getReceiverId())
                    .build();
            chatRoomRepository.save(chatRoom1);
            message.setConversationId(newConversationID);
            ChatRoom chatRoom2 = ChatRoom
                    .builder()
                    .conversationId(newConversationID)
                    .senderId(message.getReceiverId())
                    .receiverId(message.getSenderId())
                    .build();
            chatRoomRepository.save(chatRoom2);
        } else {
            message.setConversationId(chatRoomOptional.get().getConversationId());
        }
        message.setTime(new Date());
        message = messageRepository.save(message);
        return modelMapper.map(message, MessageResponseDTO.class);
    }

    @Override
    public List<MessageResponseDTO> getConversation(String jwt, Long receiverId) throws Exception {
        User user= userService.findUserByJwt(jwt);
        Long userId = user.getUserId();
        ChatRoom chatRoom = chatRoomRepository.findBySenderIdAndReceiverId(userId, receiverId)
                .orElseThrow(() -> new NotFoundException(messages.getString("chat-room.validate.not-found")));
        List<Message> messageList = messageRepository.findByConversationId(chatRoom.getConversationId()).get();
        return messageList
                .stream()
                .map(message -> modelMapper.map(message, MessageResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<MessageResponseDTO> getAllMessageOfUser(String jwt) throws Exception {
        User user= userService.findUserByJwt(jwt);
        Long userId = user.getUserId();
        List<Message> messageList = messageRepository.findBySenderIdOrReceiverIdOrderByTimeAsc(userId, userId)
                .orElseThrow(() -> new NotFoundException(messages.getString("message.validate.not-found")));
        return messageList
                .stream()
                .map(message -> modelMapper.map(message, MessageResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<User> getContactList(String jwt) throws Exception {
        User user= userService.findUserByJwt(jwt);
        Long userId = user.getUserId();
        return chatRoomRepository.findBySenderIdOrReceiverId(userId);
    }
}
