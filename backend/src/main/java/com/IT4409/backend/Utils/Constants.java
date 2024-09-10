package com.IT4409.backend.Utils;

import java.util.ResourceBundle;

public class Constants {
    public static final String COMMON_DATE_FORMAT = "dd/MM/yyyy";
    public static final String COMMON_DATE_TIME_FORMAT = "dd/MM/yyyy HH:mm:ss";
    public static final String LOCALE_VN = "vi_VN";
    public static final String TIMEZONE_VN = "Asia/Ho_Chi_Minh";
    public static final Long shippingFee = 15000L;
    public static final String LOCAL_HOST = "http://localhost:8080";
    public static final String DEPLOYED = "";
    public static final ResourceBundle messages = ResourceBundle.getBundle("messages");
    public static final String qrLink = "https://img.vietqr.io/image/MB-7653145689999-compact2.png?amount={amount}&addInfo={addInfo}&accountName=NGUYEN%20DINH%20TUAN%20DUNG";

    public interface SHIPPING_FEE {
        Long INSIDE_HANOI = 15000L;
        Long OUTSIDE_HANOI = 25000L;
    }
    public interface RATING {
        short ONE = 1;
        short TWO = 2;
        short THREE = 3;
        short FOUR = 4;
        short FIVE = 5;
    }
    public interface PRODUCT_STATUS {
        short IN_STOCK = 1;
        short OUT_OF_STOCK = 0;
    }
    public interface DISCOUNT_STATUS {
        short AVAILABLE = 1;
        short OUT_OF_DATE = 0;
    }
    public interface ENTITY_STATUS {
        short ACTIVE = 1;
        short INACTIVE = 0;
    }
}
