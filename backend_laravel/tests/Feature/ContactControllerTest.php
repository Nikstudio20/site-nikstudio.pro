<?php

namespace Tests\Feature;

use App\Mail\ContactInquiryMail;
use App\Mail\ProjectInquiryMail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Mail::fake();
        Log::spy();
    }

    public function test_send_contact_email_with_valid_data()
    {
        $contactData = [
            'name' => 'Иван Петров',
            'email' => 'ivan@example.com',
            'company' => 'ООО "Тест"',
            'message' => 'Это тестовое сообщение для проверки отправки email',
            'source' => 'contact'
        ];

        $response = $this->postJson('/api/contact/send', $contactData);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.'
                ]);

        Mail::assertSent(ContactInquiryMail::class, function ($mail) use ($contactData) {
            return $mail->contactData['name'] === $contactData['name'] &&
                   $mail->contactData['email'] === $contactData['email'] &&
                   $mail->contactData['message'] === $contactData['message'];
        });

        Log::shouldHaveReceived('info')
            ->with('Contact form submission', \Mockery::type('array'))
            ->once();

        Log::shouldHaveReceived('info')
            ->with('Contact email sent successfully', \Mockery::type('array'))
            ->once();
    }

    public function test_send_contact_email_without_company()
    {
        $contactData = [
            'name' => 'Иван Петров',
            'email' => 'ivan@example.com',
            'message' => 'Это тестовое сообщение без указания компании',
            'source' => 'contact'
        ];

        $response = $this->postJson('/api/contact/send', $contactData);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true
                ]);

        Mail::assertSent(ContactInquiryMail::class);
    }

    public function test_send_contact_email_validation_errors()
    {
        $invalidData = [
            'name' => 'А', // Too short
            'email' => 'invalid-email', // Invalid format
            'message' => 'Короткое', // Too short
            'source' => 'invalid' // Invalid source
        ];

        $response = $this->postJson('/api/contact/send', $invalidData);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['name', 'email', 'message', 'source']);

        Mail::assertNotSent(ContactInquiryMail::class);
    }

    public function test_send_project_inquiry_with_valid_data()
    {
        $contactData = [
            'name' => 'Мария Иванова',
            'email' => 'maria@example.com',
            'company' => 'ИП Иванова',
            'message' => 'Интересует разработка похожего проекта',
            'source' => 'project',
            'project_title' => 'Веб-приложение для управления задачами'
        ];

        $response = $this->postJson('/api/contact/project', $contactData);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Ваш запрос по проекту "Веб-приложение для управления задачами" успешно отправлен. Мы свяжемся с вами в ближайшее время.'
                ]);

        Mail::assertSent(ProjectInquiryMail::class, function ($mail) use ($contactData) {
            return $mail->contactData['name'] === $contactData['name'] &&
                   $mail->contactData['email'] === $contactData['email'] &&
                   $mail->projectTitle === $contactData['project_title'];
        });

        Log::shouldHaveReceived('info')
            ->with('Project inquiry submission', \Mockery::type('array'))
            ->once();

        Log::shouldHaveReceived('info')
            ->with('Project inquiry email sent successfully', \Mockery::type('array'))
            ->once();
    }

    public function test_send_project_inquiry_without_project_title()
    {
        $contactData = [
            'name' => 'Петр Сидоров',
            'email' => 'petr@example.com',
            'message' => 'Интересует сотрудничество по проекту',
            'source' => 'project'
        ];

        $response = $this->postJson('/api/contact/project', $contactData);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Ваш запрос по проекту успешно отправлен. Мы свяжемся с вами в ближайшее время.'
                ]);

        Mail::assertSent(ProjectInquiryMail::class, function ($mail) {
            return $mail->projectTitle === null;
        });
    }

    public function test_send_project_inquiry_forces_source_to_project()
    {
        $contactData = [
            'name' => 'Анна Козлова',
            'email' => 'anna@example.com',
            'message' => 'Тестовое сообщение',
            'source' => 'contact', // Will be overridden to 'project'
            'project_title' => 'Тестовый проект'
        ];

        $response = $this->postJson('/api/contact/project', $contactData);

        $response->assertStatus(200);

        Mail::assertSent(ProjectInquiryMail::class, function ($mail) {
            return $mail->contactData['source'] === 'project';
        });
    }

    public function test_send_contact_email_handles_mail_exception()
    {
        Mail::shouldReceive('send')->andThrow(new \Exception('SMTP connection failed'));

        $contactData = [
            'name' => 'Тест Пользователь',
            'email' => 'test@example.com',
            'message' => 'Тестовое сообщение',
            'source' => 'contact'
        ];

        $response = $this->postJson('/api/contact/send', $contactData);

        $response->assertStatus(500)
                ->assertJson([
                    'success' => false,
                    'message' => 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.'
                ]);

        Log::shouldHaveReceived('error')
            ->with('Failed to send contact email', \Mockery::type('array'))
            ->once();
    }

    public function test_send_project_inquiry_handles_mail_exception()
    {
        Mail::shouldReceive('send')->andThrow(new \Exception('Mail server unavailable'));

        $contactData = [
            'name' => 'Тест Пользователь',
            'email' => 'test@example.com',
            'message' => 'Тестовое сообщение',
            'source' => 'project'
        ];

        $response = $this->postJson('/api/contact/project', $contactData);

        $response->assertStatus(500)
                ->assertJson([
                    'success' => false,
                    'message' => 'Произошла ошибка при отправке запроса по проекту. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.'
                ]);

        Log::shouldHaveReceived('error')
            ->with('Failed to send project inquiry email', \Mockery::type('array'))
            ->once();
    }

    public function test_send_contact_email_handles_general_exception()
    {
        Mail::shouldReceive('send')->andThrow(new \Exception('General system error'));

        $contactData = [
            'name' => 'Тест Пользователь',
            'email' => 'test@example.com',
            'message' => 'Тестовое сообщение',
            'source' => 'contact'
        ];

        $response = $this->postJson('/api/contact/send', $contactData);

        $response->assertStatus(500)
                ->assertJson([
                    'success' => false,
                    'message' => 'Произошла техническая ошибка. Пожалуйста, попробуйте позже.'
                ]);
    }

    public function test_required_fields_validation()
    {
        $response = $this->postJson('/api/contact/send', []);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['name', 'email', 'message', 'source']);
    }

    public function test_email_format_validation()
    {
        $contactData = [
            'name' => 'Тест',
            'email' => 'not-an-email',
            'message' => 'Тестовое сообщение для проверки',
            'source' => 'contact'
        ];

        $response = $this->postJson('/api/contact/send', $contactData);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['email']);
    }

    public function test_message_length_validation()
    {
        $contactData = [
            'name' => 'Тест',
            'email' => 'test@example.com',
            'message' => 'Короткое', // Less than 10 characters
            'source' => 'contact'
        ];

        $response = $this->postJson('/api/contact/send', $contactData);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['message']);
    }
}