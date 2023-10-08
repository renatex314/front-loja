type ParseFormDataOptions = {
  preserveUndefined?: boolean;
  preserveNull?: boolean;
  preserveEmptyStrings?: boolean;
};
export const parseFormData = <T>(
  formData: T,
  options: ParseFormDataOptions = {
    preserveEmptyStrings: false,
    preserveNull: false,
    preserveUndefined: false,
  }
): Partial<T> => {
  const parsedFormData = { ...formData };

  Object.keys(parseFormData).forEach((key) => {
    const value = parsedFormData[key as keyof T];

    if (
      (value === undefined && !options.preserveUndefined) ||
      (value === null && !options.preserveNull) ||
      (value === "" && !options.preserveEmptyStrings)
    ) {
      delete parsedFormData[key as keyof T];
    }
  });

  return parsedFormData;
};
