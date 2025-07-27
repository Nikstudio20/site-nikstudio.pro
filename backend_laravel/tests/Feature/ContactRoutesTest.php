<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactRoutesTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Mail::fake();
    }

    public function test_contact_send_route_exists()
    {
        $response = $this->postJson('/api/contact/send', [
            'name' => 'Тест',
            'email' => 'test@example.com',
            'message' => 'Тестовое сообщение для проверки маршрута',
            'source' => 'contact'
        ]);

        // Route should exist and not return 404
        $this->assertNotEquals(404, $response->getStatusCode());
    }

    public function test_contact_project_route_exists()
    {
        $response = $this->postJson('/api/contact/project', [
            'name' => 'Тест',
            'email' => 'test@example.com',
            'message' => 'Тестовое сообщение для проверки маршрута проекта',
            'source' => 'project'
        ]);

        // Route should exist and not return 404
        $this->assertNotEquals(404, $response->getStatusCode());
    }

    public function test_contact_routes_have_throttle_middleware()
    {
        $validData = [
            'name' => 'Тест Пользователь',
            'email' => 'test@example.com',
            'message' => 'Тестовое сообщение для проверки rate limiting',
            'source' => 'contact'
        ];

        // Make multiple requests to test rate limiting
        for ($i = 0; $i < 12; $i++) {
            $response = $this->postJson('/api/contact/send', $validData);
            
            if ($i < 10) {
                // First 10 requests should succeed or have validation errors
                $this->assertNotEquals(429, $response->getStatusCode(), "Request $i should not be rate limited");
            } else {
                // 11th and 12th requests should be rate limited
                $this->assertEquals(429, $response->getStatusCode(), "Request $i should be rate limited");
            }
        }
    }

    public function test_contact_routes_require_post_method()
    {
        $response = $this->getJson('/api/contact/send');
        $this->assertEquals(405, $response->getStatusCode()); // Method Not Allowed

        $response = $this->getJson('/api/contact/project');
        $this->assertEquals(405, $response->getStatusCode()); // Method Not Allowed
    }

    public function test_contact_routes_return_json_responses()
    {
        $validData = [
            'name' => 'Тест',
            'email' => 'test@example.com',
            'message' => 'Тестовое сообщение',
            'source' => 'contact'
        ];

        $response = $this->postJson('/api/contact/send', $validData);
        $this->assertJson($response->getContent());

        $response = $this->postJson('/api/contact/project', $validData);
        $this->assertJson($response->getContent());
    }

    public function test_contact_routes_handle_validation_errors()
    {
        $invalidData = [];

        $response = $this->postJson('/api/contact/send', $invalidData);
        $this->assertEquals(422, $response->getStatusCode());
        $this->assertJson($response->getContent());

        $response = $this->postJson('/api/contact/project', $invalidData);
        $this->assertEquals(422, $response->getStatusCode());
        $this->assertJson($response->getContent());
    }

    public function test_named_routes_work_correctly()
    {
        $this->assertTrue(route('contact.send') !== null);
        $this->assertTrue(route('contact.project') !== null);
        
        $this->assertStringContains('/api/contact/send', route('contact.send'));
        $this->assertStringContains('/api/contact/project', route('contact.project'));
    }
}