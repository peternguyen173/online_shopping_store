package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.dtos.DiscountDTO.DiscountRequestDTO;
import com.IT4409.backend.entities.Cart;
import com.IT4409.backend.entities.Discount;
import com.IT4409.backend.exceptions.BadRequestException;
import com.IT4409.backend.exceptions.NotFoundException;

import java.text.ParseException;
import java.util.List;

public interface IDiscountService {
    List<Discount> getAllDiscount() throws NotFoundException;

    Discount getById(Long discountId) throws NotFoundException;

    Discount addDiscount(DiscountRequestDTO discountRequestDTO) throws BadRequestException, ParseException;

    Discount updateDiscount(Long discountId, DiscountRequestDTO discountRequestDTO) throws BadRequestException, NotFoundException, ParseException;

    Discount deleteDiscount(Long discountId) throws NotFoundException;

    Cart applyDiscount(String jwt, String discountCode) throws Exception;

    Cart deleteDiscountFromCart(String jwt) throws Exception;
}
