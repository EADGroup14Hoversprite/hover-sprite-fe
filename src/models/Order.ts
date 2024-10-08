import { z } from "zod";

export const IOrderSchema = z.object({
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  id: z.number(),
  address: z.string(),
  cropType: z.string(),
  farmerName: z.string(),
  farmerPhoneNumber: z.string(),
  farmlandArea: z.number(),
  desiredDate: z.number(),
  timeSlot: z.string(),
  assignedSprayerIds: z.array(z.number()),
  paymentStatus: z.boolean(),
  bookerId: z.number(),
  totalCost: z.number(),
  createdAt: z.number(),
  status: z.string(),
  updatedAt: z.number(),
  paymentMethod: z.string(),
  hasFeedback: z.boolean(),
});

export type IOrder = z.infer<typeof IOrderSchema>;
