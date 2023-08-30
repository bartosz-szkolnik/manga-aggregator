create table "public"."manga" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "image_url" text not null,
    "mangadex_id" text not null,
    "last_time_checked" timestamp with time zone
);


alter table "public"."manga" enable row level security;

CREATE UNIQUE INDEX manga_pkey ON public.manga USING btree (id);

alter table "public"."manga" add constraint "manga_pkey" PRIMARY KEY using index "manga_pkey";


