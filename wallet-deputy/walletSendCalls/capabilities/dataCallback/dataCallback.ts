import {
  type InferType,
  array,
  boolean,
  object as objectSchema,
  string,
} from 'yup';

export const SUPPORTED_DATA_CALLBACK_TYPES = [
  'email',
  'phoneNumber',
  'physicalAddress',
  'name',
  'walletAddress',
] as const;

export type DataCallbackCapability = InferType<
  typeof dataCallbackCapabilitySchema
>;

export const dataCallbackCapabilitySchema = objectSchema({
  callbackURL: string()
    .optional()
    .default(undefined)
    .matches(/^https:\/\/.+/, 'URL must be a valid HTTPS URL'),
  requests: array()
    .of(
      objectSchema({
        type: string().oneOf(SUPPORTED_DATA_CALLBACK_TYPES).required(),
        optional: boolean().optional().default(undefined),
      }).required(),
    )
    .min(1, 'At least one data callback request is required')
    .required(),
}).required();
