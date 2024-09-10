package com.IT4409.backend.controllers;

import com.IT4409.backend.entities.EmailDetails;
import com.IT4409.backend.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.context.Context;

@RestController
public class EmailController {
    @Autowired
    private EmailService emailService;

    @PostMapping("/send-mail")
    public ResponseEntity<?> sendMail(@RequestBody EmailDetails details) {
        try{
            emailService.sendSimpleMail(details);
            return new ResponseEntity<>("Email sent successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Sending email with attachment
    @PostMapping("/send-mail-with-attachment")
    public ResponseEntity<?> sendMailWithAttachment(@RequestBody EmailDetails details) {
        try{
            emailService.sendMailWithAttachment(details);
            return new ResponseEntity<>("Email sent successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Sending email with HTML template
    @PostMapping("/send-html-email")
    public ResponseEntity<?> sendHtmlEmail(@RequestBody EmailDetails emailDetails) {
        try{
            Context context = new Context();
            context.setVariable("message", emailDetails.getMsgBody());
            emailService.sendEmailWithHtmlTemplate(emailDetails.getRecipient(), emailDetails.getSubject(), "email-template", context);
            return new ResponseEntity<>("Email sent successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/email-confirm")
    public ResponseEntity<?> sendHtmlConfirmEmail(@RequestBody EmailDetails emailDetails) {
        try{
            Context context = new Context();
            context.setVariable("message", emailDetails.getMsgBody());
            emailService.sendEmailWithHtmlTemplate(emailDetails.getRecipient(), emailDetails.getSubject(), "email-confirmation", context);
            return new ResponseEntity<>("Email sent successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
