/*
{
    "error": [
        {
            "field": "password",
            "defaultMessage": "비밀번호를 입력해주세요."
        },
        {
            "field": "email",
            "defaultMessage": "email을 입력해주세요."
        }
    ],
    "status": 400
}
*/

import { isArray, isObject } from './type';

export const getValidationResult = (error) => {
  if (isArray(error)) {
    const message = {};

    for (let eachError of error) {
      if (isObject(eachError)) {
        if (eachError.field && eachError.defaultMessage) {
          message[eachError.field] = eachError.defaultMessage;
          // {email : "email을 입력해주세요.", password: "비밀번호를 입력해주세요"}
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    }
    return message;
  }
};
