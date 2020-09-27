import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class ValidatorPipe implements PipeTransform {
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private toValidate;
}
