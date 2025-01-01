<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VehicleBookingStoreRequest extends FormRequest
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
            'driver_id' => 'required|exists:users,id',
            'start_datetime' => 'required|date|after:now',
            'end_datetime' => 'required|date|after:start_datetime',
            'purpose' => 'required|string|max:255',
            'destination' => 'required|string',
            'passenger_count' => 'nullable|integer|min:1',
            'first_reviewer' => [
                'required',
                'exists:users,id',
                'different:second_reviewer',
                'different:driver_id'
            ],
            'second_reviewer' => [
                'required',
                'exists:users,id',
                'different:first_reviewer',
                'different:driver_id'
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'first_reviewer.different' => 'First reviewer must be different from second reviewer and driver',
            'second_reviewer.different' => 'Second reviewer must be different from first reviewer and driver',
            'first_reviewer.required' => 'First reviewer is required',
            'second_reviewer.required' => 'Second reviewer is required',
            'driver_id.exists' => 'The selected driver is invalid.',
            'vehicle_id.exists' => 'The selected vehicle is invalid.',
            'start_datetime.after' => 'The start date must be a future date.',
            'end_datetime.after' => 'The end date must be after the start date.',
        ];
    }
}
