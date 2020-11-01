import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class DatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('Value', value, 'metadata', metadata);
  }
}
