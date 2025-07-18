--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)

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
-- Data for Name: blog_posts; Type: TABLE DATA; Schema: public; Owner: nik_studio_admin
--

INSERT INTO public.blog_posts VALUES (2, '/images/blog/blog_img2.jpg', '(Креативный директор)', 'СО СЛОЖНОГО ЯЗЫКА В ПРОСТОЙ ВИЗУАЛ', 'Learn practical tips for designing websites that are both visually appealing and user-friendly.', NULL, '2025-06-17 11:26:44', 'so-sloznogo-iazyka-v-prostoi-vizual', true);
INSERT INTO public.blog_posts VALUES (3, '/images/blog/blog_img3.jpg', '(Креативный директор)', 'ПРАВИЛЬНЫЕ ФОТО ЭКОНОМЯТ БЮДЖЕТ', 'Explore why responsive design is crucial for enhancing experience and increasing conversions.', NULL, '2025-06-17 11:26:44', 'pravilnye-foto-ekonomiat-biudzet', true);
INSERT INTO public.blog_posts VALUES (4, '/images/blog/blog_img4.jpg', '(Креативный директор)', 'UMEX & SIMTEX 2024', 'Подготовили компанию «АЭРОМАКС» и сопроводили на выставке в Абу Даби. Создали стильный и продающий контент.', NULL, '2025-06-17 11:26:44', 'umex-simtex-2024', true);
INSERT INTO public.blog_posts VALUES (5, '/images/blog/blog_img5.jpg', '(Креативный директор)', 'ОРГАНИЗАЦИЯ ВИЗИТА ПЕРВОГО ЛИЦА', 'В сопровождении мэра столицы Сергея Собянина Президент побывал в цехе производства БПЛА.', NULL, '2025-06-17 11:26:44', 'organizaciia-vizita-pervogo-lica', true);
INSERT INTO public.blog_posts VALUES (6, '/images/blog/blog_img6.jpg', '(Креативный директор)', 'УЧАСТИЕ В СТРАТСЕССИИ РУДНЕВО', 'Организовали съёмку стратегической сессии в ОЭЦ «Технополис Москва» в Руднево с участием С.С. Собянина', NULL, '2025-06-17 11:26:44', 'ucastie-v-stratsessii-rudnevo', true);
INSERT INTO public.blog_posts VALUES (9, '/storage/blog/1751474850_213693604.jpg', '23', '5', '33', '2025-07-02 15:36:20', '2025-07-03 21:49:01', '5', false);
INSERT INTO public.blog_posts VALUES (1, '/storage/blog/1752085376_blog_img1 (1).jpg', '(Креативный директор)', 'ПОЧЕМУ ПРОДУМАННЫЙ ДИЗАЙН ПРОДАЕТ', 'Discover key strategies to create a memorable and impactful brand for your small business.', NULL, '2025-07-09 18:22:56', 'pocemu-produmannyi-dizain-prodaet', true);


--
-- Data for Name: blog_post_blocks; Type: TABLE DATA; Schema: public; Owner: nik_studio_admin
--

