package com.IT4409.backend.dtos.MessageGroupDTO;

import com.IT4409.backend.dtos.MessageDTO.MessageRequestDTO;
import lombok.Data;

@Data
public class MessageGroupRequestDTO extends MessageRequestDTO {
    private long groupId;
}
