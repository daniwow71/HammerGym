import { z } from 'zod';
import { FORM_ERROR_MESSAGES } from './../config/constants.js';

const commonSuperRefine = (data, ctx) => {
  if (!data.email) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: FORM_ERROR_MESSAGES.email.required,
      path: ["email"],
    });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: FORM_ERROR_MESSAGES.email.invalid,
      path: ["email"],
    });
  }

  if (!data.password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: FORM_ERROR_MESSAGES.password.required,
      path: ["password"],
    });
  } else if (data.password.length < 8) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: FORM_ERROR_MESSAGES.password.invalid,
      path: ["password"],
    });
  }

  if (data.confirmPassword !== undefined) {
    if (!data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'La confirmación de la contraseña es requerida',
        path: ["confirmPassword"],
      });
    } else if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Las contraseñas no coinciden',
        path: ["confirmPassword"],
      });
    }
  }

  if (data.realName !== undefined && !data.realName) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'El nombre es requerido',
      path: ["nombre"],
    });
  }

  if (data.lastNames !== undefined && !data.lastNames) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Los apellidos son requeridos',
      path: ["apellido"],
    });
  }

  if (data.username !== undefined && !data.username) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'El nombre de usuario es requerido',
      path: ["nombreUsuario"],
    });
  }

  if (data.role !== undefined && !['Usuario', 'Entrenador'].includes(data.role)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'El rol es requerido',
      path: ["role"],
    });
  }
};

export const loginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(6).max(255),
}).superRefine((data, ctx) => commonSuperRefine(data, ctx));

export const registrationSchema = z.object({
  role: z.enum(['Usuario', 'Entrenador']),
  username: z.string().min(3).max(255),
  email: z.string().email().max(255),
  password: z.string().min(6).max(255),
  realName: z.string().min(2).max(255),
  lastNames: z.string().min(2).max(255),
  confirmPassword: z.string().min(6).max(255),
}).superRefine((data, ctx) => commonSuperRefine(data, ctx));