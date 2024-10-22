import {integer, numeric, pgTable, serial, timestamp, varchar} from "drizzle-orm/pg-core";

export const parkingTable = pgTable('parking', {
    id: serial().primaryKey(),
    address: varchar({length: 255}).notNull(),
    longitude: numeric().notNull(),
    latitude: numeric().notNull(),
    availableFrom: timestamp().notNull(),
    availableTo: timestamp().notNull(),
    price: integer().notNull(),
    createdBy: varchar({ length: 255 }).notNull(),
    createdAt: timestamp().defaultNow(),
})