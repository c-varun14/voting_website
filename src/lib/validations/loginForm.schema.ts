import { z } from "zod";

export const loginFormSchema = z.object({
  // rollNo: z.number().max(40, "Enter a correct roll No"),
  // section: z
  //   .string()
  //   .min(1, "Section is required")
  //   .max(1, "Section is required"),
  // std: z.number().max(10, "Enter a valid std"),
  // house: z.string(),
  admissionNo: z.string().min(4, "Enter a valid Admission number"),
});

export type loginFormInput = z.infer<typeof loginFormSchema>;
