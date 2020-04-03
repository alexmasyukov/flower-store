--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: us_colors; Type: DOMAIN; Schema: public; Owner: alekseymasukov
--

CREATE DOMAIN public.us_colors AS text[]
	CONSTRAINT us_colors_check CHECK ((VALUE <@ ARRAY['red'::text, 'white'::text]));


ALTER DOMAIN public.us_colors OWNER TO alekseymasukov;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: additional_products; Type: TABLE; Schema: public; Owner: alekseymasukov
--

CREATE TABLE public.additional_products (
    id integer NOT NULL,
    public boolean DEFAULT true,
    title character varying(200) NOT NULL,
    "desc" text NOT NULL,
    price integer NOT NULL,
    image character varying(255) NOT NULL
);


ALTER TABLE public.additional_products OWNER TO alekseymasukov;

--
-- Name: additional_products_id_seq; Type: SEQUENCE; Schema: public; Owner: alekseymasukov
--

CREATE SEQUENCE public.additional_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.additional_products_id_seq OWNER TO alekseymasukov;

--
-- Name: additional_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alekseymasukov
--

ALTER SEQUENCE public.additional_products_id_seq OWNED BY public.additional_products.id;


--
-- Name: cities; Type: TABLE; Schema: public; Owner: alekseymasukov
--

CREATE TABLE public.cities (
    id integer NOT NULL,
    enabled boolean DEFAULT true,
    eng character varying(200) NOT NULL,
    rus character varying(200) NOT NULL,
    contacts json,
    extra json
);


ALTER TABLE public.cities OWNER TO alekseymasukov;

--
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: alekseymasukov
--

CREATE SEQUENCE public.cities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cities_id_seq OWNER TO alekseymasukov;

--
-- Name: cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alekseymasukov
--

ALTER SEQUENCE public.cities_id_seq OWNED BY public.cities.id;


--
-- Name: entities; Type: TABLE; Schema: public; Owner: alekseymasukov
--

CREATE TABLE public.entities (
    id integer NOT NULL,
    "eType" character varying(255) NOT NULL,
    "eTypeTitle" character varying(255) NOT NULL,
    value character varying(255) NOT NULL,
    extra json
);


ALTER TABLE public.entities OWNER TO alekseymasukov;

--
-- Name: entities_id_seq; Type: SEQUENCE; Schema: public; Owner: alekseymasukov
--

CREATE SEQUENCE public.entities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.entities_id_seq OWNER TO alekseymasukov;

--
-- Name: entities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alekseymasukov
--

ALTER SEQUENCE public.entities_id_seq OWNED BY public.entities.id;


--
-- Name: florists; Type: TABLE; Schema: public; Owner: alekseymasukov
--

CREATE TABLE public.florists (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    photo character varying(255) NOT NULL
);


ALTER TABLE public.florists OWNER TO alekseymasukov;

--
-- Name: florists_id_seq; Type: SEQUENCE; Schema: public; Owner: alekseymasukov
--

CREATE SEQUENCE public.florists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.florists_id_seq OWNER TO alekseymasukov;

--
-- Name: florists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alekseymasukov
--

ALTER SEQUENCE public.florists_id_seq OWNED BY public.florists.id;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: alekseymasukov
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO alekseymasukov;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: alekseymasukov
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_id_seq OWNER TO alekseymasukov;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alekseymasukov
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: alekseymasukov
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO alekseymasukov;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: alekseymasukov
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_lock_index_seq OWNER TO alekseymasukov;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alekseymasukov
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: product_sizes; Type: TABLE; Schema: public; Owner: alekseymasukov
--

CREATE TABLE public.product_sizes (
    id integer NOT NULL,
    public boolean,
    "order" integer,
    product_id integer,
    title character varying(200) NOT NULL,
    price integer NOT NULL,
    circle integer NOT NULL,
    flowers text[],
    images text[]
);


ALTER TABLE public.product_sizes OWNER TO alekseymasukov;

--
-- Name: product_sizes_id_seq; Type: SEQUENCE; Schema: public; Owner: alekseymasukov
--

CREATE SEQUENCE public.product_sizes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_sizes_id_seq OWNER TO alekseymasukov;

--
-- Name: product_sizes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alekseymasukov
--

ALTER SEQUENCE public.product_sizes_id_seq OWNED BY public.product_sizes.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: alekseymasukov
--

CREATE TABLE public.products (
    id integer NOT NULL,
    public boolean,
    "order" integer,
    available_datetime timestamp with time zone,
    slug character varying(400) NOT NULL,
    title character varying(200) NOT NULL,
    description character varying(1000),
    stability character varying(50),
    shade character varying(50),
    packing text[],
    colors text[],
    "additionalProducts" text[],
    florist_id integer,
    florist_text character varying(400)
);


