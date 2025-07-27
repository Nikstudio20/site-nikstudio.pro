--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.project_project_category DROP CONSTRAINT IF EXISTS project_project_category_project_id_foreign;
ALTER TABLE IF EXISTS ONLY public.project_project_category DROP CONSTRAINT IF EXISTS project_project_category_project_category_id_foreign;
ALTER TABLE IF EXISTS ONLY public.project_details DROP CONSTRAINT IF EXISTS project_details_project_id_foreign;
ALTER TABLE IF EXISTS ONLY public.project_detail_hero_media DROP CONSTRAINT IF EXISTS project_detail_hero_media_project_detail_id_foreign;
ALTER TABLE IF EXISTS ONLY public.project_detail_blocks DROP CONSTRAINT IF EXISTS project_detail_blocks_project_detail_id_foreign;
ALTER TABLE IF EXISTS ONLY public.project_detail_block_media DROP CONSTRAINT IF EXISTS project_detail_block_media_project_detail_block_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_service_media DROP CONSTRAINT IF EXISTS media_service_media_service_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_service_features DROP CONSTRAINT IF EXISTS media_service_features_service_id_foreign;
ALTER TABLE IF EXISTS ONLY public.blog_post_blocks DROP CONSTRAINT IF EXISTS blog_post_blocks_blog_post_id_foreign;
DROP INDEX IF EXISTS public.sessions_user_id_index;
DROP INDEX IF EXISTS public.sessions_last_activity_index;
DROP INDEX IF EXISTS public.service_videos_service_name_index;
DROP INDEX IF EXISTS public.project_detail_hero_media_project_detail_id_group_id_index;
DROP INDEX IF EXISTS public.media_service_media_service_id_group_id_order_index;
DROP INDEX IF EXISTS public.jobs_queue_index;
DROP INDEX IF EXISTS public.idx_media_testimonials_order_created;
DROP INDEX IF EXISTS public.idx_media_testimonials_order;
DROP INDEX IF EXISTS public.idx_media_services_order_created;
DROP INDEX IF EXISTS public.idx_media_services_order;
DROP INDEX IF EXISTS public.idx_media_service_media_service_order;
DROP INDEX IF EXISTS public.idx_media_service_media_service_group;
DROP INDEX IF EXISTS public.idx_media_service_media_group_type;
DROP INDEX IF EXISTS public.idx_media_service_features_service_order;
DROP INDEX IF EXISTS public.idx_media_process_steps_order_created;
DROP INDEX IF EXISTS public.idx_media_process_steps_order;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_email_unique;
ALTER TABLE IF EXISTS ONLY public.sessions DROP CONSTRAINT IF EXISTS sessions_pkey;
ALTER TABLE IF EXISTS ONLY public.service_videos DROP CONSTRAINT IF EXISTS service_videos_service_name_unique;
ALTER TABLE IF EXISTS ONLY public.service_videos DROP CONSTRAINT IF EXISTS service_videos_pkey;
ALTER TABLE IF EXISTS ONLY public.seo_settings DROP CONSTRAINT IF EXISTS seo_settings_pkey;
ALTER TABLE IF EXISTS ONLY public.projects DROP CONSTRAINT IF EXISTS projects_slug_unique;
ALTER TABLE IF EXISTS ONLY public.projects DROP CONSTRAINT IF EXISTS projects_pkey;
ALTER TABLE IF EXISTS ONLY public.project_project_category DROP CONSTRAINT IF EXISTS project_project_category_project_id_project_category_id_unique;
ALTER TABLE IF EXISTS ONLY public.project_project_category DROP CONSTRAINT IF EXISTS project_project_category_pkey;
ALTER TABLE IF EXISTS ONLY public.project_details DROP CONSTRAINT IF EXISTS project_details_pkey;
ALTER TABLE IF EXISTS ONLY public.project_detail_hero_media DROP CONSTRAINT IF EXISTS project_detail_hero_media_pkey;
ALTER TABLE IF EXISTS ONLY public.project_detail_blocks DROP CONSTRAINT IF EXISTS project_detail_blocks_pkey;
ALTER TABLE IF EXISTS ONLY public.project_detail_block_media DROP CONSTRAINT IF EXISTS project_detail_block_media_pkey;
ALTER TABLE IF EXISTS ONLY public.project_categories DROP CONSTRAINT IF EXISTS project_categories_slug_unique;
ALTER TABLE IF EXISTS ONLY public.project_categories DROP CONSTRAINT IF EXISTS project_categories_pkey;
ALTER TABLE IF EXISTS ONLY public.password_reset_tokens DROP CONSTRAINT IF EXISTS password_reset_tokens_pkey;
ALTER TABLE IF EXISTS ONLY public.page_seo_settings DROP CONSTRAINT IF EXISTS page_seo_settings_pkey;
ALTER TABLE IF EXISTS ONLY public.page_seo_settings DROP CONSTRAINT IF EXISTS page_seo_settings_page_type_unique;
ALTER TABLE IF EXISTS ONLY public.migrations DROP CONSTRAINT IF EXISTS migrations_pkey;
ALTER TABLE IF EXISTS ONLY public.media_testimonials DROP CONSTRAINT IF EXISTS media_testimonials_pkey;
ALTER TABLE IF EXISTS ONLY public.media_services DROP CONSTRAINT IF EXISTS media_services_pkey;
ALTER TABLE IF EXISTS ONLY public.media_service_media DROP CONSTRAINT IF EXISTS media_service_media_pkey;
ALTER TABLE IF EXISTS ONLY public.media_service_features DROP CONSTRAINT IF EXISTS media_service_features_pkey;
ALTER TABLE IF EXISTS ONLY public.media_process_steps DROP CONSTRAINT IF EXISTS media_process_steps_pkey;
ALTER TABLE IF EXISTS ONLY public.media_page_content DROP CONSTRAINT IF EXISTS media_page_content_pkey;
ALTER TABLE IF EXISTS ONLY public.jobs DROP CONSTRAINT IF EXISTS jobs_pkey;
ALTER TABLE IF EXISTS ONLY public.job_batches DROP CONSTRAINT IF EXISTS job_batches_pkey;
ALTER TABLE IF EXISTS ONLY public.home_contents DROP CONSTRAINT IF EXISTS home_contents_pkey;
ALTER TABLE IF EXISTS ONLY public.failed_jobs DROP CONSTRAINT IF EXISTS failed_jobs_uuid_unique;
ALTER TABLE IF EXISTS ONLY public.failed_jobs DROP CONSTRAINT IF EXISTS failed_jobs_pkey;
ALTER TABLE IF EXISTS ONLY public.cache DROP CONSTRAINT IF EXISTS cache_pkey;
ALTER TABLE IF EXISTS ONLY public.cache_locks DROP CONSTRAINT IF EXISTS cache_locks_pkey;
ALTER TABLE IF EXISTS ONLY public.blog_posts DROP CONSTRAINT IF EXISTS blog_posts_slug_unique;
ALTER TABLE IF EXISTS ONLY public.blog_posts DROP CONSTRAINT IF EXISTS blog_posts_pkey;
ALTER TABLE IF EXISTS ONLY public.blog_post_blocks DROP CONSTRAINT IF EXISTS blog_post_blocks_pkey;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.service_videos ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.seo_settings ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.projects ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.project_project_category ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.project_details ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.project_detail_hero_media ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.project_detail_blocks ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.project_detail_block_media ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.project_categories ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.page_seo_settings ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.migrations ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media_testimonials ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media_services ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media_service_media ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media_service_features ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media_process_steps ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media_page_content ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.jobs ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.home_contents ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.failed_jobs ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.blog_posts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.blog_post_blocks ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.sessions;
DROP SEQUENCE IF EXISTS public.service_videos_id_seq;
DROP TABLE IF EXISTS public.service_videos;
DROP SEQUENCE IF EXISTS public.seo_settings_id_seq;
DROP TABLE IF EXISTS public.seo_settings;
DROP SEQUENCE IF EXISTS public.projects_id_seq;
DROP TABLE IF EXISTS public.projects;
DROP SEQUENCE IF EXISTS public.project_project_category_id_seq;
DROP TABLE IF EXISTS public.project_project_category;
DROP SEQUENCE IF EXISTS public.project_details_id_seq;
DROP TABLE IF EXISTS public.project_details;
DROP SEQUENCE IF EXISTS public.project_detail_hero_media_id_seq;
DROP TABLE IF EXISTS public.project_detail_hero_media;
DROP SEQUENCE IF EXISTS public.project_detail_blocks_id_seq;
DROP TABLE IF EXISTS public.project_detail_blocks;
DROP SEQUENCE IF EXISTS public.project_detail_block_media_id_seq;
DROP TABLE IF EXISTS public.project_detail_block_media;
DROP SEQUENCE IF EXISTS public.project_categories_id_seq;
DROP TABLE IF EXISTS public.project_categories;
DROP TABLE IF EXISTS public.password_reset_tokens;
DROP SEQUENCE IF EXISTS public.page_seo_settings_id_seq;
DROP TABLE IF EXISTS public.page_seo_settings;
DROP SEQUENCE IF EXISTS public.migrations_id_seq;
DROP TABLE IF EXISTS public.migrations;
DROP SEQUENCE IF EXISTS public.media_testimonials_id_seq;
DROP TABLE IF EXISTS public.media_testimonials;
DROP SEQUENCE IF EXISTS public.media_services_id_seq;
DROP TABLE IF EXISTS public.media_services;
DROP SEQUENCE IF EXISTS public.media_service_media_id_seq;
DROP TABLE IF EXISTS public.media_service_media;
DROP SEQUENCE IF EXISTS public.media_service_features_id_seq;
DROP TABLE IF EXISTS public.media_service_features;
DROP SEQUENCE IF EXISTS public.media_process_steps_id_seq;
DROP TABLE IF EXISTS public.media_process_steps;
DROP SEQUENCE IF EXISTS public.media_page_content_id_seq;
DROP TABLE IF EXISTS public.media_page_content;
DROP SEQUENCE IF EXISTS public.jobs_id_seq;
DROP TABLE IF EXISTS public.jobs;
DROP TABLE IF EXISTS public.job_batches;
DROP SEQUENCE IF EXISTS public.home_contents_id_seq;
DROP TABLE IF EXISTS public.home_contents;
DROP SEQUENCE IF EXISTS public.failed_jobs_id_seq;
DROP TABLE IF EXISTS public.failed_jobs;
DROP TABLE IF EXISTS public.cache_locks;
DROP TABLE IF EXISTS public.cache;
DROP SEQUENCE IF EXISTS public.blog_posts_id_seq;
DROP TABLE IF EXISTS public.blog_posts;
DROP SEQUENCE IF EXISTS public.blog_post_blocks_id_seq;
DROP TABLE IF EXISTS public.blog_post_blocks;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: blog_post_blocks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_post_blocks (
    id bigint NOT NULL,
    blog_post_id bigint NOT NULL,
    title character varying(255),
    paragraph_1 text,
    paragraph_2 text,
    paragraph_3 text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: blog_post_blocks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.blog_post_blocks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: blog_post_blocks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.blog_post_blocks_id_seq OWNED BY public.blog_post_blocks.id;


--
-- Name: blog_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_posts (
    id bigint NOT NULL,
    image character varying(255),
    "position" character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    slug character varying(255) NOT NULL,
    status boolean DEFAULT true NOT NULL,
    seo_title character varying(255),
    seo_description text,
    seo_image character varying(255),
    sort_order integer DEFAULT 0 NOT NULL
);


--
-- Name: blog_posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.blog_posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: blog_posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.blog_posts_id_seq OWNED BY public.blog_posts.id;


--
-- Name: cache; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


--
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


--
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- Name: home_contents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.home_contents (
    id bigint NOT NULL,
    hero_video_path character varying(255),
    hero_video_original_name character varying(255),
    hero_video_size bigint,
    hero_fallback_image_path character varying(255),
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: home_contents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.home_contents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: home_contents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.home_contents_id_seq OWNED BY public.home_contents.id;


--
-- Name: job_batches; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);


--
-- Name: jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: media_page_content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_page_content (
    id bigint NOT NULL,
    hero_title text,
    hero_description text,
    testimonials_title text,
    testimonials_subtitle text,
    process_title text,
    process_subtitle text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: media_page_content_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_page_content_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_page_content_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_page_content_id_seq OWNED BY public.media_page_content.id;


--
-- Name: media_process_steps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_process_steps (
    id bigint NOT NULL,
    step_number character varying(255) NOT NULL,
    title text NOT NULL,
    subtitle text NOT NULL,
    image_path text NOT NULL,
    description_left text NOT NULL,
    description_right text NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: media_process_steps_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_process_steps_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_process_steps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_process_steps_id_seq OWNED BY public.media_process_steps.id;


--
-- Name: media_service_features; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_service_features (
    id bigint NOT NULL,
    service_id bigint NOT NULL,
    title text NOT NULL,
    description json NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: media_service_features_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_service_features_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_service_features_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_service_features_id_seq OWNED BY public.media_service_features.id;


--
-- Name: media_service_media; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_service_media (
    id bigint NOT NULL,
    service_id bigint NOT NULL,
    group_id integer NOT NULL,
    media_type character varying(255) NOT NULL,
    file_type character varying(255) NOT NULL,
    file_path text NOT NULL,
    poster_path text,
    alt_text text,
    "order" integer DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT media_service_media_file_type_check CHECK (((file_type)::text = ANY ((ARRAY['image'::character varying, 'video'::character varying])::text[]))),
    CONSTRAINT media_service_media_media_type_check CHECK (((media_type)::text = ANY ((ARRAY['main'::character varying, 'secondary'::character varying])::text[])))
);


--
-- Name: media_service_media_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_service_media_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_service_media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_service_media_id_seq OWNED BY public.media_service_media.id;


--
-- Name: media_services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_services (
    id bigint NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    dark_background boolean DEFAULT false NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: media_services_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_services_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_services_id_seq OWNED BY public.media_services.id;


--
-- Name: media_testimonials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_testimonials (
    id bigint NOT NULL,
    company text NOT NULL,
    quote text NOT NULL,
    description text NOT NULL,
    image_path text NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: media_testimonials_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_testimonials_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_testimonials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_testimonials_id_seq OWNED BY public.media_testimonials.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: page_seo_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.page_seo_settings (
    id bigint NOT NULL,
    page_type character varying(255) NOT NULL,
    seo_title character varying(255),
    seo_description text,
    seo_image character varying(255),
    seo_keywords json,
    canonical_url character varying(255),
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: page_seo_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.page_seo_settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: page_seo_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.page_seo_settings_id_seq OWNED BY public.page_seo_settings.id;


--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


--
-- Name: project_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_categories (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    sort_order integer DEFAULT 0 NOT NULL
);


--
-- Name: project_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_categories_id_seq OWNED BY public.project_categories.id;


--
-- Name: project_detail_block_media; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_detail_block_media (
    id bigint NOT NULL,
    project_detail_block_id bigint NOT NULL,
    file_path character varying(255) NOT NULL,
    file_type character varying(255) DEFAULT 'image'::character varying NOT NULL,
    alt_text character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    "order" integer DEFAULT 0 NOT NULL,
    group_id bigint,
    poster_path character varying(255),
    group_type character varying(255) DEFAULT 'single'::character varying NOT NULL,
    CONSTRAINT project_detail_block_media_file_type_check CHECK (((file_type)::text = ANY ((ARRAY['image'::character varying, 'video'::character varying])::text[]))),
    CONSTRAINT project_detail_block_media_group_type_check CHECK (((group_type)::text = ANY ((ARRAY['single'::character varying, 'double'::character varying])::text[])))
);


--
-- Name: COLUMN project_detail_block_media.group_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.project_detail_block_media.group_id IS 'ID группы для связи элементов (например, для double типа)';


--
-- Name: COLUMN project_detail_block_media.poster_path; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.project_detail_block_media.poster_path IS 'для видео - путь к постеру/превью';


--
-- Name: COLUMN project_detail_block_media.group_type; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.project_detail_block_media.group_type IS 'Тип группы';


--
-- Name: project_detail_block_media_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_detail_block_media_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_detail_block_media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_detail_block_media_id_seq OWNED BY public.project_detail_block_media.id;


--
-- Name: project_detail_blocks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_detail_blocks (
    id bigint NOT NULL,
    project_detail_id bigint NOT NULL,
    title character varying(255),
    subtitle character varying(255),
    content text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    "order" integer DEFAULT 0 NOT NULL
);


--
-- Name: project_detail_blocks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_detail_blocks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_detail_blocks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_detail_blocks_id_seq OWNED BY public.project_detail_blocks.id;


--
-- Name: project_detail_hero_media; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_detail_hero_media (
    id bigint NOT NULL,
    project_detail_id bigint NOT NULL,
    group_id character varying(255),
    group_type character varying(255) DEFAULT 'single'::character varying NOT NULL,
    file_path character varying(255) NOT NULL,
    file_type character varying(255) DEFAULT 'image'::character varying NOT NULL,
    alt_text character varying(255),
    poster_path character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT project_detail_hero_media_file_type_check CHECK (((file_type)::text = ANY ((ARRAY['image'::character varying, 'video'::character varying])::text[]))),
    CONSTRAINT project_detail_hero_media_group_type_check CHECK (((group_type)::text = ANY ((ARRAY['single'::character varying, 'double'::character varying])::text[])))
);


--
-- Name: project_detail_hero_media_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_detail_hero_media_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_detail_hero_media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_detail_hero_media_id_seq OWNED BY public.project_detail_hero_media.id;


--
-- Name: project_details; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_details (
    id bigint NOT NULL,
    project_id bigint NOT NULL,
    title character varying(255) NOT NULL,
    subtitle character varying(255),
    client character varying(255),
    year character varying(4),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: project_details_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_details_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_details_id_seq OWNED BY public.project_details.id;


--
-- Name: project_project_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_project_category (
    id bigint NOT NULL,
    project_id bigint NOT NULL,
    project_category_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: project_project_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_project_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_project_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_project_category_id_seq OWNED BY public.project_project_category.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projects (
    id bigint NOT NULL,
    main_image character varying(255),
    projects_page_image character varying(255),
    logo character varying(255),
    main_title character varying(255) NOT NULL,
    projects_page_title character varying(255) NOT NULL,
    year integer NOT NULL,
    slug character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    seo_title character varying(255),
    seo_description text,
    seo_image character varying(255)
);


--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: seo_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.seo_settings (
    id bigint NOT NULL,
    site_title character varying(255),
    site_description text,
    default_image character varying(255),
    twitter_card_type character varying(50) DEFAULT 'summary_large_image'::character varying NOT NULL,
    facebook_app_id character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: seo_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.seo_settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: seo_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.seo_settings_id_seq OWNED BY public.seo_settings.id;


--
-- Name: service_videos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.service_videos (
    id bigint NOT NULL,
    service_name character varying(255) NOT NULL,
    video_path character varying(255),
    video_original_name character varying(255),
    video_size bigint,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: service_videos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.service_videos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: service_videos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.service_videos_id_seq OWNED BY public.service_videos.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: blog_post_blocks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_post_blocks ALTER COLUMN id SET DEFAULT nextval('public.blog_post_blocks_id_seq'::regclass);


--
-- Name: blog_posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_posts ALTER COLUMN id SET DEFAULT nextval('public.blog_posts_id_seq'::regclass);


--
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- Name: home_contents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_contents ALTER COLUMN id SET DEFAULT nextval('public.home_contents_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: media_page_content id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_page_content ALTER COLUMN id SET DEFAULT nextval('public.media_page_content_id_seq'::regclass);


--
-- Name: media_process_steps id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_process_steps ALTER COLUMN id SET DEFAULT nextval('public.media_process_steps_id_seq'::regclass);


--
-- Name: media_service_features id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_service_features ALTER COLUMN id SET DEFAULT nextval('public.media_service_features_id_seq'::regclass);


--
-- Name: media_service_media id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_service_media ALTER COLUMN id SET DEFAULT nextval('public.media_service_media_id_seq'::regclass);


--
-- Name: media_services id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_services ALTER COLUMN id SET DEFAULT nextval('public.media_services_id_seq'::regclass);


--
-- Name: media_testimonials id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_testimonials ALTER COLUMN id SET DEFAULT nextval('public.media_testimonials_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: page_seo_settings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.page_seo_settings ALTER COLUMN id SET DEFAULT nextval('public.page_seo_settings_id_seq'::regclass);


--
-- Name: project_categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_categories ALTER COLUMN id SET DEFAULT nextval('public.project_categories_id_seq'::regclass);


--
-- Name: project_detail_block_media id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_detail_block_media ALTER COLUMN id SET DEFAULT nextval('public.project_detail_block_media_id_seq'::regclass);


--
-- Name: project_detail_blocks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_detail_blocks ALTER COLUMN id SET DEFAULT nextval('public.project_detail_blocks_id_seq'::regclass);


--
-- Name: project_detail_hero_media id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_detail_hero_media ALTER COLUMN id SET DEFAULT nextval('public.project_detail_hero_media_id_seq'::regclass);


--
-- Name: project_details id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_details ALTER COLUMN id SET DEFAULT nextval('public.project_details_id_seq'::regclass);


--
-- Name: project_project_category id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_project_category ALTER COLUMN id SET DEFAULT nextval('public.project_project_category_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: seo_settings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seo_settings ALTER COLUMN id SET DEFAULT nextval('public.seo_settings_id_seq'::regclass);


--
-- Name: service_videos id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service_videos ALTER COLUMN id SET DEFAULT nextval('public.service_videos_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: blog_post_blocks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_post_blocks (id, blog_post_id, title, paragraph_1, paragraph_2, paragraph_3, created_at, updated_at) FROM stdin;
1	1	Prioritizing User Needs	At the heart of thoughtful UX design is a deep understanding of the user. Boosting engagement starts with knowing who your users are, what they need, and how they interact with your website or app. Every design decision should be rooted in making their experience as seamless and enjoyable as possible, ensuring that their needs are met intuitively.	To prioritize user needs, it’s important to conduct thorough research. This includes gathering data through user interviews, surveys, and analytics to identify pain points and areas for improvement. By understanding the user journey, you can tailor your design to eliminate friction and enhance usability, making it easier for users to achieve their goals.	A thoughtful UX design doesn’t just solve immediate problems—it anticipates future needs. By thinking ahead and considering how users’ behaviors might evolve, you can design an experience that adapts over time, ensuring continued engagement. The more users feel that their needs are being met effortlessly, the more likely they are to remain loyal to your product or service.	2025-07-23 23:36:38	2025-07-23 23:36:38
2	1	Creating a Seamless Flow	A key aspect of UX design that drives engagement is creating a seamless, intuitive flow. Users should be able to navigate through your website or app without confusion, frustration, or unnecessary clicks. Thoughtful design maps out clear paths for users, guiding them naturally from one step to the next while ensuring that important information is easily accessible.	Consistency is essential in establishing a smooth user flow. This means maintaining consistent layouts, visual cues, and interactions across all pages or screens. Whether users are exploring your homepage or completing a purchase, a cohesive experience helps them stay focused and confident in their actions, increasing their overall satisfaction.	Small details, such as button placement, typography, and visual hierarchy, can greatly impact how users interact with your site. By making thoughtful design choices that prioritize clarity and ease of use, you minimize cognitive load and keep users engaged. When users can navigate effortlessly, they’re more likely to spend time exploring your content or completing desired actions.	2025-07-23 23:37:42	2025-07-23 23:37:42
3	1	Engaging Through Emotion	Thoughtful UX design goes beyond functionality—it taps into users’ emotions. Engagement is not just about making a website usable; it’s about creating an emotional connection that resonates with the user. By incorporating elements of storytelling, visual appeal, and interactive features, you can evoke positive emotions that strengthen user engagement and loyalty.	Designing for emotion means considering how users feel at each stage of their journey. From welcoming new users with an intuitive onboarding process to celebrating a successful purchase with a personalized confirmation page, every interaction is an opportunity to foster connection. Thoughtful micro-interactions, such as subtle animations or encouraging messages, can add delight and reinforce a positive experience.	Ultimately, the goal of thoughtful UX design is to make users feel understood and valued. When users feel emotionally connected to your brand, they are more likely to return, recommend your product, and engage with your content on a deeper level. A user experience that resonates emotionally not only boosts engagement but also builds lasting relationships with your audience.	2025-07-23 23:39:07	2025-07-23 23:39:07
4	2	Prioritizing User Needs	At the heart of thoughtful UX design is a deep understanding of the user. Boosting engagement starts with knowing who your users are, what they need, and how they interact with your website or app. Every design decision should be rooted in making their experience as seamless and enjoyable as possible, ensuring that their needs are met intuitively.	To prioritize user needs, it’s important to conduct thorough research. This includes gathering data through user interviews, surveys, and analytics to identify pain points and areas for improvement. By understanding the user journey, you can tailor your design to eliminate friction and enhance usability, making it easier for users to achieve their goals.	A thoughtful UX design doesn’t just solve immediate problems—it anticipates future needs. By thinking ahead and considering how users’ behaviors might evolve, you can design an experience that adapts over time, ensuring continued engagement. The more users feel that their needs are being met effortlessly, the more likely they are to remain loyal to your product or service.	2025-07-23 23:40:41	2025-07-23 23:40:41
5	2	Creating a Seamless Flow	A key aspect of UX design that drives engagement is creating a seamless, intuitive flow. Users should be able to navigate through your website or app without confusion, frustration, or unnecessary clicks. Thoughtful design maps out clear paths for users, guiding them naturally from one step to the next while ensuring that important information is easily accessible.	Consistency is essential in establishing a smooth user flow. This means maintaining consistent layouts, visual cues, and interactions across all pages or screens. Whether users are exploring your homepage or completing a purchase, a cohesive experience helps them stay focused and confident in their actions, increasing their overall satisfaction.	Small details, such as button placement, typography, and visual hierarchy, can greatly impact how users interact with your site. By making thoughtful design choices that prioritize clarity and ease of use, you minimize cognitive load and keep users engaged. When users can navigate effortlessly, they’re more likely to spend time exploring your content or completing desired actions.	2025-07-23 23:41:04	2025-07-23 23:41:04
6	2	Engaging Through Emotion	Thoughtful UX design goes beyond functionality—it taps into users’ emotions. Engagement is not just about making a website usable; it’s about creating an emotional connection that resonates with the user. By incorporating elements of storytelling, visual appeal, and interactive features, you can evoke positive emotions that strengthen user engagement and loyalty.	Designing for emotion means considering how users feel at each stage of their journey. From welcoming new users with an intuitive onboarding process to celebrating a successful purchase with a personalized confirmation page, every interaction is an opportunity to foster connection. Thoughtful micro-interactions, such as subtle animations or encouraging messages, can add delight and reinforce a positive experience.	Ultimately, the goal of thoughtful UX design is to make users feel understood and valued. When users feel emotionally connected to your brand, they are more likely to return, recommend your product, and engage with your content on a deeper level. A user experience that resonates emotionally not only boosts engagement but also builds lasting relationships with your audience.	2025-07-23 23:41:27	2025-07-23 23:41:27
7	3	Prioritizing User Needs	At the heart of thoughtful UX design is a deep understanding of the user. Boosting engagement starts with knowing who your users are, what they need, and how they interact with your website or app. Every design decision should be rooted in making their experience as seamless and enjoyable as possible, ensuring that their needs are met intuitively.	To prioritize user needs, it’s important to conduct thorough research. This includes gathering data through user interviews, surveys, and analytics to identify pain points and areas for improvement. By understanding the user journey, you can tailor your design to eliminate friction and enhance usability, making it easier for users to achieve their goals.	A thoughtful UX design doesn’t just solve immediate problems—it anticipates future needs. By thinking ahead and considering how users’ behaviors might evolve, you can design an experience that adapts over time, ensuring continued engagement. The more users feel that their needs are being met effortlessly, the more likely they are to remain loyal to your product or service.	2025-07-23 23:42:05	2025-07-23 23:42:05
8	3	Creating a Seamless Flow	A key aspect of UX design that drives engagement is creating a seamless, intuitive flow. Users should be able to navigate through your website or app without confusion, frustration, or unnecessary clicks. Thoughtful design maps out clear paths for users, guiding them naturally from one step to the next while ensuring that important information is easily accessible.	Consistency is essential in establishing a smooth user flow. This means maintaining consistent layouts, visual cues, and interactions across all pages or screens. Whether users are exploring your homepage or completing a purchase, a cohesive experience helps them stay focused and confident in their actions, increasing their overall satisfaction.	Small details, such as button placement, typography, and visual hierarchy, can greatly impact how users interact with your site. By making thoughtful design choices that prioritize clarity and ease of use, you minimize cognitive load and keep users engaged. When users can navigate effortlessly, they’re more likely to spend time exploring your content or completing desired actions.	2025-07-23 23:42:39	2025-07-23 23:42:39
9	3	Engaging Through Emotion	Thoughtful UX design goes beyond functionality—it taps into users’ emotions. Engagement is not just about making a website usable; it’s about creating an emotional connection that resonates with the user. By incorporating elements of storytelling, visual appeal, and interactive features, you can evoke positive emotions that strengthen user engagement and loyalty.	Designing for emotion means considering how users feel at each stage of their journey. From welcoming new users with an intuitive onboarding process to celebrating a successful purchase with a personalized confirmation page, every interaction is an opportunity to foster connection. Thoughtful micro-interactions, such as subtle animations or encouraging messages, can add delight and reinforce a positive experience.	Ultimately, the goal of thoughtful UX design is to make users feel understood and valued. When users feel emotionally connected to your brand, they are more likely to return, recommend your product, and engage with your content on a deeper level. A user experience that resonates emotionally not only boosts engagement but also builds lasting relationships with your audience.	2025-07-23 23:43:02	2025-07-23 23:43:02
10	4	Prioritizing User Needs	At the heart of thoughtful UX design is a deep understanding of the user. Boosting engagement starts with knowing who your users are, what they need, and how they interact with your website or app. Every design decision should be rooted in making their experience as seamless and enjoyable as possible, ensuring that their needs are met intuitively.	To prioritize user needs, it’s important to conduct thorough research. This includes gathering data through user interviews, surveys, and analytics to identify pain points and areas for improvement. By understanding the user journey, you can tailor your design to eliminate friction and enhance usability, making it easier for users to achieve their goals.	A thoughtful UX design doesn’t just solve immediate problems—it anticipates future needs. By thinking ahead and considering how users’ behaviors might evolve, you can design an experience that adapts over time, ensuring continued engagement. The more users feel that their needs are being met effortlessly, the more likely they are to remain loyal to your product or service.	2025-07-23 23:43:43	2025-07-23 23:43:43
11	4	Creating a Seamless Flow	A key aspect of UX design that drives engagement is creating a seamless, intuitive flow. Users should be able to navigate through your website or app without confusion, frustration, or unnecessary clicks. Thoughtful design maps out clear paths for users, guiding them naturally from one step to the next while ensuring that important information is easily accessible.	Consistency is essential in establishing a smooth user flow. This means maintaining consistent layouts, visual cues, and interactions across all pages or screens. Whether users are exploring your homepage or completing a purchase, a cohesive experience helps them stay focused and confident in their actions, increasing their overall satisfaction.	Small details, such as button placement, typography, and visual hierarchy, can greatly impact how users interact with your site. By making thoughtful design choices that prioritize clarity and ease of use, you minimize cognitive load and keep users engaged. When users can navigate effortlessly, they’re more likely to spend time exploring your content or completing desired actions.	2025-07-23 23:44:02	2025-07-23 23:44:02
12	4	Engaging Through Emotion	Thoughtful UX design goes beyond functionality—it taps into users’ emotions. Engagement is not just about making a website usable; it’s about creating an emotional connection that resonates with the user. By incorporating elements of storytelling, visual appeal, and interactive features, you can evoke positive emotions that strengthen user engagement and loyalty.	Designing for emotion means considering how users feel at each stage of their journey. From welcoming new users with an intuitive onboarding process to celebrating a successful purchase with a personalized confirmation page, every interaction is an opportunity to foster connection. Thoughtful micro-interactions, such as subtle animations or encouraging messages, can add delight and reinforce a positive experience.	Ultimately, the goal of thoughtful UX design is to make users feel understood and valued. When users feel emotionally connected to your brand, they are more likely to return, recommend your product, and engage with your content on a deeper level. A user experience that resonates emotionally not only boosts engagement but also builds lasting relationships with your audience.	2025-07-23 23:44:25	2025-07-23 23:44:25
13	5	Prioritizing User Needs	At the heart of thoughtful UX design is a deep understanding of the user. Boosting engagement starts with knowing who your users are, what they need, and how they interact with your website or app. Every design decision should be rooted in making their experience as seamless and enjoyable as possible, ensuring that their needs are met intuitively.	To prioritize user needs, it’s important to conduct thorough research. This includes gathering data through user interviews, surveys, and analytics to identify pain points and areas for improvement. By understanding the user journey, you can tailor your design to eliminate friction and enhance usability, making it easier for users to achieve their goals.	A thoughtful UX design doesn’t just solve immediate problems—it anticipates future needs. By thinking ahead and considering how users’ behaviors might evolve, you can design an experience that adapts over time, ensuring continued engagement. The more users feel that their needs are being met effortlessly, the more likely they are to remain loyal to your product or service.	2025-07-23 23:45:15	2025-07-23 23:45:15
14	5	Creating a Seamless Flow	A key aspect of UX design that drives engagement is creating a seamless, intuitive flow. Users should be able to navigate through your website or app without confusion, frustration, or unnecessary clicks. Thoughtful design maps out clear paths for users, guiding them naturally from one step to the next while ensuring that important information is easily accessible.	Consistency is essential in establishing a smooth user flow. This means maintaining consistent layouts, visual cues, and interactions across all pages or screens. Whether users are exploring your homepage or completing a purchase, a cohesive experience helps them stay focused and confident in their actions, increasing their overall satisfaction.	Small details, such as button placement, typography, and visual hierarchy, can greatly impact how users interact with your site. By making thoughtful design choices that prioritize clarity and ease of use, you minimize cognitive load and keep users engaged. When users can navigate effortlessly, they’re more likely to spend time exploring your content or completing desired actions.	2025-07-23 23:45:35	2025-07-23 23:45:35
15	5	Engaging Through Emotion	Thoughtful UX design goes beyond functionality—it taps into users’ emotions. Engagement is not just about making a website usable; it’s about creating an emotional connection that resonates with the user. By incorporating elements of storytelling, visual appeal, and interactive features, you can evoke positive emotions that strengthen user engagement and loyalty.	Designing for emotion means considering how users feel at each stage of their journey. From welcoming new users with an intuitive onboarding process to celebrating a successful purchase with a personalized confirmation page, every interaction is an opportunity to foster connection. Thoughtful micro-interactions, such as subtle animations or encouraging messages, can add delight and reinforce a positive experience.	Ultimately, the goal of thoughtful UX design is to make users feel understood and valued. When users feel emotionally connected to your brand, they are more likely to return, recommend your product, and engage with your content on a deeper level. A user experience that resonates emotionally not only boosts engagement but also builds lasting relationships with your audience.	2025-07-23 23:46:09	2025-07-23 23:46:09
16	6	Prioritizing User Needs	At the heart of thoughtful UX design is a deep understanding of the user. Boosting engagement starts with knowing who your users are, what they need, and how they interact with your website or app. Every design decision should be rooted in making their experience as seamless and enjoyable as possible, ensuring that their needs are met intuitively.	To prioritize user needs, it’s important to conduct thorough research. This includes gathering data through user interviews, surveys, and analytics to identify pain points and areas for improvement. By understanding the user journey, you can tailor your design to eliminate friction and enhance usability, making it easier for users to achieve their goals.	A thoughtful UX design doesn’t just solve immediate problems—it anticipates future needs. By thinking ahead and considering how users’ behaviors might evolve, you can design an experience that adapts over time, ensuring continued engagement. The more users feel that their needs are being met effortlessly, the more likely they are to remain loyal to your product or service.	2025-07-23 23:47:22	2025-07-23 23:47:22
17	6	Creating a Seamless Flow	A key aspect of UX design that drives engagement is creating a seamless, intuitive flow. Users should be able to navigate through your website or app without confusion, frustration, or unnecessary clicks. Thoughtful design maps out clear paths for users, guiding them naturally from one step to the next while ensuring that important information is easily accessible.	Consistency is essential in establishing a smooth user flow. This means maintaining consistent layouts, visual cues, and interactions across all pages or screens. Whether users are exploring your homepage or completing a purchase, a cohesive experience helps them stay focused and confident in their actions, increasing their overall satisfaction.	Small details, such as button placement, typography, and visual hierarchy, can greatly impact how users interact with your site. By making thoughtful design choices that prioritize clarity and ease of use, you minimize cognitive load and keep users engaged. When users can navigate effortlessly, they’re more likely to spend time exploring your content or completing desired actions.	2025-07-23 23:47:43	2025-07-23 23:47:43
18	6	Engaging Through Emotion	Thoughtful UX design goes beyond functionality—it taps into users’ emotions. Engagement is not just about making a website usable; it’s about creating an emotional connection that resonates with the user. By incorporating elements of storytelling, visual appeal, and interactive features, you can evoke positive emotions that strengthen user engagement and loyalty.	Designing for emotion means considering how users feel at each stage of their journey. From welcoming new users with an intuitive onboarding process to celebrating a successful purchase with a personalized confirmation page, every interaction is an opportunity to foster connection. Thoughtful micro-interactions, such as subtle animations or encouraging messages, can add delight and reinforce a positive experience.	Ultimately, the goal of thoughtful UX design is to make users feel understood and valued. When users feel emotionally connected to your brand, they are more likely to return, recommend your product, and engage with your content on a deeper level. A user experience that resonates emotionally not only boosts engagement but also builds lasting relationships with your audience.	2025-07-23 23:48:06	2025-07-23 23:48:06
\.


--
-- Data for Name: blog_posts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_posts (id, image, "position", title, description, created_at, updated_at, slug, status, seo_title, seo_description, seo_image, sort_order) FROM stdin;
5	/storage/blog/1753309074_blog_img5.jpg	(Креативный директор)	организация визита первого лица	организация визита первого лица\r\nВ сопровождении мэра столицы Сергея Собянина Президент побывал в цехе производства БПЛА.	2025-07-23 22:17:54	2025-07-24 22:55:11	organizatsiya-vizita-pervogo-litsa	t	Организация визита первого лица - Съемка визита Президента в цех производства БПЛА | Nik Studio	Эксклюзивный кейс организации и съемки визита Президента РФ в цех производства беспилотных летательных аппаратов в сопровождении мэра Москвы Сергея Собянина. Профессиональная медиа-поддержка мероприятий высшего государственного уровня от Nik Studio.	seo/blog/1753397711_blog_5_blog_img5.jpg	5
6	/storage/blog/1753309140_blog_img6.jpg	(Креативный директор)	участие в стратсессии руднево	Организовали съёмку стратегической сессии в ОЭЦ «Технополис Москва» в Руднево с участием С.С. Собянина	2025-07-23 22:19:00	2025-07-24 22:56:05	uchastie-v-stratsessii-rudnevo	t	Участие в стратсессии Руднево - Съемка в ОЭЦ «Технополис Москва» с С.С. Собяниным | Nik Studio	Профессиональная организация съемки стратегической сессии в ОЭЦ «Технополис Москва» в Руднево с участием мэра Москвы Сергея Собянина. Эксклюзивный опыт медиа-сопровождения государственных стратегических мероприятий и работы с высокопоставленными лицами.	seo/blog/1753397765_blog_6_blog_img6.jpg	6
2	/storage/blog/1753308849_blog_img2.jpg	(Креативный директор)	со сложного языка в простой визуал	Learn practical tips for designing websites that are both visually appealing and user-friendly.	2025-07-23 22:14:09	2025-07-24 22:51:33	so-slozhnogo-yazyka-v-prostoy-vizual	t	Со сложного языка в простой визуал - Практические советы по дизайну сайтов | Nik Studio	Изучите практические советы по созданию сайтов, которые одновременно визуально привлекательны и удобны для пользователей. Экспертные рекомендации креативного директора о том, как превратить сложную техническую информацию в понятный и эффективный визуальный дизайн.	seo/blog/1753397493_blog_2_blog_img2.jpg	2
3	/storage/blog/1753308926_blog_img3.jpg	(Креативный директор)	правильные фото экономят бюджет	Explore why responsive design is crucial for enhancing experience and increasing conversions.	2025-07-23 22:15:26	2025-07-24 22:52:44	pravilnye-foto-ekonomyat-byudzhet	t	Правильные фото экономят бюджет - Как качественная фотосъемка влияет на ROI | Nik Studio	Узнайте, почему адаптивный дизайн и профессиональная фотосъемка критически важны для улучшения пользовательского опыта и увеличения конверсий. Экспертные советы креативного директора о том, как правильная фотография экономит маркетинговый бюджет и повышает эффективность рекламы.	seo/blog/1753397564_blog_3_blog_img3.jpg	3
4	/storage/blog/1753309019_blog_img4.jpg	(Креативный директор)	umex & simtex 2024	Подготовили компанию «АЭРОМАКС» и сопроводили на выставке в Абу Даби. Создали стильный и продающий контент.	2025-07-23 22:17:00	2025-07-24 22:53:48	umex-simtex-2024	t	UMEX & SIMTEX 2024 - Подготовка АЭРОМАКС к выставке в Абу-Даби | Nik Studio	Кейс успешной подготовки компании «АЭРОМАКС» к международной выставке UMEX & SIMTEX 2024 в Абу-Даби. Создали стильный и продающий контент, обеспечили полное сопровождение на выставке. Экспертный опыт работы с авиационными компаниями на международных площадках.	seo/blog/1753397628_blog_4_blog_img4.jpg	4
1	/storage/blog/1753308688_blog_img1.jpg	(Креативный директор)	почему продуманный дизайн продает	Discover key strategies to create a memorable and impactful brand for your small business.	2025-07-22 22:51:52	2025-07-25 00:43:19	pochemu-produmannyy-dizayn-prodaet	t	Почему продуманный дизайн продает - Ключевые стратегии эффективного брендинга | Nik Studio	Узнайте ключевые стратегии создания запоминающегося и эффективного бренда для вашего бизнеса. Экспертные советы креативного директора о том, как продуманный дизайн влияет на продажи и формирует доверие клиентов. Практические рекомендации от Nik Studio.	seo/blog/1753397423_blog_1_blog_img1.jpg	1
\.


--
-- Data for Name: cache; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cache (key, value, expiration) FROM stdin;
laravel_cache_5c785c036466adea360111aa28563bfd556b5fba:timer	i:1753314617;	1753314617
laravel_cache_5c785c036466adea360111aa28563bfd556b5fba	i:1;	1753314618
\.


--
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cache_locks (key, owner, expiration) FROM stdin;
\.


--
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- Data for Name: home_contents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.home_contents (id, hero_video_path, hero_video_original_name, hero_video_size, hero_fallback_image_path, is_active, created_at, updated_at) FROM stdin;
1	home/hero-videos/hero-video-2025-07-24_04-31-22.mp4	NS3.mp4	14977482	\N	t	2025-07-24 04:31:22	2025-07-24 04:31:22
\.


--
-- Data for Name: job_batches; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job_batches (id, name, total_jobs, pending_jobs, failed_jobs, failed_job_ids, options, cancelled_at, created_at, finished_at) FROM stdin;
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
\.


--
-- Data for Name: media_page_content; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media_page_content (id, hero_title, hero_description, testimonials_title, testimonials_subtitle, process_title, process_subtitle, created_at, updated_at) FROM stdin;
10	МЕДИА	Создаём проекты комплексно и выполняем отдельные задачи	говорят о нас	Команда NIKstudio закрывает целый ряд задач с энтузиазмом и полной ответственностью	процесс	Процесс работы строится на взаимодействии всех специалистов под единым руководством	2025-07-22 23:29:59	2025-07-23 04:33:03
\.


--
-- Data for Name: media_process_steps; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media_process_steps (id, step_number, title, subtitle, image_path, description_left, description_right, "order", created_at, updated_at) FROM stdin;
39	3	Создаём контент	Генерим идеи	media/process-steps/0AN8rq1v5Y1Nsf0Im3kz8tlrzv0F0PbJ0pJBTyBo.png	In the development stage, we transform approved designs into fully functional websites or applications. Our skilled developers utilize the latest technologies to ensure optimal performance, responsiveness, and security.	We conduct thorough testing throughout this phase, addressing any issues to deliver a polished final product that exceeds expectations.	3	2025-07-23 03:49:01	2025-07-24 22:08:34
40	4	Реализуем концепцию	Собираем весь проект воедино	media/process-steps/zrTUnLj5euFeBfaLw7akqiar7fEatPkCqnJjFfbT.png	After final reviews and testing, we launch your project with precision and care. Our team ensures a smooth transition while providing ongoing support and maintenance.	We’re committed to your success, offering guidance and updates to keep your website or application running optimally and evolving with your needs.	4	2025-07-23 04:00:30	2025-07-24 22:09:49
37	1	Изучаем ваш продукт	Вникаем в нишу и смотрим конкурентов	media/process-steps/S5DngYwBxZhSilOvSeRSyTUBMBdv4o57qJTjypyA.png	In the discovery phase, we immerse ourselves in your brand’s vision, goals, and target audience. Through collaborative discussions and research, we gather insights that inform our strategy.	This foundational step ensures that our design solutions align perfectly with your objectives and resonate deeply with your audience.	1	2025-07-22 23:07:49	2025-07-24 22:04:50
38	2	Концепция	Уникальная стратегия	media/process-steps/k1f4YTvTj0FjwOsPjIVe6mvo6xJDFdQlDGG5n5Yv.png	During the design phase, our team translates insights into visually captivating and functional designs. We create wireframes, prototypes, and mockups, allowing you to visualize the project.	This iterative process encourages collaboration and feedback, ensuring the final design reflects your brand identity while enhancing user experience.	2	2025-07-23 02:03:18	2025-07-24 22:07:45
\.


--
-- Data for Name: media_service_features; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media_service_features (id, service_id, title, description, "order", created_at, updated_at) FROM stdin;
177	48	Брендбук и рекомендации по использованию	["\\u0421\\u043e\\u0441\\u0442\\u0430\\u0432\\u043b\\u0435\\u043d\\u0438\\u0435 \\u0434\\u0435\\u0442\\u0430\\u043b\\u0438\\u0437\\u0438\\u0440\\u043e\\u0432\\u0430\\u043d\\u043d\\u043e\\u0433\\u043e \\u0431\\u0440\\u0435\\u043d\\u0434\\u0431\\u0443\\u043a\\u0430 \\u0434\\u043b\\u044f \\u0435\\u0434\\u0438\\u043d\\u043e\\u043e\\u0431\\u0440\\u0430\\u0437\\u043d\\u043e\\u0433\\u043e \\u043f\\u0440\\u0438\\u043c\\u0435\\u043d\\u0435\\u043d\\u0438\\u044f \\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u044c\\u043d\\u044b\\u0445 \\u044d\\u043b\\u0435\\u043c\\u0435\\u043d\\u0442\\u043e\\u0432 \\u043d\\u0430 \\u0432\\u0441\\u0435\\u0445 \\u043d\\u043e\\u0441\\u0438\\u0442\\u0435\\u043b\\u044f\\u0445 \\u2013 \\u043e\\u0442 \\u0446\\u0438\\u0444\\u0440\\u043e\\u0432\\u044b\\u0445 \\u043a\\u0430\\u043d\\u0430\\u043b\\u043e\\u0432 \\u0434\\u043e \\u043f\\u0435\\u0447\\u0430\\u0442\\u043d\\u043e\\u0439 \\u043f\\u0440\\u043e\\u0434\\u0443\\u043a\\u0446\\u0438\\u0438, \\u0430\\u0432\\u0442\\u043e\\u043c\\u043e\\u0431\\u0438\\u043b\\u0435\\u0439 \\u0438 \\u0444\\u0438\\u0440\\u043c\\u0435\\u043d\\u043d\\u043e\\u0433\\u043e \\u043c\\u0435\\u0440\\u0447\\u0430."]	3	2025-07-24 15:27:38	2025-07-24 15:27:38
182	49	Дизайн печатной продукции	["\\u0420\\u0430\\u0437\\u0440\\u0430\\u0431\\u043e\\u0442\\u043a\\u0430 \\u043c\\u0430\\u043a\\u0435\\u0442\\u043e\\u0432 \\u0434\\u043b\\u044f \\u0431\\u0440\\u043e\\u0448\\u044e\\u0440, \\u043a\\u0430\\u0442\\u0430\\u043b\\u043e\\u0433\\u043e\\u0432, \\u0432\\u0438\\u0437\\u0438\\u0442\\u043e\\u043a, \\u043f\\u043b\\u0430\\u043a\\u0430\\u0442\\u043e\\u0432 \\u0438 \\u0434\\u0440\\u0443\\u0433\\u0438\\u0445 \\u043c\\u0430\\u0442\\u0435\\u0440\\u0438\\u0430\\u043b\\u043e\\u0432.\\n\\u0422\\u0432\\u043e\\u0440\\u0447\\u0435\\u0441\\u043a\\u0438\\u0439 \\u043f\\u043e\\u0434\\u0445\\u043e\\u0434 \\u0438 \\u0442\\u043e\\u0447\\u043d\\u0430\\u044f \\u043f\\u0435\\u0440\\u0435\\u0434\\u0430\\u0447\\u0430 \\u0444\\u0438\\u0440\\u043c\\u0435\\u043d\\u043d\\u043e\\u0433\\u043e \\u0441\\u0442\\u0438\\u043b\\u044f."]	1	2025-07-24 15:34:40	2025-07-24 15:34:40
189	50	Подготовка к печати	["\\u041f\\u0440\\u043e\\u0444\\u0435\\u0441\\u0441\\u0438\\u043e\\u043d\\u0430\\u043b\\u044c\\u043d\\u0430\\u044f \\u043f\\u0440\\u0435\\u0434\\u043f\\u0435\\u0447\\u0430\\u0442\\u043d\\u0430\\u044f \\u043f\\u043e\\u0434\\u0433\\u043e\\u0442\\u043e\\u0432\\u043a\\u0430 \\u043c\\u0430\\u043a\\u0435\\u0442\\u043e\\u0432, \\u0432\\u043a\\u043b\\u044e\\u0447\\u0430\\u044f \\u043a\\u043e\\u043d\\u0442\\u0440\\u043e\\u043b\\u044c \\u043a\\u0430\\u0447\\u0435\\u0441\\u0442\\u0432\\u0430 \\u0438 \\u0441\\u043e\\u043e\\u0442\\u0432\\u0435\\u0442\\u0441\\u0442\\u0432\\u0438\\u0435 \\u0442\\u0435\\u0445\\u043d\\u0438\\u0447\\u0435\\u0441\\u043a\\u0438\\u043c \\u0442\\u0440\\u0435\\u0431\\u043e\\u0432\\u0430\\u043d\\u0438\\u044f\\u043c \\u0442\\u0438\\u043f\\u043e\\u0433\\u0440\\u0430\\u0444\\u0438\\u0439.\\n\\u041a\\u043e\\u043d\\u0441\\u0443\\u043b\\u044c\\u0442\\u0430\\u0446\\u0438\\u0438 \\u043f\\u043e \\u0432\\u044b\\u0431\\u043e\\u0440\\u0443 \\u043c\\u0430\\u0442\\u0435\\u0440\\u0438\\u0430\\u043b\\u043e\\u0432 \\u0438 \\u0442\\u0435\\u0445\\u043d\\u043e\\u043b\\u043e\\u0433\\u0438\\u0439 \\u043f\\u0435\\u0447\\u0430\\u0442\\u0438 \\u0434\\u043b\\u044f \\u043e\\u043f\\u0442\\u0438\\u043c\\u0430\\u043b\\u044c\\u043d\\u043e\\u0433\\u043e \\u0440\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\\u0430."]	2	2025-07-24 15:45:43	2025-07-24 15:45:43
208	52	Отраслевые особенности — переведены в понятный визуальный язык	["- \\u041c\\u044b \\u0443\\u043c\\u0435\\u0435\\u043c \\u0440\\u0430\\u0431\\u043e\\u0442\\u0430\\u0442\\u044c \\u0441 \\u0442\\u0435\\u0445\\u043d\\u043e\\u043b\\u043e\\u0433\\u0438\\u0447\\u0435\\u0441\\u043a\\u0438\\u043c\\u0438, \\u0438\\u043d\\u0436\\u0435\\u043d\\u0435\\u0440\\u043d\\u044b\\u043c\\u0438 \\u0438 \\u043f\\u0440\\u043e\\u0438\\u0437\\u0432\\u043e\\u0434\\u0441\\u0442\\u0432\\u0435\\u043d\\u043d\\u044b\\u043c\\u0438 \\u043a\\u043e\\u043c\\u043f\\u0430\\u043d\\u0438\\u044f\\u043c\\u0438. \\u0418 \\u0437\\u043d\\u0430\\u0435\\u043c, \\u043a\\u0430\\u043a \\u043f\\u043e\\u043a\\u0430\\u0437\\u0430\\u0442\\u044c \\u0441\\u043b\\u043e\\u0436\\u043d\\u044b\\u0435 \\u043f\\u0440\\u043e\\u0446\\u0435\\u0441\\u0441\\u044b \\u0438 \\u0440\\u0435\\u0448\\u0435\\u043d\\u0438\\u044f \\u043f\\u0440\\u043e\\u0441\\u0442\\u044b\\u043c \\u044f\\u0437\\u044b\\u043a\\u043e\\u043c:","- \\u0418\\u0441\\u043f\\u043e\\u043b\\u044c\\u0437\\u0443\\u0435\\u043c 3D-\\u043c\\u043e\\u0434\\u0435\\u043b\\u0438, \\u0441\\u0445\\u0435\\u043c\\u044b, \\u0430\\u043d\\u0438\\u043c\\u0430\\u0446\\u0438\\u0438","- \\u0421\\u043e\\u0437\\u0434\\u0430\\u0451\\u043c \\u0438\\u043d\\u0444\\u043e\\u0433\\u0440\\u0430\\u0444\\u0438\\u043a\\u0443 \\u0438 \\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u0438\\u0437\\u0430\\u0446\\u0438\\u044e \\u0442\\u0435\\u0445\\u043f\\u0440\\u043e\\u0446\\u0435\\u0441\\u0441\\u043e\\u0432","- \\u0420\\u0430\\u0437\\u0440\\u0430\\u0431\\u0430\\u0442\\u044b\\u0432\\u0430\\u0435\\u043c \\u043a\\u0430\\u0442\\u0430\\u043b\\u043e\\u0433\\u0438 \\u043f\\u0440\\u043e\\u0434\\u0443\\u043a\\u0446\\u0438\\u0438, \\u0444\\u0438\\u043b\\u044c\\u0442\\u0440\\u044b, \\u043a\\u0430\\u043b\\u044c\\u043a\\u0443\\u043b\\u044f\\u0442\\u043e\\u0440\\u044b, \\u0435\\u0441\\u043b\\u0438 \\u043d\\u0443\\u0436\\u043d\\u043e","- \\u0423\\u0447\\u0438\\u0442\\u044b\\u0432\\u0430\\u0435\\u043c \\u043d\\u043e\\u0440\\u043c\\u0430\\u0442\\u0438\\u0432\\u043d\\u044b\\u0435, \\u0442\\u0435\\u0445\\u043d\\u0438\\u0447\\u0435\\u0441\\u043a\\u0438\\u0435 \\u0438 \\u043e\\u0442\\u0440\\u0430\\u0441\\u043b\\u0435\\u0432\\u044b\\u0435 \\u0442\\u0440\\u0435\\u0431\\u043e\\u0432\\u0430\\u043d\\u0438\\u044f","- \\u0420\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442 \\u2014 \\u0441\\u0430\\u0439\\u0442, \\u043a\\u043e\\u0442\\u043e\\u0440\\u044b\\u0439 \\u043d\\u0435 \\u043f\\u0443\\u0433\\u0430\\u0435\\u0442 \\u0441\\u043b\\u043e\\u0436\\u043d\\u043e\\u0441\\u0442\\u044c\\u044e, \\u0430 \\u0432\\u044b\\u0437\\u044b\\u0432\\u0430\\u0435\\u0442 \\u0438\\u043d\\u0442\\u0435\\u0440\\u0435\\u0441 \\u0438 \\u0434\\u043e\\u0432\\u0435\\u0440\\u0438\\u0435."]	4	2025-07-24 17:21:36	2025-07-24 17:21:36
175	48	Концепция и стратегия бренда	["\\u0424\\u043e\\u0440\\u043c\\u0438\\u0440\\u043e\\u0432\\u0430\\u043d\\u0438\\u0435 \\u0443\\u043d\\u0438\\u043a\\u0430\\u043b\\u044c\\u043d\\u043e\\u0439 \\u043a\\u043e\\u043d\\u0446\\u0435\\u043f\\u0446\\u0438\\u0438 \\u0431\\u0440\\u0435\\u043d\\u0434\\u0430 \\u0441 \\u0443\\u0447\\u0451\\u0442\\u043e\\u043c \\u0441\\u043f\\u0435\\u0446\\u0438\\u0444\\u0438\\u043a\\u0438 \\u0431\\u0438\\u0437\\u043d\\u0435\\u0441\\u0430 \\u043a\\u043b\\u0438\\u0435\\u043d\\u0442\\u0430 \\u0438 \\u0446\\u0435\\u043b\\u0435\\u0432\\u043e\\u0439 \\u0430\\u0443\\u0434\\u0438\\u0442\\u043e\\u0440\\u0438\\u0438.\\n\\u0420\\u0430\\u0437\\u0440\\u0430\\u0431\\u043e\\u0442\\u043a\\u0430 \\u043f\\u043e\\u0437\\u0438\\u0446\\u0438\\u043e\\u043d\\u0438\\u0440\\u043e\\u0432\\u0430\\u043d\\u0438\\u044f \\u0431\\u0440\\u0435\\u043d\\u0434\\u0430, \\u0444\\u043e\\u0440\\u043c\\u0438\\u0440\\u043e\\u0432\\u0430\\u043d\\u0438\\u0435 \\u043c\\u0438\\u0441\\u0441\\u0438\\u0438, \\u0446\\u0435\\u043d\\u043d\\u043e\\u0441\\u0442\\u0435\\u0439 \\u0438 \\u043e\\u0431\\u0435\\u0449\\u0430\\u043d\\u0438\\u044f \\u0431\\u0440\\u0435\\u043d\\u0434\\u0430."]	1	2025-07-24 15:27:37	2025-07-24 15:27:37
178	48	Создаём сильную визуальную идентичность, которая формирует запоминаемый образ компании и выделяет её на фоне конкурентов.	["- \\u0420\\u0430\\u0437\\u0440\\u0430\\u0431\\u043e\\u0442\\u043a\\u0430 \\u043b\\u043e\\u0433\\u043e\\u0442\\u0438\\u043f\\u043e\\u0432 \\u0438 \\u0444\\u0438\\u0440\\u043c\\u0435\\u043d\\u043d\\u044b\\u0445 \\u0437\\u043d\\u0430\\u043a\\u043e\\u0432","- \\u0421\\u043e\\u0437\\u0434\\u0430\\u043d\\u0438\\u0435 \\u0431\\u0440\\u0435\\u043d\\u0434\\u0431\\u0443\\u043a\\u0430 \\u0438 \\u0433\\u0430\\u0439\\u0434\\u043b\\u0430\\u0439\\u043d\\u043e\\u0432","- \\u0424\\u043e\\u0440\\u043c\\u0438\\u0440\\u043e\\u0432\\u0430\\u043d\\u0438\\u0435 \\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u044c\\u043d\\u043e\\u0433\\u043e \\u044f\\u0437\\u044b\\u043a\\u0430 \\u0431\\u0440\\u0435\\u043d\\u0434\\u0430","- \\u041d\\u0435\\u0439\\u043c\\u0438\\u043d\\u0433 \\u0438 \\u0441\\u043b\\u043e\\u0433\\u0430\\u043d\\u044b","- \\u0410\\u0443\\u0434\\u0438\\u0442 \\u0442\\u0435\\u043a\\u0443\\u0449\\u0435\\u0433\\u043e \\u0431\\u0440\\u0435\\u043d\\u0434\\u0430 \\u0438 \\u0440\\u0435\\u0431\\u0440\\u0435\\u043d\\u0434\\u0438\\u043d\\u0433","- \\u0424\\u043e\\u0440\\u043c\\u0438\\u0440\\u043e\\u0432\\u0430\\u043d\\u0438\\u0435 \\u0431\\u0440\\u0435\\u043d\\u0434\\u0430 \\u00ab\\u043f\\u043e\\u0434 \\u0432\\u044b\\u0441\\u0442\\u0430\\u0432\\u043a\\u0443\\u00bb \\u0441 \\u0443\\u0447\\u0451\\u0442\\u043e\\u043c \\u0446\\u0435\\u043b\\u0435\\u0439 \\u044d\\u043a\\u0441\\u043f\\u043e\\u043d\\u0438\\u0440\\u043e\\u0432\\u0430\\u043d\\u0438\\u044f"]	4	2025-07-24 15:27:39	2025-07-24 15:27:39
183	49	Подготовка к печати	["\\u041f\\u0440\\u043e\\u0444\\u0435\\u0441\\u0441\\u0438\\u043e\\u043d\\u0430\\u043b\\u044c\\u043d\\u0430\\u044f \\u043f\\u0440\\u0435\\u0434\\u043f\\u0435\\u0447\\u0430\\u0442\\u043d\\u0430\\u044f \\u043f\\u043e\\u0434\\u0433\\u043e\\u0442\\u043e\\u0432\\u043a\\u0430 \\u043c\\u0430\\u043a\\u0435\\u0442\\u043e\\u0432, \\u0432\\u043a\\u043b\\u044e\\u0447\\u0430\\u044f \\u043a\\u043e\\u043d\\u0442\\u0440\\u043e\\u043b\\u044c \\u043a\\u0430\\u0447\\u0435\\u0441\\u0442\\u0432\\u0430 \\u0438 \\u0441\\u043e\\u043e\\u0442\\u0432\\u0435\\u0442\\u0441\\u0442\\u0432\\u0438\\u0435 \\u0442\\u0435\\u0445\\u043d\\u0438\\u0447\\u0435\\u0441\\u043a\\u0438\\u043c \\u0442\\u0440\\u0435\\u0431\\u043e\\u0432\\u0430\\u043d\\u0438\\u044f\\u043c \\u0442\\u0438\\u043f\\u043e\\u0433\\u0440\\u0430\\u0444\\u0438\\u0439.\\n\\u041a\\u043e\\u043d\\u0441\\u0443\\u043b\\u044c\\u0442\\u0430\\u0446\\u0438\\u0438 \\u043f\\u043e \\u0432\\u044b\\u0431\\u043e\\u0440\\u0443 \\u043c\\u0430\\u0442\\u0435\\u0440\\u0438\\u0430\\u043b\\u043e\\u0432 \\u0438 \\u0442\\u0435\\u0445\\u043d\\u043e\\u043b\\u043e\\u0433\\u0438\\u0439 \\u043f\\u0435\\u0447\\u0430\\u0442\\u0438 \\u0434\\u043b\\u044f \\u043e\\u043f\\u0442\\u0438\\u043c\\u0430\\u043b\\u044c\\u043d\\u043e\\u0433\\u043e \\u0440\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\\u0430."]	2	2025-07-24 15:34:40	2025-07-24 15:34:40
164	46	Презентационные материалы	["\\u0421\\u043e\\u0437\\u0434\\u0430\\u043d\\u0438\\u0435 \\u0434\\u0438\\u0437\\u0430\\u0439\\u043d\\u0430 \\u043f\\u0440\\u0435\\u0437\\u0435\\u043d\\u0442\\u0430\\u0446\\u0438\\u0439, \\u0432\\u0438\\u0434\\u0435\\u043e-\\u0440\\u043e\\u043b\\u0438\\u043a\\u043e\\u0432 \\u0438 \\u0433\\u0440\\u0430\\u0444\\u0438\\u0447\\u0435\\u0441\\u043a\\u0438\\u0445 \\u043c\\u0430\\u0442\\u0435\\u0440\\u0438\\u0430\\u043b\\u043e\\u0432 \\u0434\\u043b\\u044f \\u0434\\u0435\\u043c\\u043e\\u043d\\u0441\\u0442\\u0440\\u0430\\u0446\\u0438\\u0438 \\u043d\\u0430 \\u0432\\u044b\\u0441\\u0442\\u0430\\u0432\\u043a\\u0430\\u0445.\\n\\u041e\\u0440\\u0433\\u0430\\u043d\\u0438\\u0437\\u0430\\u0446\\u0438\\u044f \\u0441\\u044a\\u0451\\u043c\\u043e\\u043a \\u0443\\u0447\\u0430\\u0441\\u0442\\u0438\\u044f \\u043a\\u043e\\u043c\\u043f\\u0430\\u043d\\u0438\\u0438 \\u043d\\u0430 \\u0432\\u044b\\u0441\\u0442\\u0430\\u0432\\u043a\\u0430\\u0445 \\u0441 \\u043f\\u043e\\u0441\\u043b\\u0435\\u0434\\u0443\\u044e\\u0449\\u0435\\u0439 \\u043e\\u0431\\u0440\\u0430\\u0431\\u043e\\u0442\\u043a\\u043e\\u0439 \\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u044c\\u043d\\u043e\\u0433\\u043e \\u043a\\u043e\\u043d\\u0442\\u0435\\u043d\\u0442\\u0430."]	1	2025-07-24 05:28:58	2025-07-24 05:28:58
165	46	Концепция и дизайн выставочных стендов	["\\u0420\\u0430\\u0437\\u0440\\u0430\\u0431\\u043e\\u0442\\u043a\\u0430 \\u0443\\u043d\\u0438\\u043a\\u0430\\u043b\\u044c\\u043d\\u044b\\u0445 \\u043a\\u043e\\u043d\\u0446\\u0435\\u043f\\u0446\\u0438\\u0439 \\u043e\\u0444\\u043e\\u0440\\u043c\\u043b\\u0435\\u043d\\u0438\\u044f \\u0432\\u044b\\u0441\\u0442\\u0430\\u0432\\u043e\\u0447\\u043d\\u044b\\u0445 \\u043f\\u0430\\u0432\\u0438\\u043b\\u044c\\u043e\\u043d\\u043e\\u0432 \\u0438 \\u0441\\u0442\\u0435\\u043d\\u0434\\u043e\\u0432, \\u0443\\u0447\\u0438\\u0442\\u044b\\u0432\\u0430\\u044e\\u0449\\u0438\\u0445 \\u0441\\u043f\\u0435\\u0446\\u0438\\u0444\\u0438\\u043a\\u0443 \\u043e\\u0442\\u0440\\u0430\\u0441\\u043b\\u0438 \\u0438 \\u043f\\u043e\\u0442\\u0440\\u0435\\u0431\\u043d\\u043e\\u0441\\u0442\\u0438 \\u0446\\u0435\\u043b\\u0435\\u0432\\u043e\\u0439 \\u0430\\u0443\\u0434\\u0438\\u0442\\u043e\\u0440\\u0438\\u0438.\\n\\u0418\\u043d\\u0442\\u0435\\u0433\\u0440\\u0430\\u0446\\u0438\\u044f \\u0444\\u0438\\u0440\\u043c\\u0435\\u043d\\u043d\\u043e\\u0433\\u043e \\u0441\\u0442\\u0438\\u043b\\u044f \\u0432 \\u0434\\u0438\\u0437\\u0430\\u0439\\u043d \\u044d\\u043a\\u0441\\u043f\\u043e\\u0437\\u0438\\u0446\\u0438\\u0438 \\u0434\\u043b\\u044f \\u0441\\u043e\\u0437\\u0434\\u0430\\u043d\\u0438\\u044f \\u0437\\u0430\\u043f\\u043e\\u043c\\u0438\\u043d\\u0430\\u044e\\u0449\\u0435\\u0433\\u043e\\u0441\\u044f \\u0438\\u043c\\u0438\\u0434\\u0436\\u0430."]	2	2025-07-24 05:28:59	2025-07-24 05:28:59
166	46	Комплексное сопровождение выставок	["\\u041a\\u043e\\u043c\\u043f\\u043b\\u0435\\u043a\\u0441\\u043d\\u043e\\u0435 \\u0441\\u043e\\u043f\\u0440\\u043e\\u0432\\u043e\\u0436\\u0434\\u0435\\u043d\\u0438\\u0435 \\u0432\\u044b\\u0441\\u0442\\u0430\\u0432\\u043e\\u043a\\n\\u041a\\u043e\\u043d\\u0441\\u0443\\u043b\\u044c\\u0442\\u0430\\u0446\\u0438\\u0438 \\u0438 \\u043f\\u043e\\u0434\\u0433\\u043e\\u0442\\u043e\\u0432\\u043a\\u0430 \\u0442\\u0435\\u0445\\u043d\\u0438\\u0447\\u0435\\u0441\\u043a\\u0438\\u0445 \\u0437\\u0430\\u0434\\u0430\\u043d\\u0438\\u0439 \\u0434\\u043b\\u044f \\u0432\\u0441\\u0435\\u0445 \\u044d\\u0442\\u0430\\u043f\\u043e\\u0432 \\u0432\\u044b\\u0441\\u0442\\u0430\\u0432\\u043e\\u0447\\u043d\\u043e\\u0439 \\u0434\\u0435\\u044f\\u0442\\u0435\\u043b\\u044c\\u043d\\u043e\\u0441\\u0442\\u0438.\\n\\u041c\\u043e\\u043d\\u0438\\u0442\\u043e\\u0440\\u0438\\u043d\\u0433 \\u0438 \\u043e\\u0446\\u0435\\u043d\\u043a\\u0430 \\u044d\\u0444\\u0444\\u0435\\u043a\\u0442\\u0438\\u0432\\u043d\\u043e\\u0441\\u0442\\u0438 \\u0443\\u0447\\u0430\\u0441\\u0442\\u0438\\u044f \\u0432 \\u0432\\u044b\\u0441\\u0442\\u0430\\u0432\\u043a\\u0430\\u0445 \\u0434\\u043b\\u044f \\u0434\\u0430\\u043b\\u044c\\u043d\\u0435\\u0439\\u0448\\u0435\\u0439 \\u043e\\u043f\\u0442\\u0438\\u043c\\u0438\\u0437\\u0430\\u0446\\u0438\\u0438 \\u043a\\u043e\\u043d\\u0446\\u0435\\u043f\\u0446\\u0438\\u0439.\\u043c\\u043c"]	3	2025-07-24 05:29:00	2025-07-24 05:29:00
176	48	Создание фирменного стиля	["\\u041f\\u0440\\u043e\\u0440\\u0430\\u0431\\u043e\\u0442\\u043a\\u0430 \\u043f\\u043e\\u043b\\u043d\\u043e\\u0439 \\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u044c\\u043d\\u043e\\u0439 \\u0430\\u0439\\u0434\\u0435\\u043d\\u0442\\u0438\\u043a\\u0438: \\u0432\\u044b\\u0431\\u043e\\u0440 \\u0446\\u0432\\u0435\\u0442\\u043e\\u0432\\u043e\\u0439 \\u043f\\u0430\\u043b\\u0438\\u0442\\u0440\\u044b, \\u0442\\u0438\\u043f\\u043e\\u0433\\u0440\\u0430\\u0444\\u0438\\u043a\\u0438, \\u043f\\u0430\\u0442\\u0442\\u0435\\u0440\\u043d\\u043e\\u0432 \\u0438 \\u044d\\u043b\\u0435\\u043c\\u0435\\u043d\\u0442\\u043e\\u0432 \\u0444\\u0438\\u0440\\u043c\\u0435\\u043d\\u043d\\u043e\\u0433\\u043e \\u0441\\u0442\\u0438\\u043b\\u044f.\\n\\u0420\\u0430\\u0437\\u0440\\u0430\\u0431\\u043e\\u0442\\u043a\\u0430 \\u043b\\u043e\\u0433\\u043e\\u0442\\u0438\\u043f\\u0430, \\u043a\\u043e\\u0442\\u043e\\u0440\\u044b\\u0439 \\u043e\\u0442\\u0440\\u0430\\u0436\\u0430\\u0435\\u0442 \\u0445\\u0430\\u0440\\u0430\\u043a\\u0442\\u0435\\u0440 \\u0438 \\u0443\\u043d\\u0438\\u043a\\u0430\\u043b\\u044c\\u043d\\u043e\\u0441\\u0442\\u044c \\u043a\\u043e\\u043c\\u043f\\u0430\\u043d\\u0438\\u0438."]	2	2025-07-24 15:27:37	2025-07-24 15:27:37
184	49	Комплексное оформление маркетинговых материалов	["\\u0421\\u043e\\u0433\\u043b\\u0430\\u0441\\u043e\\u0432\\u0430\\u043d\\u0438\\u0435 \\u0435\\u0434\\u0438\\u043d\\u043e\\u043e\\u0431\\u0440\\u0430\\u0437\\u043d\\u043e\\u0433\\u043e \\u0434\\u0438\\u0437\\u0430\\u0439\\u043d\\u0430 \\u0434\\u043b\\u044f \\u0432\\u0441\\u0435\\u0445 \\u043f\\u0435\\u0447\\u0430\\u0442\\u043d\\u044b\\u0445 \\u043c\\u0430\\u0442\\u0435\\u0440\\u0438\\u0430\\u043b\\u043e\\u0432, \\u043e\\u0431\\u0435\\u0441\\u043f\\u0435\\u0447\\u0438\\u0432\\u0430\\u044f \\u0446\\u0435\\u043b\\u043e\\u0441\\u0442\\u043d\\u043e\\u0435 \\u043f\\u0440\\u0435\\u0434\\u0441\\u0442\\u0430\\u0432\\u043b\\u0435\\u043d\\u0438\\u0435 \\u0431\\u0440\\u0435\\u043d\\u0434\\u0430."]	3	2025-07-24 15:34:41	2025-07-24 15:34:41
188	50	Особый технический взгляд на продукт и производство	["\\u041c\\u044b \\u0432\\u0438\\u0434\\u0438\\u043c \\u043d\\u0435 \\u043f\\u0440\\u043e\\u0441\\u0442\\u043e \\u00ab\\u0447\\u0442\\u043e \\u0435\\u0441\\u0442\\u044c\\u00bb, \\u0430 \\u0447\\u0442\\u043e \\u043d\\u0443\\u0436\\u043d\\u043e \\u043f\\u043e\\u043a\\u0430\\u0437\\u0430\\u0442\\u044c, \\u0447\\u0442\\u043e\\u0431\\u044b \\u0434\\u043e\\u043d\\u0435\\u0441\\u0442\\u0438 \\u0446\\u0435\\u043d\\u043d\\u043e\\u0441\\u0442\\u044c \\u043f\\u0440\\u043e\\u0434\\u0443\\u043a\\u0442\\u0430 \\u0434\\u043e \\u0446\\u0435\\u043b\\u0435\\u0432\\u043e\\u0433\\u043e \\u043a\\u043b\\u0438\\u0435\\u043d\\u0442\\u0430:","- \\u0417\\u043d\\u0430\\u0435\\u043c, \\u0447\\u0442\\u043e \\u043f\\u043e\\u0434\\u0447\\u0435\\u0440\\u043a\\u043d\\u0443\\u0442\\u044c \\u0432 \\u0442\\u0435\\u0445\\u043d\\u043e\\u043b\\u043e\\u0433\\u0438\\u0447\\u043d\\u043e\\u043c \\u043f\\u0440\\u043e\\u0446\\u0435\\u0441\\u0441\\u0435, \\u0447\\u0442\\u043e\\u0431\\u044b \\u0432\\u044b\\u0437\\u0432\\u0430\\u0442\\u044c \\u0434\\u043e\\u0432\\u0435\\u0440\\u0438\\u0435.","- \\u0423\\u043c\\u0435\\u0435\\u043c \\u043d\\u0430\\u0445\\u043e\\u0434\\u0438\\u0442\\u044c \\u043a\\u043b\\u044e\\u0447\\u0435\\u0432\\u044b\\u0435 \\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u044c\\u043d\\u044b\\u0435 \\u0430\\u043a\\u0446\\u0435\\u043d\\u0442\\u044b \\u2014 \\u0434\\u0435\\u0442\\u0430\\u043b\\u0438, \\u043a\\u043e\\u0442\\u043e\\u0440\\u044b\\u0435 \\u201c\\u0446\\u0435\\u043f\\u043b\\u044f\\u044e\\u0442\\u201d \\u0430\\u0443\\u0434\\u0438\\u0442\\u043e\\u0440\\u0438\\u044e.","- \\u041e\\u0431\\u043b\\u0430\\u0434\\u0430\\u0435\\u043c \\u043e\\u043f\\u044b\\u0442\\u043e\\u043c \\u0441\\u044a\\u0451\\u043c\\u043e\\u043a \\u043d\\u0430 \\u043f\\u0440\\u043e\\u043c\\u044b\\u0448\\u043b\\u0435\\u043d\\u043d\\u044b\\u0445, \\u0438\\u043d\\u0436\\u0435\\u043d\\u0435\\u0440\\u043d\\u044b\\u0445, \\u043f\\u0440\\u043e\\u0438\\u0437\\u0432\\u043e\\u0434\\u0441\\u0442\\u0432\\u0435\\u043d\\u043d\\u044b\\u0445 \\u043e\\u0431\\u044a\\u0435\\u043a\\u0442\\u0430\\u0445, \\u0433\\u0434\\u0435 \\u0432\\u0430\\u0436\\u043d\\u0430 \\u0442\\u043e\\u0447\\u043d\\u043e\\u0441\\u0442\\u044c, \\u0431\\u0435\\u0437\\u043e\\u043f\\u0430\\u0441\\u043d\\u043e\\u0441\\u0442\\u044c \\u0438 \\u0434\\u0435\\u043b\\u0438\\u043a\\u0430\\u0442\\u043d\\u043e\\u0441\\u0442\\u044c."]	1	2025-07-24 15:45:43	2025-07-24 15:45:43
190	50	Комплексное оформление маркетинговых материалов	["\\u0421\\u043e\\u0433\\u043b\\u0430\\u0441\\u043e\\u0432\\u0430\\u043d\\u0438\\u0435 \\u0435\\u0434\\u0438\\u043d\\u043e\\u043e\\u0431\\u0440\\u0430\\u0437\\u043d\\u043e\\u0433\\u043e \\u0434\\u0438\\u0437\\u0430\\u0439\\u043d\\u0430 \\u0434\\u043b\\u044f \\u0432\\u0441\\u0435\\u0445 \\u043f\\u0435\\u0447\\u0430\\u0442\\u043d\\u044b\\u0445 \\u043c\\u0430\\u0442\\u0435\\u0440\\u0438\\u0430\\u043b\\u043e\\u0432, \\u043e\\u0431\\u0435\\u0441\\u043f\\u0435\\u0447\\u0438\\u0432\\u0430\\u044f \\u0446\\u0435\\u043b\\u043e\\u0441\\u0442\\u043d\\u043e\\u0435 \\u043f\\u0440\\u0435\\u0434\\u0441\\u0442\\u0430\\u0432\\u043b\\u0435\\u043d\\u0438\\u0435 \\u0431\\u0440\\u0435\\u043d\\u0434\\u0430."]	3	2025-07-24 15:45:44	2025-07-24 15:45:44
194	51	Понимаем суть — создаём смысл	["\\u041c\\u044b \\u043e\\u0431\\u043b\\u0430\\u0434\\u0430\\u0435\\u043c \\u0433\\u043b\\u0443\\u0431\\u043e\\u043a\\u043e\\u0439 \\u044d\\u043a\\u0441\\u043f\\u0435\\u0440\\u0442\\u0438\\u0437\\u043e\\u0439 \\u0432 \\u0440\\u0430\\u0431\\u043e\\u0442\\u0435 \\u0441 \\u043f\\u0440\\u043e\\u043c\\u044b\\u0448\\u043b\\u0435\\u043d\\u043d\\u044b\\u043c\\u0438 \\u043a\\u043e\\u043c\\u043f\\u0430\\u043d\\u0438\\u044f\\u043c\\u0438, \\u043e\\u0441\\u043e\\u0431\\u0435\\u043d\\u043d\\u043e \\u0432 \\u0442\\u0430\\u043a\\u0438\\u0445 \\u0442\\u0435\\u0445\\u043d\\u043e\\u043b\\u043e\\u0433\\u0438\\u0447\\u0435\\u0441\\u043a\\u0438 \\u0441\\u043b\\u043e\\u0436\\u043d\\u044b\\u0445 \\u043e\\u0442\\u0440\\u0430\\u0441\\u043b\\u044f\\u0445, \\u043a\\u0430\\u043a:","-\\u0430\\u0432\\u0438\\u0430\\u0446\\u0438\\u044f,","- \\u0431\\u0435\\u0441\\u043f\\u0438\\u043b\\u043e\\u0442\\u043d\\u044b\\u0435 \\u043b\\u0435\\u0442\\u0430\\u0442\\u0435\\u043b\\u044c\\u043d\\u044b\\u0435 \\u0430\\u043f\\u043f\\u0430\\u0440\\u0430\\u0442\\u044b,","- \\u0441\\u0438\\u0441\\u0442\\u0435\\u043c\\u044b \\u0443\\u043f\\u0440\\u0430\\u0432\\u043b\\u0435\\u043d\\u0438\\u044f","\\u041c\\u044b \\u043d\\u0435 \\u201c\\u0440\\u0438\\u0441\\u0443\\u0435\\u043c \\u043f\\u043e \\u0422\\u0417\\u201d, \\u0430 \\u043f\\u043e\\u043d\\u0438\\u043c\\u0430\\u0435\\u043c \\u0442\\u0435\\u0445\\u043d\\u0438\\u0447\\u0435\\u0441\\u043a\\u043e\\u0435 \\u0443\\u0441\\u0442\\u0440\\u043e\\u0439\\u0441\\u0442\\u0432\\u043e, \\u0444\\u0443\\u043d\\u043a\\u0446\\u0438\\u043e\\u043d\\u0430\\u043b\\u044c\\u043d\\u043e\\u0441\\u0442\\u044c \\u0438 \\u043a\\u043e\\u043d\\u0442\\u0435\\u043a\\u0441\\u0442 \\u043f\\u0440\\u0438\\u043c\\u0435\\u043d\\u0435\\u043d\\u0438\\u044f \\u2014 \\u0431\\u043b\\u0430\\u0433\\u043e\\u0434\\u0430\\u0440\\u044f \\u043e\\u043f\\u044b\\u0442\\u0443 \\u0438 \\u0442\\u0435\\u0441\\u043d\\u043e\\u0439 \\u0440\\u0430\\u0431\\u043e\\u0442\\u0435 \\u0441 \\u0438\\u043d\\u0436\\u0435\\u043d\\u0435\\u0440\\u0430\\u043c\\u0438."]	1	2025-07-24 16:00:24	2025-07-24 16:00:24
195	51	Концептуальная 3D-графика для выставок и презентаций	["\\u0413\\u0440\\u0430\\u0444\\u0438\\u043a\\u0430 \\u0434\\u043b\\u044f \\u0431\\u043e\\u043b\\u044c\\u0448\\u0438\\u0445 \\u044d\\u043a\\u0440\\u0430\\u043d\\u043e\\u0432, \\u043f\\u0440\\u0435\\u0437\\u0435\\u043d\\u0442\\u0430\\u0446\\u0438\\u043e\\u043d\\u043d\\u044b\\u0445 \\u0437\\u043e\\u043d \\u0438 LED-\\u0434\\u0438\\u0441\\u043f\\u043b\\u0435\\u0435\\u0432","\\u041f\\u043e\\u0434\\u0447\\u0451\\u0440\\u043a\\u0438\\u0432\\u0430\\u043d\\u0438\\u0435 \\u0438\\u043d\\u043d\\u043e\\u0432\\u0430\\u0446\\u0438\\u043e\\u043d\\u043d\\u043e\\u0441\\u0442\\u0438, \\u043c\\u0430\\u0441\\u0448\\u0442\\u0430\\u0431\\u0430, \\u0442\\u0435\\u0445\\u043d\\u043e\\u043b\\u043e\\u0433\\u0438\\u0447\\u043d\\u043e\\u0441\\u0442\\u0438","\\u0421\\u043e\\u0437\\u0434\\u0430\\u043d\\u0438\\u0435 \\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u044c\\u043d\\u043e\\u0433\\u043e \\u0432\\u0430\\u0443-\\u044d\\u0444\\u0444\\u0435\\u043a\\u0442\\u0430 \\u0441 \\u0443\\u043c\\u043e\\u043c","\\u0410\\u0434\\u0430\\u043f\\u0442\\u0430\\u0446\\u0438\\u044f \\u043f\\u043e\\u0434 \\u0430\\u0440\\u0445\\u0438\\u0442\\u0435\\u043a\\u0442\\u0443\\u0440\\u0443 \\u0438 \\u043f\\u0440\\u043e\\u0441\\u0442\\u0440\\u0430\\u043d\\u0441\\u0442\\u0432\\u0435\\u043d\\u043d\\u044b\\u0435 \\u0444\\u043e\\u0440\\u043c\\u0430\\u0442\\u044b"]	2	2025-07-24 16:00:25	2025-07-24 16:00:25
196	51	Анимация для видео и демо-роликов	["\\u0421\\u0442\\u0438\\u043b\\u044c\\u043d\\u0430\\u044f, \\u0441\\u0434\\u0435\\u0440\\u0436\\u0430\\u043d\\u043d\\u0430\\u044f, \\u0442\\u0435\\u0445\\u043d\\u043e\\u043b\\u043e\\u0433\\u0438\\u0447\\u043d\\u0430\\u044f 3D-\\u0430\\u043d\\u0438\\u043c\\u0430\\u0446\\u0438\\u044f","\\u0412\\u0441\\u0442\\u0440\\u0430\\u0438\\u0432\\u0430\\u0435\\u043c \\u0432 \\u043f\\u0440\\u0435\\u0437\\u0435\\u043d\\u0442\\u0430\\u0446\\u0438\\u043e\\u043d\\u043d\\u044b\\u0435 \\u0438 \\u043f\\u0440\\u043e\\u043c\\u043e-\\u0432\\u0438\\u0434\\u0435\\u043e","\\u0410\\u043a\\u0446\\u0435\\u043d\\u0442\\u044b \\u043d\\u0430 \\u043a\\u043b\\u044e\\u0447\\u0435\\u0432\\u044b\\u0445 \\u043f\\u0440\\u0435\\u0438\\u043c\\u0443\\u0449\\u0435\\u0441\\u0442\\u0432\\u0430\\u0445 \\u043f\\u0440\\u043e\\u0434\\u0443\\u043a\\u0442\\u0430","\\u042d\\u0444\\u0444\\u0435\\u043a\\u0442\\u043d\\u0430\\u044f \\u043f\\u043e\\u0434\\u0430\\u0447\\u0430 \\u0431\\u0435\\u0437 \\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u044c\\u043d\\u043e\\u0433\\u043e \\u00ab\\u0448\\u0443\\u043c\\u0430\\u00bb"]	3	2025-07-24 16:00:25	2025-07-24 16:00:25
205	52	Концепция дизайна: от смысла — к форме	["\\u041a\\u0430\\u0436\\u0434\\u044b\\u0439 \\u0441\\u0430\\u0439\\u0442 \\u043c\\u044b \\u043d\\u0430\\u0447\\u0438\\u043d\\u0430\\u0435\\u043c \\u0441 \\u0430\\u043d\\u0430\\u043b\\u0438\\u0437\\u0430 \\u0431\\u0438\\u0437\\u043d\\u0435\\u0441\\u0430 \\u0438 \\u043d\\u0438\\u0448\\u0438, \\u0447\\u0442\\u043e\\u0431\\u044b \\u0441\\u043e\\u0437\\u0434\\u0430\\u0442\\u044c \\u043d\\u0435 \\u0448\\u0430\\u0431\\u043b\\u043e\\u043d, \\u0430 \\u0438\\u043d\\u0434\\u0438\\u0432\\u0438\\u0434\\u0443\\u0430\\u043b\\u044c\\u043d\\u043e\\u0435 \\u0440\\u0435\\u0448\\u0435\\u043d\\u0438\\u0435, \\u043a\\u043e\\u0442\\u043e\\u0440\\u043e\\u0435 \\u0431\\u0443\\u0434\\u0435\\u0442 \\u0443\\u0441\\u0438\\u043b\\u0438\\u0432\\u0430\\u0442\\u044c \\u0438\\u043c\\u0435\\u043d\\u043d\\u043e \\u0432\\u0430\\u0448\\u0443 \\u043a\\u043e\\u043c\\u043f\\u0430\\u043d\\u0438\\u044e:","- \\u041f\\u0440\\u043e\\u0432\\u043e\\u0434\\u0438\\u043c \\u0438\\u0441\\u0441\\u043b\\u0435\\u0434\\u043e\\u0432\\u0430\\u043d\\u0438\\u0435 \\u0441\\u0444\\u0435\\u0440\\u044b \\u0434\\u0435\\u044f\\u0442\\u0435\\u043b\\u044c\\u043d\\u043e\\u0441\\u0442\\u0438 \\u0438 \\u0446\\u0435\\u043b\\u0435\\u0432\\u043e\\u0439 \\u0430\\u0443\\u0434\\u0438\\u0442\\u043e\\u0440\\u0438\\u0438","- \\u0412\\u044b\\u0434\\u0435\\u043b\\u044f\\u0435\\u043c \\u0441\\u0438\\u043b\\u044c\\u043d\\u044b\\u0435 \\u0441\\u0442\\u043e\\u0440\\u043e\\u043d\\u044b \\u043a\\u043e\\u043c\\u043f\\u0430\\u043d\\u0438\\u0438 \\u2014 \\u0432\\u0430\\u0448\\u0438 \\u0440\\u0435\\u0430\\u043b\\u044c\\u043d\\u044b\\u0435 \\u043f\\u0440\\u0435\\u0438\\u043c\\u0443\\u0449\\u0435\\u0441\\u0442\\u0432\\u0430","- \\u0410\\u043d\\u0430\\u043b\\u0438\\u0437\\u0438\\u0440\\u0443\\u0435\\u043c \\u043a\\u043e\\u043d\\u043a\\u0443\\u0440\\u0435\\u043d\\u0442\\u043e\\u0432, \\u0447\\u0442\\u043e\\u0431\\u044b \\u0441\\u0434\\u0435\\u043b\\u0430\\u0442\\u044c \\u0432\\u0430\\u0441 \\u0437\\u0430\\u043c\\u0435\\u0442\\u043d\\u0435\\u0435 \\u0438 \\u043f\\u043e\\u043d\\u044f\\u0442\\u043d\\u0435\\u0435 \\u043d\\u0430 \\u0438\\u0445 \\u0444\\u043e\\u043d\\u0435","- \\u0424\\u043e\\u0440\\u043c\\u0438\\u0440\\u0443\\u0435\\u043c \\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u044c\\u043d\\u044b\\u0439 \\u044f\\u0437\\u044b\\u043a \\u0438 \\u0441\\u0442\\u0440\\u0443\\u043a\\u0442\\u0443\\u0440\\u0443 \\u0441\\u0430\\u0439\\u0442\\u0430, \\u043a\\u043e\\u0442\\u043e\\u0440\\u0430\\u044f \\u0434\\u043e\\u043d\\u043e\\u0441\\u0438\\u0442 \\u0441\\u0443\\u0442\\u044c \\u0431\\u0435\\u0437 \\u043b\\u0438\\u0448\\u043d\\u0435\\u0433\\u043e","\\u0412 \\u0440\\u0435\\u0437\\u0443\\u043b\\u044c\\u0442\\u0430\\u0442\\u0435 \\u0432\\u044b \\u043f\\u043e\\u043b\\u0443\\u0447\\u0430\\u0435\\u0442\\u0435 \\u0441\\u0430\\u0439\\u0442, \\u043a\\u043e\\u0442\\u043e\\u0440\\u044b\\u0439 \\u043d\\u0435 \\u043f\\u0440\\u043e\\u0441\\u0442\\u043e \\u00ab\\u043a\\u0440\\u0430\\u0441\\u0438\\u0432\\u044b\\u0439\\u00bb \\u2014 \\u043e\\u043d \\u043e\\u0431\\u043e\\u0441\\u043d\\u043e\\u0432\\u0430\\u043d\\u043d\\u044b\\u0439, \\u043b\\u043e\\u0433\\u0438\\u0447\\u043d\\u044b\\u0439 \\u0438 \\u0443\\u0431\\u0435\\u0434\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u044b\\u0439."]	1	2025-07-24 17:21:34	2025-07-24 17:21:34
221	53	Сценарий — не формальность, а основа. Продумаем за вас и предложим лучший вариант.	["\\u041a\\u0430\\u0436\\u0434\\u043e\\u0435 \\u0432\\u0438\\u0434\\u0435\\u043e \\u043c\\u044b \\u043d\\u0430\\u0447\\u0438\\u043d\\u0430\\u0435\\u043c \\u0441 \\u043f\\u0440\\u043e\\u0440\\u0430\\u0431\\u043e\\u0442\\u043a\\u0438 \\u0441\\u0446\\u0435\\u043d\\u0430\\u0440\\u0438\\u044f \\u2014 \\u043d\\u0435 \\u0430\\u0431\\u0441\\u0442\\u0440\\u0430\\u043a\\u0442\\u043d\\u043e\\u0433\\u043e, \\u0430 \\u0441\\u043e\\u0437\\u0434\\u0430\\u043d\\u043d\\u043e\\u0433\\u043e \\u0438\\u0441\\u043a\\u043b\\u044e\\u0447\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u043e \\u043f\\u043e\\u0434 \\u0432\\u0430\\u0448 \\u043f\\u0440\\u043e\\u0434\\u0443\\u043a\\u0442 \\u0438 \\u0446\\u0435\\u043b\\u0435\\u0432\\u0443\\u044e \\u0430\\u0443\\u0434\\u0438\\u0442\\u043e\\u0440\\u0438\\u044e.","- \\u0420\\u0430\\u0441\\u043a\\u0440\\u044b\\u0432\\u0430\\u0435\\u043c \\u0441\\u0438\\u043b\\u044c\\u043d\\u044b\\u0435 \\u0441\\u0442\\u043e\\u0440\\u043e\\u043d\\u044b \\u043f\\u0440\\u043e\\u0434\\u0443\\u043a\\u0442\\u0430 \\u0438\\u043b\\u0438 \\u0442\\u0435\\u0445\\u043d\\u043e\\u043b\\u043e\\u0433\\u0438\\u0438","- \\u0423\\u0447\\u0438\\u0442\\u044b\\u0432\\u0430\\u0435\\u043c, \\u0447\\u0442\\u043e \\u0432\\u0430\\u0436\\u043d\\u043e \\u043f\\u043e\\u043a\\u0430\\u0437\\u0430\\u0442\\u044c \\u0438\\u043c\\u0435\\u043d\\u043d\\u043e \\u0432\\u0430\\u0448\\u0438\\u043c \\u043a\\u043b\\u0438\\u0435\\u043d\\u0442\\u0430\\u043c","- \\u0412\\u044b\\u0441\\u0442\\u0440\\u0430\\u0438\\u0432\\u0430\\u0435\\u043c \\u043b\\u043e\\u0433\\u0438\\u0447\\u043d\\u0443\\u044e \\u0438 \\u0443\\u0431\\u0435\\u0434\\u0438\\u0442\\u0435\\u043b\\u044c\\u043d\\u0443\\u044e \\u043f\\u043e\\u0434\\u0430\\u0447\\u0443","- \\u0423\\u043f\\u0440\\u043e\\u0449\\u0430\\u0435\\u043c \\u0441\\u043b\\u043e\\u0436\\u043d\\u043e\\u0435, \\u043d\\u0435 \\u0442\\u0435\\u0440\\u044f\\u044f \\u0441\\u0443\\u0442\\u0438","\\u0412\\u044b \\u043d\\u0435 \\u043f\\u043e\\u043b\\u0443\\u0447\\u0430\\u0435\\u0442\\u0435 \\"\\u0441\\u0443\\u0445\\u0443\\u044e \\u0438\\u043d\\u0441\\u0442\\u0440\\u0443\\u043a\\u0446\\u0438\\u044e\\", \\u0430 \\u0432\\u043e\\u0432\\u043b\\u0435\\u043a\\u0430\\u044e\\u0449\\u0438\\u0439 \\u0432\\u0438\\u0434\\u0435\\u043e\\u0440\\u043e\\u043b\\u0438\\u043a, \\u043a\\u043e\\u0442\\u043e\\u0440\\u044b\\u0439 \\u0440\\u0430\\u0431\\u043e\\u0442\\u0430\\u0435\\u0442 \\u043d\\u0430 \\u043f\\u0440\\u0435\\u0437\\u0435\\u043d\\u0442\\u0430\\u0446\\u0438\\u044f\\u0445, \\u0432 \\u043f\\u0435\\u0440\\u0435\\u0433\\u043e\\u0432\\u043e\\u0440\\u0430\\u0445, \\u043d\\u0430 \\u0432\\u044b\\u0441\\u0442\\u0430\\u0432\\u043a\\u0430\\u0445 \\u0438 \\u0432 \\u0434\\u0438\\u0434\\u0436\\u0438\\u0442\\u0430\\u043b\\u0435."]	1	2025-07-24 19:44:09	2025-07-24 19:44:09
206	52	Контент в едином визуальном ключе, заточенный под сайт	["\\u041c\\u044b \\u0441\\u0430\\u043c\\u0438 \\u0441\\u043e\\u0437\\u0434\\u0430\\u0451\\u043c \\u0432\\u0435\\u0441\\u044c \\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u044c\\u043d\\u044b\\u0439 \\u0438 \\u0442\\u0435\\u043a\\u0441\\u0442\\u043e\\u0432\\u044b\\u0439 \\u043a\\u043e\\u043d\\u0442\\u0435\\u043d\\u0442 \\u043f\\u043e\\u0434 \\u0441\\u0430\\u0439\\u0442 \\u2014 \\u0432\\u0430\\u043c \\u043d\\u0435 \\u043d\\u0443\\u0436\\u043d\\u043e \\u0431\\u0435\\u0441\\u043f\\u043e\\u043a\\u043e\\u0438\\u0442\\u044c\\u0441\\u044f \\u043e \\u0444\\u043e\\u0442\\u043e, \\u0432\\u0438\\u0434\\u0435\\u043e \\u0438\\u043b\\u0438 \\u0442\\u0435\\u043a\\u0441\\u0442\\u0430\\u0445.","- \\u041f\\u0440\\u043e\\u0444\\u0435\\u0441\\u0441\\u0438\\u043e\\u043d\\u0430\\u043b\\u044c\\u043d\\u0430\\u044f \\u0444\\u043e\\u0442\\u043e\\u0441\\u044a\\u0451\\u043c\\u043a\\u0430 \\u043f\\u0440\\u043e\\u0434\\u0443\\u043a\\u0446\\u0438\\u0438, \\u043a\\u043e\\u043c\\u0430\\u043d\\u0434\\u044b, \\u043f\\u0440\\u043e\\u0446\\u0435\\u0441\\u0441\\u043e\\u0432","- \\u0412\\u0438\\u0434\\u0435\\u043e\\u043e\\u0431\\u0437\\u043e\\u0440\\u044b, 3D-\\u0430\\u043d\\u0438\\u043c\\u0430\\u0446\\u0438\\u0438 \\u0438 \\u0442\\u0435\\u0445\\u043d\\u0438\\u0447\\u0435\\u0441\\u043a\\u0438\\u0435 \\u0441\\u0445\\u0435\\u043c\\u044b","- \\u0421\\u0442\\u0440\\u0443\\u043a\\u0442\\u0443\\u0440\\u0438\\u0440\\u043e\\u0432\\u0430\\u043d\\u043d\\u044b\\u0435 \\u0442\\u0435\\u043a\\u0441\\u0442\\u044b \\u0441 \\u0444\\u043e\\u043a\\u0443\\u0441\\u043e\\u043c \\u043d\\u0430 \\u0432\\u044b\\u0433\\u043e\\u0434\\u044b \\u0438 \\u0440\\u0435\\u0448\\u0435\\u043d\\u0438\\u044f","- \\u0415\\u0434\\u0438\\u043d\\u044b\\u0439 \\u0441\\u0442\\u0438\\u043b\\u044c \\u0438\\u0437\\u043e\\u0431\\u0440\\u0430\\u0436\\u0435\\u043d\\u0438\\u0439, \\u0448\\u0440\\u0438\\u0444\\u0442\\u043e\\u0432 \\u0438 \\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u044c\\u043d\\u043e\\u0439 \\u043f\\u043e\\u0434\\u0430\\u0447\\u0438","\\u0412\\u0441\\u0451 \\u0441\\u0434\\u0435\\u043b\\u0430\\u043d\\u043e \\u0432 \\u043e\\u0434\\u043d\\u043e\\u043c \\u043a\\u043b\\u044e\\u0447\\u0435, \\u0441 \\u0443\\u0447\\u0451\\u0442\\u043e\\u043c \\u0442\\u043e\\u0433\\u043e, \\u043a\\u0430\\u043a \\u043b\\u0443\\u0447\\u0448\\u0435 \\u0432\\u0441\\u0435\\u0433\\u043e \\u043f\\u043e\\u043a\\u0430\\u0437\\u0430\\u0442\\u044c \\u0432\\u0430\\u0448 \\u043f\\u0440\\u043e\\u0434\\u0443\\u043a\\u0442, \\u044d\\u043a\\u0441\\u043f\\u0435\\u0440\\u0442\\u043d\\u043e\\u0441\\u0442\\u044c \\u0438 \\u0443\\u043d\\u0438\\u043a\\u0430\\u043b\\u044c\\u043d\\u043e\\u0441\\u0442\\u044c."]	2	2025-07-24 17:21:35	2025-07-24 17:21:35
222	53	Графика и композитинг — добавляем глубину и стиль	["\\u041c\\u044b \\u0443\\u0441\\u0438\\u043b\\u0438\\u0432\\u0430\\u0435\\u043c \\u0432\\u0438\\u0434\\u0435\\u043e \\u0441\\u043e\\u0432\\u0440\\u0435\\u043c\\u0435\\u043d\\u043d\\u044b\\u043c\\u0438 \\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u044c\\u043d\\u044b\\u043c\\u0438 \\u0441\\u0440\\u0435\\u0434\\u0441\\u0442\\u0432\\u0430\\u043c\\u0438, \\u0447\\u0442\\u043e\\u0431\\u044b \\u043e\\u043d\\u043e \\u0432\\u044b\\u0433\\u043b\\u044f\\u0434\\u0435\\u043b\\u043e \\u0442\\u0435\\u0445\\u043d\\u043e\\u043b\\u043e\\u0433\\u0438\\u0447\\u043d\\u043e, \\u0441\\u0432\\u0435\\u0436\\u043e \\u0438 \\u043f\\u043e\\u043d\\u044f\\u0442\\u043d\\u043e:","- 2D-\\u0433\\u0440\\u0430\\u0444\\u0438\\u043a\\u0430: \\u0438\\u043d\\u0444\\u043e\\u0433\\u0440\\u0430\\u0444\\u0438\\u043a\\u0430, \\u0430\\u043d\\u0438\\u043c\\u0430\\u0446\\u0438\\u044f \\u0442\\u0435\\u043a\\u0441\\u0442\\u0430, \\u0441\\u0445\\u0435\\u043c\\u044b","- 3D-\\u0433\\u0440\\u0430\\u0444\\u0438\\u043a\\u0430: \\u043f\\u0440\\u043e\\u0434\\u0443\\u043a\\u0442 \\u0432 \\u0440\\u0430\\u0437\\u0440\\u0435\\u0437\\u0435, \\u043f\\u0440\\u0438\\u043d\\u0446\\u0438\\u043f \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u044f, \\u044d\\u0444\\u0444\\u0435\\u043a\\u0442\\u044b","- \\u0412\\u0438\\u0434\\u0435\\u043e\\u043a\\u043e\\u043c\\u043f\\u043e\\u0437\\u0438\\u0442\\u0438\\u043d\\u0433: \\u043e\\u0431\\u044a\\u0435\\u0434\\u0438\\u043d\\u044f\\u0435\\u043c \\u0440\\u0435\\u0430\\u043b\\u044c\\u043d\\u044b\\u0435 \\u0441\\u044a\\u0451\\u043c\\u043a\\u0438 \\u0441 \\u0433\\u0440\\u0430\\u0444\\u0438\\u043a\\u043e\\u0439 \\u0438 \\u0441\\u043f\\u0435\\u0446\\u044d\\u0444\\u0444\\u0435\\u043a\\u0442\\u0430\\u043c\\u0438","\\u0412\\u0441\\u0451 \\u044d\\u0442\\u043e \\u0434\\u0435\\u043b\\u0430\\u0435\\u043c \\u0432 \\u0435\\u0434\\u0438\\u043d\\u043e\\u043c \\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u044c\\u043d\\u043e\\u043c \\u0441\\u0442\\u0438\\u043b\\u0435, \\u0447\\u0442\\u043e\\u0431\\u044b \\u0441\\u043e\\u0437\\u0434\\u0430\\u0442\\u044c \\u043f\\u0440\\u043e\\u0444\\u0435\\u0441\\u0441\\u0438\\u043e\\u043d\\u0430\\u043b\\u044c\\u043d\\u044b\\u0439 \\u0438 \\u0446\\u0435\\u043b\\u044c\\u043d\\u044b\\u0439 \\u043e\\u0431\\u0440\\u0430\\u0437 \\u043a\\u043e\\u043c\\u043f\\u0430\\u043d\\u0438\\u0438."]	2	2025-07-24 19:44:10	2025-07-24 19:44:10
207	52	Адаптивность и надёжность: работает на всех устройствах	["- \\u041f\\u043e\\u043b\\u043d\\u0430\\u044f \\u0430\\u0434\\u0430\\u043f\\u0442\\u0430\\u0446\\u0438\\u044f \\u043f\\u043e\\u0434 \\u0441\\u043c\\u0430\\u0440\\u0442\\u0444\\u043e\\u043d\\u044b, \\u043f\\u043b\\u0430\\u043d\\u0448\\u0435\\u0442\\u044b, \\u0434\\u0435\\u0441\\u043a\\u0442\\u043e\\u043f\\u044b","- \\u0418\\u043d\\u0442\\u0443\\u0438\\u0442\\u0438\\u0432\\u043d\\u0430\\u044f \\u043d\\u0430\\u0432\\u0438\\u0433\\u0430\\u0446\\u0438\\u044f \\u0438 \\u0447\\u0438\\u0442\\u0430\\u0435\\u043c\\u043e\\u0441\\u0442\\u044c \\u0441 \\u043b\\u044e\\u0431\\u043e\\u0433\\u043e \\u044d\\u043a\\u0440\\u0430\\u043d\\u0430","- \\u0418\\u0441\\u043f\\u043e\\u043b\\u044c\\u0437\\u0443\\u0435\\u043c \\u0440\\u043e\\u0441\\u0441\\u0438\\u0439\\u0441\\u043a\\u0438\\u0435 CMS-\\u043f\\u043b\\u0430\\u0442\\u0444\\u043e\\u0440\\u043c\\u044b, \\u043a\\u043e\\u0442\\u043e\\u0440\\u044b\\u0435:","- \\u0411\\u044b\\u0441\\u0442\\u0440\\u044b\\u0435","- \\u0417\\u0430\\u0449\\u0438\\u0449\\u0451\\u043d\\u043d\\u044b\\u0435","- \\u041b\\u0435\\u0433\\u043a\\u043e \\u043e\\u0431\\u043d\\u043e\\u0432\\u043b\\u044f\\u044e\\u0442\\u0441\\u044f \\u0432\\u0430\\u0448\\u0435\\u0439 \\u043a\\u043e\\u043c\\u0430\\u043d\\u0434\\u043e\\u0439 \\u0431\\u0435\\u0437 \\u043f\\u0440\\u043e\\u0433\\u0440\\u0430\\u043c\\u043c\\u0438\\u0441\\u0442\\u0430","\\u0412\\u0430\\u0448 \\u0441\\u0430\\u0439\\u0442 \\u0431\\u0443\\u0434\\u0435\\u0442 \\u043d\\u0435 \\u0442\\u043e\\u043b\\u044c\\u043a\\u043e \\u043a\\u0440\\u0430\\u0441\\u0438\\u0432\\u044b\\u043c, \\u043d\\u043e \\u0438 \\u0442\\u0435\\u0445\\u043d\\u0438\\u0447\\u0435\\u0441\\u043a\\u0438 \\u0443\\u0441\\u0442\\u043e\\u0439\\u0447\\u0438\\u0432\\u044b\\u043c, \\u0431\\u0435\\u0437\\u043e\\u043f\\u0430\\u0441\\u043d\\u044b\\u043c \\u0438 \\u0443\\u043f\\u0440\\u0430\\u0432\\u043b\\u044f\\u0435\\u043c\\u044b\\u043c."]	3	2025-07-24 17:21:35	2025-07-24 17:21:35
223	53	Создаём видео, которые помогают продавать, убеждать и объяснять.	["- \\u041e\\u0440\\u0433\\u0430\\u043d\\u0438\\u0437\\u0443\\u0435\\u043c \\u0441\\u044a\\u0451\\u043c\\u043a\\u0438 \\u043d\\u0430 \\u043f\\u0440\\u043e\\u0438\\u0437\\u0432\\u043e\\u0434\\u0441\\u0442\\u0432\\u0435, \\u0432 \\u043e\\u0444\\u0438\\u0441\\u0435, \\u043d\\u0430 \\u043e\\u0431\\u044a\\u0435\\u043a\\u0442\\u0430\\u0445","- \\u0418\\u0441\\u043f\\u043e\\u043b\\u044c\\u0437\\u0443\\u0435\\u043c \\u043f\\u0440\\u043e\\u0444\\u0435\\u0441\\u0441\\u0438\\u043e\\u043d\\u0430\\u043b\\u044c\\u043d\\u043e\\u0435 \\u043e\\u0431\\u043e\\u0440\\u0443\\u0434\\u043e\\u0432\\u0430\\u043d\\u0438\\u0435, \\u0441\\u0432\\u0435\\u0442, \\u0437\\u0432\\u0443\\u043a","- \\u0420\\u0430\\u0431\\u043e\\u0442\\u0430\\u0435\\u043c \\u0441 \\u043e\\u043f\\u0435\\u0440\\u0430\\u0442\\u043e\\u0440\\u0441\\u043a\\u043e\\u0439 \\u0433\\u0440\\u0443\\u043f\\u043f\\u043e\\u0439, \\u043f\\u043e\\u043d\\u0438\\u043c\\u0430\\u044e\\u0449\\u0435\\u0439 B2B-\\u0437\\u0430\\u0434\\u0430\\u0447\\u0438","- \\u0423\\u043c\\u0435\\u0435\\u043c \\u0441\\u043d\\u0438\\u043c\\u0430\\u0442\\u044c \\u0431\\u0435\\u0437 \\"\\u0432\\u043e\\u0434\\u044b\\", \\u043d\\u043e \\u0441 \\u0445\\u0430\\u0440\\u0430\\u043a\\u0442\\u0435\\u0440\\u043e\\u043c\\n\\u0427\\u0451\\u0442\\u043a\\u0438\\u0439 \\u043c\\u0435\\u0441\\u0441\\u0435\\u0434\\u0436"]	3	2025-07-24 19:44:11	2025-07-24 19:44:11
\.


--
-- Data for Name: media_service_media; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media_service_media (id, service_id, group_id, media_type, file_type, file_path, poster_path, alt_text, "order", created_at, updated_at) FROM stdin;
99	46	4	main	image	media/services/media_service_46_4_main_1753334609.jpg	\N	\N	4	2025-07-24 05:23:29	2025-07-24 05:23:29
100	46	4	secondary	image	media/services/media_service_46_4_secondary_1753334609.jpg	\N	\N	4	2025-07-24 05:23:29	2025-07-24 05:23:29
101	46	5	main	image	media/services/media_service_46_5_main_1753334626.png	\N	\N	5	2025-07-24 05:23:46	2025-07-24 05:23:46
102	46	5	secondary	image	media/services/media_service_46_5_secondary_1753334626.png	\N	\N	5	2025-07-24 05:23:46	2025-07-24 05:23:46
103	46	6	main	image	media/services/media_service_46_6_main_1753334648.jpg	\N	\N	6	2025-07-24 05:24:08	2025-07-24 05:24:08
104	46	6	secondary	image	media/services/media_service_46_6_secondary_1753334648.webp	\N	\N	6	2025-07-24 05:24:08	2025-07-24 05:24:08
105	46	7	main	image	media/services/media_service_46_7_main_1753334668.webp	\N	\N	7	2025-07-24 05:24:28	2025-07-24 05:24:28
106	46	7	secondary	image	media/services/media_service_46_7_secondary_1753334668.png	\N	\N	7	2025-07-24 05:24:28	2025-07-24 05:24:28
107	46	8	main	image	media/services/media_service_46_8_main_1753334682.webp	\N	\N	8	2025-07-24 05:24:42	2025-07-24 05:24:42
108	46	8	secondary	image	media/services/media_service_46_8_secondary_1753334682.jpg	\N	\N	8	2025-07-24 05:24:42	2025-07-24 05:24:42
111	48	1	main	image	media/services/media_service_48_1_main_1753370781.png	\N	\N	1	2025-07-24 15:26:21	2025-07-24 15:26:21
112	48	1	secondary	image	media/services/media_service_48_1_secondary_1753370781.png	\N	\N	1	2025-07-24 15:26:21	2025-07-24 15:26:21
113	48	2	main	image	media/services/media_service_48_2_main_1753370797.webp	\N	\N	2	2025-07-24 15:26:37	2025-07-24 15:26:37
114	48	2	secondary	image	media/services/media_service_48_2_secondary_1753370797.jpg	\N	\N	2	2025-07-24 15:26:37	2025-07-24 15:26:37
115	48	3	main	image	media/services/media_service_48_3_main_1753370811.jpg	\N	\N	3	2025-07-24 15:26:51	2025-07-24 15:26:51
116	48	3	secondary	image	media/services/media_service_48_3_secondary_1753370811.webp	\N	\N	3	2025-07-24 15:26:51	2025-07-24 15:26:51
117	48	4	main	image	media/services/media_service_48_4_main_1753370835.jpg	\N	\N	4	2025-07-24 15:27:15	2025-07-24 15:27:15
118	48	4	secondary	image	media/services/media_service_48_4_secondary_1753370835.jpeg	\N	\N	4	2025-07-24 15:27:15	2025-07-24 15:27:15
119	48	5	main	image	media/services/media_service_48_5_main_1753370849.jpg	\N	\N	5	2025-07-24 15:27:29	2025-07-24 15:27:29
120	48	5	secondary	image	media/services/media_service_48_5_secondary_1753370849.webp	\N	\N	5	2025-07-24 15:27:29	2025-07-24 15:27:29
121	49	1	main	image	media/services/media_service_49_1_main_1753371221.png	\N	\N	1	2025-07-24 15:33:41	2025-07-24 15:33:41
122	49	1	secondary	image	media/services/media_service_49_1_secondary_1753371221.png	\N	\N	1	2025-07-24 15:33:41	2025-07-24 15:33:41
123	49	2	main	image	media/services/media_service_49_2_main_1753371232.webp	\N	\N	2	2025-07-24 15:33:52	2025-07-24 15:33:52
124	49	2	secondary	image	media/services/media_service_49_2_secondary_1753371232.jpg	\N	\N	2	2025-07-24 15:33:52	2025-07-24 15:33:52
125	49	3	main	image	media/services/media_service_49_3_main_1753371247.jpg	\N	\N	3	2025-07-24 15:34:07	2025-07-24 15:34:07
126	49	3	secondary	image	media/services/media_service_49_3_secondary_1753371247.webp	\N	\N	3	2025-07-24 15:34:07	2025-07-24 15:34:07
127	49	4	main	image	media/services/media_service_49_4_main_1753371259.jpg	\N	\N	4	2025-07-24 15:34:19	2025-07-24 15:34:19
128	49	4	secondary	image	media/services/media_service_49_4_secondary_1753371259.jpeg	\N	\N	4	2025-07-24 15:34:19	2025-07-24 15:34:19
129	49	5	main	image	media/services/media_service_49_5_main_1753371271.jpg	\N	\N	5	2025-07-24 15:34:31	2025-07-24 15:34:31
130	49	5	secondary	image	media/services/media_service_49_5_secondary_1753371271.webp	\N	\N	5	2025-07-24 15:34:31	2025-07-24 15:34:31
131	50	1	main	image	media/services/media_service_50_1_main_1753371889.png	\N	\N	1	2025-07-24 15:44:49	2025-07-24 15:44:49
132	50	1	secondary	image	media/services/media_service_50_1_secondary_1753371889.png	\N	\N	1	2025-07-24 15:44:49	2025-07-24 15:44:49
133	50	2	main	image	media/services/media_service_50_2_main_1753371901.jpeg	\N	\N	2	2025-07-24 15:45:01	2025-07-24 15:45:01
134	50	2	secondary	image	media/services/media_service_50_2_secondary_1753371901.jpg	\N	\N	2	2025-07-24 15:45:01	2025-07-24 15:45:01
135	50	3	main	image	media/services/media_service_50_3_main_1753371915.jpeg	\N	\N	3	2025-07-24 15:45:15	2025-07-24 15:45:15
136	50	3	secondary	image	media/services/media_service_50_3_secondary_1753371915.jpg	\N	\N	3	2025-07-24 15:45:15	2025-07-24 15:45:15
137	50	4	main	image	media/services/media_service_50_4_main_1753371925.jpg	\N	\N	4	2025-07-24 15:45:25	2025-07-24 15:45:25
138	50	4	secondary	image	media/services/media_service_50_4_secondary_1753371925.jpeg	\N	\N	4	2025-07-24 15:45:25	2025-07-24 15:45:25
139	50	5	main	image	media/services/media_service_50_5_main_1753371936.webp	\N	\N	5	2025-07-24 15:45:36	2025-07-24 15:45:36
140	50	5	secondary	image	media/services/media_service_50_5_secondary_1753371936.jpg	\N	\N	5	2025-07-24 15:45:36	2025-07-24 15:45:36
141	51	1	main	image	media/services/media_service_51_1_main_1753372772.png	\N	\N	1	2025-07-24 15:59:32	2025-07-24 15:59:32
142	51	1	secondary	image	media/services/media_service_51_1_secondary_1753372772.png	\N	\N	1	2025-07-24 15:59:32	2025-07-24 15:59:32
143	51	2	main	image	media/services/media_service_51_2_main_1753372783.jpg	\N	\N	2	2025-07-24 15:59:43	2025-07-24 15:59:43
144	51	2	secondary	image	media/services/media_service_51_2_secondary_1753372783.png	\N	\N	2	2025-07-24 15:59:43	2025-07-24 15:59:43
145	51	3	main	image	media/services/media_service_51_3_main_1753372795.png	\N	\N	3	2025-07-24 15:59:55	2025-07-24 15:59:55
146	51	3	secondary	image	media/services/media_service_51_3_secondary_1753372795.jpg	\N	\N	3	2025-07-24 15:59:55	2025-07-24 15:59:55
147	51	4	main	image	media/services/media_service_51_4_main_1753372807.jpeg	\N	\N	4	2025-07-24 16:00:07	2025-07-24 16:00:07
148	51	4	secondary	image	media/services/media_service_51_4_secondary_1753372807.jpg	\N	\N	4	2025-07-24 16:00:07	2025-07-24 16:00:07
149	51	5	main	image	media/services/media_service_51_5_main_1753372817.webp	\N	\N	5	2025-07-24 16:00:17	2025-07-24 16:00:17
150	51	5	secondary	image	media/services/media_service_51_5_secondary_1753372817.jpg	\N	\N	5	2025-07-24 16:00:17	2025-07-24 16:00:17
151	52	1	main	image	media/services/media_service_52_1_main_1753377639.png	\N	\N	1	2025-07-24 17:20:39	2025-07-24 17:20:39
152	52	1	secondary	image	media/services/media_service_52_1_secondary_1753377640.png	\N	\N	1	2025-07-24 17:20:40	2025-07-24 17:20:40
153	52	2	main	image	media/services/media_service_52_2_main_1753377653.jpg	\N	\N	2	2025-07-24 17:20:53	2025-07-24 17:20:53
154	52	2	secondary	image	media/services/media_service_52_2_secondary_1753377653.jpg	\N	\N	2	2025-07-24 17:20:53	2025-07-24 17:20:53
155	52	3	main	image	media/services/media_service_52_3_main_1753377666.png	\N	\N	3	2025-07-24 17:21:06	2025-07-24 17:21:06
156	52	3	secondary	image	media/services/media_service_52_3_secondary_1753377666.webp	\N	\N	3	2025-07-24 17:21:06	2025-07-24 17:21:06
157	52	4	main	image	media/services/media_service_52_4_main_1753377675.jpg	\N	\N	4	2025-07-24 17:21:15	2025-07-24 17:21:15
158	52	4	secondary	image	media/services/media_service_52_4_secondary_1753377675.jpg	\N	\N	4	2025-07-24 17:21:15	2025-07-24 17:21:15
159	52	5	main	image	media/services/media_service_52_5_main_1753377686.jpg	\N	\N	5	2025-07-24 17:21:26	2025-07-24 17:21:26
160	52	5	secondary	image	media/services/media_service_52_5_secondary_1753377686.png	\N	\N	5	2025-07-24 17:21:26	2025-07-24 17:21:26
161	53	1	main	video	media/services/media_service_53_1_main_1753379621.mp4	media/services/media_service_53_1_main_poster_1753379621.png	\N	1	2025-07-24 17:53:41	2025-07-24 17:53:41
162	53	1	secondary	image	media/services/media_service_53_1_secondary_1753379621.png	\N	\N	1	2025-07-24 17:53:41	2025-07-24 17:53:41
163	53	2	main	video	media/services/media_service_53_2_main_1753379812.mp4	media/services/media_service_53_2_main_poster_1753379812.png	\N	2	2025-07-24 17:56:52	2025-07-24 17:56:52
164	53	2	secondary	video	media/services/media_service_53_2_secondary_1753379812.mp4	media/services/media_service_53_2_secondary_poster_1753379812.png	\N	2	2025-07-24 17:56:52	2025-07-24 17:56:52
165	53	3	main	video	media/services/media_service_53_3_main_1753386064.mp4	media/services/media_service_53_3_main_poster_1753386064.png	\N	3	2025-07-24 19:41:04	2025-07-24 19:41:04
166	53	3	secondary	video	media/services/media_service_53_3_secondary_1753386064.mp4	media/services/media_service_53_3_secondary_poster_1753386064.png	\N	3	2025-07-24 19:41:04	2025-07-24 19:41:04
167	53	4	main	video	media/services/media_service_53_4_main_1753386193.mp4	media/services/media_service_53_4_main_poster_1753386193.png	\N	4	2025-07-24 19:43:13	2025-07-24 19:43:13
168	53	4	secondary	video	media/services/media_service_53_4_secondary_1753386193.mp4	media/services/media_service_53_4_secondary_poster_1753386193.png	\N	4	2025-07-24 19:43:13	2025-07-24 19:43:13
169	53	5	main	video	media/services/media_service_53_5_main_1753386240.mp4	media/services/media_service_53_5_main_poster_1753386241.png	\N	5	2025-07-24 19:44:01	2025-07-24 19:44:01
170	53	5	secondary	video	media/services/media_service_53_5_secondary_1753386241.mp4	media/services/media_service_53_5_secondary_poster_1753386241.png	\N	5	2025-07-24 19:44:01	2025-07-24 19:44:01
\.


--
-- Data for Name: media_services; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media_services (id, title, description, "order", dark_background, created_at, updated_at) FROM stdin;
53	видео	Покажем ваш продукт так, чтобы в него поверили и захотели.	7	f	2025-07-24 17:24:10	2025-07-24 17:24:10
46	решения для выставок	Комплексный подход к дизайну и визуализации вашего присутствия на выставке.	1	f	2025-07-23 00:28:52	2025-07-24 05:15:50
48	Брендинг стратегия	Создаём сильную визуальную идентичность, которая формирует запоминаемый образ компании и выделяет её на фоне конкурентов.	2	f	2025-07-24 15:17:53	2025-07-24 15:17:53
49	дизайн полиграфия	Фирменная печатная продукция для делового общения, выставок и POS. Всегда в срок и наивысшего качества	3	f	2025-07-24 15:30:44	2025-07-24 15:30:44
50	фото	Профессиональная фотосъёмка продукции и производства. Съёмка рабочего процесса и команды	4	f	2025-07-24 15:37:25	2025-07-24 15:37:25
52	WEB сайты	Мы создаём не просто сайт, а продуманный до деталей цифровой продукт, который работает на ваши цели.	6	f	2025-07-24 16:04:43	2025-07-24 16:06:44
51	3d графика	Промышленная визуализация, которая работает на восприятие, продажи и доверие	5	f	2025-07-24 15:49:19	2025-07-24 16:06:44
\.


--
-- Data for Name: media_testimonials; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media_testimonials (id, company, quote, description, image_path, "order", created_at, updated_at) FROM stdin;
32	Алмаз Антей «Монитор СОФТ»	Создана презентационная платформа для ключевого программного продукта.	Упростили коммуникацию с B2B-клиентами и ускорили цикл принятия решений.	testimonials/RICACRhB3jG2rOcNyrq3MpgPTqmDelyBg601Hya3.png	4	2025-07-24 22:00:38	2025-07-24 23:42:27
28	Группа компаний «ИКАР»	По итогам выставки был заключен контракт	Существенно повысили репутацию и узнаваемость бренда с помощью NIKstudio.	testimonials/ZVUBfuTgsBNsl6hbh7RKpaS0kwg8slq4UBwodhU8.jpg	1	2025-07-22 23:06:41	2025-07-24 22:01:05
29	НПП «Авиаспецмаш»	Получили инновационный корпоративный сайт, интегрированный с внутренними ИТ-системами.	Повысили доверие со стороны партнёров и заказчиков за счёт технологичного цифрового имиджа.	testimonials/kqYsTGtLmylRNUlBSJd4BAAqtht8B2Alo23jjneU.png	2	2025-07-24 19:48:23	2025-07-24 23:41:34
31	ОЭЗ «Технополис Москва»	Реализован масштабный медиапроект с интерактивными разделами.	Закрепили статус флагмана высокотехнологичного развития столицы в digital-среде.	testimonials/cTxXYr52UtOT0qUuIMqcT84RL7SeZlRZAWt0FVZq.png	3	2025-07-24 20:46:01	2025-07-24 23:42:02
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	0001_01_01_000000_create_users_table	1
2	0001_01_01_000001_create_cache_table	1
3	0001_01_01_000002_create_jobs_table	1
4	2025_06_17_080100_create_blog_posts_table	1
5	2025_06_17_080110_create_blog_post_blocks_table	1
6	2025_06_17_111750_add_slug_to_blog_posts_table	1
7	2025_06_17_112741_make_slug_not_nullable_in_blog_posts_table	1
8	2025_06_17_171052_fix_blog_posts_sequence	1
9	2025_06_18_132347_add_status_to_blog_posts_table	1
10	2025_07_04_154942_create_project_categories_table	1
11	2025_07_04_204724_adding_sort_order	1
12	2025_07_04_234601_project	1
13	2025_07_07_141150_create_project_project_category_table	1
14	2025_07_07_141232_remove_category_id_from_projects_table	1
15	2025_07_11_201842_create_project_details_table	1
16	2025_07_11_201932_create_project_detail_blocks_table	1
17	2025_07_11_202024_create_project_detail_block_media_table	1
18	2025_07_11_222943_update_project_details_table_remove_unused_fields	1
19	2025_07_12_003900_remove_order_and_is_active_from_project_detail_blocks_table	1
20	2025_07_12_023546_create_project_detail_hero_media_table	1
21	2025_07_12_034501_remove_caption_from_project_detail_block_media_table	1
22	2025_07_12_034529_remove_caption_from_project_detail_hero_media_table	1
23	2025_07_12_035627_remove_order_fields_from_project_detail_hero_media_table	1
24	2025_07_12_035707_remove_order_fields_from_project_detail_block_media_table	1
25	2025_07_12_120300_add_order_to_project_detail_blocks_table	1
26	2025_07_12_121224_add_order_to_project_detail_block_media_table	1
27	2025_07_16_193532_add_group_id_and_poster_path_to_project_detail_block_media_table	1
28	2025_07_16_220418_add_group_type_to_project_detail_block_media_table	1
29	2025_07_18_174255_create_home_contents_table	1
30	2025_07_20_183505_create_seo_settings_table	1
31	2025_07_20_183536_add_seo_fields_to_projects_table	1
32	2025_07_20_183554_add_seo_fields_to_blog_posts_table	1
33	2025_07_21_010000_create_page_seo_settings_table	1
34	2025_07_21_201301_create_service_videos_table	1
35	2025_07_21_214153_fix_service_videos_unique_constraint	1
36	2025_07_22_044328_create_media_page_content_table	1
37	2025_07_22_044336_create_media_services_table	1
38	2025_07_22_044344_create_media_service_features_table	1
39	2025_07_22_044352_create_media_service_media_table	1
40	2025_07_22_044400_create_media_testimonials_table	1
41	2025_07_22_044408_create_media_process_steps_table	1
42	2025_07_22_222442_add_performance_indexes_to_media_tables	1
43	2025_07_23_222305_add_sort_order_to_blog_posts_table	2
\.


--
-- Data for Name: page_seo_settings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.page_seo_settings (id, page_type, seo_title, seo_description, seo_image, seo_keywords, canonical_url, is_active, created_at, updated_at) FROM stdin;
2	home	Nik Studio - Комплексные решения для промышленных компаний | Мультимедиа и веб-разработка	Превращаем сложные технологии в понятный визуал. Комплексные решения для промышленных компаний: мультимедиа, брендинг, 3D-визуализация, видеопродакшн, создание сайтов. Подготовка к отраслевым выставкам и вывод продукта на новый рынок.	seo/pages/1753395714_home_3d_2.png	["\\u043c\\u0443\\u043b\\u044c\\u0442\\u0438\\u043c\\u0435\\u0434\\u0438\\u0430","\\u0431\\u0440\\u0435\\u043d\\u0434\\u0438\\u043d\\u0433","3\\u0434-\\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u0438\\u0437\\u0430\\u0446\\u0438\\u044f","\\u0432\\u0438\\u0434\\u0435\\u043e\\u043f\\u0440\\u043e\\u0434\\u0430\\u043a\\u0448\\u043d","\\u0441\\u043e\\u0437\\u0434\\u0430\\u043d\\u0438\\u0435 \\u0441\\u0430\\u0439\\u0442\\u043e\\u0432","\\u043f\\u0440\\u043e\\u043c\\u044b\\u0448\\u043b\\u0435\\u043d\\u043d\\u044b\\u0435 \\u043a\\u043e\\u043c\\u043f\\u0430\\u043d\\u0438\\u0438","\\u043e\\u0442\\u0440\\u0430\\u0441\\u043b\\u0435\\u0432\\u044b\\u0435 \\u0432\\u044b\\u0441\\u0442\\u0430\\u0432\\u043a\\u0438","\\u043a\\u043e\\u043c\\u043c\\u0435\\u0440\\u0447\\u0435\\u0441\\u043a\\u0430\\u044f \\u0444\\u043e\\u0442\\u043e\\u0433\\u0440\\u0430\\u0444\\u0438\\u044f","\\u0432\\u0435\\u0431-\\u0440\\u0430\\u0437\\u0440\\u0430\\u0431\\u043e\\u0442\\u043a\\u0430","\\u0434\\u0438\\u0437\\u0430\\u0439\\u043d \\u043f\\u0440\\u0435\\u0437\\u0435\\u043d\\u0442\\u0430\\u0446\\u0438\\u0439","\\u0442\\u0435\\u0445\\u043d\\u043e\\u043b\\u043e\\u0433\\u0438\\u0438 \\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u0438\\u0437\\u0430\\u0446\\u0438\\u044f","\\u043a\\u043e\\u043c\\u043f\\u043b\\u0435\\u043a\\u0441\\u043d\\u044b\\u0435 \\u0440\\u0435\\u0448\\u0435\\u043d\\u0438\\u044f"]	https://nikstudio.ru/	t	2025-07-24 22:21:54	2025-07-24 22:24:32
3	projects_list	Проекты Nik Studio - Портфолио веб-разработки, дизайна и брендинга | Комплексные решения	Портфолио проектов Nik Studio: веб-разработка, мобильные приложения, дизайн интерфейсов, брендинг и маркетинг. Весь визуальный посыл в едином ключе создаёт сильный бренд и надежную репутацию. Комплексные решения для промышленных компаний.	seo/pages/1753395954_projects_list_ikar.jpg	["\\u043f\\u043e\\u0440\\u0442\\u0444\\u043e\\u043b\\u0438\\u043e \\u043f\\u0440\\u043e\\u0435\\u043a\\u0442\\u043e\\u0432","\\u0432\\u0435\\u0431-\\u0440\\u0430\\u0437\\u0440\\u0430\\u0431\\u043e\\u0442\\u043a\\u0430","\\u043c\\u043e\\u0431\\u0438\\u043b\\u044c\\u043d\\u044b\\u0435 \\u043f\\u0440\\u0438\\u043b\\u043e\\u0436\\u0435\\u043d\\u0438\\u044f","\\u0434\\u0438\\u0437\\u0430\\u0439\\u043d \\u0438\\u043d\\u0442\\u0435\\u0440\\u0444\\u0435\\u0439\\u0441\\u043e\\u0432","\\u0431\\u0440\\u0435\\u043d\\u0434\\u0438\\u043d\\u0433","\\u043c\\u0430\\u0440\\u043a\\u0435\\u0442\\u0438\\u043d\\u0433","\\u043a\\u043e\\u043c\\u043f\\u043b\\u0435\\u043a\\u0441\\u043d\\u044b\\u0435 \\u0440\\u0435\\u0448\\u0435\\u043d\\u0438\\u044f","\\u043f\\u0440\\u043e\\u043c\\u044b\\u0448\\u043b\\u0435\\u043d\\u043d\\u044b\\u0435 \\u043a\\u043e\\u043c\\u043f\\u0430\\u043d\\u0438\\u0438","\\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u044c\\u043d\\u044b\\u0439 \\u0434\\u0438\\u0437\\u0430\\u0439\\u043d","\\u043a\\u043e\\u0440\\u043f\\u043e\\u0440\\u0430\\u0442\\u0438\\u0432\\u043d\\u044b\\u0439 \\u0441\\u0442\\u0438\\u043b\\u044c","\\u043f\\u0440\\u043e\\u0435\\u043a\\u0442\\u044b \\u043f\\u043e\\u0434 \\u043a\\u043b\\u044e\\u0447"]	https://nikstudio.ru/projects	t	2025-07-24 22:25:27	2025-07-24 22:28:55
4	blog_list	Блог Nik Studio - Новости дизайна, брендинга и веб-разработки | Стратегии бренда	Блог о дизайне, брендинге и веб-разработке от Nik Studio. Новости и тенденции, которые помогут усовершенствовать стратегию вашего бренда. Экспертные статьи о визуальном дизайне, промышленном брендинге и digital-решениях.	seo/pages/1753396252_blog_list_blog_img1.jpg	["\\u0431\\u043b\\u043e\\u0433 \\u0434\\u0438\\u0437\\u0430\\u0439\\u043d","\\u0431\\u0440\\u0435\\u043d\\u0434\\u0438\\u043d\\u0433 \\u0441\\u0442\\u0430\\u0442\\u044c\\u0438","\\u0432\\u0435\\u0431-\\u0440\\u0430\\u0437\\u0440\\u0430\\u0431\\u043e\\u0442\\u043a\\u0430 \\u043d\\u043e\\u0432\\u043e\\u0441\\u0442\\u0438","\\u0441\\u0442\\u0440\\u0430\\u0442\\u0435\\u0433\\u0438\\u044f \\u0431\\u0440\\u0435\\u043d\\u0434\\u0430","\\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u044c\\u043d\\u044b\\u0439 \\u0434\\u0438\\u0437\\u0430\\u0439\\u043d","\\u043f\\u0440\\u043e\\u043c\\u044b\\u0448\\u043b\\u0435\\u043d\\u043d\\u044b\\u0439 \\u0434\\u0438\\u0437\\u0430\\u0439\\u043d","\\u043a\\u0440\\u0435\\u0430\\u0442\\u0438\\u0432\\u043d\\u044b\\u0439 \\u0434\\u0438\\u0440\\u0435\\u043a\\u0442\\u043e\\u0440","\\u0434\\u0438\\u0437\\u0430\\u0439\\u043d \\u043f\\u0440\\u043e\\u0434\\u0430\\u0435\\u0442","\\u0442\\u0435\\u043d\\u0434\\u0435\\u043d\\u0446\\u0438\\u0438 \\u0434\\u0438\\u0437\\u0430\\u0439\\u043d\\u0430","digital \\u0440\\u0435\\u0448\\u0435\\u043d\\u0438\\u044f","\\u043a\\u043e\\u0440\\u043f\\u043e\\u0440\\u0430\\u0442\\u0438\\u0432\\u043d\\u044b\\u0439 \\u0441\\u0442\\u0438\\u043b\\u044c"]	https://nikstudio.ru/blog	t	2025-07-24 22:30:52	2025-07-24 22:33:13
1	media	Медиа-услуги Nik Studio - Видеопродакшн, 3D-визуализация, фотосъемка | Промышленный брендинг	Комплексные медиа-услуги для промышленных компаний: видеопродакшн, 3D-графика, профессиональная фотосъемка, брендинг, веб-разработка, дизайн полиграфии. Превращаем сложные технологии в понятный визуал. Решения для выставок и презентаций.	seo/pages/1753396596_media_main_image_1.png	["\\u0432\\u0438\\u0434\\u0435\\u043e\\u043f\\u0440\\u043e\\u0434\\u0430\\u043a\\u0448\\u043d","3D-\\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u0438\\u0437\\u0430\\u0446\\u0438\\u044f","\\u043f\\u0440\\u043e\\u043c\\u044b\\u0448\\u043b\\u0435\\u043d\\u043d\\u0430\\u044f \\u0444\\u043e\\u0442\\u043e\\u0441\\u044a\\u0435\\u043c\\u043a\\u0430","\\u0431\\u0440\\u0435\\u043d\\u0434\\u0438\\u043d\\u0433 \\u0441\\u0442\\u0440\\u0430\\u0442\\u0435\\u0433\\u0438\\u044f","\\u0432\\u0435\\u0431-\\u0440\\u0430\\u0437\\u0440\\u0430\\u0431\\u043e\\u0442\\u043a\\u0430","\\u0434\\u0438\\u0437\\u0430\\u0439\\u043d \\u043f\\u043e\\u043b\\u0438\\u0433\\u0440\\u0430\\u0444\\u0438\\u0438","\\u0432\\u044b\\u0441\\u0442\\u0430\\u0432\\u043e\\u0447\\u043d\\u044b\\u0435 \\u0440\\u0435\\u0448\\u0435\\u043d\\u0438\\u044f","\\u043f\\u0440\\u043e\\u043c\\u044b\\u0448\\u043b\\u0435\\u043d\\u043d\\u044b\\u0439 \\u0434\\u0438\\u0437\\u0430\\u0439\\u043d","\\u0442\\u0435\\u0445\\u043d\\u0438\\u0447\\u0435\\u0441\\u043a\\u0430\\u044f \\u0432\\u0438\\u0437\\u0443\\u0430\\u043b\\u0438\\u0437\\u0430\\u0446\\u0438\\u044f","\\u043a\\u043e\\u0440\\u043f\\u043e\\u0440\\u0430\\u0442\\u0438\\u0432\\u043d\\u043e\\u0435 \\u0432\\u0438\\u0434\\u0435\\u043e","3D-\\u0430\\u043d\\u0438\\u043c\\u0430\\u0446\\u0438\\u044f","\\u043c\\u0435\\u0434\\u0438\\u0430-\\u0443\\u0441\\u043b\\u0443\\u0433\\u0438"]	https://nikstudio.ru/media	t	2025-07-23 19:43:22	2025-07-24 22:36:37
\.


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.password_reset_tokens (email, token, created_at) FROM stdin;
\.


--
-- Data for Name: project_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.project_categories (id, name, slug, created_at, updated_at, sort_order) FROM stdin;
5	Брендинг	brending	2025-07-23 18:13:29	2025-07-23 23:50:55	1
4	Дизайн	dizain	2025-07-23 18:13:29	2025-07-23 23:51:32	1
7	3д графика	3d-grafika	2025-07-23 23:51:56	2025-07-23 23:52:06	2
2	Фото	foto	2025-07-23 18:13:29	2025-07-23 23:52:32	3
3	Видео	video	2025-07-23 18:13:29	2025-07-23 23:52:42	4
6	Сайты	saity	2025-07-23 18:13:29	2025-07-23 23:52:51	5
\.


--
-- Data for Name: project_detail_block_media; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.project_detail_block_media (id, project_detail_block_id, file_path, file_type, alt_text, created_at, updated_at, "order", group_id, poster_path, group_type) FROM stdin;
9	1	/storage/projects/blocks/FnFfSQPlB5V0AdRLt0DQQ3cVwKqdNylJ7hxhZVax.svg	image		2025-07-24 04:51:08	2025-07-24 04:51:08	1	1753332651092	\N	double
10	1	/storage/projects/blocks/sriH1e50GPeMtvvmmj8Q4z8GVs1ECql7Hr4IvINd.png	image		2025-07-24 04:51:08	2025-07-24 04:51:08	2	1753332651092	\N	double
11	1	/storage/projects/blocks/xSSytQxKqOUxKxGTndSfsbla2Vbp5xFksm8C8AUV.jpg	image		2025-07-24 04:51:38	2025-07-24 04:51:38	1	1753332679542	\N	single
19	2	/storage/projects/blocks/qJOWwijGjaoOOOiKcddu2CdyynWZiIWr3KgksXz6.jpg	image		2025-07-24 04:56:22	2025-07-24 04:56:22	1	3	\N	double
20	2	/storage/projects/blocks/ABFxT2P60W7ZxZmVIY7XAmqg2F2T77LG4Hhofxr4.jpg	image		2025-07-24 04:56:22	2025-07-24 04:56:22	2	3	\N	double
21	2	/storage/projects/blocks/VUNzVspaHvqbCqeKrwGfza8Kuhx5p96tGdJVdIAt.jpg	image		2025-07-24 04:56:27	2025-07-24 04:56:27	1	1	\N	double
22	2	/storage/projects/blocks/Y8NtXxatTaMkqkOW7Slpjkj94Hg2c4vJdlKaLPmO.jpg	image		2025-07-24 04:56:27	2025-07-24 04:56:27	2	1	\N	double
23	2	/storage/projects/blocks/VtvhldObWxxBanADUKYxpJfcwgN7bUcTF4Js5j5S.jpg	image		2025-07-24 04:56:32	2025-07-24 04:56:32	1	2	\N	single
24	2	/storage/projects/blocks/4clg7dbehDFpNUev00aFF2u8OR6rgVTaXzZArI2k.jpg	image		2025-07-24 04:56:57	2025-07-24 04:56:57	1	4	\N	single
25	3	/storage/projects/blocks/P7nwMkKrKYb1b4nIRMkIDelng68cR8UO3YCbew5D.png	image		2025-07-24 04:58:17	2025-07-24 04:58:17	1	1753333077369	\N	double
26	3	/storage/projects/blocks/kBhDejHfLH5NSURjkz2r5Idw3t84K3Oi4yNIxFxa.png	image		2025-07-24 04:58:17	2025-07-24 04:58:17	2	1753333077369	\N	double
27	3	/storage/projects/blocks/GQkDYhEXzBgS8ZDpcPRbTICRBOqU1OFdq8Ivjwz3.jpg	image		2025-07-24 04:59:36	2025-07-24 04:59:36	1	1753333168984	\N	single
33	4	/storage/projects/blocks/EDOQ7tWdKIp54y76t9rdMduHCVpnYw0DQTTix7fe.png	image		2025-07-24 05:03:37	2025-07-24 05:03:37	1	1	\N	single
34	4	/storage/projects/blocks/Gglv5iQ3T9ziZn2VASgUQozhjzx9qUMeQMc7rrHN.jpg	image		2025-07-24 05:03:50	2025-07-24 05:03:50	1	2	\N	single
35	4	/storage/projects/blocks/SXKgYddjTLQmjMQSpAcf4tUWEEpDynqSNz0qrBdr.jpg	image		2025-07-24 05:03:56	2025-07-24 05:03:56	1	3	\N	single
36	4	/storage/projects/blocks/X0Aqi5PlSpcP9oRCyX69XN8e5EXd2aIq9vqmMkpP.jpg	image		2025-07-24 05:04:00	2025-07-24 05:04:00	1	4	\N	single
37	4	/storage/projects/blocks/zI62kMOavNw6XC03kDRqCPae5ztfj6aRw6DyqiUT.mp4	video		2025-07-24 05:04:07	2025-07-24 05:04:07	1	5	/storage/projects/blocks/posters/EqBoLfm7xUFv1gWFfwnopWLg5chRzJ4bznz6hZ4Z.jpg	single
40	5	/storage/projects/blocks/BIIq03nCC7noVnDGwz2nhZgAlbU8AbWgpua0DcS2.png	image		2025-07-24 05:06:39	2025-07-24 05:06:39	1	1	\N	single
41	5	/storage/projects/blocks/BULhu3W3Ebyx7U3w0UoCuZma7MPCfLiUreghrReJ.jpg	image		2025-07-24 05:06:44	2025-07-24 05:06:44	1	2	\N	single
42	5	/storage/projects/blocks/HKlQogbGPlqsQmeUBtIGaUPB9KtWOUYiu3UY0t9d.jpg	image		2025-07-24 05:06:56	2025-07-24 05:06:56	1	3	\N	single
43	5	/storage/projects/blocks/LEZpc8YB7JT74Vf52anqePVRrqeljfm2cgNzrcmW.jpg	image		2025-07-24 05:07:06	2025-07-24 05:07:06	1	4	\N	single
44	5	/storage/projects/blocks/MM3lsVToq2s92AOeDfKyKFGegbkwWdCDHjBpNdXH.jpg	image		2025-07-24 05:07:17	2025-07-24 05:07:17	1	5	\N	single
45	5	/storage/projects/blocks/bEMb7MWIxqTIqJH7ooxWc8U4ywweC0SfuIcyHzBu.webp	image		2025-07-24 05:07:26	2025-07-24 05:07:26	1	6	\N	single
46	6	/storage/projects/blocks/yJJqz11g5QnXDkLW2Amen8zh6eKc1HpBsbieAaqB.jpg	image		2025-07-24 05:10:08	2025-07-24 05:10:08	1	1	\N	single
47	6	/storage/projects/blocks/xMFP4QAwxpjg82M9QGn7DoGO6k9yp9kuDS6W0H6O.jpg	image		2025-07-24 05:10:25	2025-07-24 05:10:25	1	2	\N	single
48	6	/storage/projects/blocks/ElNzdH4Mgo58l7XvLSwb3FzBwGOECXIzk2gQYrbl.jpg	image		2025-07-24 05:10:34	2025-07-24 05:10:34	1	3	\N	single
49	6	/storage/projects/blocks/rlHblonrUt5409pQQsivBGMZ0MOlvFs8BTnveayt.jpg	image		2025-07-24 05:10:43	2025-07-24 05:10:43	1	4	\N	single
50	6	/storage/projects/blocks/AzB2lHnv0jcJX3ocuvYTIOjEQoHQSWNph9KgCMRp.jpg	image		2025-07-24 05:10:53	2025-07-24 05:10:53	1	5	\N	single
\.


--
-- Data for Name: project_detail_blocks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.project_detail_blocks (id, project_detail_id, title, subtitle, content, created_at, updated_at, "order") FROM stdin;
1	1	брендинг	Доработка уже имеющегося логотипа компании	Задачи не было переделывать весь логотип, необходимо было доработать уже имеющуюся версию. В данном случае компания «ИКАР» в какой то момент обрела статус группы компаний и соответственно для разных подразделений и предприятий, входящих в состав группы, были доработаны логотипы. Так же был создан фирменный паттерн, набор инфо-графических элементов, точно отражающих деятельность компании.	2025-07-22 22:53:44	2025-07-24 04:33:17	1
2	1	фото	Профессиональная фото-съёмка всех процессов, продукции и выставок	Съёмка фотографии - один из наиболее важных моментов, так как это важная часть любого визуала и основная составляющая всех медиа.	2025-07-24 04:52:12	2025-07-24 04:52:12	2
3	1	3d графика	На основе CAD моделей создали реальные объекты в материале и окрасе. Анимировали и применили в проморолике, презентациях и на сайте сайте.	На основе всех 3д моделей в инженерном сером виде, мы создали уникальные по красоте и эффектности объекты, наложили на них все материалы и логотипы. Положили надписи и ливреи. Анимировали объекты и создали сцены с графикой, которую в последствии использовали во всех визуальных компонентах, усилив эффект от просмотра и вовлеченность зрителя	2025-07-24 04:57:49	2025-07-24 04:57:49	3
4	1	промо видео	Промо видео для стенда и диджитал, точно передающее смыслы	Работа над роликом велась в предельно короткий промежуток времени. Сэкономили время для компании, ускоренно начав работу по составлению ТЗ самостоятельно - что сильно ускорило процесс. В итоге показали все важнейшие моменты на видео: процесс разработки, испытаний, локализация производства, возможность расширения производства в кратчайшие сроки, и конечно сами полёты изделия, демонстрирующие его возможности.	2025-07-24 05:00:13	2025-07-24 05:00:13	4
5	1	презентация	Неотъемлемой частью выставки и любого коммерческого предложения является презентация	В презентации использовали: брендинг, паттерны, коммерческие фотографии, 3д графику. Всё это позволило создать понятную брошюру без воды. Так же были изготовлены полиграфические варианты самой презентации, и созданы папки, блокноты и другая полиграфия для выставки.	2025-07-24 05:05:24	2025-07-24 05:05:24	5
6	1	сайт	Создание сайта в кратчайшие сроки	Веб сайт отвечающий всем требованиям времени. Создан на российской системе управления и размещён на российском сервере, отвечающий запросам безопастности. Учтена верстка под все устройства: мобильный телефон, планшет, ноутбуки и компьютеры. Так же на сайте продуман весь путь клиента от ознакомления с продукцией к действию по запросу более подробной информации и квалификации клиента. \nВ основе создания лежат технологии анимированной 3д графики, промовидео, UX/UI дизайн.\nСозданы русская и английская версия. \nРаботы сделаны под ключ за 3 недели.	2025-07-24 05:08:19	2025-07-24 05:08:19	6
\.


--
-- Data for Name: project_detail_hero_media; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.project_detail_hero_media (id, project_detail_id, group_id, group_type, file_path, file_type, alt_text, poster_path, created_at, updated_at) FROM stdin;
4	1	1	single	projects/hero/Zi62uOIZKJwKx9L1D6T1h5rBZRdAB9iXondyAct8.jpg	image		\N	2025-07-24 04:29:11	2025-07-24 04:29:11
7	1	2	single	projects/hero/4VMHgolJdRxri8xPNdftjwc6Nj0zIw5hi7d78DQ8.jpg	image		\N	2025-07-24 04:29:49	2025-07-24 04:29:49
8	1	3	single	projects/hero/QIEIIx5H6MXKCgdZ6t3cfRaQmm2Op0kE8j8MLrQs.jpg	image		\N	2025-07-24 04:29:57	2025-07-24 04:29:57
9	1	4	single	projects/hero/UeJ5ROtNM9TJgmRipWpxm5KiLQ6Y2HuQtCmcD0Dt.jpg	image		\N	2025-07-24 04:30:05	2025-07-24 04:30:05
10	1	5	single	projects/hero/2sHYdtptbS24vFjl66UlxDXzXYagQN0HObGllbC0.webp	image		\N	2025-07-24 04:30:13	2025-07-24 04:30:13
\.


--
-- Data for Name: project_details; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.project_details (id, project_id, title, subtitle, client, year, created_at, updated_at) FROM stdin;
1	1	икар	Полная подготовка и сопровождение нескольких отраслевых выставок	ГК «ИКАР», Корпорация «АФК Система»	2023	2025-07-22 22:52:31	2025-07-24 04:12:40
\.


--
-- Data for Name: project_project_category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.project_project_category (id, project_id, project_category_id, created_at, updated_at) FROM stdin;
2	1	5	\N	\N
3	1	4	\N	\N
4	2	7	\N	\N
5	2	2	\N	\N
6	3	2	\N	\N
7	3	6	\N	\N
8	4	7	\N	\N
9	4	2	\N	\N
10	4	3	\N	\N
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.projects (id, main_image, projects_page_image, logo, main_title, projects_page_title, year, slug, created_at, updated_at, seo_title, seo_description, seo_image) FROM stdin;
1	/storage/projects/main/A30mrQ9pbsZZj1mU6cpLUTKn4nQ3dWPpxmf1Zt56.jpg	/storage/projects/page/hB47Fg9oiT5Kj7rYse9Q9F2fak9G6ojs79XMNpeE.jpg	/storage/projects/logos/MdnI3DC05V475UolyQzaxBW8EIEuygt2aha7jBHV.svg	Группа компаний «ИКАР»	икар	2024	gruppa-kompaniy-ikar	2025-07-22 22:52:20	2025-07-24 22:39:02	Группа компаний ИКАР - Брендинг и медиа-поддержка авиационных технологий | Nik Studio	Комплексная работа с Группой компаний ИКАР: разработка брендинга для авиационных и беспилотных технологий, 3D-визуализация, промо-видео, профессиональная фотосъемка. Полная подготовка и сопровождение отраслевых выставок. Проект 2024 года от Nik Studio.	seo/projects/1753396742_project_1_ikar.jpg
2	/storage/projects/main/e9XoANCKaKrlVEdZlsd29ZYrK0DgRhwRHu4jCZtw.jpg	/storage/projects/page/mIz0bZux7uUsNv2ir7bTMaaa4VJrEE12efIk5OjL.jpg	/storage/projects/logos/xxoAayc41xjN7ftkWdPGSCQ95PZgwdAhzK6MvslP.svg	НПП «Авиаспецмаш»	авиаспецмаш	2024	npp-aviaspetsmash	2025-07-24 00:25:01	2025-07-24 22:40:27	НПП «Авиаспецмаш» - Брендинг и медиа-поддержка авиационного оборудования | Nik Studio	Комплексная работа с НПП «Авиаспецмаш»: разработка брендинга для производителя авиационного специализированного оборудования, 3D-визуализация, промо-видео, профессиональная фотосъемка. Полная подготовка и сопровождение отраслевых выставок. Проект 2024 года от Nik Studio.	seo/projects/1753396827_project_2_aviaspecmash.jpg
3	/storage/projects/main/AYNLcDDGSLRk5kPo1QiYonxhQqmq4on4VQLh6a5o.jpg	/storage/projects/page/0Mt1uTWuwMaSgjWtbfhH88VwXl3Ukd3CZj58m0CU.jpg	/storage/projects/logos/kA3vBT1FdzsbHkumMn46WsGUpZ5FhH2sECP7yySL.svg	ОЭЗ «Технополис Москва»	технополис москва	2024	oez-tehnopolis-moskva	2025-07-24 00:27:43	2025-07-24 22:42:17	ОЭЗ «Технополис Москва» - Брендинг и медиа-поддержка инновационного центра | Nik Studio	Комплексная работа с ОЭЗ «Технополис Москва»: разработка брендинга для особой экономической зоны, организация съемки стратегических сессий с участием С.С. Собянина, 3D-визуализация, промо-видео. Полная подготовка и сопровождение отраслевых выставок. Проект 2024 года от Nik Studio.	seo/projects/1753396937_project_3_tehnopolis.jpg
4	/storage/projects/main/KYtcq2ENK2WIt3BehD9Si9nI16WlfMZpkb6SslnO.jpg	/storage/projects/page/uyRHOxEvNMnWztMk6dBW5pmcrh6zZ61zowU7uxuN.jpg	/storage/projects/logos/V0Qh4d41DB9F24Sp1EqWqItadISp9S9r9prqnMTd.svg	Алмаз Антей «Монитор СОФТ»	монитор софт	2024	almaz-antey-monitor-soft	2025-07-24 00:29:43	2025-07-24 22:43:34	Алмаз Антей «Монитор СОФТ» - Брендинг и медиа-поддержка систем мониторинга | Nik Studio	Комплексная работа с Алмаз Антей «Монитор СОФТ»: разработка брендинга для систем мониторинга и управления, 3D-визуализация программных решений, промо-видео, профессиональная фотосъемка. Полная подготовка и сопровождение отраслевых выставок. Проект 2024 года от Nik Studio.	seo/projects/1753397014_project_4_monitor-soft.jpg
\.


--
-- Data for Name: seo_settings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.seo_settings (id, site_title, site_description, default_image, twitter_card_type, facebook_app_id, created_at, updated_at) FROM stdin;
1	Nik Studio	Комплексные решения для промышленных компаний / подготовка к отраслевым выставкам / сопровождение / вывод продукта на новый рынок	seo/1753395590_3d_2.png	summary_large_image	\N	2025-07-24 22:19:23	2025-07-24 22:19:50
\.


--
-- Data for Name: service_videos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.service_videos (id, service_name, video_path, video_original_name, video_size, is_active, created_at, updated_at) FROM stdin;
1	video_production	services/videos/service-video-M1rz3GU3dr.mp4	Авиационный Буксировочный Комплекс Геркулес (АБК ГЕРКУЛЕС).mp4	43776634	t	2025-07-24 04:32:30	2025-07-24 04:32:30
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sessions (id, user_id, ip_address, user_agent, payload, last_activity) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at) FROM stdin;
\.


--
-- Name: blog_post_blocks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.blog_post_blocks_id_seq', 18, true);


--
-- Name: blog_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.blog_posts_id_seq', 6, true);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- Name: home_contents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.home_contents_id_seq', 1, true);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- Name: media_page_content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_page_content_id_seq', 10, true);


--
-- Name: media_process_steps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_process_steps_id_seq', 41, true);


--
-- Name: media_service_features_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_service_features_id_seq', 223, true);


--
-- Name: media_service_media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_service_media_id_seq', 170, true);


--
-- Name: media_services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_services_id_seq', 53, true);


--
-- Name: media_testimonials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_testimonials_id_seq', 32, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.migrations_id_seq', 43, true);


--
-- Name: page_seo_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.page_seo_settings_id_seq', 4, true);


--
-- Name: project_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.project_categories_id_seq', 7, true);


--
-- Name: project_detail_block_media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.project_detail_block_media_id_seq', 50, true);


--
-- Name: project_detail_blocks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.project_detail_blocks_id_seq', 6, true);


--
-- Name: project_detail_hero_media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.project_detail_hero_media_id_seq', 10, true);


--
-- Name: project_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.project_details_id_seq', 1, true);


--
-- Name: project_project_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.project_project_category_id_seq', 11, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.projects_id_seq', 5, true);


--
-- Name: seo_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.seo_settings_id_seq', 1, true);


--
-- Name: service_videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.service_videos_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: blog_post_blocks blog_post_blocks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_post_blocks
    ADD CONSTRAINT blog_post_blocks_pkey PRIMARY KEY (id);


--
-- Name: blog_posts blog_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_pkey PRIMARY KEY (id);


--
-- Name: blog_posts blog_posts_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_slug_unique UNIQUE (slug);


--
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- Name: home_contents home_contents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_contents
    ADD CONSTRAINT home_contents_pkey PRIMARY KEY (id);


--
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: media_page_content media_page_content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_page_content
    ADD CONSTRAINT media_page_content_pkey PRIMARY KEY (id);


--
-- Name: media_process_steps media_process_steps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_process_steps
    ADD CONSTRAINT media_process_steps_pkey PRIMARY KEY (id);


--
-- Name: media_service_features media_service_features_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_service_features
    ADD CONSTRAINT media_service_features_pkey PRIMARY KEY (id);


--
-- Name: media_service_media media_service_media_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_service_media
    ADD CONSTRAINT media_service_media_pkey PRIMARY KEY (id);


--
-- Name: media_services media_services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_services
    ADD CONSTRAINT media_services_pkey PRIMARY KEY (id);


--
-- Name: media_testimonials media_testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_testimonials
    ADD CONSTRAINT media_testimonials_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: page_seo_settings page_seo_settings_page_type_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.page_seo_settings
    ADD CONSTRAINT page_seo_settings_page_type_unique UNIQUE (page_type);


--
-- Name: page_seo_settings page_seo_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.page_seo_settings
    ADD CONSTRAINT page_seo_settings_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- Name: project_categories project_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_categories
    ADD CONSTRAINT project_categories_pkey PRIMARY KEY (id);


--
-- Name: project_categories project_categories_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_categories
    ADD CONSTRAINT project_categories_slug_unique UNIQUE (slug);


--
-- Name: project_detail_block_media project_detail_block_media_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_detail_block_media
    ADD CONSTRAINT project_detail_block_media_pkey PRIMARY KEY (id);


--
-- Name: project_detail_blocks project_detail_blocks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_detail_blocks
    ADD CONSTRAINT project_detail_blocks_pkey PRIMARY KEY (id);


--
-- Name: project_detail_hero_media project_detail_hero_media_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_detail_hero_media
    ADD CONSTRAINT project_detail_hero_media_pkey PRIMARY KEY (id);


--
-- Name: project_details project_details_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_details
    ADD CONSTRAINT project_details_pkey PRIMARY KEY (id);


--
-- Name: project_project_category project_project_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_project_category
    ADD CONSTRAINT project_project_category_pkey PRIMARY KEY (id);


--
-- Name: project_project_category project_project_category_project_id_project_category_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_project_category
    ADD CONSTRAINT project_project_category_project_id_project_category_id_unique UNIQUE (project_id, project_category_id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: projects projects_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_slug_unique UNIQUE (slug);


--
-- Name: seo_settings seo_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seo_settings
    ADD CONSTRAINT seo_settings_pkey PRIMARY KEY (id);


--
-- Name: service_videos service_videos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service_videos
    ADD CONSTRAINT service_videos_pkey PRIMARY KEY (id);


--
-- Name: service_videos service_videos_service_name_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service_videos
    ADD CONSTRAINT service_videos_service_name_unique UNIQUE (service_name);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_media_process_steps_order; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_media_process_steps_order ON public.media_process_steps USING btree ("order");


--
-- Name: idx_media_process_steps_order_created; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_media_process_steps_order_created ON public.media_process_steps USING btree ("order", created_at);


--
-- Name: idx_media_service_features_service_order; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_media_service_features_service_order ON public.media_service_features USING btree (service_id, "order");


--
-- Name: idx_media_service_media_group_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_media_service_media_group_type ON public.media_service_media USING btree (group_id, media_type);


--
-- Name: idx_media_service_media_service_group; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_media_service_media_service_group ON public.media_service_media USING btree (service_id, group_id);


--
-- Name: idx_media_service_media_service_order; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_media_service_media_service_order ON public.media_service_media USING btree (service_id, "order");


--
-- Name: idx_media_services_order; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_media_services_order ON public.media_services USING btree ("order");


--
-- Name: idx_media_services_order_created; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_media_services_order_created ON public.media_services USING btree ("order", created_at);


--
-- Name: idx_media_testimonials_order; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_media_testimonials_order ON public.media_testimonials USING btree ("order");


--
-- Name: idx_media_testimonials_order_created; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_media_testimonials_order_created ON public.media_testimonials USING btree ("order", created_at);


--
-- Name: jobs_queue_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);


--
-- Name: media_service_media_service_id_group_id_order_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_service_media_service_id_group_id_order_index ON public.media_service_media USING btree (service_id, group_id, "order");


--
-- Name: project_detail_hero_media_project_detail_id_group_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX project_detail_hero_media_project_detail_id_group_id_index ON public.project_detail_hero_media USING btree (project_detail_id, group_id);


--
-- Name: service_videos_service_name_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX service_videos_service_name_index ON public.service_videos USING btree (service_name);


--
-- Name: sessions_last_activity_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);


--
-- Name: sessions_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);


--
-- Name: blog_post_blocks blog_post_blocks_blog_post_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_post_blocks
    ADD CONSTRAINT blog_post_blocks_blog_post_id_foreign FOREIGN KEY (blog_post_id) REFERENCES public.blog_posts(id) ON DELETE CASCADE;


--
-- Name: media_service_features media_service_features_service_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_service_features
    ADD CONSTRAINT media_service_features_service_id_foreign FOREIGN KEY (service_id) REFERENCES public.media_services(id) ON DELETE CASCADE;


--
-- Name: media_service_media media_service_media_service_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_service_media
    ADD CONSTRAINT media_service_media_service_id_foreign FOREIGN KEY (service_id) REFERENCES public.media_services(id) ON DELETE CASCADE;


--
-- Name: project_detail_block_media project_detail_block_media_project_detail_block_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_detail_block_media
    ADD CONSTRAINT project_detail_block_media_project_detail_block_id_foreign FOREIGN KEY (project_detail_block_id) REFERENCES public.project_detail_blocks(id) ON DELETE CASCADE;


--
-- Name: project_detail_blocks project_detail_blocks_project_detail_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_detail_blocks
    ADD CONSTRAINT project_detail_blocks_project_detail_id_foreign FOREIGN KEY (project_detail_id) REFERENCES public.project_details(id) ON DELETE CASCADE;


--
-- Name: project_detail_hero_media project_detail_hero_media_project_detail_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_detail_hero_media
    ADD CONSTRAINT project_detail_hero_media_project_detail_id_foreign FOREIGN KEY (project_detail_id) REFERENCES public.project_details(id) ON DELETE CASCADE;


--
-- Name: project_details project_details_project_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_details
    ADD CONSTRAINT project_details_project_id_foreign FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: project_project_category project_project_category_project_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_project_category
    ADD CONSTRAINT project_project_category_project_category_id_foreign FOREIGN KEY (project_category_id) REFERENCES public.project_categories(id) ON DELETE CASCADE;


--
-- Name: project_project_category project_project_category_project_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_project_category
    ADD CONSTRAINT project_project_category_project_id_foreign FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

