package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.dtos.ColorDTO.ColorRequestDTO;
import com.IT4409.backend.entities.Color;
import com.IT4409.backend.entities.ColorImage;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IColorService {
    List<Color> getProductColors(Long productId) throws Exception;

    Color addImageToColor(Long productId, Long colorId, List<MultipartFile> images) throws Exception;

    Color updateColor(Long productId, Long colorId, ColorRequestDTO dto) throws Exception;

    Color deleteColor(Long productId, Long colorId) throws Exception;

    List<ColorImage> deleteImages(Long productId, Long colorId, List<Long> imageIdList) throws Exception;
}
