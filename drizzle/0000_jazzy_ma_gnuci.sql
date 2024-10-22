CREATE TABLE IF NOT EXISTS "parking" (
	"id" serial PRIMARY KEY NOT NULL,
	"address" varchar(255) NOT NULL,
	"longitude" numeric NOT NULL,
	"latitude" numeric NOT NULL,
	"availableFrom" timestamp NOT NULL,
	"availableTo" timestamp NOT NULL,
	"price" integer NOT NULL,
	"createdBy" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
