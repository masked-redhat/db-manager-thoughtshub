class ValidationService {
  static goodStringValue = (val: any) =>
    typeof val === "string" && !["", undefined, null].includes(val);
}

export const Validate = ValidationService;
