// ============================================================
//  images.js — VanLang KTVXN Quiz
//
//  📌 HƯỚNG DẪN THÊM ẢNH TỪ GOOGLE DRIVE:
//  ① Upload ảnh lên Google Drive
//  ② Chuột phải → "Chia sẻ" → chọn "Bất kỳ ai có đường liên kết"
//  ③ Sao chép link, lấy phần FILE_ID:
//     drive.google.com/file/d/[ FILE_ID ]/view?usp=sharing
//                              ^^^^^^^^^^^
//  ④ Dán FILE_ID vào đúng ô bên dưới (thay chữ FILE_ID_xxx)
//
//  ⚠️  KHÔNG dùng link gốc /view hay /uc?export=view — sẽ không hiển thị được
// ============================================================

// ── Ảnh banner trang Start ───────────────────────────────────
export const HERO_IMAGE = `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709013/Your_paragraph_text_21_hbrbs5.png`;

// ── Ảnh minh hoạ theo từng câu hỏi (q1 → q8) ───────────────
export const QUESTION_IMAGES = {
  q1: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708997/Your_paragraph_text_11_r65asm.png`, // Câu 1: Trời mưa, không ai rủ đi đâu
  q2: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708999/Your_paragraph_text_12_ojrycn.png`, // Câu 2: Khi làm bài tập nhóm
  q3: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709001/Your_paragraph_text_13_l609e0.png`, // Câu 3: Khoảnh khắc thấy mình đang sống nhất
  q4: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709001/Your_paragraph_text_14_zfl4w5.png`, // Câu 4: Điều khiến bạn mất hứng nhất
  q5: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709002/Your_paragraph_text_15_wy2vql.png`, // Câu 5: Nhân vật ấn tượng trong phim / game
  q6: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709003/Your_paragraph_text_16_ymzd1c.png`, // Câu 6: Cách bạn tiếp thu kiến thức
  q7: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709007/Your_paragraph_text_18_xwypbo.png`, // Câu 7: Công việc lý tưởng
  q8: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709010/Your_paragraph_text_17_fc145j.png`, // Câu 8: Loại nội dung hay xem khi lướt mạng
};

// ── Ảnh kết quả theo chuyên ngành + giới tính ───────────────
//  👉 Thêm field "logo" cho từng ngành:
//     logo: `https://drive.google.com/thumbnail?id=FILE_ID_LOGO_xxx&sz=w200`
export const ENDING_IMAGES = {
  kvtn_visinh: {
    male: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708901/3_swc1sx.png`, // 🦠 Vi sinh — Nam
    female: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708901/4_vwzmhe.png`, // 🦠 Vi sinh — Nữ
    logo: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708974/61_dxvrim.png`, // 🦠 Vi sinh — Logo (thay FILE_ID)
  },
  kvtn_kysinh: {
    male: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708901/5_hgdvsu.png`, // 🔍 Ký sinh trùng — Nam
    female: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708901/6_fpf1qd.png`, // 🔍 Ký sinh trùng — Nữ
    logo: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708974/62_vbbqrb.png`, // 🔍 Ký sinh trùng — Logo (thay FILE_ID)
  },
  kvtn_giaiphaubenh: {
    male: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708905/9_zhhh9x.png`, // 🧫 Giải phẫu bệnh — Nam
    female: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708906/10_tuf8be.png`, // 🧫 Giải phẫu bệnh — Nữ
    logo: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708974/64_vjdnoj.png`, // 🧫 Giải phẫu bệnh — Logo (thay FILE_ID)
  },
  kvtn_hoasinh: {
    male: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708905/7_a4eu7w.png`, // 🧪 Hóa sinh — Nam
    female: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708905/8_snpvge.png`, // 🧪 Hóa sinh — Nữ
    logo: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708974/63_vemy2a.png`, // 🧪 Hóa sinh — Logo (thay FILE_ID)
  },
  kvtn_huyethoc: {
    male: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708901/1_nvu7y0.png`, // 🩸 Huyết học — Nam
    female: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708901/2_ypgxe1.png`, // 🩸 Huyết học — Nữ
    logo: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708973/60_y9g5ma.png`, // 🩸 Huyết học — Logo (thay FILE_ID)
  },
  kvtn_sinhhocphanttu: {
    male: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708906/11_qscaad.png`, // 🧬 Sinh học phân tử — Nam
    female: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708906/12_pd94pp.png`, // 🧬 Sinh học phân tử — Nữ
    logo: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777708973/65_c835cy.png`, // 🧬 Sinh học phân tử — Logo (thay FILE_ID)
  },
};

// ── Gallery lộ trình học từng chuyên ngành ───────────────────
export const ENDING_GALLERY = {
  kvtn_visinh: [
    {
      src: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709117/Your_paragraph_text_10_z6zyuw.png`,
      caption: "Lộ trình học Vi sinh",
    },
    {
      src: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709117/Your_paragraph_text_11_sqt7pt.png`,
      caption: "Đặc điểm ngành Vi sinh",
    },
    {
      src: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709117/Your_paragraph_text_12_i2zx11.png`,
      caption: "Cơ hội việc làm",
    },
  ],
  kvtn_kysinh: [
    {
      src: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709118/Your_paragraph_text_13_tc0g8x.png`,
      caption: "Lộ trình học Ký sinh trùng",
    },
    {
      src: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709118/Your_paragraph_text_14_j35voy.png`,
      caption: "Đặc điểm ngành Ký sinh trùng",
    },
    {
      src: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709118/Your_paragraph_text_15_lswaez.png`,
      caption: "Cơ hội việc làm",
    },
  ],
  kvtn_giaiphaubenh: [
    {
      src: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709119/Your_paragraph_text_16_knyu2t.png`,
      caption: "Lộ trình học Giải phẫu bệnh",
    },
    {
      src: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709119/Your_paragraph_text_17_frb1ot.png`,
      caption: "Đặc điểm ngành Giải phẫu bệnh",
    },
    {
      src: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709120/Your_paragraph_text_18_vwws5b.png`,
      caption: "Cơ hội việc làm",
    },
  ],
  kvtn_hoasinh: [
    {
      src: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709120/Your_paragraph_text_19_ddbvhs.png`,
      caption: "Lộ trình học Hóa sinh",
    },
    {
      src: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709121/Your_paragraph_text_20_sia5vv.png`,
      caption: "Đặc điểm ngành Hóa sinh",
    },
    {
      src: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709121/Your_paragraph_text_21_x062bj.png`,
      caption: "Cơ hội việc làm",
    },
  ],
  kvtn_huyethoc: [
    {
      src: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709122/Your_paragraph_text_22_bfru6z.png`,
      caption: "Lộ trình học Huyết học",
    },
    {
      src: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709122/Your_paragraph_text_23_adiffr.png`,
      caption: "Đặc điểm ngành Huyết học",
    },
    {
      src: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709122/Your_paragraph_text_24_ps3zug.png`,
      caption: "Cơ hội việc làm",
    },
  ],
  kvtn_sinhhocphanttu: [
    {
      src: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709123/Your_paragraph_text_27_gc7z03.png`,
      caption: "Lộ trình học Sinh học phân tử",
    },
    {
      src: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709123/Your_paragraph_text_25_mjn31n.png`,
      caption: "Đặc điểm ngành Sinh học phân tử",
    },
    {
      src: `https://res.cloudinary.com/de5k4mw3a/image/upload/q_auto/f_auto/v1777709123/Your_paragraph_text_26_tspctf.png`,
      caption: "Cơ hội việc làm",
    },
  ],
};