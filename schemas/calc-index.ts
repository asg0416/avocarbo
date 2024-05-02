import { ActiveLevel, PregnancyPeriod } from "@prisma/client";
import { z } from "zod";

export const BasicInfoSchema = z.object({
  age: z.coerce.number().int().gte(0).lte(100),
  height: z.coerce.number().int().gte(100).lte(200),
  weight: z
    .coerce.number()
    .gte(0)
    .lte(1000)
    .step(0.1)
    .transform((val) => parseFloat(val.toFixed(1))),
  pregnancy_period: z.enum([
    PregnancyPeriod.FIRST,
    PregnancyPeriod.SECOND,
    PregnancyPeriod.THIRD,
    PregnancyPeriod.LACTATION,
  ]),
  active_level: z.enum([
    ActiveLevel.LIGHT,
    ActiveLevel.MODERATE,
    ActiveLevel.INTENSE,
  ]),
});
