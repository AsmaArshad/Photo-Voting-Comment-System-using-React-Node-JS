PGDMP     *    #    
            {            Voting    14.4    14.4     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    99243    Voting    DATABASE     l   CREATE DATABASE "Voting" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE "Voting";
                postgres    false            ?            1259    99251    tbl_Comment    TABLE     {   CREATE TABLE public."tbl_Comment" (
    "Id" integer NOT NULL,
    "Photo_Id" integer,
    "Comments" character varying
);
 !   DROP TABLE public."tbl_Comment";
       public         heap    postgres    false            ?            1259    99263    Comments_Id_seq    SEQUENCE     ?   ALTER TABLE public."tbl_Comment" ALTER COLUMN "Id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Comments_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    210            ?            1259    99244 	   tbl_Photo    TABLE     ?   CREATE TABLE public."tbl_Photo" (
    "Id" integer NOT NULL,
    "Photo_Path" character varying,
    "user" character varying,
    "Vote_Count" integer
);
    DROP TABLE public."tbl_Photo";
       public         heap    postgres    false            ?            1259    99264    Photos_Id_seq    SEQUENCE     ?   ALTER TABLE public."tbl_Photo" ALTER COLUMN "Id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Photos_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    209            ?          0    99251    tbl_Comment 
   TABLE DATA           E   COPY public."tbl_Comment" ("Id", "Photo_Id", "Comments") FROM stdin;
    public          postgres    false    210   ?       ?          0    99244 	   tbl_Photo 
   TABLE DATA           O   COPY public."tbl_Photo" ("Id", "Photo_Path", "user", "Vote_Count") FROM stdin;
    public          postgres    false    209   ]       ?           0    0    Comments_Id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Comments_Id_seq"', 54, true);
          public          postgres    false    211            ?           0    0    Photos_Id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Photos_Id_seq"', 72, true);
          public          postgres    false    212            d           2606    99257    tbl_Comment Comments_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public."tbl_Comment"
    ADD CONSTRAINT "Comments_pkey" PRIMARY KEY ("Id");
 G   ALTER TABLE ONLY public."tbl_Comment" DROP CONSTRAINT "Comments_pkey";
       public            postgres    false    210            b           2606    99250    tbl_Photo Photos_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public."tbl_Photo"
    ADD CONSTRAINT "Photos_pkey" PRIMARY KEY ("Id");
 C   ALTER TABLE ONLY public."tbl_Photo" DROP CONSTRAINT "Photos_pkey";
       public            postgres    false    209            e           2606    99258    tbl_Comment fk_comments_photos    FK CONSTRAINT     ?   ALTER TABLE ONLY public."tbl_Comment"
    ADD CONSTRAINT fk_comments_photos FOREIGN KEY ("Photo_Id") REFERENCES public."tbl_Photo"("Id");
 J   ALTER TABLE ONLY public."tbl_Comment" DROP CONSTRAINT fk_comments_photos;
       public          postgres    false    209    210    3170            ?   ?   x?]?[
?@E?oV?(:y??şV,???o??Ja>29???9?=?S??Gb??c????\_5?!?'?Q????;?a??w!i`ה???R???D1?&?h.??E???MWa??c???Hm?{[?߯?OS$m??E?^??x?2̊?Ev?+nD??1Nr      ?   V  x?m?;NQ?:??D??d4)? "J$(X>?ߡ?ğ?????|??#?e???q???/????̢???=.?????|X?ф?????	`zĮ?KFф6a?RV?®?:??ܷj?l&@??M*i:?/p&?
?r??:,5?s#D*2? ?? ?ʂ4\fo???K'?	s??bTUwl??U????lU?vc?1????_H?Aގ	???qq??ȜЩ?VLi?y????e?AAx??Vc?{
????*dY?'7!L???.???c)?T$:޿#?fpp?C????1`?R??ww??9s9A?C??S?O?;????????i۶o?|?     