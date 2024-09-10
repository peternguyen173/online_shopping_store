package com.IT4409.backend.dtos.ColorDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ColorRequestDTO {
    String colorName;
    List<MultipartFile> imageList;
}
