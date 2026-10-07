CREATE TYPE "public"."availability_status" AS ENUM('AVAILABLE', 'BUSY', 'SNOOZED', 'BANNED');--> statement-breakpoint
CREATE TYPE "public"."offer_status" AS ENUM('PENDING', 'CLAIMED', 'DECLINED', 'EXPIRED');--> statement-breakpoint
CREATE TYPE "public"."request_state" AS ENUM('CREATED', 'REQUIREMENTS_SET', 'VERIFIER_OFFERING', 'ASSIGNED', 'INSPECTION', 'REVIEW', 'DECISION_RECORDED');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('buyer', 'verifier', 'platform');--> statement-breakpoint
CREATE TABLE "offers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid NOT NULL,
	"verifier_id" uuid NOT NULL,
	"status" "offer_status" DEFAULT 'PENDING' NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"claimed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "requirements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid NOT NULL,
	"text" text NOT NULL,
	"expected_result" text NOT NULL,
	"test_method" text NOT NULL,
	"required_evidence" text[] DEFAULT '{}' NOT NULL,
	"priority" text,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" "role" NOT NULL,
	"phone" text NOT NULL,
	"kyc_status" text,
	"capabilities" text[],
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"buyer_id" uuid NOT NULL,
	"product_description" text NOT NULL,
	"location" text NOT NULL,
	"expected_identity" text[],
	"state" "request_state" DEFAULT 'CREATED' NOT NULL,
	"requirement_set_version" integer DEFAULT 1 NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verifiers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"availability_status" "availability_status" DEFAULT 'AVAILABLE' NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "verifiers_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_request_id_verification_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."verification_requests"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_verifier_id_verifiers_id_fk" FOREIGN KEY ("verifier_id") REFERENCES "public"."verifiers"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "requirements" ADD CONSTRAINT "requirements_request_id_verification_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."verification_requests"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification_requests" ADD CONSTRAINT "verification_requests_buyer_id_users_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verifiers" ADD CONSTRAINT "verifiers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;