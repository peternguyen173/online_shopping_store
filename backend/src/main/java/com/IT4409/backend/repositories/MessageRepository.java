package com.IT4409.backend.repositories;

import com.IT4409.backend.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, Long> {
    Optional<List<Message>> findByConversationId(String conversationId);

    Optional<List<Message>> findBySenderIdOrReceiverId(Long userId, Long userId1);

    Optional<List<Message>> findBySenderIdOrReceiverIdOrderByTimeAsc(Long userId, Long userId1);
}
