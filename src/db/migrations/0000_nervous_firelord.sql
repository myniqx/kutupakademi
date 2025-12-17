CREATE TABLE "blogs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"author" text,
	"keywords" text,
	"title_tr" text NOT NULL,
	"title_en" text,
	"description_tr" text,
	"description_en" text,
	"summary_tr" text,
	"summary_en" text,
	"content_tr" text NOT NULL,
	"content_en" text,
	"cover_image" text,
	"published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"filename" text NOT NULL,
	"url" text NOT NULL,
	"alt" text,
	"width" text,
	"height" text,
	"size" text,
	"mime_type" text,
	"uploaded_at" timestamp DEFAULT now() NOT NULL
);