INSERT INTO public.blog_post_blocks VALUES (1, 1, 'Prioritizing User Needs', 'At the heart of thoughtful UX design is a deep understanding of the user. Boosting engagement starts with knowing who your users are, what they need, and how they interact with your website or app. Every design decision should be rooted in making their experience as seamless and enjoyable as possible, ensuring that their needs are met intuitively.', 'To prioritize user needs, it’s important to conduct thorough research. This includes gathering data through user interviews, surveys, and analytics to identify pain points and areas for improvement. By understanding the user journey, you can tailor your design to eliminate friction and enhance usability, making it easier for users to achieve their goals.', 'A thoughtful UX design doesn’t just solve immediate problems—it anticipates future needs. By thinking ahead and considering how users’ behaviors might evolve, you can design an experience that adapts over time, ensuring continued engagement. The more users feel that their needs are being met effortlessly, the more likely they are to remain loyal to your product or service.', NULL, NULL);
INSERT INTO public.blog_post_blocks VALUES (2, 1, 'Creating a Seamless Flow', 'A key aspect of UX design that drives engagement is creating a seamless, intuitive flow. Users should be able to navigate through your website or app without confusion, frustration, or unnecessary clicks. Thoughtful design maps out clear paths for users, guiding them naturally from one step to the next while ensuring that important information is easily accessible.', 'Consistency is essential in establishing a smooth user flow. This means maintaining consistent layouts, visual cues, and interactions across all pages or screens. Whether users are exploring your homepage or completing a purchase, a cohesive experience helps them stay focused and confident in their actions, increasing their overall satisfaction.', 'Small details, such as button placement, typography, and visual hierarchy, can greatly impact how users interact with your site. By making thoughtful design choices that prioritize clarity and ease of use, you minimize cognitive load and keep users engaged. When users can navigate effortlessly, they’re more likely to spend time exploring your content or completing desired actions.', NULL, NULL);
INSERT INTO public.blog_post_blocks VALUES (3, 1, 'Engaging Through Emotion', 'Thoughtful UX design goes beyond functionality—it taps into users’ emotions. Engagement is not just about making a website usable; it’s about creating an emotional connection that resonates with the user. By incorporating elements of storytelling, visual appeal, and interactive features, you can evoke positive emotions that strengthen user engagement and loyalty.', 'Designing for emotion means considering how users feel at each stage of their journey. From welcoming new users with an intuitive onboarding process to celebrating a successful purchase with a personalized confirmation page, every interaction is an opportunity to foster connection. Thoughtful micro-interactions, such as subtle animations or encouraging messages, can add delight and reinforce a positive experience.', 'Ultimately, the goal of thoughtful UX design is to make users feel understood and valued. When users feel emotionally connected to your brand, they are more likely to return, recommend your product, and engage with your content on a deeper level. A user experience that resonates emotionally not only boosts engagement but also builds lasting relationships with your audience.', NULL, NULL);
INSERT INTO public.blog_post_blocks VALUES (6, 2, 'Prioritizing User Needs', 'At the heart of thoughtful UX design is a deep understanding of the user. Boosting engagement starts with knowing who your users are, what they need, and how they interact with your website or app. Every design decision should be rooted in making their experience as seamless and enjoyable as possible, ensuring that their needs are met intuitively.', 'To prioritize user needs, it’s important to conduct thorough research. This includes gathering data through user interviews, surveys, and analytics to identify pain points and areas for improvement. By understanding the user journey, you can tailor your design to eliminate friction and enhance usability, making it easier for users to achieve their goals.', 'A thoughtful UX design doesn’t just solve immediate problems—it anticipates future needs. By thinking ahead and considering how users’ behaviors might evolve, you can design an experience that adapts over time, ensuring continued engagement. The more users feel that their needs are being met effortlessly, the more likely they are to remain loyal to your product or service.', '2025-07-03 20:38:38', '2025-07-03 20:38:38');
INSERT INTO public.blog_post_blocks VALUES (7, 2, 'Creating a Seamless Flow', 'A key aspect of UX design that drives engagement is creating a seamless, intuitive flow. Users should be able to navigate through your website or app without confusion, frustration, or unnecessary clicks. Thoughtful design maps out clear paths for users, guiding them naturally from one step to the next while ensuring that important information is easily accessible.', 'Consistency is essential in establishing a smooth user flow. This means maintaining consistent layouts, visual cues, and interactions across all pages or screens. Whether users are exploring your homepage or completing a purchase, a cohesive experience helps them stay focused and confident in their actions, increasing their overall satisfaction.', 'Small details, such as button placement, typography, and visual hierarchy, can greatly impact how users interact with your site. By making thoughtful design choices that prioritize clarity and ease of use, you minimize cognitive load and keep users engaged. When users can navigate effortlessly, they’re more likely to spend time exploring your content or completing desired actions.', '2025-07-03 20:39:11', '2025-07-03 20:39:11');
INSERT INTO public.blog_post_blocks VALUES (8, 2, 'Engaging Through Emotion', 'Thoughtful UX design goes beyond functionality—it taps into users’ emotions. Engagement is not just about making a website usable; it’s about creating an emotional connection that resonates with the user. By incorporating elements of storytelling, visual appeal, and interactive features, you can evoke positive emotions that strengthen user engagement and loyalty.', 'Designing for emotion means considering how users feel at each stage of their journey. From welcoming new users with an intuitive onboarding process to celebrating a successful purchase with a personalized confirmation page, every interaction is an opportunity to foster connection. Thoughtful micro-interactions, such as subtle animations or encouraging messages, can add delight and reinforce a positive experience.', 'Ultimately, the goal of thoughtful UX design is to make users feel understood and valued. When users feel emotionally connected to your brand, they are more likely to return, recommend your product, and engage with your content on a deeper level. A user experience that resonates emotionally not only boosts engagement but also builds lasting relationships with your audience.', '2025-07-03 20:39:49', '2025-07-03 20:39:49');
INSERT INTO public.blog_post_blocks VALUES (9, 3, 'Prioritizing User Needs', 'At the heart of thoughtful UX design is a deep understanding of the user. Boosting engagement starts with knowing who your users are, what they need, and how they interact with your website or app. Every design decision should be rooted in making their experience as seamless and enjoyable as possible, ensuring that their needs are met intuitively.', 'To prioritize user needs, it’s important to conduct thorough research. This includes gathering data through user interviews, surveys, and analytics to identify pain points and areas for improvement. By understanding the user journey, you can tailor your design to eliminate friction and enhance usability, making it easier for users to achieve their goals.', 'A thoughtful UX design doesn’t just solve immediate problems—it anticipates future needs. By thinking ahead and considering how users’ behaviors might evolve, you can design an experience that adapts over time, ensuring continued engagement. The more users feel that their needs are being met effortlessly, the more likely they are to remain loyal to your product or service.', '2025-07-03 20:40:52', '2025-07-03 20:40:52');
INSERT INTO public.blog_post_blocks VALUES (10, 3, 'Creating a Seamless Flow', 'A key aspect of UX design that drives engagement is creating a seamless, intuitive flow. Users should be able to navigate through your website or app without confusion, frustration, or unnecessary clicks. Thoughtful design maps out clear paths for users, guiding them naturally from one step to the next while ensuring that important information is easily accessible.', 'Consistency is essential in establishing a smooth user flow. This means maintaining consistent layouts, visual cues, and interactions across all pages or screens. Whether users are exploring your homepage or completing a purchase, a cohesive experience helps them stay focused and confident in their actions, increasing their overall satisfaction.', 'Small details, such as button placement, typography, and visual hierarchy, can greatly impact how users interact with your site. By making thoughtful design choices that prioritize clarity and ease of use, you minimize cognitive load and keep users engaged. When users can navigate effortlessly, they’re more likely to spend time exploring your content or completing desired actions.', '2025-07-03 20:41:14', '2025-07-03 20:41:14');
INSERT INTO public.blog_post_blocks VALUES (11, 3, 'Engaging Through Emotion', 'Thoughtful UX design goes beyond functionality—it taps into users’ emotions. Engagement is not just about making a website usable; it’s about creating an emotional connection that resonates with the user. By incorporating elements of storytelling, visual appeal, and interactive features, you can evoke positive emotions that strengthen user engagement and loyalty.', 'Designing for emotion means considering how users feel at each stage of their journey. From welcoming new users with an intuitive onboarding process to celebrating a successful purchase with a personalized confirmation page, every interaction is an opportunity to foster connection. Thoughtful micro-interactions, such as subtle animations or encouraging messages, can add delight and reinforce a positive experience.', 'Ultimately, the goal of thoughtful UX design is to make users feel understood and valued. When users feel emotionally connected to your brand, they are more likely to return, recommend your product, and engage with your content on a deeper level. A user experience that resonates emotionally not only boosts engagement but also builds lasting relationships with your audience.', '2025-07-03 20:41:39', '2025-07-03 20:41:39');
INSERT INTO public.blog_post_blocks VALUES (12, 4, 'Prioritizing User Needs', 'At the heart of thoughtful UX design is a deep understanding of the user. Boosting engagement starts with knowing who your users are, what they need, and how they interact with your website or app. Every design decision should be rooted in making their experience as seamless and enjoyable as possible, ensuring that their needs are met intuitively.', 'To prioritize user needs, it’s important to conduct thorough research. This includes gathering data through user interviews, surveys, and analytics to identify pain points and areas for improvement. By understanding the user journey, you can tailor your design to eliminate friction and enhance usability, making it easier for users to achieve their goals.', 'A thoughtful UX design doesn’t just solve immediate problems—it anticipates future needs. By thinking ahead and considering how users’ behaviors might evolve, you can design an experience that adapts over time, ensuring continued engagement. The more users feel that their needs are being met effortlessly, the more likely they are to remain loyal to your product or service.', '2025-07-03 20:42:23', '2025-07-03 20:42:23');
INSERT INTO public.blog_post_blocks VALUES (13, 4, 'Creating a Seamless Flow', 'A key aspect of UX design that drives engagement is creating a seamless, intuitive flow. Users should be able to navigate through your website or app without confusion, frustration, or unnecessary clicks. Thoughtful design maps out clear paths for users, guiding them naturally from one step to the next while ensuring that important information is easily accessible.', 'Consistency is essential in establishing a smooth user flow. This means maintaining consistent layouts, visual cues, and interactions across all pages or screens. Whether users are exploring your homepage or completing a purchase, a cohesive experience helps them stay focused and confident in their actions, increasing their overall satisfaction.', 'Small details, such as button placement, typography, and visual hierarchy, can greatly impact how users interact with your site. By making thoughtful design choices that prioritize clarity and ease of use, you minimize cognitive load and keep users engaged. When users can navigate effortlessly, they’re more likely to spend time exploring your content or completing desired actions.', '2025-07-03 20:42:45', '2025-07-03 20:42:45');
INSERT INTO public.blog_post_blocks VALUES (14, 4, 'Engaging Through Emotion', 'Thoughtful UX design goes beyond functionality—it taps into users’ emotions. Engagement is not just about making a website usable; it’s about creating an emotional connection that resonates with the user. By incorporating elements of storytelling, visual appeal, and interactive features, you can evoke positive emotions that strengthen user engagement and loyalty.', 'Designing for emotion means considering how users feel at each stage of their journey. From welcoming new users with an intuitive onboarding process to celebrating a successful purchase with a personalized confirmation page, every interaction is an opportunity to foster connection. Thoughtful micro-interactions, such as subtle animations or encouraging messages, can add delight and reinforce a positive experience.', 'Ultimately, the goal of thoughtful UX design is to make users feel understood and valued. When users feel emotionally connected to your brand, they are more likely to return, recommend your product, and engage with your content on a deeper level. A user experience that resonates emotionally not only boosts engagement but also builds lasting relationships with your audience.', '2025-07-03 20:43:05', '2025-07-03 20:43:05');
INSERT INTO public.blog_post_blocks VALUES (15, 5, 'Prioritizing User Needs', 'At the heart of thoughtful UX design is a deep understanding of the user. Boosting engagement starts with knowing who your users are, what they need, and how they interact with your website or app. Every design decision should be rooted in making their experience as seamless and enjoyable as possible, ensuring that their needs are met intuitively.', 'To prioritize user needs, it’s important to conduct thorough research. This includes gathering data through user interviews, surveys, and analytics to identify pain points and areas for improvement. By understanding the user journey, you can tailor your design to eliminate friction and enhance usability, making it easier for users to achieve their goals.', 'A thoughtful UX design doesn’t just solve immediate problems—it anticipates future needs. By thinking ahead and considering how users’ behaviors might evolve, you can design an experience that adapts over time, ensuring continued engagement. The more users feel that their needs are being met effortlessly, the more likely they are to remain loyal to your product or service.', '2025-07-03 20:43:42', '2025-07-03 20:43:42');
INSERT INTO public.blog_post_blocks VALUES (16, 5, 'Creating a Seamless Flow', 'A key aspect of UX design that drives engagement is creating a seamless, intuitive flow. Users should be able to navigate through your website or app without confusion, frustration, or unnecessary clicks. Thoughtful design maps out clear paths for users, guiding them naturally from one step to the next while ensuring that important information is easily accessible.', 'Consistency is essential in establishing a smooth user flow. This means maintaining consistent layouts, visual cues, and interactions across all pages or screens. Whether users are exploring your homepage or completing a purchase, a cohesive experience helps them stay focused and confident in their actions, increasing their overall satisfaction.', 'Small details, such as button placement, typography, and visual hierarchy, can greatly impact how users interact with your site. By making thoughtful design choices that prioritize clarity and ease of use, you minimize cognitive load and keep users engaged. When users can navigate effortlessly, they’re more likely to spend time exploring your content or completing desired actions.', '2025-07-03 20:44:08', '2025-07-03 20:44:08');
INSERT INTO public.blog_post_blocks VALUES (17, 5, 'Engaging Through Emotion', 'Thoughtful UX design goes beyond functionality—it taps into users’ emotions. Engagement is not just about making a website usable; it’s about creating an emotional connection that resonates with the user. By incorporating elements of storytelling, visual appeal, and interactive features, you can evoke positive emotions that strengthen user engagement and loyalty.', 'Designing for emotion means considering how users feel at each stage of their journey. From welcoming new users with an intuitive onboarding process to celebrating a successful purchase with a personalized confirmation page, every interaction is an opportunity to foster connection. Thoughtful micro-interactions, such as subtle animations or encouraging messages, can add delight and reinforce a positive experience.', 'Ultimately, the goal of thoughtful UX design is to make users feel understood and valued. When users feel emotionally connected to your brand, they are more likely to return, recommend your product, and engage with your content on a deeper level. A user experience that resonates emotionally not only boosts engagement but also builds lasting relationships with your audience.', '2025-07-03 20:44:44', '2025-07-03 20:44:44');
INSERT INTO public.blog_post_blocks VALUES (18, 6, 'Prioritizing User Needs', 'At the heart of thoughtful UX design is a deep understanding of the user. Boosting engagement starts with knowing who your users are, what they need, and how they interact with your website or app. Every design decision should be rooted in making their experience as seamless and enjoyable as possible, ensuring that their needs are met intuitively.', 'To prioritize user needs, it’s important to conduct thorough research. This includes gathering data through user interviews, surveys, and analytics to identify pain points and areas for improvement. By understanding the user journey, you can tailor your design to eliminate friction and enhance usability, making it easier for users to achieve their goals.', 'A thoughtful UX design doesn’t just solve immediate problems—it anticipates future needs. By thinking ahead and considering how users’ behaviors might evolve, you can design an experience that adapts over time, ensuring continued engagement. The more users feel that their needs are being met effortlessly, the more likely they are to remain loyal to your product or service.', '2025-07-03 20:46:00', '2025-07-03 20:46:00');
INSERT INTO public.blog_post_blocks VALUES (19, 6, 'Creating a Seamless Flow', 'A key aspect of UX design that drives engagement is creating a seamless, intuitive flow. Users should be able to navigate through your website or app without confusion, frustration, or unnecessary clicks. Thoughtful design maps out clear paths for users, guiding them naturally from one step to the next while ensuring that important information is easily accessible.', 'Consistency is essential in establishing a smooth user flow. This means maintaining consistent layouts, visual cues, and interactions across all pages or screens. Whether users are exploring your homepage or completing a purchase, a cohesive experience helps them stay focused and confident in their actions, increasing their overall satisfaction.', 'Small details, such as button placement, typography, and visual hierarchy, can greatly impact how users interact with your site. By making thoughtful design choices that prioritize clarity and ease of use, you minimize cognitive load and keep users engaged. When users can navigate effortlessly, they’re more likely to spend time exploring your content or completing desired actions.', '2025-07-03 20:46:24', '2025-07-03 20:46:24');
INSERT INTO public.blog_post_blocks VALUES (20, 6, 'Engaging Through Emotion', 'Thoughtful UX design goes beyond functionality—it taps into users’ emotions. Engagement is not just about making a website usable; it’s about creating an emotional connection that resonates with the user. By incorporating elements of storytelling, visual appeal, and interactive features, you can evoke positive emotions that strengthen user engagement and loyalty.', 'Designing for emotion means considering how users feel at each stage of their journey. From welcoming new users with an intuitive onboarding process to celebrating a successful purchase with a personalized confirmation page, every interaction is an opportunity to foster connection. Thoughtful micro-interactions, such as subtle animations or encouraging messages, can add delight and reinforce a positive experience.', 'Ultimately, the goal of thoughtful UX design is to make users feel understood and valued. When users feel emotionally connected to your brand, they are more likely to return, recommend your product, and engage with your content on a deeper level. A user experience that resonates emotionally not only boosts engagement but also builds lasting relationships with your audience.', '2025-07-03 20:47:14', '2025-07-03 20:47:14');


