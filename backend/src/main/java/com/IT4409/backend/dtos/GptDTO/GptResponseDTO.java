package com.IT4409.backend.dtos.GptDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GptResponseDTO {
    private List<Choice> choices;
    @Data
    public static class Choice {
        private int index;
        private Message message;
    }
}
