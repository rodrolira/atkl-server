--
-- PostgreSQL database dump
--

-- Dumped from database version 17rc1
-- Dumped by pg_dump version 17rc1

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

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: enum_artists_role; Type: TYPE; Schema: public; Owner: rodrolira
--

CREATE TYPE public.enum_artists_role AS ENUM (
    'Dj',
    'Producer'
);


ALTER TYPE public.enum_artists_role OWNER TO rodrolira;

--
-- Name: enum_releases_genre; Type: TYPE; Schema: public; Owner: rodrolira
--

CREATE TYPE public.enum_releases_genre AS ENUM (
    'Techno',
    'Industrial Techno',
    'Hard Techno',
    'Acid Techno',
    'Hardcore',
    'Schranz'
);


ALTER TYPE public.enum_releases_genre OWNER TO rodrolira;

--
-- Name: enum_releases_release_type; Type: TYPE; Schema: public; Owner: rodrolira
--

CREATE TYPE public.enum_releases_release_type AS ENUM (
    'Album',
    'EP',
    'Single',
    'V.A'
);


ALTER TYPE public.enum_releases_release_type OWNER TO rodrolira;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ReleaseArtists; Type: TABLE; Schema: public; Owner: rodrolira
--

CREATE TABLE public."ReleaseArtists" (
    release_id integer NOT NULL,
    artist_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ReleaseArtists" OWNER TO rodrolira;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: rodrolira
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO rodrolira;

--
-- Name: TeamMembers; Type: TABLE; Schema: public; Owner: rodrolira
--

CREATE TABLE public."TeamMembers" (
    id integer NOT NULL,
    name character varying(255),
    "position" character varying(255),
    image_url character varying(255),
    bio text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."TeamMembers" OWNER TO rodrolira;

--
-- Name: TeamMembers_id_seq; Type: SEQUENCE; Schema: public; Owner: rodrolira
--

CREATE SEQUENCE public."TeamMembers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TeamMembers_id_seq" OWNER TO rodrolira;

--
-- Name: TeamMembers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rodrolira
--

ALTER SEQUENCE public."TeamMembers_id_seq" OWNED BY public."TeamMembers".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: rodrolira
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO rodrolira;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: rodrolira
--

CREATE TABLE public.admins (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    username text NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone
);


ALTER TABLE public.admins OWNER TO rodrolira;

--
-- Name: admins_backup; Type: TABLE; Schema: public; Owner: rodrolira
--

CREATE TABLE public.admins_backup (
    id integer,
    username character varying(255),
    email character varying(255),
    password character varying(255),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone
);


ALTER TABLE public.admins_backup OWNER TO rodrolira;

--
-- Name: admins_id_seq; Type: SEQUENCE; Schema: public; Owner: rodrolira
--

CREATE SEQUENCE public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admins_id_seq OWNER TO rodrolira;

--
-- Name: admins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rodrolira
--

ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;


--
-- Name: artist_roles; Type: TABLE; Schema: public; Owner: rodrolira
--

CREATE TABLE public.artist_roles (
    artist_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.artist_roles OWNER TO rodrolira;

--
-- Name: artists; Type: TABLE; Schema: public; Owner: rodrolira
--

CREATE TABLE public.artists (
    id integer NOT NULL,
    artist_name text NOT NULL,
    user_id integer,
    email character varying(255),
    bio text,
    image text,
    bandcamp_link character varying(255),
    facebook_link character varying(255),
    instagram_link character varying(255),
    soundcloud_link character varying(255),
    twitter_link character varying(255),
    youtube_link character varying(255),
    spotify_link character varying(255),
    apple_music_link character varying(255),
    beatport_link character varying(255),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    role public.enum_artists_role,
    document_id character varying(255),
    locale character varying(255),
    published_at character varying(255)
);


ALTER TABLE public.artists OWNER TO rodrolira;

--
-- Name: artists_id_seq; Type: SEQUENCE; Schema: public; Owner: rodrolira
--

ALTER TABLE public.artists ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.artists_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: discographies; Type: TABLE; Schema: public; Owner: rodrolira
--

CREATE TABLE public.discographies (
    id integer NOT NULL,
    title character varying(255),
    artist character varying(255),
    release_title character varying(255),
    catalogue character varying(255),
    release_type character varying(255),
    release_date timestamp with time zone,
    genre character varying(255),
    file_info character varying(255),
    download_url character varying(255)
);


ALTER TABLE public.discographies OWNER TO rodrolira;

--
-- Name: discographies_id_seq; Type: SEQUENCE; Schema: public; Owner: rodrolira
--

CREATE SEQUENCE public.discographies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.discographies_id_seq OWNER TO rodrolira;

--
-- Name: discographies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rodrolira
--

ALTER SEQUENCE public.discographies_id_seq OWNED BY public.discographies.id;


--
-- Name: genres; Type: TABLE; Schema: public; Owner: rodrolira
--

CREATE TABLE public.genres (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.genres OWNER TO rodrolira;

--
-- Name: genres_id_seq; Type: SEQUENCE; Schema: public; Owner: rodrolira
--

CREATE SEQUENCE public.genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.genres_id_seq OWNER TO rodrolira;

--
-- Name: genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rodrolira
--

ALTER SEQUENCE public.genres_id_seq OWNED BY public.genres.id;


--
-- Name: releases; Type: TABLE; Schema: public; Owner: rodrolira
--

CREATE TABLE public.releases (
    id integer NOT NULL,
    title text NOT NULL,
    release_date timestamp with time zone,
    genre_id integer,
    is_explicit boolean,
    description text,
    cover_image_url character varying(255),
    release_type public.enum_releases_release_type NOT NULL,
    bandcamp_link character varying(255),
    beatport_link character varying(255),
    spotify_link character varying(255),
    apple_music_link character varying(255),
    youtube_link character varying(255),
    soundcloud_link character varying(255),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    facebook_link character varying(255),
    instagram_link character varying(255),
    twitter_link character varying(255)
);


ALTER TABLE public.releases OWNER TO rodrolira;

--
-- Name: releases_id_seq; Type: SEQUENCE; Schema: public; Owner: rodrolira
--

CREATE SEQUENCE public.releases_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.releases_id_seq OWNER TO rodrolira;

--
-- Name: releases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rodrolira
--

ALTER SEQUENCE public.releases_id_seq OWNED BY public.releases.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: rodrolira
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    label character varying(255) NOT NULL
);


ALTER TABLE public.roles OWNER TO rodrolira;

--
-- Name: strapi_migrations; Type: TABLE; Schema: public; Owner: rodrolira
--

CREATE TABLE public.strapi_migrations (
    id integer NOT NULL,
    name character varying(255),
    "time" timestamp without time zone
);


ALTER TABLE public.strapi_migrations OWNER TO rodrolira;

--
-- Name: strapi_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: rodrolira
--

CREATE SEQUENCE public.strapi_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_migrations_id_seq OWNER TO rodrolira;

--
-- Name: strapi_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rodrolira
--

ALTER SEQUENCE public.strapi_migrations_id_seq OWNED BY public.strapi_migrations.id;


--
-- Name: strapi_migrations_internal; Type: TABLE; Schema: public; Owner: rodrolira
--

CREATE TABLE public.strapi_migrations_internal (
    id integer NOT NULL,
    name character varying(255),
    "time" timestamp without time zone
);


ALTER TABLE public.strapi_migrations_internal OWNER TO rodrolira;

--
-- Name: strapi_migrations_internal_id_seq; Type: SEQUENCE; Schema: public; Owner: rodrolira
--

CREATE SEQUENCE public.strapi_migrations_internal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_migrations_internal_id_seq OWNER TO rodrolira;

--
-- Name: strapi_migrations_internal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rodrolira
--

ALTER SEQUENCE public.strapi_migrations_internal_id_seq OWNED BY public.strapi_migrations_internal.id;


--
-- Name: team_members; Type: TABLE; Schema: public; Owner: rodrolira
--

CREATE TABLE public.team_members (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "position" character varying(255),
    image_url character varying(255),
    bio text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    user_id integer
);


ALTER TABLE public.team_members OWNER TO rodrolira;

--
-- Name: team_members_id_seq; Type: SEQUENCE; Schema: public; Owner: rodrolira
--

CREATE SEQUENCE public.team_members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.team_members_id_seq OWNER TO rodrolira;

--
-- Name: team_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rodrolira
--

ALTER SEQUENCE public.team_members_id_seq OWNED BY public.team_members.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: rodrolira
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    email text,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO rodrolira;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: rodrolira
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO rodrolira;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rodrolira
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: TeamMembers id; Type: DEFAULT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public."TeamMembers" ALTER COLUMN id SET DEFAULT nextval('public."TeamMembers_id_seq"'::regclass);


--
-- Name: discographies id; Type: DEFAULT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.discographies ALTER COLUMN id SET DEFAULT nextval('public.discographies_id_seq'::regclass);


--
-- Name: genres id; Type: DEFAULT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.genres ALTER COLUMN id SET DEFAULT nextval('public.genres_id_seq'::regclass);


--
-- Name: releases id; Type: DEFAULT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.releases ALTER COLUMN id SET DEFAULT nextval('public.releases_id_seq'::regclass);


--
-- Name: strapi_migrations id; Type: DEFAULT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.strapi_migrations ALTER COLUMN id SET DEFAULT nextval('public.strapi_migrations_id_seq'::regclass);


--
-- Name: strapi_migrations_internal id; Type: DEFAULT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.strapi_migrations_internal ALTER COLUMN id SET DEFAULT nextval('public.strapi_migrations_internal_id_seq'::regclass);


--
-- Name: team_members id; Type: DEFAULT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.team_members ALTER COLUMN id SET DEFAULT nextval('public.team_members_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: ReleaseArtists ReleaseArtists_pkey; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public."ReleaseArtists"
    ADD CONSTRAINT "ReleaseArtists_pkey" PRIMARY KEY (release_id, artist_id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: TeamMembers TeamMembers_pkey; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public."TeamMembers"
    ADD CONSTRAINT "TeamMembers_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: admins admins_unique; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_unique UNIQUE (username, email);


--
-- Name: artist_roles artist_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.artist_roles
    ADD CONSTRAINT artist_roles_pkey PRIMARY KEY (artist_id, role_id);


--
-- Name: artists artists_pkey; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_pkey PRIMARY KEY (id);


--
-- Name: discographies discographies_pkey; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.discographies
    ADD CONSTRAINT discographies_pkey PRIMARY KEY (id);


--
-- Name: genres genres_name_key; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_name_key UNIQUE (name);


--
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);


--
-- Name: releases releases_pkey; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.releases
    ADD CONSTRAINT releases_pkey PRIMARY KEY (id);


--
-- Name: roles roles_label_key; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_label_key UNIQUE (label);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: strapi_migrations_internal strapi_migrations_internal_pkey; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.strapi_migrations_internal
    ADD CONSTRAINT strapi_migrations_internal_pkey PRIMARY KEY (id);


--
-- Name: strapi_migrations strapi_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.strapi_migrations
    ADD CONSTRAINT strapi_migrations_pkey PRIMARY KEY (id);


--
-- Name: team_members team_members_pkey; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: admins_username_key; Type: INDEX; Schema: public; Owner: rodrolira
--

CREATE UNIQUE INDEX admins_username_key ON public.admins USING btree (username);


--
-- Name: artists_artist_name_key; Type: INDEX; Schema: public; Owner: rodrolira
--

CREATE UNIQUE INDEX artists_artist_name_key ON public.artists USING btree (artist_name);


--
-- Name: releases_title_key; Type: INDEX; Schema: public; Owner: rodrolira
--

CREATE UNIQUE INDEX releases_title_key ON public.releases USING btree (title);


--
-- Name: ReleaseArtists ReleaseArtists_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public."ReleaseArtists"
    ADD CONSTRAINT "ReleaseArtists_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ReleaseArtists ReleaseArtists_release_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public."ReleaseArtists"
    ADD CONSTRAINT "ReleaseArtists_release_id_fkey" FOREIGN KEY (release_id) REFERENCES public.releases(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: artist_roles artist_roles_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.artist_roles
    ADD CONSTRAINT artist_roles_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: artist_roles artist_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.artist_roles
    ADD CONSTRAINT artist_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: artists artists_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: releases releases_genre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.releases
    ADD CONSTRAINT releases_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES public.genres(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: team_members team_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rodrolira
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