--
-- Data for Name: cache; Type: TABLE DATA; Schema: public; Owner: nik_studio_admin
--



--
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: public; Owner: nik_studio_admin
--



--
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: nik_studio_admin
--



--
-- Data for Name: job_batches; Type: TABLE DATA; Schema: public; Owner: nik_studio_admin
--



--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: nik_studio_admin
--



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: nik_studio_admin
--

INSERT INTO public.migrations VALUES (16, '0001_01_01_000000_create_users_table', 1);
INSERT INTO public.migrations VALUES (17, '0001_01_01_000001_create_cache_table', 1);
INSERT INTO public.migrations VALUES (18, '0001_01_01_000002_create_jobs_table', 1);
INSERT INTO public.migrations VALUES (19, '2025_06_17_080100_create_blog_posts_table', 1);
INSERT INTO public.migrations VALUES (20, '2025_06_17_080110_create_blog_post_blocks_table', 1);
INSERT INTO public.migrations VALUES (21, '2025_06_17_111750_add_slug_to_blog_posts_table', 1);
INSERT INTO public.migrations VALUES (22, '2025_06_17_112741_make_slug_not_nullable_in_blog_posts_table', 1);
INSERT INTO public.migrations VALUES (23, '2025_06_17_171052_fix_blog_posts_sequence', 1);
INSERT INTO public.migrations VALUES (24, '2025_06_18_132347_add_status_to_blog_posts_table', 1);
INSERT INTO public.migrations VALUES (25, '2025_07_04_154942_create_project_categories_table', 2);
INSERT INTO public.migrations VALUES (26, '2025_07_04_204724_adding_sort_order', 2);
INSERT INTO public.migrations VALUES (27, '2025_07_04_234601_project', 3);
INSERT INTO public.migrations VALUES (28, '2025_07_07_141150_create_project_project_category_table', 3);
INSERT INTO public.migrations VALUES (29, '2025_07_07_141232_remove_category_id_from_projects_table', 3);
INSERT INTO public.migrations VALUES (1, '0001_01_01_000000_create_users_table', 1);
INSERT INTO public.migrations VALUES (2, '0001_01_01_000001_create_cache_table', 1);
INSERT INTO public.migrations VALUES (3, '0001_01_01_000002_create_jobs_table', 1);
INSERT INTO public.migrations VALUES (4, '2025_06_17_080100_create_blog_posts_table', 1);
INSERT INTO public.migrations VALUES (5, '2025_06_17_080110_create_blog_post_blocks_table', 1);
INSERT INTO public.migrations VALUES (6, '2025_06_17_111750_add_slug_to_blog_posts_table', 1);
INSERT INTO public.migrations VALUES (7, '2025_06_17_112741_make_slug_not_nullable_in_blog_posts_table', 1);
INSERT INTO public.migrations VALUES (8, '2025_06_17_171052_fix_blog_posts_sequence', 1);
INSERT INTO public.migrations VALUES (9, '2025_06_18_132347_add_status_to_blog_posts_table', 1);
INSERT INTO public.migrations VALUES (10, '2025_07_04_154942_create_project_categories_table', 2);
INSERT INTO public.migrations VALUES (11, '2025_07_04_204724_adding_sort_order', 3);
INSERT INTO public.migrations VALUES (12, '2025_07_04_234601_project', 4);
INSERT INTO public.migrations VALUES (13, '2025_07_07_141150_create_project_project_category_table', 5);
INSERT INTO public.migrations VALUES (14, '2025_07_07_141232_remove_category_id_from_projects_table', 5);
INSERT INTO public.migrations VALUES (15, '2025_07_11_201842_create_project_details_table', 6);
INSERT INTO public.migrations VALUES (31, '2025_07_11_201932_create_project_detail_blocks_table', 6);
INSERT INTO public.migrations VALUES (32, '2025_07_11_202024_create_project_detail_block_media_table', 7);
INSERT INTO public.migrations VALUES (33, '2025_07_11_222943_update_project_details_table_remove_unused_fields', 8);
INSERT INTO public.migrations VALUES (34, '2025_07_12_003900_remove_order_and_is_active_from_project_detail_blocks_table', 9);
INSERT INTO public.migrations VALUES (35, '2025_07_12_022037_create_project_detail_block_media_table', 10);
INSERT INTO public.migrations VALUES (36, '2025_07_12_023546_create_project_detail_hero_media_table', 11);
INSERT INTO public.migrations VALUES (37, '2025_07_12_034501_remove_caption_from_project_detail_block_media_table', 12);
INSERT INTO public.migrations VALUES (38, '2025_07_12_034529_remove_caption_from_project_detail_hero_media_table', 12);
INSERT INTO public.migrations VALUES (39, '2025_07_12_035627_remove_order_fields_from_project_detail_hero_media_table', 13);
INSERT INTO public.migrations VALUES (40, '2025_07_12_035707_remove_order_fields_from_project_detail_block_media_table', 13);
INSERT INTO public.migrations VALUES (41, '2025_07_12_120300_add_order_to_project_detail_blocks_table', 14);
INSERT INTO public.migrations VALUES (42, '2025_07_12_121224_add_order_to_project_detail_block_media_table', 15);


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: nik_studio_admin
--



