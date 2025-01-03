<?php

namespace App\Enums;

enum VehicleBookingStatusEnum: string
{
    case PENDING = 'pending';
    case APPROVEDL1 = 'approved_l1';
    case REJECTED = 'rejected';
    case COMPLETED = 'completed';
}
