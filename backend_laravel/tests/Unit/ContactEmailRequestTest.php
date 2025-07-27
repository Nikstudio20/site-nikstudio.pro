<?php

namespace Tests\Unit;

use App\Http\Requests\ContactEmailRequest;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class ContactEmailRequestTest extends TestCase
{
    private function makeRequest(array $data = []): ContactEmailRequest
    {
        $request = new ContactEmailRequest();
        $request->merge($data);
        return $request;
    }

    private function validateData(array $data): \Illuminate\Validation\Validator
    {
        $request = $this->makeRequest($data);
        return Validator::make($data, $request->rules(), $request->messages());
    }

    public function test_authorize_returns_true()
    {
        $request = new ContactEmailRequest();
        $this->assertTrue($request->authorize());
    }

    public function test_valid_data_passes_validation()
    {
        $data = [
            'name' => 'Иван Петров',
            'email' => 'ivan@example.com',
            'company' => 'ООО "Тест"',
            'message' => 'Это тестовое сообщение для проверки валидации',
            'source' => 'contact',
            'project_title' => 'Тестовый проект'
        ];

        $validator = $this->validateData($data);
        $this->assertFalse($validator->fails());
    }

    public function test_name_is_required()
    {
        $data = [
            'email' => 'test@example.com',
            'message' => 'Тестовое сообщение',
            'source' => 'contact'
        ];

        $validator = $this->validateData($data);
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('name', $validator->errors()->toArray());
        $this->assertEquals('Поле "Имя" обязательно для заполнения', $validator->errors()->first('name'));
    }

    public function test_name_minimum_length_validation()
    {
        $data = [
            'name' => 'А',
            'email' => 'test@example.com',
            'message' => 'Тестовое сообщение',
            'source' => 'contact'
        ];

        $validator = $this->validateData($data);
        $this->assertTrue($validator->fails());
        $this->assertEquals('Имя должно содержать минимум 2 символа', $validator->errors()->first('name'));
    }

    public function test_name_maximum_length_validation()
    {
        $data = [
            'name' => str_repeat('А', 51),
            'email' => 'test@example.com',
            'message' => 'Тестовое сообщение',
            'source' => 'contact'
        ];

        $validator = $this->validateData($data);
        $this->assertTrue($validator->fails());
        $this->assertEquals('Имя не должно превышать 50 символов', $validator->errors()->first('name'));
    }

    public function test_email_is_required()
    {
        $data = [
            'name' => 'Тест',
            'message' => 'Тестовое сообщение',
            'source' => 'contact'
        ];

        $validator = $this->validateData($data);
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('email', $validator->errors()->toArray());
        $this->assertEquals('Поле "Email" обязательно для заполнения', $validator->errors()->first('email'));
    }

    public function test_email_format_validation()
    {
        $data = [
            'name' => 'Тест',
            'email' => 'invalid-email',
            'message' => 'Тестовое сообщение',
            'source' => 'contact'
        ];

        $validator = $this->validateData($data);
        $this->assertTrue($validator->fails());
        $this->assertEquals('Введите корректный email адрес', $validator->errors()->first('email'));
    }

    public function test_message_is_required()
    {
        $data = [
            'name' => 'Тест',
            'email' => 'test@example.com',
            'source' => 'contact'
        ];

        $validator = $this->validateData($data);
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('message', $validator->errors()->toArray());
        $this->assertEquals('Поле "Сообщение" обязательно для заполнения', $validator->errors()->first('message'));
    }

    public function test_message_minimum_length_validation()
    {
        $data = [
            'name' => 'Тест',
            'email' => 'test@example.com',
            'message' => 'Короткое',
            'source' => 'contact'
        ];

        $validator = $this->validateData($data);
        $this->assertTrue($validator->fails());
        $this->assertEquals('Сообщение должно содержать минимум 10 символов', $validator->errors()->first('message'));
    }

    public function test_message_maximum_length_validation()
    {
        $data = [
            'name' => 'Тест',
            'email' => 'test@example.com',
            'message' => str_repeat('А', 1001),
            'source' => 'contact'
        ];

        $validator = $this->validateData($data);
        $this->assertTrue($validator->fails());
        $this->assertEquals('Сообщение не должно превышать 1000 символов', $validator->errors()->first('message'));
    }

    public function test_source_is_required()
    {
        $data = [
            'name' => 'Тест',
            'email' => 'test@example.com',
            'message' => 'Тестовое сообщение'
        ];

        $validator = $this->validateData($data);
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('source', $validator->errors()->toArray());
        $this->assertEquals('Поле "Источник" обязательно для заполнения', $validator->errors()->first('source'));
    }

    public function test_source_must_be_valid_value()
    {
        $data = [
            'name' => 'Тест',
            'email' => 'test@example.com',
            'message' => 'Тестовое сообщение',
            'source' => 'invalid'
        ];

        $validator = $this->validateData($data);
        $this->assertTrue($validator->fails());
        $this->assertEquals('Источник должен быть "project" или "contact"', $validator->errors()->first('source'));
    }

    public function test_company_is_optional()
    {
        $data = [
            'name' => 'Тест',
            'email' => 'test@example.com',
            'message' => 'Тестовое сообщение',
            'source' => 'contact'
        ];

        $validator = $this->validateData($data);
        $this->assertFalse($validator->fails());
    }

    public function test_company_maximum_length_validation()
    {
        $data = [
            'name' => 'Тест',
            'email' => 'test@example.com',
            'message' => 'Тестовое сообщение',
            'source' => 'contact',
            'company' => str_repeat('А', 101)
        ];

        $validator = $this->validateData($data);
        $this->assertTrue($validator->fails());
        $this->assertEquals('Название компании не должно превышать 100 символов', $validator->errors()->first('company'));
    }

    public function test_project_title_is_optional()
    {
        $data = [
            'name' => 'Тест',
            'email' => 'test@example.com',
            'message' => 'Тестовое сообщение',
            'source' => 'project'
        ];

        $validator = $this->validateData($data);
        $this->assertFalse($validator->fails());
    }

    public function test_project_title_maximum_length_validation()
    {
        $data = [
            'name' => 'Тест',
            'email' => 'test@example.com',
            'message' => 'Тестовое сообщение',
            'source' => 'project',
            'project_title' => str_repeat('А', 256)
        ];

        $validator = $this->validateData($data);
        $this->assertTrue($validator->fails());
        $this->assertEquals('Название проекта не должно превышать 255 символов', $validator->errors()->first('project_title'));
    }

    public function test_valid_source_values_pass_validation()
    {
        $validSources = ['project', 'contact'];

        foreach ($validSources as $source) {
            $data = [
                'name' => 'Тест',
                'email' => 'test@example.com',
                'message' => 'Тестовое сообщение',
                'source' => $source
            ];

            $validator = $this->validateData($data);
            $this->assertFalse($validator->fails(), "Source '{$source}' should be valid");
        }
    }
}