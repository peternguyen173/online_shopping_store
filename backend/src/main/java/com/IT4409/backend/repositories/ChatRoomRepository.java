package com.IT4409.backend.repositories;

import com.IT4409.backend.entities.ChatRoom;
import com.IT4409.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findBySenderIdAndReceiverId(Long userId, Long receiverId);

    @Query("SELECT DISTINCT u " +
            "FROM User u " +
            "JOIN Message m ON u.userId = m.senderId OR u.userId = m.receiverId")
    List<User> findBySenderIdOrReceiverId(Long userId);
}
