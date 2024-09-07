import { ZodIssue } from 'zod';

export type ErrorType =
  | 'NOT_SIGNED_IN_ERROR'
  | 'NOT_SINGED_IN_AS_ADMIN_ERROR'
  | 'SOMETHING_WENT_WRONG'
  | 'MANGA_ALREADY_IN_DATABASE'
  | 'INVALID_SIGN_IN_CREDENTIALS'
  | 'USER_ALREADY_REGISTERED';

type InternalActionResult<TError> = Promise<
  | {
      success: true;
      error?: null;
    }
  | {
      success: false;
      error: TError;
    }
>;
export type ActionResult = InternalActionResult<ErrorType>;
export type FormActionResult = InternalActionResult<ErrorType | ZodIssue[]>;

export type Action = ((...args: any[]) => ActionResult) & Function;
export type FormAction = ((data: FormData, ...args: any[]) => FormActionResult) & Function;
export type SubmitActionFn = ((...args: any[]) => void) & Function;

export type ActionResultErrors<A extends Action> = Exclude<Awaited<ReturnType<A>>['error'], null | undefined>;
export type FormActionResultErrors<A extends FormAction> = Exclude<Awaited<ReturnType<A>>['error'], null | undefined>;

export type HandlerFn<D = unknown, R = void> = ((data?: D) => R) & Function;
