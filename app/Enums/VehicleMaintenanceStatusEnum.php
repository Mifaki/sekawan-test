<?php

namespace App\Enums;

enum VehicleMaintenanceStatusEnum: string
{
    case SCHEDULED = 'scheduled';
    case INPROGRESS = 'in_progress';
    case COMPLETED = 'completed';
    case CANCELLED = 'cancelled';
}
