import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryHistoryDto } from './create-inventory_history.dto';

export class UpdateInventoryHistoryDto extends PartialType(CreateInventoryHistoryDto) {}
