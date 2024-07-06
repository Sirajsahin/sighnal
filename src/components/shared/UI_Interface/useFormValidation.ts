import { RegisterOptions } from "react-hook-form";
import { IFormFieldErrorMessages } from "../../ui/interface";

export type FormFieldValidation = RegisterOptions<any, string> | undefined;
type IUseFormValidationsReturn = {
  [key in
    | "forName"
    | "forRating"
    | "forAlphaNumeric"
    | "forStaffName"
    | "forEquipmentName"
    | "forEmail"
    | "forOnlyBarcode"
    | "forMobile"
    | "forOnlyNumber"
    | "forLatitude"
    | "forLongitude"
    | "forOnlyAlphabet"
    | "forAddressLine"
    | "forNumericWithDecimal"
    | "forIndianPanNumber"
    | "forAlphaNumericWithoutSpace"
    | "forAlphaNumericWithoutDot"
    | "forOnlyNumberWithoutZero"
    | "forAlphaNumericWithGST"
    | "forMsmeValidationValidation"
    | "forTaxRegex"]: {
    validations: FormFieldValidation;
    errors: IFormFieldErrorMessages;
  };
};
const ONLY_NUMBER_REGEX = /^\d{1,10}$/;
const GS1_BARCODE_REGEX = /^\d+$/;
const MSME_REGEX = /^UDYAM[A-Z]{2}\d{9}$/;
const ONLY_NUMBER_REGEX_WITHOUT_ZERO = /^(?!0+$)\d{1,10}$/;
const ONLY_ALPHABETS = /^(?! )[^\s].*?(?<! )$/i;
const NAME_REGEX = /^[a-zA-Z\s-_0-9]+$/;
const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9 ]+$/;
const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[0-9A-Z]{1}$/;
const ALPHA_NUMERIC_WITHOUT_DOT =
  /^[a-zA-Z0-9 !@#$%^&*()_+\-=[\]{};':"\\|,<>/?]+$/;
const ALPHA_NUMERIC_WITHOUT_SPACE = /^[a-zA-Z0-9]+$/;
const RATING_REGEX = /^[0-9.]+$/;
const STAFF_NAME_REGEX = /^[a-zA-Z\s-.0-9]+$/;
const EQUIPMENT_NAME_REGEX = /^[a-zA-Z\s-_0-9]+$/;
const LAT_REGEX = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
const LONG_REGEX = /^[-+]?([1-9]?\d(\.\d+)?|1[0-7]\d(\.\d+)?|180(\.0+)?)$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/i;
const EMAIL_REGEX =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|org|net|info|biz|edu|gov|mil|in|uk|jp|de|au|ca|app|tech|shop|blog|online)$/;

const ADDRESS_LINE_REGEX = /^[a-zA-Z0-9, ]+$/i;
const NUMERIC_WITH_DECIMAL = /^\d+(\.\d{1,2})?$/i;
const INDIAN_PAN_NUMBER_REGEX = /[A-Z]{5}[0-9]{4}[A-Z]{1}/i;
const TAX_REGEX = /^(?:\d{1,2}(?:\.\d{1,2})?|100(?:\.0{1,2})?)$/i;

