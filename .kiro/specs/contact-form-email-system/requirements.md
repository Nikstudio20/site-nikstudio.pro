# Requirements Document

## Introduction

This feature implements a complete email system for the NIK Studio website contact forms. The system will enable automatic email sending from the "Обсудим ваш проект?" form on project detail pages and the "ХОТИТЕ СОТРУДНИЧАТЬ?" form on the contact page. Emails will be sent from hello@nikstudio.pro to info@nikstudio.pro using the provided SMTP credentials, ensuring reliable communication between the website and the studio.

## Requirements

### Requirement 1

**User Story:** As a potential client, I want to submit the "Обсудим ваш проект?" form on project pages, so that NIK Studio receives my inquiry about their project and can contact me back.

#### Acceptance Criteria

1. WHEN a user fills out the project inquiry form with valid data (name, email, company, message) THEN the system SHALL send an email from hello@nikstudio.pro to info@nikstudio.pro
2. WHEN the email is successfully sent THEN the system SHALL display a success message "Сообщение успешно отправлено!" for exactly 3 seconds
3. WHEN the email fails to send THEN the system SHALL display an error message "Произошла ошибка при отправке сообщения" for exactly 3 seconds
4. WHEN the form is being submitted THEN the submit button SHALL be disabled and show "Отправка..." text
5. WHEN the email is successfully sent THEN the form fields SHALL be cleared automatically

### Requirement 2

**User Story:** As a potential client, I want to submit the "ХОТИТЕ СОТРУДНИЧАТЬ?" form on the contact page, so that NIK Studio receives my collaboration inquiry and can respond to discuss partnership opportunities.

#### Acceptance Criteria

1. WHEN a user fills out the collaboration form with valid data (name, email, company, message) THEN the system SHALL send an email from hello@nikstudio.pro to info@nikstudio.pro
2. WHEN the email is successfully sent THEN the system SHALL display a success message "Сообщение успешно отправлено!" for exactly 3 seconds
3. WHEN the email fails to send THEN the system SHALL display an error message "Произошла ошибка при отправке сообщения" for exactly 3 seconds
4. WHEN the form is being submitted THEN the submit button SHALL be disabled and show "Отправка..." text
5. WHEN the email is successfully sent THEN the form fields SHALL be cleared automatically

### Requirement 3

**User Story:** As NIK Studio, I want to receive properly formatted emails from both contact forms, so that I can easily identify the source of the inquiry and respond appropriately to potential clients.

#### Acceptance Criteria

1. WHEN an email is sent from the project inquiry form THEN the email subject SHALL be "Новый запрос по проекту - [Project Title]"
2. WHEN an email is sent from the collaboration form THEN the email subject SHALL be "Новый запрос на сотрудничество"
3. WHEN any contact form email is sent THEN the email body SHALL include all form fields (name, email, company, message) in a readable format
4. WHEN any contact form email is sent THEN the email SHALL include the source form identification (project inquiry or collaboration)
5. WHEN any contact form email is sent THEN the email SHALL include the timestamp of submission

### Requirement 4

**User Story:** As a system administrator, I want the email system to use the provided SMTP credentials securely, so that emails are sent reliably through the nikstudio.pro domain.

#### Acceptance Criteria

1. WHEN the system sends emails THEN it SHALL use hello@nikstudio.pro as the sender address
2. WHEN the system sends emails THEN it SHALL deliver to info@nikstudio.pro as the recipient
3. WHEN the system connects to SMTP THEN it SHALL use smtp.nikstudio.pro as the SMTP server
4. WHEN the system authenticates THEN it SHALL use the provided credentials (hello@nikstudio.pro / mGKjSqDClU)
5. WHEN SMTP connection fails THEN the system SHALL log the error and return appropriate user feedback

### Requirement 5

**User Story:** As a user, I want the contact forms to validate my input properly, so that I don't submit incomplete or invalid information.

#### Acceptance Criteria

1. WHEN a user submits a form with missing required fields THEN the system SHALL display field-specific validation errors
2. WHEN a user enters an invalid email format THEN the system SHALL display "Введите корректный email адрес"
3. WHEN a user enters a name shorter than 2 characters THEN the system SHALL display "Имя должно содержать минимум 2 символа"
4. WHEN a user enters a message shorter than 10 characters THEN the system SHALL display "Сообщение должно содержать минимум 10 символов"
5. WHEN validation fails THEN the form SHALL NOT be submitted and no email SHALL be sent

### Requirement 6

**User Story:** As a developer, I want the email system to handle errors gracefully, so that users receive appropriate feedback and the system remains stable.

#### Acceptance Criteria

1. WHEN SMTP authentication fails THEN the system SHALL log the error and display "Ошибка подключения к почтовому серверу"
2. WHEN network connection fails THEN the system SHALL display "Проверьте подключение к интернету и попробуйте снова"
3. WHEN the email service is temporarily unavailable THEN the system SHALL display "Сервис временно недоступен, попробуйте позже"
4. WHEN any email error occurs THEN the system SHALL log detailed error information for debugging
5. WHEN an error occurs THEN the form SHALL remain filled with user data for retry