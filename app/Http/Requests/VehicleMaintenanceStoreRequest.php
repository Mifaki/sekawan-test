<?php

namespace App\Http\Requests;

use App\Enums\VehicleMaintenanceStatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VehicleMaintenanceStoreRequest extends FormRequest
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
            'vehicle_id' => 'required|exists:vehicles,id',
            'scheduled_date' => 'required|date|after_or_equal:today',
            'maintenance_type' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'status' => [
                'required',
                'string',
                Rule::in(array_map(fn($status) => $status->value, VehicleMaintenanceStatusEnum::cases()))
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'vehicle_id.exists' => 'The selected vehicle does not exist.',
            'scheduled_date.after_or_equal' => 'The scheduled date must be today or a future date.',
            'status.in' => 'The selected status is invalid.',
        ];
    }
}
