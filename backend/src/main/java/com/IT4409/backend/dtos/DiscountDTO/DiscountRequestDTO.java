package com.IT4409.backend.dtos.DiscountDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiscountRequestDTO {
    private String discountCode;
    private Double discountValue;
    private Integer minCondition;
    private Integer maxPossibleValue;
    private Short status;
    private String endDate;
}
