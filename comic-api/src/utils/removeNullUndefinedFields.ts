import { Types } from 'mongoose';
const removeNullUndefinedFields = (object: Record<string, any>) => {
  if (Array.isArray(object) || typeof object !== 'object' || object === null) {
    return object;
  }

  const newObj = {};

  for (let key in object) {
    if (Types.ObjectId.isValid(object[key])) {
      newObj[key] = object[key];
    } else if (object[key] !== null && object[key] !== undefined) {
      newObj[key] = removeNullUndefinedFields(object[key]);
    }
  }

  return newObj;
};

export default removeNullUndefinedFields;
