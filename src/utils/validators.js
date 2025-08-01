// Validation utilities
import { VALIDATION_RULES } from './constants';

export const validateEmail = (email) => {
  if (!email) return false;
  return VALIDATION_RULES.EMAIL.test(email);
};

export const validatePhone = (phone) => {
  if (!phone) return false;
  return VALIDATION_RULES.PHONE.test(phone);
};

export const validatePassword = (password) => {
  if (!password) return false;
  return password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH;
};

export const validateName = (name) => {
  if (!name) return false;
  return name.length >= VALIDATION_RULES.NAME_MIN_LENGTH && 
         name.length <= VALIDATION_RULES.NAME_MAX_LENGTH;
};

export const validateWeight = (weight) => {
  const numWeight = parseFloat(weight);
  if (isNaN(numWeight)) return false;
  return numWeight >= 0.1 && numWeight <= 100;
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};