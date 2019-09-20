-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 20 Sep 2019 pada 03.58
-- Versi server: 10.3.16-MariaDB
-- Versi PHP: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sweet_room`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `facility`
--

CREATE TABLE `facility` (
  `id` int(11) NOT NULL,
  `facility_name` varchar(25) NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `favorite`
--

CREATE TABLE `favorite` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `favorite` enum('0','1') NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `rating` varchar(5) NOT NULL,
  `comment` text NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `hotel`
--

CREATE TABLE `hotel` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `hotel_name` varchar(25) NOT NULL,
  `city` varchar(15) NOT NULL,
  `address` text NOT NULL,
  `zipcode` int(10) NOT NULL,
  `latitude` varchar(25) NOT NULL,
  `longitude` varchar(25) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `image` text NOT NULL,
  `rate` varchar(5) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `hotel`
--

INSERT INTO `hotel` (`id`, `user_id`, `hotel_name`, `city`, `address`, `zipcode`, `latitude`, `longitude`, `phone`, `image`, `rate`, `create_at`, `update_at`) VALUES
(1, 1, 'OYO', 'Yogyakarta', 'Jl. Sartono MJ III No.815, Mantrijeron, Kec. Mantrijeron, Kota Yogyakarta, Daerah Istimewa Yogyakarta', 55143, '-7.768462', '110.37833437', '0274372885', 'https://lh3.googleusercontent.com/p/AF1QipMHEezFgPPoEy4TsowJRupezYYleiRhstB2NjCZ=w296-h202-n-k-rw-no-v1', '5', '2019-09-16 22:41:58', '2019-09-16 22:41:58'),
(3, 2, 'bunga', 'surabaya', 'Jl. Sartono MJ III No.815, Mantrijeron, Kec. Mantrijeron, Kota Yogyakarta, Daerah Istimewa Yogyakarta ', 55143, '-7.760462', '110.37033437', '0274372885', 'https://a0.muscache.com/im/pictures/7cc3c855-f90e-4d0f-9b13-3b5c2a3c4bad.jpg', '0', '2019-09-16 22:50:15', '2019-09-16 22:50:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `hotel_reservation`
--

CREATE TABLE `hotel_reservation` (
  `id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `invoice` varchar(25) NOT NULL,
  `reservation_date` timestamp NULL DEFAULT NULL,
  `check_in` timestamp NULL DEFAULT NULL,
  `check_out` timestamp NULL DEFAULT NULL,
  `num_people` varchar(2) NOT NULL,
  `bed_type` varchar(6) NOT NULL,
  `room_number` varchar(5) NOT NULL,
  `price` varchar(15) NOT NULL,
  `plan_checkin` timestamp NULL DEFAULT NULL,
  `plan_checkout` timestamp NULL DEFAULT NULL,
  `status` varchar(15) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `hotel_reservation`
--

