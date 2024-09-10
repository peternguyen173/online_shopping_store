package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.MessageDTO.MessageRequestDTO;
import com.IT4409.backend.dtos.MessageDTO.MessageResponseDTO;
import com.IT4409.backend.entities.Message;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.services.MessageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class MessageController {
    @Autowired
    SimpMessagingTemplate messagingTemplate;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    MessageService messageService;
    @MessageMapping("/send-message")
    public void sendMessage(@Payload MessageRequestDTO messageRequestDTO){
        Message message = modelMapper.map(messageRequestDTO, Message.class);
        MessageResponseDTO messageResponseDTO = messageService.saveMessage(message);
        messagingTemplate.convertAndSendToUser(message.getReceiverId().toString(), "/queue/messages", messageResponseDTO);
    }
    @GetMapping("api/message/history")
    public ResponseEntity<?> getConversation(
            @RequestHeader("Authorization") String jwt,
            @RequestParam("receiverId") Long receiverId) {
        try{
            List<MessageResponseDTO> messageResponseDTOList = messageService.getConversation(jwt, receiverId);
            return ResponseEntity.ok(messageResponseDTOList);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }
    @GetMapping("api/message/get-user-message")
    public ResponseEntity<?> getAllMessagesOfUser(@RequestHeader("Authorization") String jwt){
        try{
            List<MessageResponseDTO> messageList = messageService.getAllMessageOfUser(jwt);
            return ResponseEntity.ok(messageList);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }
    @GetMapping("/api/message/contact-list")
    public ResponseEntity<?> getContactList(@RequestHeader("Authorization") String jwt){
        try{
            List<User> userList = messageService.getContactList(jwt);
            return ResponseEntity.ok(userList);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
