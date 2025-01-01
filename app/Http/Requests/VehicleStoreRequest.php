<?php

namespace App\Http\Requests;

use App\Enums\VehicleOwnershipEnum;
use App\Enums\VehicleTypeEnum;
use Illuminate\Foundation\Http\FormRequest;

class VehicleStoreRequest extends FormRequest
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
            'registration_number' => ['required', 'string', 'unique:vehicles,registration_number'],
            'vehicle_type' => ['required', 'string', 'in:' . implode(',', array_map(fn($type) => $type->value, VehicleTypeEnum::cases()))],
            'ownership_type' => ['required', 'string', 'in:' . implode(',', array_map(fn($ownership) => $ownership->value, VehicleOwnershipEnum::cases()))],
            'brand' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'manufacturing_year' => ['required', 'integer', 'min:1900', 'max:' . (date('Y') + 1)],
            'chassis_number' => ['required', 'string', 'unique:vehicles,chassis_number'],
            'engine_number' => ['required', 'string', 'unique:vehicles,engine_number'],
            'registration_expiry' => ['required', 'date', 'after:today'],
            'is_active' => ['boolean'],
        ];
    }
}
