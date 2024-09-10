package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.entities.EmailDetails;
import jakarta.mail.MessagingException;
import org.thymeleaf.context.Context;

public interface IEmailService {
    void sendSimpleMail(EmailDetails details);
    void sendMailWithAttachment(EmailDetails details) throws MessagingException;
    void sendEmailWithHtmlTemplate(String recipient, String subject, String templateName, Context context) throws MessagingException;
}
