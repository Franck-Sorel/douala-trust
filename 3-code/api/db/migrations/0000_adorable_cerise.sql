CREATE TABLE "app_info" (
	"key" varchar(64) PRIMARY KEY NOT NULL,
	"value" varchar(255),
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
