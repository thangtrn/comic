import { applyDecorators, BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
import { Types } from 'mongoose';

export const OptionalObjectId = (propertyName: string) =>
  applyDecorators(
    IsOptional(),
    ValidateIf(
      (o) => o[propertyName] && Types.ObjectId.isValid(o[propertyName]),
    ),
    Transform(({ value }) => {
      if (Array.isArray(value)) {
        return value.map((v) =>
          !v || !Types.ObjectId.isValid(v)
            ? null
            : new Types.ObjectId(v as string),
        );
      }
      return !value || !Types.ObjectId.isValid(value)
        ? null
        : new Types.ObjectId(value as string);
    }),
  );

export const TransformMongoObjectId = () =>
  applyDecorators(
    IsNotEmpty(),
    Transform(({ value }) => {
      if (Array.isArray(value)) {
        const transformedValues = value.map((v) => {
          if (!v || !Types.ObjectId.isValid(v)) {
            throw new BadRequestException(
              `${v} is not a valid MongoDB ObjectId`,
            );
          }
          return new Types.ObjectId(v as string);
        });
        return transformedValues;
      }

      if (!value || !Types.ObjectId.isValid(value)) {
        throw new BadRequestException(
          `${value} is not a valid MongoDB ObjectId`,
        );
      }
      return new Types.ObjectId(value as string);
    }),
  );
