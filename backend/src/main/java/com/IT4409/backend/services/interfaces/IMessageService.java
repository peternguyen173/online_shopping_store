package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.dtos.MessageDTO.MessageResponseDTO;
import com.IT4409.backend.entities.Message;
import com.IT4409.backend.entities.User;

import java.util.List;

public interface IMessageService {
    MessageResponseDTO saveMessage(Message message);

    List<MessageResponseDTO> getConversation(String jwt, Long receiverId) throws Exception;

    List<MessageResponseDTO> getAllMessageOfUser(String jwt) throws Exception;

    List<User> getContactList(String jwt) throws Exception;
}
