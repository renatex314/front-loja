import { isDate } from "util/types";
import { v4 } from "uuid";
export const generateUuid = () => v4();

type ParseFormDataOptions = {
  preserveUndefined?: boolean;
  preserveNull?: boolean;
  preserveEmptyStrings?: boolean;
};
export const parseFormData = <T extends Object>(
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

export const assertFormDataFields = <T extends Object>(
  formData: T,
  fields: Array<keyof T>
) => {
  return fields.every((key) => key in formData && !!formData?.[key]);
};

export const parseDateToAPI = (date: Date | null) =>
  !!date ? date?.toISOString()?.split("T")?.[0] : undefined;