ALTER TABLE public.products OWNER TO alekseymasukov;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: alekseymasukov
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO alekseymasukov;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alekseymasukov
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: additional_products id; Type: DEFAULT; Schema: public; Owner: alekseymasukov
--

ALTER TABLE ONLY public.additional_products ALTER COLUMN id SET DEFAULT nextval('public.additional_products_id_seq'::regclass);


--
-- Name: cities id; Type: DEFAULT; Schema: public; Owner: alekseymasukov
--

ALTER TABLE ONLY public.cities ALTER COLUMN id SET DEFAULT nextval('public.cities_id_seq'::regclass);


--
-- Name: entities id; Type: DEFAULT; Schema: public; Owner: alekseymasukov
--

ALTER TABLE ONLY public.entities ALTER COLUMN id SET DEFAULT nextval('public.entities_id_seq'::regclass);


--
-- Name: florists id; Type: DEFAULT; Schema: public; Owner: alekseymasukov
--

ALTER TABLE ONLY public.florists ALTER COLUMN id SET DEFAULT nextval('public.florists_id_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: alekseymasukov
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: alekseymasukov
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: product_sizes id; Type: DEFAULT; Schema: public; Owner: alekseymasukov
--

ALTER TABLE ONLY public.product_sizes ALTER COLUMN id SET DEFAULT nextval('public.product_sizes_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: alekseymasukov
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Data for Name: additional_products; Type: TABLE DATA; Schema: public; Owner: alekseymasukov
--

COPY public.additional_products (id, public, title, "desc", price, image) FROM stdin;
1	t	Modern clear vase	Vase made from clear glass. Height 20 cm and width 13 cm made from good quality thick glass	900	/static/media/333.f496686f.jpg
2	t	Bellante Sparkling Rosé	Bottle Size:75cl Only 18+ can buy this item Not available to send separately Price includes delivery	400	/static/media/22.jpeg
3	f	Доп товар	Описание его	999	/static/media/22.jpeg
\.


--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: alekseymasukov
--

COPY public.cities (id, enabled, eng, rus, contacts, extra) FROM stdin;
1	t	chita	Чита	{}	{}
2	t	moscow	Москва	{}	{}
\.


--
-- Data for Name: entities; Type: TABLE DATA; Schema: public; Owner: alekseymasukov
--

COPY public.entities (id, "eType", "eTypeTitle", value, extra) FROM stdin;
2	color	Цвета	Синий	{"color":"blue"}
3	color	Цвета	Зеленый	{"color":"green"}
4	color	Цвета	Фиолетовый	{"color":"purple"}
5	color	Цвета	Молочный	{"color":"#faf5f1"}
8	size	Размеры	Премиум	\N
9	stability	Стойкость	+	\N
10	stability	Стойкость	++	\N
11	stability	Стойкость	+++	\N
13	shade	Оттенок	Яркий	\N
14	shade	Оттенок	Темный	\N
15	flower	Цветы	Странная зелель	\N
16	flower	Цветы	Фиалка	\N
17	flower	Цветы	Роза	\N
18	flower	Цветы	Кустовая роза	\N
19	flower	Цветы	Гортензия	\N
20	packing	Упаковка	Бумага флисовая	\N
21	packing	Упаковка	Шляпная коробка	\N
22	packing	Упаковка	Фет	\N
23	packing	Упаковка	Коробка	\N
1	color	Цвета	Красный	{"color":"red"}
6	size	Размеры	Стандарный	\N
12	shade	Оттенок	Нежный 888erikuherg	\N
7	size	Размеры	Большой +++++	\N
\.


--
-- Data for Name: florists; Type: TABLE DATA; Schema: public; Owner: alekseymasukov
--

COPY public.florists (id, name, photo) FROM stdin;
1	Лиза	https://randomuser.me/api/portraits/women/66.jpg
2	Олеся	https://randomuser.me/api/portraits/women/67.jpg
\.


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: alekseymasukov
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
20	20200107120000_florists.js	1	2020-01-08 01:18:57.254+09
21	20200107131149_products.js	1	2020-01-08 01:18:57.264+09
22	20200107151441_entities.js	1	2020-01-08 01:18:57.271+09
23	20200107151457_product_sizes.js	1	2020-01-08 01:18:57.28+09
24	20200107235902_additional_products.js	1	2020-01-08 01:18:57.294+09
25	20200108002350_cities.js	1	2020-01-08 01:18:57.315+09
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: alekseymasukov
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
2	0
\.


--
-- Data for Name: product_sizes; Type: TABLE DATA; Schema: public; Owner: alekseymasukov
--

COPY public.product_sizes (id, public, "order", product_id, title, price, circle, flowers, images) FROM stdin;
1	t	0	1	7	1400	90	{19,16,15,18}	{/static/media/8.8dc61bc0.jpg,/static/media/8.8dc61bc0.jpg,/static/media/8.8dc61bc0.jpg}
2	t	0	3	6	1800	45	{15,18,19,16}	{/static/media/4.760d10a2.jpeg}
3	f	1	1	8	4200	86	{19,18}	{/static/media/9.3482e43d.jpg,/static/media/9.3482e43d.jpg}
4	t	1	2	7	4900	45	{15,18}	{/static/media/4.760d10a2.jpeg}
5	t	0	2	6	1800	45	{19,15}	{/static/media/4.760d10a2.jpeg}
52	t	2	46	8	5000	69	{19,18}	{sdfsdf,sdf}
53	t	1	46	7	4200	86	{19,18}	{/static/media/9.3482e43d.jpg,/static/media/9.3482e43d.jpg}
54	f	0	46	6	1800	45	{15,18,19,16}	{/static/media/4.760d10a2.jpeg}
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: alekseymasukov
--

COPY public.products (id, public, "order", available_datetime, slug, title, description, stability, shade, packing, colors, "additionalProducts", florist_id, florist_text) FROM stdin;
1	t	1	2020-01-08 01:19:33.010169+09	product0	Сборный в коробке		10	12	{23}	{1,4}	{1,2,3}	1	Брысь! Кондукторшу не поразила суть дела, что кот лезет в трамвай, в чем было бы еще полбеды, а то, что он собирается платить!
2	t	3	\N	product1	Гортензия		11	14	{23,20}	{3,2}	{2}	2	Котам нельзя! С котами нельзя! Брысь! Кондукторшу не поразила суть дела, что кот лезет в трамвай, в чем было бы еще полбеды, а то, что он собирается платить!
3	t	2	2020-01-08 01:19:33+09	product2	Монобукет кустовой розы		9	13	{20}	{2,1}	{1,2}	1	По вашему профессиональному мнению как действующего специалиста — представляет ли мистер Сегерс опасность для общества?
46	t	1	\N	product0	Сборный в коробке		10	13	{23}	{1,4}	{1,2,3}	1	Брысь! Кондукторшу не поразила суть дела, что кот лезет в трамвай, в чем было бы еще полбеды, а то, что он собирается платить!
\.


--
-- Name: additional_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alekseymasukov
--

SELECT pg_catalog.setval('public.additional_products_id_seq', 1, false);


--
-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alekseymasukov
--

SELECT pg_catalog.setval('public.cities_id_seq', 1, false);


--
-- Name: entities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alekseymasukov
--

SELECT pg_catalog.setval('public.entities_id_seq', 1, false);


--
-- Name: florists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alekseymasukov
--

SELECT pg_catalog.setval('public.florists_id_seq', 1, false);


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alekseymasukov
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 25, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: alekseymasukov
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 2, true);


--
-- Name: product_sizes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alekseymasukov
--

SELECT pg_catalog.setval('public.product_sizes_id_seq', 54, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alekseymasukov
--

SELECT pg_catalog.setval('public.products_id_seq', 46, true);


--
-- Name: additional_products additional_products_pkey; Type: CONSTRAINT; Schema: public; Owner: alekseymasukov
--

ALTER TABLE ONLY public.additional_products
    ADD CONSTRAINT additional_products_pkey PRIMARY KEY (id);


--
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: alekseymasukov
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


--
-- Name: entities entities_pkey; Type: CONSTRAINT; Schema: public; Owner: alekseymasukov
--

ALTER TABLE ONLY public.entities
    ADD CONSTRAINT entities_pkey PRIMARY KEY (id);


--
-- Name: florists florists_pkey; Type: CONSTRAINT; Schema: public; Owner: alekseymasukov
--

ALTER TABLE ONLY public.florists
    ADD CONSTRAINT florists_pkey PRIMARY KEY (id);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: alekseymasukov
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: alekseymasukov
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: product_sizes product_sizes_pkey; Type: CONSTRAINT; Schema: public; Owner: alekseymasukov
--

ALTER TABLE ONLY public.product_sizes
    ADD CONSTRAINT product_sizes_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: alekseymasukov
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: product_sizes product_sizes_product_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: alekseymasukov
--

ALTER TABLE ONLY public.product_sizes
    ADD CONSTRAINT product_sizes_product_id_foreign FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: products products_florist_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: alekseymasukov
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_florist_id_foreign FOREIGN KEY (florist_id) REFERENCES public.florists(id);


--
-- PostgreSQL database dump complete
--

