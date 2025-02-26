import { type InferType, object as objectSchema, string } from 'yup';

export type PaymasterServiceCapability = InferType<
  typeof paymasterServiceCapabilitySchema
>;

export const paymasterServiceCapabilitySchema = objectSchema({
  url: string()
    .required()
    .matches(/^https:\/\/.+/, 'URL must be a valid HTTPS URL'),
  context: objectSchema().optional().default(undefined),
}).required();