INSERT INTO `hotel_reservation` (`id`, `hotel_id`, `user_id`, `invoice`, `reservation_date`, `check_in`, `check_out`, `num_people`, `bed_type`, `room_number`, `price`, `plan_checkin`, `plan_checkout`, `status`, `create_at`, `update_at`) VALUES
(19, 1, 5, 'SR1568895804058', '2019-09-19 12:23:24', NULL, NULL, '4', 'medium', 'B222', '600000', '2017-09-16 22:41:58', '2018-09-10 19:41:58', 'PENDING', '2019-09-19 12:23:24', '2019-09-19 12:25:39'),
(20, 3, 5, 'SR1568898147400', '2019-09-19 13:02:27', NULL, NULL, '4', 'medium', 'B222', '600000', '2017-09-16 22:41:58', '2018-09-10 19:41:58', 'waiting payment', '2019-09-19 13:02:27', '2019-09-19 13:02:27'),
(22, 1, 5, 'SR1568901118454', '2019-09-19 13:51:58', NULL, NULL, '2', 'medium', 'B222', '600000', '2019-09-17 17:00:00', '2019-09-23 17:00:00', 'waiting payment', '2019-09-19 13:51:58', '2019-09-19 13:51:58'),
(23, 1, 5, 'SR1568901751847', '2019-09-19 14:02:31', NULL, NULL, '3', 'medium', 'B222', '600000', '2019-09-18 17:00:00', '2019-09-18 17:00:00', 'waiting payment', '2019-09-19 14:02:31', '2019-09-19 14:02:31'),
(24, 1, 5, 'SR1568903178942', '2019-09-19 14:26:18', NULL, NULL, '2', 'medium', 'B222', '600000', '2019-09-17 17:00:00', '2019-09-24 17:00:00', 'waiting payment', '2019-09-19 14:26:18', '2019-09-19 14:26:18'),
(25, 1, 5, 'SR1568903293257', '2019-09-19 14:28:13', NULL, NULL, '2', 'medium', 'B222', '600000', '2019-09-17 17:00:00', '2019-09-25 17:00:00', 'waiting payment', '2019-09-19 14:28:13', '2019-09-19 14:28:13'),
(26, 1, 5, 'SR1568903344395', '2019-09-19 14:29:04', NULL, NULL, '2', 'medium', 'B222', '600000', '2019-09-18 17:00:00', '2019-09-29 17:00:00', 'waiting payment', '2019-09-19 14:29:04', '2019-09-19 14:29:04'),
(27, 1, 5, 'SR1568903488413', '2019-09-19 14:31:28', NULL, NULL, '2', 'medium', 'B222', '600000', '2019-09-18 17:00:00', '2019-09-24 17:00:00', 'PENDING', '2019-09-19 14:31:28', '2019-09-19 14:32:43'),
(28, 1, 5, 'SR1568903616624', '2019-09-19 14:33:36', NULL, NULL, '2', 'medium', 'B222', '600000', '2019-09-23 17:00:00', '2019-09-29 17:00:00', 'PENDING', '2019-09-19 14:33:36', '2019-09-19 14:33:52'),
(29, 1, 5, 'SR1568903731844', '2019-09-19 14:35:31', NULL, NULL, '3', 'medium', 'B222', '600000', '2019-09-25 17:00:00', '2019-09-29 17:00:00', 'PAID', '2019-09-19 14:35:31', '2019-09-19 14:53:26'),
(31, 1, 5, 'SR1568911670609', '2019-09-19 16:47:50', NULL, NULL, '2', 'medium', 'B222', '600000', '2017-09-16 22:41:58', '2018-09-10 19:41:58', 'waiting payment', '2019-09-19 16:47:50', '2019-09-19 16:47:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `external_id` varchar(25) NOT NULL,
  `payment_id` varchar(50) NOT NULL,
  `amount` varchar(25) NOT NULL,
  `payer_email` varchar(25) NOT NULL,
  `description` text NOT NULL,
  `bank_code` varchar(10) NOT NULL,
  `paid_amount` varchar(15) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `payment`
--

INSERT INTO `payment` (`id`, `external_id`, `payment_id`, `amount`, `payer_email`, `description`, `bank_code`, `paid_amount`, `status`) VALUES
(57, 'SR1568895804058', '5d8373c221363a431ef769ab', '600000', 'fadilhimawan@gmail.com', 'Room Number B222', '', '', 'PENDING'),
(58, 'SR1568903488413', '5d83918a21363a431ef769d1', '600000', 'fadilhimawan@gmail.com', 'Room Number B222', '', '', 'PENDING'),
(59, 'SR1568903616624', '5d8391ce21363a431ef769d2', '600000', 'fadilhimawan@gmail.com', 'Room Number B222', '', '', 'PENDING'),
(60, 'SR1568903731844', '5d83923521363a431ef769d3', '600000', 'fadilhimawan@gmail.com', 'Room Number B222', 'MANDIRI', '600000', 'PAID');

-- --------------------------------------------------------

--
-- Struktur dari tabel `room`
--

CREATE TABLE `room` (
  `id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `bed_type` varchar(6) NOT NULL,
  `image` text NOT NULL,
  `room_number` varchar(5) NOT NULL,
  `price` varchar(10) NOT NULL,
  `status` enum('0','1') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `room`
--

INSERT INTO `room` (`id`, `hotel_id`, `bed_type`, `image`, `room_number`, `price`, `status`) VALUES
(1, 1, 'medium', 'https://cdn.shopify.com/s/files/1/2660/5202/products/f8gtupg30alr3qjqrkw1_a610fd4c-5a3d-4339-84eb-2401edd1ee9c_1400x.jpg?v=1536593845', 'B222', '600000', '0'),
(3, 3, 'Big', 'https://media.istockphoto.com/photos/wooden-double-bed-with-cream-faux-leather-and-orthopedic-mattre-picture-id629788762?k=6&m=629788762&s=612x612&w=0&h=FgHyWCF0baKsS-IRf2ssfeod6vvCag6-E9ybF8vYgKQ=', 'B2323', '20000', '1');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `birth` varchar(25) NOT NULL,
  `photo` text NOT NULL,
  `level` enum('user','mitra') NOT NULL DEFAULT 'user',
  `city` varchar(25) NOT NULL,
  `address` text NOT NULL,
  `phone` varchar(15) NOT NULL,
  `latitude` varchar(25) NOT NULL,
  `longitude` varchar(25) NOT NULL,
  `device_id` varchar(255) DEFAULT NULL,
  `pushToken` varchar(255) DEFAULT NULL,
  `firebase_id` varchar(25) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`, `birth`, `photo`, `level`, `city`, `address`, `phone`, `latitude`, `longitude`, `device_id`, `pushToken`, `firebase_id`, `create_at`, `update_at`) VALUES
(1, 'Dhiya', 'Zaychik', 'dhiya@gmail.com', '$2a$10$SGpJjdVd7dwkUX1YGVOsgOG7Zf9ZyP.yYxeBt6WpP.aLWYm8580gy', '2000-08-17 05:41:58', 'https://cdn.kastatic.org/images/avatars/svg/marcimus.svg', 'user', 'Trenggalek', 'Trenggalek', '+6281358933804', '13311313', '-12341512', '', NULL, NULL, '2019-09-17 04:12:58', '2019-09-17 15:28:19'),
(4, 'Brilliano', 'Dhiya Ulhaq', 'brillianodhiya@gmail.com', '$2a$10$Xcu/f9UZvzCr6rlrN3q6xescyCCyTOk85ciapE3wF/pbb2PWstPbK', '17 Feb 2019', 'https://cdn.kastatic.org/images/avatars/svg/marcimus.svg', 'mitra', '', '', '', '13311313', '-12341512', '', NULL, NULL, '2019-09-17 09:35:27', '2019-09-17 09:35:27'),
(5, 'Fadil', 'Himawan', 'fadilhimawan@gmail.com', '$2a$10$TLpo9kzyraRRLUP/B802Rui5RjOvGuoUb.ct0czl3QZRvEGUAgcRu', '2016-06-01', 'https://cdn.kastatic.org/images/avatars/svg/marcimus.svg', 'user', '', '', '', '87318238', '1029209', '', NULL, NULL, '2019-09-18 04:01:57', '2019-09-18 04:01:57'),
(7, 'Brilliano', 'Dhiya', 'dhiyazaychik@gmail.com', '$2a$10$Sfa2nHeP4tAmKngbkG1c/.f1goaJcUlQ88vB/2KRU78tMi1PQmGWK', '17 Feb 2019', 'https://cdn.kastatic.org/images/avatars/svg/marcimus.svg', 'user', '', '', '', '13311313', '-12341512', '', NULL, NULL, '2019-09-18 16:37:27', '2019-09-18 16:37:27'),
(8, 'Brilliano', 'Dhiya', 'dhiyazaychiku@gmail.com', '$2a$10$YF/4IHmhxSI2LEf95Ev5ueDZoDJhvScWR4bLJrdev0AJElW.lPAJ2', '17 Feb 2019', 'https://cdn.kastatic.org/images/avatars/svg/marcimus.svg', 'user', '', '', '', '13311313', '-12341512', '', NULL, NULL, '2019-09-18 16:39:18', '2019-09-18 16:39:18'),
(80, 'ari', 'qoiriman', 'ariqrm@gmail.com', '$2a$10$TLpo9kzyraRRLUP/B802Rui5RjOvGuoUb.ct0czl3QZRvEGUAgcRu', '12/12/1999', '', 'user', 'surabaya', 'jl menganti wiyung 1 rt 2 rw 2 no 105 surabaya', '082141114118', '-7.768462', '7.768462', '', NULL, NULL, '2019-09-19 07:51:03', '2019-09-19 07:52:43'),
(122, 'opoyo', 'opoyo', 'iambaehaqi12@gmail.com', '$2a$10$o.He4K/fxzZNGkPVyxnMAurudNkqCqMuP7anshhI3GRd69yt.NTde', '19970917', 'https://cdn.kastatic.org/images/avatars/svg/marcimus.svg', 'mitra', '', '', '', '87318238', '1029209', '', NULL, NULL, '2019-09-19 09:24:11', '2019-09-19 09:24:11'),
(192, 'tidur', 'Ngantuk', 'tidurngantuk@gmail.com', '$2a$10$z.LPFNtf3DYPSVLqDPqt9Owma9xWsCEilmMx2uxtHz8ejHQc7haVe', '19970707', 'https://cdn.kastatic.org/images/avatars/svg/marcimus.svg', 'mitra', '', '', '', '87318238', '1029209', NULL, NULL, NULL, '2019-09-19 15:14:01', '2019-09-19 15:14:01'),
(193, 'tes', 'tis', 'testos@gmail.com', '$2a$10$vSG046ogqrrsRlwhf4HAQuGkFWTdxB8zpAF01kM4Z7p46mZrMfayy', '2001-01-01', 'https://cdn.kastatic.org/images/avatars/svg/marcimus.svg', 'user', '', '', '', '87318238', '1029209', NULL, NULL, NULL, '2019-09-20 00:31:37', '2019-09-20 00:31:37');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `facility`
--
ALTER TABLE `facility`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `hotel_reservation`
--
ALTER TABLE `hotel_reservation`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `external_id` (`external_id`),
  ADD UNIQUE KEY `payment_id` (`payment_id`);

--
-- Indeks untuk tabel `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `facility`
--
ALTER TABLE `facility`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `hotel`
--
ALTER TABLE `hotel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `hotel_reservation`
--
ALTER TABLE `hotel_reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT untuk tabel `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT untuk tabel `room`
--
ALTER TABLE `room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=194;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
