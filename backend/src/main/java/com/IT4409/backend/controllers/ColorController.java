package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.ColorDTO.ColorRequestDTO;
import com.IT4409.backend.entities.Color;
import com.IT4409.backend.entities.ColorImage;
import com.IT4409.backend.services.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@RestController
@Validated
public class ColorController {
    @Autowired
    private ColorService colorService;
    @GetMapping("/admin/products/{productId}/colors")
    public ResponseEntity<?> getProductColors(@PathVariable Long productId) throws Exception{
        try{
            List<Color> colorList = colorService.getProductColors(productId);
            return new ResponseEntity<>(colorList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }
    @RequestMapping(path = "/admin/products/{productId}/colors/{colorId}", method = POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> addImageToColor(@PathVariable("productId") Long productId,
                                             @PathVariable("colorId") Long colorId,
                                             @ModelAttribute List<MultipartFile> images){
        try{
            Color color = colorService.addImageToColor(productId, colorId, images);
            return new ResponseEntity<>(color, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @RequestMapping(path = "/admin/products/{productId}/colors/{colorId}", method = PUT, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updateColor(@PathVariable("productId") Long productId,
                                         @PathVariable("colorId") Long colorId,
                                         @ModelAttribute ColorRequestDTO dto){
        try {
            Color color = colorService.updateColor(productId, colorId, dto);
            return new ResponseEntity<>(color, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping(path = "/admin/products/{productId}/colors/{colorId}")
    public ResponseEntity<?> deleteColor(@PathVariable("productId") Long productId,
                                         @PathVariable("colorId") Long colorId){
        try{
            Color color = colorService.deleteColor(productId, colorId);
            return new ResponseEntity<>(color, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping(path = "/admin/products/{productId}/colors")
    public ResponseEntity<?> deleteColor(@PathVariable("productId") Long productId,
                                         @PathVariable("colorId") Long colorId,
                                         @RequestBody List<Long> imageIdList){
        try{
            List<ColorImage> colorImages = colorService.deleteImages(productId, colorId, imageIdList);
            return new ResponseEntity<>(colorImages, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
