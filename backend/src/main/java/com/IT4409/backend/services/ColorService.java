package com.IT4409.backend.services;

import com.IT4409.backend.dtos.ColorDTO.ColorRequestDTO;
import com.IT4409.backend.entities.Color;
import com.IT4409.backend.entities.ColorImage;
import com.IT4409.backend.entities.Product;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.ColorRepository;
import com.IT4409.backend.repositories.ImageRepository;
import com.IT4409.backend.repositories.ProductRepository;
import com.IT4409.backend.services.interfaces.IColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.IT4409.backend.Utils.Constants.messages;

public class ColorService implements IColorService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    @Override
    public List<Color> getProductColors(Long productId) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        return product.getColorList();
    }

    @Override
    public Color addImageToColor(Long productId, Long colorId, List<MultipartFile> images) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        Color color = colorRepository.findById(colorId)
                .orElseThrow(() -> new NotFoundException(messages.getString("color.validate.not-found")));
        List<ColorImage> colorImageList = color.getColorImageList();
        for(MultipartFile image : images){
            ColorImage newColorImage = new ColorImage();
            String url = cloudinaryService.upload(image.getBytes(), image.getOriginalFilename(), "color_images");
            newColorImage.setImageUrl(url);
            newColorImage.setColor(color);
            newColorImage = imageRepository.save(newColorImage);
            colorImageList.add(newColorImage);
        }
        return colorRepository.save(color);
    }

    @Override
    public Color updateColor(Long productId, Long colorId, ColorRequestDTO dto) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        Color color = product.getColorList()
                .stream()
                .filter(color1 -> Objects.equals(color1.getColorId(), colorId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("color.validate.not-found")));
        if(dto.getColorName() != null && !"".equals(dto.getColorName())) {
            color.setColorName(dto.getColorName());
        }
        if(!dto.getImageList().isEmpty()){
            List<ColorImage> colorImageList = new ArrayList<>();
            for(MultipartFile image : dto.getImageList()){
                ColorImage newColorImage = new ColorImage();
                String url = cloudinaryService.upload(image.getBytes(), image.getOriginalFilename(), "color_images");
                newColorImage.setImageUrl(url);
                newColorImage.setColor(color);
                newColorImage = imageRepository.save(newColorImage);
                colorImageList.add(newColorImage);
            }
            color.setColorImageList(colorImageList);
        }
        return colorRepository.save(color);
    }

    @Override
    public Color deleteColor(Long productId, Long colorId) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        Color color = product.getColorList()
                .stream()
                .filter(color1 -> Objects.equals(color1.getColorId(), colorId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("color.validate.not-found"));
        colorRepository.findById(colorId);
        return color;
    }

    @Override
    public List<ColorImage> deleteImages(Long productId, Long colorId, List<Long> imageIdList) throws Exception{
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        Color color = product.getColorList()
                .stream()
                .filter(color1 -> Objects.equals(color1.getColorId(), colorId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("color.validate.not-found"));
        List<ColorImage> result = new ArrayList<>();
        for(Long imageId :imageIdList){
            Optional<ColorImage> imageOptional = imageRepository.findById(imageId);
            if(imageOptional.isPresent()){
                imageRepository.deleteById(imageId);
                result.add(imageOptional.get());
            } else {
                result.add(null);
            }
        }
        return result;
    }
}