--
-- Data for Name: project_categories; Type: TABLE DATA; Schema: public; Owner: nik_studio_admin
--

INSERT INTO public.project_categories VALUES (2, 'Брендинг', 'branding', NULL, '2025-07-06 01:00:42', 1);
INSERT INTO public.project_categories VALUES (3, 'Дизайн', 'design', NULL, '2025-07-06 01:00:42', 2);
INSERT INTO public.project_categories VALUES (4, '3д графика', '3d-graphics', NULL, '2025-07-06 01:00:42', 3);
INSERT INTO public.project_categories VALUES (5, 'Фото', 'photography', NULL, '2025-07-06 01:00:42', 4);
INSERT INTO public.project_categories VALUES (6, 'Видео', 'video', NULL, '2025-07-06 01:00:42', 5);
INSERT INTO public.project_categories VALUES (10, 'Сайты', 'saity', '2025-07-04 20:57:19', '2025-07-06 01:00:42', 6);


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: nik_studio_admin
--

INSERT INTO public.projects VALUES (12, '/storage/projects/main/0hRgtb38JbzExnslD7RY5xPJELvclKDbdXO9gWKn.png', '/storage/projects/page/LCgqpZAmonXKLBOfYWxVWVEzuovuzYnayEsb9lev.png', '/storage/projects/logos/Nuq5Wyaohux3ZyodPnMtXoU5F24HddTw2P36DFbb.png', 'НПП «Авиаспецмаш»', 'авиаспецмаш', 2024, 'npp-aviaspetsmash', '2025-07-06 14:49:40', '2025-07-09 23:59:42');
INSERT INTO public.projects VALUES (13, '/storage/projects/main/xl0WGw4PwT49mQjHncl2Xi3jsBhqJpRGFgI9g3Jm.png', '/storage/projects/page/9guEZIJaVGS8BA5DBx6nJi7VYv5lQ5dEjYjVwhpK.png', '/storage/projects/logos/mH1F8pQGSx836I9rlKNG9o6HpM20ch4oPH6UlCKG.png', 'ОЭЗ «Технополис Москва»', 'технополис москва', 2024, 'oez-tehnopolis-moskva', '2025-07-06 14:54:38', '2025-07-10 15:14:27');
INSERT INTO public.projects VALUES (11, '/storage/projects/main/NhbIl66DMw9VggFzVGCqKr3nIwiIwEEDl7xd22LU.png', '/storage/projects/page/pcqIszRF440iuLEHNHN34NQTAOdj1ihbT1h2NrO6.png', '/storage/projects/logos/KUzHcPnqClsP5yBLadCL5hvfP4mcj5cJe1C7yPDg.png', 'Группа компаний «ИКАР»', 'икар', 2024, 'gruppa-kompaniy-ikar', '2025-07-06 14:44:18', '2025-07-15 04:05:26');
INSERT INTO public.projects VALUES (14, '/storage/projects/main/b4rgIb08oNfWgCLuN3MJN4hrTuBIqEudt4n8XBqN.png', '/storage/projects/page/cfl4bmF1TV0Ajx1Z6ns9FKo2SlKESCfO7njlIuhW.png', '/storage/projects/logos/GjkpYSCr7y5WMApcb6l3I5X7xHdt240NKn2WDEc8.png', 'Алмаз Антей «Монитор СОФТ»', 'монитор софт', 2024, 'almaz-antey-monitor-soft', '2025-07-06 15:00:21', '2025-07-10 15:16:48');
INSERT INTO public.projects VALUES (22, '/storage/projects/main/rWBuVfN8wvvqAXWiZnPioQbrscgSHAqfvWlNXSep.jpg', '/storage/projects/page/9wBZIcWLBw6v0Lb00EOtpFISug34yUydrSvB7xcJ.jpg', NULL, '12', '12', 2025, '12', '2025-07-15 04:06:21', '2025-07-15 04:06:21');
INSERT INTO public.projects VALUES (23, '/storage/projects/main/nqLQOcAccOdMLnMut1t2RahOg79fFmx9SKIvAkkO.jpg', '/storage/projects/page/t0ajWNntIPg21gfxc1oFc3kV69mHm5XczsV1yZB4.jpg', NULL, '2', '3', 2025, '2', '2025-07-15 18:11:27', '2025-07-15 18:11:27');


--
-- Data for Name: project_details; Type: TABLE DATA; Schema: public; Owner: nik_studio_admin
--

INSERT INTO public.project_details VALUES (4, 13, 'технополис москва', 'Полная подготовка и сопровождение нескольких отраслевых выставок', 'ГК «ИКАР», Корпорация «АФК Система»', '2023', NULL, NULL);
INSERT INTO public.project_details VALUES (3, 12, 'авиаспецмаш', 'Полная подготовка и сопровождение нескольких отраслевых выставок', 'ГК «ИКАР», Корпорация «АФК Система»', '2023', NULL, NULL);
INSERT INTO public.project_details VALUES (5, 14, 'монитор софт', 'Полная подготовка и сопровождение нескольких отраслевых выставок', 'ГК «ИКАР», Корпорация «АФК Система»', '2023', NULL, NULL);
INSERT INTO public.project_details VALUES (9, 22, '11', '2', '3', '2025', '2025-07-15 14:40:29', '2025-07-15 14:40:51');
INSERT INTO public.project_details VALUES (10, 23, '22', '33', '44', '2025', '2025-07-15 18:11:45', '2025-07-15 18:11:45');
INSERT INTO public.project_details VALUES (1, 11, 'икар', 'Полная подготовка и сопровождение нескольких отраслевых выставок', 'ГК «ИКАР», Корпорация «АФК Система»', '2023', NULL, '2025-07-15 23:54:51');


--
-- Data for Name: project_detail_blocks; Type: TABLE DATA; Schema: public; Owner: nik_studio_admin
--

