
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const useLoginValidation = () => {
  const schema = yup.object({
    username: yup.string().required('שם משתמש נדרש'),
    password: yup.string().min(3, 'סיסמה חייבת להכיל לפחות 3 תווים').required('סיסמה נדרשת'),
  });

  return useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
};

export const useRegisterValidation = () => {
  const schema = yup.object({
    username: yup.string().min(3, 'שם משתמש חייב להכיל לפחות 3 תווים').required('שם משתמש נדרש'),
    email: yup.string().email('כתובת אימייל לא תקינה').required('אימייל נדרש'),
    fullName: yup.string().min(2, 'שם מלא חייב להכיל לפחות 2 תווים').required('שם מלא נדרש'),
    password: yup.string().min(6, 'סיסמה חייבת להכיל לפחות 6 תווים').required('סיסמה נדרשת'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'הסיסמאות אינן תואמות')
      .required('אישור סיסמה נדרש'),
    phone: yup.string().matches(/^05\d-?\d{7}$/, 'מספר טלפון לא תקין'),
    address: yup.string().min(5, 'כתובת חייבת להכיל לפחות 5 תווים'),
  });

  return useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
};

export const useProductValidation = () => {
  const schema = yup.object({
    name: yup.string().min(2, 'שם המוצר חייב להכיל לפחות 2 תווים').required('שם המוצר נדרש'),
    price: yup.number().positive('המחיר חייב להיות חיובי').required('מחיר נדרש'),
    description: yup.string().min(10, 'תיאור המוצר חייב להכיל לפחות 10 תווים').required('תיאור נדרש'),
    category: yup.string().required('קטגוריה נדרשת'),
  });

  return useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
};
