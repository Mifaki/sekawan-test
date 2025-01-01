<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VehicleUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'registration_number' => 'required|string|unique:vehicles,registration_number,' . $this->route('id'),
            'vehicle_type' => 'required|string|in:cargo,passenger',
            'ownership_type' => 'required|string|in:company,rental',
            'brand' => 'required|string',
            'model' => 'required|string',
            'manufacturing_year' => 'required|string',
            'chassis_number' => 'required|string',
            'engine_number' => 'required|string',
            'registration_expiry' => 'required|date',
            'is_active' => 'boolean',
        ];
    }
}