const useFormValidations = (): IUseFormValidationsReturn => {
  // Address Fields
  const addressLineValidations: FormFieldValidation = {
    pattern: ADDRESS_LINE_REGEX,
  };
  const addressLineValidationErrors: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Cannot contain special chars",
  };

  // Only Numbers

  const onlyNumbersValidations: FormFieldValidation = {
    pattern: ONLY_NUMBER_REGEX,
  };
  const onlyNumbersValidationErrors: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Only numbers are allowed",
  };
  const onlyBarcodeValidations: FormFieldValidation = {
    pattern: GS1_BARCODE_REGEX,
  };
  const onlyBarcodeValidationErrors: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Only numbers are allowed",
  };
  const onlyNumbersValidationsWithoutZero: FormFieldValidation = {
    pattern: ONLY_NUMBER_REGEX_WITHOUT_ZERO,
  };
  const onlyNumbersValidationsWithoutZeroErrors: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Only numbers and greater than 0 ",
  };

  const onlyAlphaNumericWithoutSpaceValidations: FormFieldValidation = {
    pattern: ALPHA_NUMERIC_WITHOUT_SPACE,
  };
  const onlyAlphaNumericWithoutSpaceErrors: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Should not contain any space or special characters",
  };
  const onlyAlphaNumericWithoutDotValidations: FormFieldValidation = {
    pattern: ALPHA_NUMERIC_WITHOUT_DOT,
  };
  const onlyAlphaNumericWithoutDotErrors: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Invalid Format ",
  };

  // Latitude Validations

  const latitudesValidations: FormFieldValidation = {
    pattern: LAT_REGEX,
  };
  const latitudesValidationErrors: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Invalid Latitude",
  };
  // Longitude Validations

  const longitudesValidations: FormFieldValidation = {
    pattern: LONG_REGEX,
  };
  const longitudesValidationErrors: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Invalid Longitude",
  };

  // Only ALphabets
  const onlyAlphabetsValidations: FormFieldValidation = {
    pattern: ONLY_ALPHABETS,
  };
  const onlyAlphabetsValidationErrors: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Only alphabets",
  };

  // Mobile Validations
  const mobileValidations: FormFieldValidation = { pattern: MOBILE_REGEX };
  const mobileValidationErrors: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Invalid Phone format.",
  };

  // Email Validations
  const emailValidations: FormFieldValidation = { pattern: EMAIL_REGEX };
  const emailValidationErrors: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Invalid email format.",
  };

  // Name Validations
  const nameValidations: FormFieldValidation = { pattern: NAME_REGEX };
  const nameValidationErrors: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Invalid name.",
  };

  // Indian Pan Number Validations
  const indianPanNumberValidations: FormFieldValidation = {
    pattern: INDIAN_PAN_NUMBER_REGEX,
  };

  const indianPanNumberErrors: IFormFieldErrorMessages = {
    message: "Invalid PAN number",
    type: "pattern",
  };

  // Numric with Decimal

  const onlyNumericWithDecimalValidations: FormFieldValidation = {
    pattern: NUMERIC_WITH_DECIMAL,
  };
  const onlyNumericWithDecimalErrors: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Only numeric with decimal",
  };
  const onlyTaxWithDecimalValidations: FormFieldValidation = {
    pattern: TAX_REGEX,
  };
  const onlyTaxWithDecimalValidationsErrors: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Only numeric with decimal value should not greater than 100",
  };

  const alphaNumericValidations: FormFieldValidation = {
    pattern: ALPHA_NUMERIC_REGEX,
  };
  const alphaNumericValidationErrors: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Invalid Format",
  };
  const alphaNumericWithGSTValidations: FormFieldValidation = {
    pattern: GST_REGEX,
  };
  const alphaNumericWithGSTValidationsError: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Invalid Format , It must be an aplhanumeric",
  };

  const ratingValidations: FormFieldValidation = { pattern: RATING_REGEX };
  const ratingValidationErrors: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Invalid name.",
  };

  const staffNameValidations: FormFieldValidation = {
    pattern: STAFF_NAME_REGEX,
  };
  const staffNameValidationErrors: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Invalid name.",
  };
  const msmeValidationValidation: FormFieldValidation = { pattern: MSME_REGEX };
  const msmeValidationValidationError: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Invalid name.",
  };

  const equipmentNameValidations: FormFieldValidation = {
    pattern: EQUIPMENT_NAME_REGEX,
  };
  const equipmentNameValidationErrors: IFormFieldErrorMessages = {
    type: "pattern",
    message: "Invalid name.",
  };

  return {
    forOnlyAlphabet: {
      validations: onlyAlphabetsValidations,
      errors: onlyAlphabetsValidationErrors,
    },
    forOnlyNumber: {
      validations: onlyNumbersValidations,
      errors: onlyNumbersValidationErrors,
    },
    forOnlyBarcode: {
      validations: onlyBarcodeValidations,
      errors: onlyBarcodeValidationErrors,
    },
    forOnlyNumberWithoutZero: {
      validations: onlyNumbersValidationsWithoutZero,
      errors: onlyNumbersValidationsWithoutZeroErrors,
    },
    forLatitude: {
      validations: latitudesValidations,
      errors: latitudesValidationErrors,
    },
    forLongitude: {
      validations: longitudesValidations,
      errors: longitudesValidationErrors,
    },
    forAddressLine: {
      validations: addressLineValidations,
      errors: addressLineValidationErrors,
    },
    forMobile: {
      validations: mobileValidations,
      errors: mobileValidationErrors,
    },
    forName: { validations: nameValidations, errors: nameValidationErrors },
    forAlphaNumeric: {
      validations: alphaNumericValidations,
      errors: alphaNumericValidationErrors,
    },
    forMsmeValidationValidation: {
      validations: msmeValidationValidation,
      errors: msmeValidationValidationError,
    },
    forAlphaNumericWithGST: {
      validations: alphaNumericWithGSTValidations,
      errors: alphaNumericWithGSTValidationsError,
    },
    forRating: {
      validations: ratingValidations,
      errors: ratingValidationErrors,
    },
    forStaffName: {
      validations: staffNameValidations,
      errors: staffNameValidationErrors,
    },
    forEquipmentName: {
      validations: equipmentNameValidations,
      errors: equipmentNameValidationErrors,
    },
    forEmail: { validations: emailValidations, errors: emailValidationErrors },
    forNumericWithDecimal: {
      validations: onlyNumericWithDecimalValidations,
      errors: onlyNumericWithDecimalErrors,
    },
    forTaxRegex: {
      validations: onlyTaxWithDecimalValidations,
      errors: onlyTaxWithDecimalValidationsErrors,
    },
    forIndianPanNumber: {
      errors: indianPanNumberErrors,
      validations: indianPanNumberValidations,
    },
    forAlphaNumericWithoutSpace: {
      validations: onlyAlphaNumericWithoutSpaceValidations,
      errors: onlyAlphaNumericWithoutSpaceErrors,
    },
    forAlphaNumericWithoutDot: {
      validations: onlyAlphaNumericWithoutDotValidations,
      errors: onlyAlphaNumericWithoutDotErrors,
    },
  };
};

export default useFormValidations;
