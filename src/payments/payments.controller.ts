import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { RoleEnum } from 'src/common/enums/role.enum';

@ApiBearerAuth()
@Auth([RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.OWNER])
@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiBody({ description: 'Create a new payment', type: CreatePaymentDto })
  @ApiResponse({ status: 201, description: 'Payment created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieve all payments.' })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the payment',
  })
  @ApiResponse({ status: 200, description: 'Payment details.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  findOne(@Param('id') id: number) {
    return this.paymentsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the payment to update',
  })
  @ApiBody({ description: 'Updated payment details', type: UpdatePaymentDto })
  @ApiResponse({ status: 200, description: 'Payment updated successfully.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  update(@Param('id') id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the payment to delete',
  })
  @ApiResponse({ status: 200, description: 'Payment removed successfully.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  remove(@Param('id') id: number) {
    return this.paymentsService.remove(id);
  }
}