INSERT INTO public.project_detail_blocks VALUES (8, 1, 'сайт', 'Создание сайта в кратчайшие сроки', 'Веб сайт отвечающий всем требованиям времени. Создан на российской системе управления и размещён на российском сервере, отвечающий запросам безопастности. Учтена верстка под все устройства: мобильный телефон, планшет, ноутбуки и компьютеры. Так же на сайте продуман весь путь клиента от ознакомления с продукцией к действию по запросу более подробной информации и квалификации клиента.
В основе создания лежат технологии анимированной 3д графики, промовидео, UX/UI дизайн.
Созданы русская и английская версия.
Работы сделаны под ключ за 3 недели.', NULL, '2025-07-15 23:00:52', 1);
INSERT INTO public.project_detail_blocks VALUES (5, 1, '3d графика', 'На основе CAD моделей создали реальные объекты в материале и окрасе. Анимировали и применили в проморолике, презентациях и на сайте сайте.', 'На основе всех 3д моделей в инженерном сером виде, мы создали уникальные по красоте и эффектности объекты, наложили на них все материалы и логотипы. Положили надписи и ливреи. Анимировали объекты и создали сцены с графикой, которую в последствии использовали во всех визуальных компонентах, усилив эффект от просмотра и вовлеченность зрителя', NULL, '2025-07-15 17:56:29', 3);
INSERT INTO public.project_detail_blocks VALUES (6, 1, 'промо видео', 'Промо видео для стенда и диджитал, точно передающее смыслы', 'Работа над роликом велась в предельно короткий промежуток времени. Сэкономили время для компании, ускоренно начав работу по составлению ТЗ самостоятельно - что сильно ускорило процесс. В итоге показали все важнейшие моменты на видео: процесс разработки, испытаний, локализация производства, возможность расширения производства в кратчайшие сроки, и конечно сами полёты изделия, демонстрирующие его возможности.', NULL, '2025-07-15 17:56:20', 2);
INSERT INTO public.project_detail_blocks VALUES (3, 1, 'брендинг', 'Доработка уже имеющегося логотипа компании', 'Задачи не было переделывать весь логотип, необходимо было доработать уже имеющуюся версию. В данном случае компания «ИКАР» в какой то момент обрела статус группы компаний и соответственно для разных подразделений и предприятий, входящих в состав группы, были доработаны логотипы. Так же был создан фирменный паттерн, набор инфо-графических элементов, точно отражающих деятельность компании.', NULL, '2025-07-15 17:56:36', 4);
INSERT INTO public.project_detail_blocks VALUES (4, 1, 'фото', 'Профессиональная фото-съёмка всех процессов, продукции и выставок', 'Съёмка фотографии - один из наиболее важных моментов, так как это важная часть любого визуала и основная составляющая всех медиа.', NULL, '2025-07-15 17:56:42', 5);
INSERT INTO public.project_detail_blocks VALUES (10, 3, 'брендинг', 'Доработка уже имеющегося логотипа компании', 'Задачи не было переделывать весь логотип, необходимо было доработать уже имеющуюся версию. В данном случае компания «ИКАР» в какой то момент обрела статус группы компаний и соответственно для разных подразделений и предприятий, входящих в состав группы, были доработаны логотипы. Так же был создан фирменный паттерн, набор инфо-графических элементов, точно отражающих деятельность компании.', NULL, NULL, 0);
INSERT INTO public.project_detail_blocks VALUES (11, 3, 'фото', 'Профессиональная фото-съёмка всех процессов, продукции и выставок', 'Съёмка фотографии - один из наиболее важных моментов, так как это важная часть любого визуала и основная составляющая всех медиа.', NULL, NULL, 0);
INSERT INTO public.project_detail_blocks VALUES (12, 3, '3d графика', 'На основе CAD моделей создали реальные объекты в материале и окрасе. Анимировали и применили в проморолике, презентациях и на сайте сайте.', 'На основе всех 3д моделей в инженерном сером виде, мы создали уникальные по красоте и эффектности объекты, наложили на них все материалы и логотипы. Положили надписи и ливреи. Анимировали объекты и создали сцены с графикой, которую в последствии использовали во всех визуальных компонентах, усилив эффект от просмотра и вовлеченность зрителя', NULL, NULL, 0);
INSERT INTO public.project_detail_blocks VALUES (13, 3, 'промо видео', 'Промо видео для стенда и диджитал, точно передающее смыслы', 'Работа над роликом велась в предельно короткий промежуток времени. Сэкономили время для компании, ускоренно начав работу по составлению ТЗ самостоятельно - что сильно ускорило процесс. В итоге показали все важнейшие моменты на видео: процесс разработки, испытаний, локализация производства, возможность расширения производства в кратчайшие сроки, и конечно сами полёты изделия, демонстрирующие его возможности.', NULL, NULL, 0);
INSERT INTO public.project_detail_blocks VALUES (14, 3, 'презентация', 'Неотъемлемой частью выставки и любого коммерческого предложения является презентация', 'В презентации использовали: брендинг, паттерны, коммерческие фотографии, 3д графику. Всё это позволило создать понятную брошюру без воды. Так же были изготовлены полиграфические варианты самой презентации, и созданы папки, блокноты и другая полиграфия для выставки.', NULL, NULL, 0);
INSERT INTO public.project_detail_blocks VALUES (15, 3, 'сайт', 'Создание сайта в кратчайшие сроки', 'Веб сайт отвечающий всем требованиям времени. Создан на российской системе управления и размещён на российском сервере, отвечающий запросам безопастности. Учтена верстка под все устройства: мобильный телефон, планшет, ноутбуки и компьютеры. Так же на сайте продуман весь путь клиента от ознакомления с продукцией к действию по запросу более подробной информации и квалификации клиента.
В основе создания лежат технологии анимированной 3д графики, промовидео, UX/UI дизайн.
Созданы русская и английская версия.
Работы сделаны под ключ за 3 недели.', NULL, NULL, 0);
INSERT INTO public.project_detail_blocks VALUES (16, 4, 'брендинг', 'Доработка уже имеющегося логотипа компании', 'Задачи не было переделывать весь логотип, необходимо было доработать уже имеющуюся версию. В данном случае компания «ИКАР» в какой то момент обрела статус группы компаний и соответственно для разных подразделений и предприятий, входящих в состав группы, были доработаны логотипы. Так же был создан фирменный паттерн, набор инфо-графических элементов, точно отражающих деятельность компании.', NULL, NULL, 0);
INSERT INTO public.project_detail_blocks VALUES (17, 4, 'фото', 'Профессиональная фото-съёмка всех процессов, продукции и выставок', 'Съёмка фотографии - один из наиболее важных моментов, так как это важная часть любого визуала и основная составляющая всех медиа.', NULL, NULL, 0);
INSERT INTO public.project_detail_blocks VALUES (18, 4, '3d графика', 'На основе CAD моделей создали реальные объекты в материале и окрасе. Анимировали и применили в проморолике, презентациях и на сайте сайте.', 'На основе всех 3д моделей в инженерном сером виде, мы создали уникальные по красоте и эффектности объекты, наложили на них все материалы и логотипы. Положили надписи и ливреи. Анимировали объекты и создали сцены с графикой, которую в последствии использовали во всех визуальных компонентах, усилив эффект от просмотра и вовлеченность зрителя', NULL, NULL, 0);
INSERT INTO public.project_detail_blocks VALUES (19, 4, 'промо видео', 'Промо видео для стенда и диджитал, точно передающее смыслы', 'Работа над роликом велась в предельно короткий промежуток времени. Сэкономили время для компании, ускоренно начав работу по составлению ТЗ самостоятельно - что сильно ускорило процесс. В итоге показали все важнейшие моменты на видео: процесс разработки, испытаний, локализация производства, возможность расширения производства в кратчайшие сроки, и конечно сами полёты изделия, демонстрирующие его возможности.', NULL, NULL, 0);
INSERT INTO public.project_detail_blocks VALUES (20, 4, 'презентация', 'Неотъемлемой частью выставки и любого коммерческого предложения является презентация', 'В презентации использовали: брендинг, паттерны, коммерческие фотографии, 3д графику. Всё это позволило создать понятную брошюру без воды. Так же были изготовлены полиграфические варианты самой презентации, и созданы папки, блокноты и другая полиграфия для выставки.', NULL, NULL, 0);
INSERT INTO public.project_detail_blocks VALUES (21, 4, 'сайт', 'Создание сайта в кратчайшие сроки', 'Веб сайт отвечающий всем требованиям времени. Создан на российской системе управления и размещён на российском сервере, отвечающий запросам безопастности. Учтена верстка под все устройства: мобильный телефон, планшет, ноутбуки и компьютеры. Так же на сайте продуман весь путь клиента от ознакомления с продукцией к действию по запросу более подробной информации и квалификации клиента.
В основе создания лежат технологии анимированной 3д графики, промовидео, UX/UI дизайн.
Созданы русская и английская версия.
Работы сделаны под ключ за 3 недели.', NULL, NULL, 0);
INSERT INTO public.project_detail_blocks VALUES (22, 5, 'брендинг', 'Доработка уже имеющегося логотипа компании', 'Задачи не было переделывать весь логотип, необходимо было доработать уже имеющуюся версию. В данном случае компания «ИКАР» в какой то момент обрела статус группы компаний и соответственно для разных подразделений и предприятий, входящих в состав группы, были доработаны логотипы. Так же был создан фирменный паттерн, набор инфо-графических элементов, точно отражающих деятельность компании.', NULL, NULL, 0);
INSERT INTO public.project_detail_blocks VALUES (23, 5, 'фото', 'Профессиональная фото-съёмка всех процессов, продукции и выставок', 'Съёмка фотографии - один из наиболее важных моментов, так как это важная часть любого визуала и основная составляющая всех медиа.', NULL, NULL, 0);
INSERT INTO public.project_detail_blocks VALUES (24, 5, '3d графика', 'На основе CAD моделей создали реальные объекты в материале и окрасе. Анимировали и применили в проморолике, презентациях и на сайте сайте.', 'На основе всех 3д моделей в инженерном сером виде, мы создали уникальные по красоте и эффектности объекты, наложили на них все материалы и логотипы. Положили надписи и ливреи. Анимировали объекты и создали сцены с графикой, которую в последствии использовали во всех визуальных компонентах, усилив эффект от просмотра и вовлеченность зрителя', NULL, NULL, 0);
INSERT INTO public.project_detail_blocks VALUES (25, 5, 'промо видео', 'Промо видео для стенда и диджитал, точно передающее смыслы', 'Работа над роликом велась в предельно короткий промежуток времени. Сэкономили время для компании, ускоренно начав работу по составлению ТЗ самостоятельно - что сильно ускорило процесс. В итоге показали все важнейшие моменты на видео: процесс разработки, испытаний, локализация производства, возможность расширения производства в кратчайшие сроки, и конечно сами полёты изделия, демонстрирующие его возможности.', NULL, NULL, 0);
INSERT INTO public.project_detail_blocks VALUES (26, 4, 'презентация', 'Неотъемлемой частью выставки и любого коммерческого предложения является презентация', 'В презентации использовали: брендинг, паттерны, коммерческие фотографии, 3д графику. Всё это позволило создать понятную брошюру без воды. Так же были изготовлены полиграфические варианты самой презентации, и созданы папки, блокноты и другая полиграфия для выставки.', NULL, NULL, 0);
INSERT INTO public.project_detail_blocks VALUES (27, 5, 'сайт', 'Создание сайта в кратчайшие сроки', 'Веб сайт отвечающий всем требованиям времени. Создан на российской системе управления и размещён на российском сервере, отвечающий запросам безопастности. Учтена верстка под все устройства: мобильный телефон, планшет, ноутбуки и компьютеры. Так же на сайте продуман весь путь клиента от ознакомления с продукцией к действию по запросу более подробной информации и квалификации клиента.
В основе создания лежат технологии анимированной 3д графики, промовидео, UX/UI дизайн.
Созданы русская и английская версия.
Работы сделаны под ключ за 3 недели.', NULL, NULL, 0);
INSERT INTO public.project_detail_blocks VALUES (29, 9, '23', '22', '11', '2025-07-15 17:53:14', '2025-07-15 17:53:14', 1);
INSERT INTO public.project_detail_blocks VALUES (7, 1, 'презентация', 'Неотъемлемой частью выставки и любого коммерческого предложения является презентация', 'В презентации использовали: брендинг, паттерны, коммерческие фотографии, 3д графику. Всё это позволило создать понятную брошюру без воды. Так же были изготовлены полиграфические варианты самой презентации, и созданы папки, блокноты и другая полиграфия для выставки.', NULL, '2025-07-15 17:56:48', 6);
INSERT INTO public.project_detail_blocks VALUES (30, 10, '2', '3', '4', '2025-07-15 18:12:47', '2025-07-15 18:12:47', 1);
INSERT INTO public.project_detail_blocks VALUES (32, 1, '123', '123', '123', '2025-07-15 22:59:26', '2025-07-15 22:59:26', 7);


--
-- Data for Name: project_detail_block_media; Type: TABLE DATA; Schema: public; Owner: nik_studio_admin
--

INSERT INTO public.project_detail_block_media VALUES (1, 3, 1, 'double', '/images/project_single/pattern_main.svg', 'image', 'ИКАР брендинг паттерн', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (2, 3, 1, 'double', '/images/project_single/logo_companies.jpg', 'image', 'ИКАР логотипы компаний', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (3, 3, 2, 'single', '/images/project_single/branding_image.jpg', 'image', 'ИКАР брендинг', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (4, 10, 1, 'double', '/images/project_single/pattern_main.svg', 'image', 'ИКАР брендинг паттерн', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (5, 10, 1, 'double', '/images/project_single/logo_companies.jpg', 'image', 'ИКАР логотипы компаний', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (6, 10, 2, 'single', '/images/project_single/branding_image.jpg', 'image', 'ИКАР брендинг', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (7, 16, 1, 'double', '/images/project_single/pattern_main.svg', 'image', 'ИКАР брендинг паттерн', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (8, 16, 1, 'double', '/images/project_single/logo_companies.jpg', 'image', 'ИКАР логотипы компаний', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (9, 16, 2, 'single', '/images/project_single/branding_image.jpg', 'image', 'ИКАР брендинг', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (10, 22, 1, 'double', '/images/project_single/pattern_main.svg', 'image', 'ИКАР брендинг паттерн', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (11, 22, 1, 'double', '/images/project_single/logo_companies.jpg', 'image', 'ИКАР логотипы компаний', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (12, 22, 2, 'single', '/images/project_single/branding_image.jpg', 'image', 'ИКАР брендинг', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (13, 4, 1, 'double', '/images/project_single/photo_1.jpg', 'image', 'ИКАР фото 1', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (14, 4, 1, 'double', '/images/project_single/photo_2.jpg', 'image', 'ИКАР фото 2', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (15, 4, 2, 'single', '/images/project_single/photo_3.jpg', 'image', 'ИКАР фото 3', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (16, 4, 3, 'double', '/images/project_single/photo_4.jpg', 'image', 'ИКАР фото 4', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (17, 4, 3, 'double', '/images/project_single/photo_5.jpg', 'image', 'ИКАР фото 5', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (18, 4, 4, 'single', '/images/project_single/photo_6.jpg', 'image', 'ИКАР фото 6', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (19, 11, 1, 'double', '/images/project_single/photo_1.jpg', 'image', 'ИКАР фото 1', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (20, 11, 1, 'double', '/images/project_single/photo_2.jpg', 'image', 'ИКАР фото 2', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (21, 11, 2, 'single', '/images/project_single/photo_3.jpg', 'image', 'ИКАР фото 3', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (22, 11, 3, 'double', '/images/project_single/photo_4.jpg', 'image', 'ИКАР фото 4', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (23, 11, 3, 'double', '/images/project_single/photo_5.jpg', 'image', 'ИКАР фото 5', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (24, 11, 4, 'single', '/images/project_single/photo_6.jpg', 'image', 'ИКАР фото 6', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (25, 17, 1, 'double', '/images/project_single/photo_1.jpg', 'image', 'ИКАР фото 1', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (26, 17, 1, 'double', '/images/project_single/photo_2.jpg', 'image', 'ИКАР фото 2', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (27, 17, 2, 'single', '/images/project_single/photo_3.jpg', 'image', 'ИКАР фото 3', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (28, 17, 3, 'double', '/images/project_single/photo_4.jpg', 'image', 'ИКАР фото 4', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (29, 17, 3, 'double', '/images/project_single/photo_5.jpg', 'image', 'ИКАР фото 5', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (30, 17, 4, 'single', '/images/project_single/photo_6.jpg', 'image', 'ИКАР фото 6', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (31, 23, 1, 'double', '/images/project_single/photo_1.jpg', 'image', 'ИКАР фото 1', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (32, 23, 1, 'double', '/images/project_single/photo_2.jpg', 'image', 'ИКАР фото 2', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (33, 23, 2, 'single', '/images/project_single/photo_3.jpg', 'image', 'ИКАР фото 3', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (34, 23, 3, 'double', '/images/project_single/photo_4.jpg', 'image', 'ИКАР фото 4', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (35, 23, 3, 'double', '/images/project_single/photo_5.jpg', 'image', 'ИКАР фото 5', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (36, 23, 4, 'single', '/images/project_single/photo_6.jpg', 'image', 'ИКАР фото 6', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (37, 5, 1, 'double', '/images/project_single/3d_1.png', 'image', 'ИКАР 3D графика 1', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (38, 5, 1, 'double', '/video/project_single/3d_2.mp4', 'video', 'ИКАР 3D видео 2', '/images/project_single/3d_2.png', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (39, 5, 2, 'single', '/video/project_single/3d_3_Moscow.mp4', 'video', 'ИКАР 3D видео 3', '/images/project_single/3d_3.jpg', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (40, 12, 1, 'double', '/images/project_single/3d_1.png', 'image', 'ИКАР 3D графика 1', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (41, 12, 1, 'double', '/video/project_single/3d_2.mp4', 'video', 'ИКАР 3D видео 2', '/images/project_single/3d_2.png', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (42, 12, 2, 'single', '/video/project_single/3d_3_Moscow.mp4', 'video', 'ИКАР 3D видео 3', '/images/project_single/3d_3.jpg', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (43, 18, 1, 'double', '/images/project_single/3d_1.png', 'image', 'ИКАР 3D графика 1', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (44, 18, 1, 'double', '/video/project_single/3d_2.mp4', 'video', 'ИКАР 3D видео 2', '/images/project_single/3d_2.png', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (45, 18, 2, 'single', '/video/project_single/3d_3_Moscow.mp4', 'video', 'ИКАР 3D видео 3', '/images/project_single/3d_3.jpg', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (46, 24, 1, 'double', '/images/project_single/3d_1.png', 'image', 'ИКАР 3D графика 1', NULL, NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (47, 24, 1, 'double', '/video/project_single/3d_2.mp4', 'video', 'ИКАР 3D видео 2', '/images/project_single/3d_2.png', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (48, 24, 2, 'single', '/video/project_single/3d_3_Moscow.mp4', 'video', 'ИКАР 3D видео 3', '/images/project_single/3d_3.jpg', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (49, 6, 1, 'single', '/video/project_single/promo_video/1.mp4', 'video', 'Promo Video 1', '/images/project_single/video_image.png', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (50, 6, 2, 'single', '/images/project_single/promo_video/2.jpg', 'image', 'Promo Image 2', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (52, 6, 4, 'single', '/images/project_single/promo_video/4.jpg', 'image', 'Promo Image 4', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (51, 6, 3, 'single', '/images/project_single/promo_video/3.jpg', 'image', 'Promo Image 3', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (53, 6, 5, 'single', '/images/project_single/promo_video/5.jpg', 'image', 'Promo Image 5', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (54, 13, 1, 'single', '/video/project_single/promo_video/1.mp4', 'video', 'Promo Video 1', '/images/project_single/video_image.png', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (55, 13, 2, 'single', '/images/project_single/promo_video/2.jpg', 'image', 'Promo Image 2', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (56, 13, 3, 'single', '/images/project_single/promo_video/3.jpg', 'image', 'Promo Image 3', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (57, 13, 4, 'single', '/images/project_single/promo_video/4.jpg', 'image', 'Promo Image 4', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (58, 13, 5, 'single', '/images/project_single/promo_video/5.jpg', 'image', 'Promo Image 5', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (59, 19, 1, 'single', '/video/project_single/promo_video/1.mp4', 'video', 'Promo Video 1', '/images/project_single/video_image.png', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (60, 19, 2, 'single', '/images/project_single/promo_video/2.jpg', 'image', 'Promo Image 2', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (61, 19, 3, 'single', '/images/project_single/promo_video/3.jpg', 'image', 'Promo Image 3', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (62, 19, 4, 'single', '/images/project_single/promo_video/4.jpg', 'image', 'Promo Image 4', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (63, 19, 5, 'single', '/images/project_single/promo_video/5.jpg', 'image', 'Promo Image 5', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (64, 25, 1, 'single', '/video/project_single/promo_video/1.mp4', 'video', 'Promo Video 1', '/images/project_single/video_image.png', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (65, 25, 2, 'single', '/images/project_single/promo_video/2.jpg', 'image', 'Promo Image 2', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (66, 25, 3, 'single', '/images/project_single/promo_video/3.jpg', 'image', 'Promo Image 3', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (67, 25, 4, 'single', '/images/project_single/promo_video/4.jpg', 'image', 'Promo Image 4', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (68, 25, 5, 'single', '/images/project_single/promo_video/5.jpg', 'image', 'Promo Image 5', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (69, 7, 1, 'single', '/images/project_single/presentation/presentation.png', 'image', 'Презентация изображение 1', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (70, 7, 2, 'single', '/images/project_single/presentation/ER1_9926 copy.jpg', 'image', 'Презентация изображение 2', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (71, 7, 3, 'single', '/images/project_single/presentation/5.jpg', 'image', 'Презентация изображение 3', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (72, 7, 4, 'single', '/images/project_single/presentation/pervyi-element-bpla-na-vodorode-zashitit-strategicheskuyu-infrastrukturu-5wnnurrx-1724364601.jpg', 'image', 'Презентация изображение 4', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (73, 7, 5, 'single', '/images/project_single/presentation/Silent-Arrow-Autonomous-Cargo-Glider.webp', 'image', 'Презентация изображение 5', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (74, 14, 1, 'single', '/images/project_single/presentation/presentation.png', 'image', 'Презентация изображение 1', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (75, 14, 2, 'single', '/images/project_single/presentation/ER1_9926 copy.jpg', 'image', 'Презентация изображение 2', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (76, 14, 3, 'single', '/images/project_single/presentation/5.jpg', 'image', 'Презентация изображение 3', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (77, 14, 4, 'single', '/images/project_single/presentation/pervyi-element-bpla-na-vodorode-zashitit-strategicheskuyu-infrastrukturu-5wnnurrx-1724364601.jpg', 'image', 'Презентация изображение 4', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (78, 14, 5, 'single', '/images/project_single/presentation/Silent-Arrow-Autonomous-Cargo-Glider.webp', 'image', 'Презентация изображение 5', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (79, 20, 1, 'single', '/images/project_single/presentation/presentation.png', 'image', 'Презентация изображение 1', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (80, 20, 2, 'single', '/images/project_single/presentation/ER1_9926 copy.jpg', 'image', 'Презентация изображение 2', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (81, 20, 3, 'single', '/images/project_single/presentation/5.jpg', 'image', 'Презентация изображение 3', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (82, 20, 4, 'single', '/images/project_single/presentation/pervyi-element-bpla-na-vodorode-zashitit-strategicheskuyu-infrastrukturu-5wnnurrx-1724364601.jpg', 'image', 'Презентация изображение 4', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (83, 20, 5, 'single', '/images/project_single/presentation/Silent-Arrow-Autonomous-Cargo-Glider.webp', 'image', 'Презентация изображение 5', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (84, 26, 1, 'single', '/images/project_single/presentation/presentation.png', 'image', 'Презентация изображение 1', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (85, 26, 2, 'single', '/images/project_single/presentation/ER1_9926 copy.jpg', 'image', 'Презентация изображение 2', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (86, 26, 3, 'single', '/images/project_single/presentation/5.jpg', 'image', 'Презентация изображение 3', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (87, 26, 4, 'single', '/images/project_single/presentation/pervyi-element-bpla-na-vodorode-zashitit-strategicheskuyu-infrastrukturu-5wnnurrx-1724364601.jpg', 'image', 'Презентация изображение 4', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (88, 26, 5, 'single', '/images/project_single/presentation/Silent-Arrow-Autonomous-Cargo-Glider.webp', 'image', 'Презентация изображение 5', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (89, 8, 1, 'single', '/images/project_single/website/website_image.jpg', 'image', 'ИКАР сайт изображение 1', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (90, 8, 2, 'single', '/images/project_single/website/website.jpg', 'image', 'ИКАР сайт изображение 2', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (91, 8, 3, 'single', '/images/project_single/website/web-site-ornekleri.jpg', 'image', 'ИКАР сайт изображение 3', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (92, 8, 4, 'single', '/images/project_single/website/sozdanie-saytov-v-moskve.jpg', 'image', 'ИКАР сайт изображение 4', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (93, 8, 5, 'single', '/images/project_single/website/bg_2-min.jpeg', 'image', 'ИКАР сайт изображение 5', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (94, 15, 1, 'single', '/images/project_single/website/website_image.jpg', 'image', 'ИКАР сайт изображение 1', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (95, 15, 2, 'single', '/images/project_single/website/website.jpg', 'image', 'ИКАР сайт изображение 2', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (96, 15, 3, 'single', '/images/project_single/website/web-site-ornekleri.jpg', 'image', 'ИКАР сайт изображение 3', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (97, 15, 4, 'single', '/images/project_single/website/sozdanie-saytov-v-moskve.jpg', 'image', 'ИКАР сайт изображение 4', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (98, 15, 5, 'single', '/images/project_single/website/bg_2-min.jpeg', 'image', 'ИКАР сайт изображение 5', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (99, 21, 1, 'single', '/images/project_single/website/website_image.jpg', 'image', 'ИКАР сайт изображение 1', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (100, 21, 2, 'single', '/images/project_single/website/website.jpg', 'image', 'ИКАР сайт изображение 2', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (101, 21, 3, 'single', '/images/project_single/website/web-site-ornekleri.jpg', 'image', 'ИКАР сайт изображение 3', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (102, 21, 4, 'single', '/images/project_single/website/sozdanie-saytov-v-moskve.jpg', 'image', 'ИКАР сайт изображение 4', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (103, 21, 5, 'single', '/images/project_single/website/bg_2-min.jpeg', 'image', 'ИКАР сайт изображение 5', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (104, 27, 1, 'single', '/images/project_single/website/website_image.jpg', 'image', 'ИКАР сайт изображение 1', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (105, 27, 2, 'single', '/images/project_single/website/website.jpg', 'image', 'ИКАР сайт изображение 2', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (106, 27, 3, 'single', '/images/project_single/website/web-site-ornekleri.jpg', 'image', 'ИКАР сайт изображение 3', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (107, 27, 4, 'single', '/images/project_single/website/sozdanie-saytov-v-moskve.jpg', 'image', 'ИКАР сайт изображение 4', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (108, 27, 5, 'single', '/images/project_single/website/bg_2-min.jpeg', 'image', 'ИКАР сайт изображение 5', '', NULL, NULL, 0);
INSERT INTO public.project_detail_block_media VALUES (112, 6, 1752591564, 'single', 'projects/blocks/LPEpOV9VQVYlymr1mCOn0WRQRv24caZw41RQRLNP.jpg', 'image', '123', NULL, '2025-07-15 14:59:24', '2025-07-15 14:59:24', 0);
INSERT INTO public.project_detail_block_media VALUES (114, 29, 1752602318, 'single', 'projects/blocks/LwEOGc8SdNl4Hw4NuLLsl9AjgwEiFa2oc7MwbHPk.jpg', 'image', '22', NULL, '2025-07-15 17:58:38', '2025-07-15 17:58:38', 1);
INSERT INTO public.project_detail_block_media VALUES (117, 30, 1752632843, 'single', 'projects/blocks/h75BgxTcEOgO5iQ1WOLojbW7Nf7N5I3lsrdin4jf.jpg', 'image', '', NULL, '2025-07-16 02:27:23', '2025-07-16 02:27:23', 1);


--
-- Data for Name: project_detail_hero_media; Type: TABLE DATA; Schema: public; Owner: nik_studio_admin
--

INSERT INTO public.project_detail_hero_media VALUES (3, 1, '3', 'single', '/images/project_single/hero_image/image_3.jpg', 'image', 'ИКАР герой изображение 3', NULL, NULL, NULL);
INSERT INTO public.project_detail_hero_media VALUES (4, 1, '4', 'single', '/images/project_single/hero_image/image_4.jpg', 'image', 'ИКАР герой изображение 4', NULL, NULL, NULL);
INSERT INTO public.project_detail_hero_media VALUES (81, 1, '1', 'single', 'projects/hero/NnwwTrBLrphwzUtEwEoiRoocVviPhr5Wc29C1c2l.jpg', 'image', 'ИКАР герой изображение 1', NULL, '2025-07-15 23:55:05', '2025-07-15 23:55:05');
INSERT INTO public.project_detail_hero_media VALUES (6, 3, '1', 'single', '/images/project_single/hero_image/image_1.jpg', 'image', 'ИКАР герой изображение 1', NULL, NULL, NULL);
INSERT INTO public.project_detail_hero_media VALUES (7, 3, '2', 'single', '/images/project_single/hero_image/image_2.jpg', 'image', 'ИКАР герой изображение 2', NULL, NULL, NULL);
INSERT INTO public.project_detail_hero_media VALUES (8, 3, '3', 'single', '/images/project_single/hero_image/image_3.jpg', 'image', 'ИКАР герой изображение 3', NULL, NULL, NULL);
INSERT INTO public.project_detail_hero_media VALUES (9, 3, '4', 'single', '/images/project_single/hero_image/image_4.jpg', 'image', 'ИКАР герой изображение 4', NULL, NULL, NULL);
INSERT INTO public.project_detail_hero_media VALUES (10, 3, '5', 'single', '/video/project_single/3d_3_Moscow.mp4', 'video', 'ИКАР герой видео 5', '/images/project_single/hero_image/image_5.webp', NULL, NULL);
INSERT INTO public.project_detail_hero_media VALUES (11, 4, '1', 'single', '/images/project_single/hero_image/image_1.jpg', 'image', 'ИКАР герой изображение 1', NULL, NULL, NULL);
INSERT INTO public.project_detail_hero_media VALUES (12, 4, '2', 'single', '/images/project_single/hero_image/image_2.jpg', 'image', 'ИКАР герой изображение 2', NULL, NULL, NULL);
INSERT INTO public.project_detail_hero_media VALUES (13, 4, '3', 'single', '/images/project_single/hero_image/image_3.jpg', 'image', 'ИКАР герой изображение 3', NULL, NULL, NULL);
INSERT INTO public.project_detail_hero_media VALUES (14, 4, '4', 'single', '/images/project_single/hero_image/image_4.jpg', 'image', 'ИКАР герой изображение 4', NULL, NULL, NULL);
INSERT INTO public.project_detail_hero_media VALUES (15, 4, '5', 'single', '/video/project_single/3d_3_Moscow.mp4', 'video', 'ИКАР герой видео 5', '/images/project_single/hero_image/image_5.webp', NULL, NULL);
INSERT INTO public.project_detail_hero_media VALUES (16, 5, '1', 'single', '/images/project_single/hero_image/image_1.jpg', 'image', 'ИКАР герой изображение 1', NULL, NULL, NULL);
INSERT INTO public.project_detail_hero_media VALUES (17, 5, '2', 'single', '/images/project_single/hero_image/image_2.jpg', 'image', 'ИКАР герой изображение 2', NULL, NULL, NULL);
INSERT INTO public.project_detail_hero_media VALUES (18, 5, '3', 'single', '/images/project_single/hero_image/image_3.jpg', 'image', 'ИКАР герой изображение 3', NULL, NULL, NULL);
INSERT INTO public.project_detail_hero_media VALUES (19, 5, '4', 'single', '/images/project_single/hero_image/image_4.jpg', 'image', 'ИКАР герой изображение 4', NULL, NULL, NULL);
INSERT INTO public.project_detail_hero_media VALUES (20, 5, '5', 'single', '/video/project_single/3d_3_Moscow.mp4', 'video', 'ИКАР герой видео 5', '/images/project_single/hero_image/image_5.webp', NULL, NULL);
INSERT INTO public.project_detail_hero_media VALUES (34, 1, '2', 'single', '/images/project_single/hero_image/image_2.jpg', 'image', 'ИКАР герой изображение 2', NULL, '2025-07-14 00:33:25', '2025-07-14 00:33:25');
INSERT INTO public.project_detail_hero_media VALUES (51, 1, '5', 'single', 'projects/hero/EcGyWYlP0rc5zTP8WVZA9XEYOAHywk0SV1IX4TTs.mp4', 'video', 'ИКАР герой видео 5', 'images/project_single/hero_image/image_5.webp', '2025-07-14 18:38:08', '2025-07-14 18:38:08');
INSERT INTO public.project_detail_hero_media VALUES (74, 9, '1', 'single', 'projects/hero/euA2NkVKqeFnpuGZ536hLBaBNli6HdhSAZTEJOQx.jpg', 'image', '123', NULL, '2025-07-15 17:52:33', '2025-07-15 17:52:33');
INSERT INTO public.project_detail_hero_media VALUES (75, 9, '2', 'single', 'projects/hero/cx0J8L2npsIU0pIPhcPtPUSm9nGJXMvCpmLra04A.jpg', 'image', '4561', NULL, '2025-07-15 17:58:11', '2025-07-15 17:58:11');
INSERT INTO public.project_detail_hero_media VALUES (76, 10, '1', 'single', 'projects/hero/dbsLLtuDscr80TSFTzaLnICrgmG4pDZWLdL0qrkg.mp4', 'video', '123', NULL, '2025-07-15 18:12:31', '2025-07-15 18:12:31');


--
-- Data for Name: project_project_category; Type: TABLE DATA; Schema: public; Owner: nik_studio_admin
--

INSERT INTO public.project_project_category VALUES (1, 11, 2, NULL, NULL);
INSERT INTO public.project_project_category VALUES (2, 12, 2, NULL, NULL);
INSERT INTO public.project_project_category VALUES (3, 13, 2, NULL, NULL);
INSERT INTO public.project_project_category VALUES (4, 14, 2, NULL, NULL);
INSERT INTO public.project_project_category VALUES (5, 11, 3, NULL, NULL);
INSERT INTO public.project_project_category VALUES (15, 22, 2, NULL, NULL);
INSERT INTO public.project_project_category VALUES (16, 23, 4, NULL, NULL);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: nik_studio_admin
--

INSERT INTO public.sessions VALUES ('CMADf9L9COXgC7izYOYiFUYn2B23Klr6WNJjzW6S', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTEhFcXJtOTd2N0tkY3hiY3ZkbXVvQXNrRWhyUXVONWRpWGgxUTh2ZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750111046);
INSERT INTO public.sessions VALUES ('4JCvs2GzBcHUe0n9C7H57jvhU6l5uyAi9cFSf9JN', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVW1nbW9aQ2lyWHkzRG5LU1p0VEpBWkl0WHd5TFFjeHJxbzJ6Qk5LYiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750140694);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: nik_studio_admin
--



--
-- Name: blog_post_blocks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nik_studio_admin
--

SELECT pg_catalog.setval('public.blog_post_blocks_id_seq', 22, true);


--
-- Name: blog_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nik_studio_admin
--

SELECT pg_catalog.setval('public.blog_posts_id_seq', 13, true);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nik_studio_admin
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nik_studio_admin
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nik_studio_admin
--

SELECT pg_catalog.setval('public.migrations_id_seq', 42, true);


--
-- Name: project_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nik_studio_admin
--

SELECT pg_catalog.setval('public.project_categories_id_seq', 10, true);


--
-- Name: project_detail_block_media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nik_studio_admin
--

SELECT pg_catalog.setval('public.project_detail_block_media_id_seq', 117, true);


--
-- Name: project_detail_blocks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nik_studio_admin
--

SELECT pg_catalog.setval('public.project_detail_blocks_id_seq', 32, true);


--
-- Name: project_detail_hero_media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nik_studio_admin
--

SELECT pg_catalog.setval('public.project_detail_hero_media_id_seq', 81, true);


--
-- Name: project_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nik_studio_admin
--

SELECT pg_catalog.setval('public.project_details_id_seq', 10, true);


--
-- Name: project_project_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nik_studio_admin
--

SELECT pg_catalog.setval('public.project_project_category_id_seq', 16, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nik_studio_admin
--

SELECT pg_catalog.setval('public.projects_id_seq', 23, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nik_studio_admin
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

