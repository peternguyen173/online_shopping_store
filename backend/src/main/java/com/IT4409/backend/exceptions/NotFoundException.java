package com.IT4409.backend.exceptions;

public class NotFoundException extends BaseException {
    @Override
    public int getStatusCode() {
        return 404;
    }

    public NotFoundException(String message)
    {
        super(message);
    }
}

