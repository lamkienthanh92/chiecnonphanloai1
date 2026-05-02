import React, { useState, useEffect } from "react";

import {
  HERO_IMAGE,
  QUESTION_IMAGES,
  ENDING_IMAGES,
  ENDING_GALLERY,
} from "./images.js";

// ============================================================
//  App.js — VanLang KTVXN Quiz
//  Mobile-first. Ảnh / asset → images.js
// ============================================================

// ── Preload toàn bộ ảnh Drive ngay khi app khởi động ─────────
const preloadAllImages = () => {
  const urls = [];

  if (HERO_IMAGE) urls.push(HERO_IMAGE);

  Object.values(QUESTION_IMAGES).forEach((u) => u && urls.push(u));

  Object.values(ENDING_IMAGES).forEach(({ male, female, logo }) => {
    if (male) urls.push(male);
    if (female) urls.push(female);
    if (logo) urls.push(logo);
  });

  Object.values(ENDING_GALLERY).forEach((arr) =>
    arr.forEach(({ src }) => src && urls.push(src))
  );

  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

// ── Placeholder block dùng chung khi src = "" ────────────────
const ImgOrPlaceholder = ({ src, alt, style, placeholderStyle }) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        style={{ display: "block", width: "100%", ...style }}
      />
    );
  }
  return (
    <div
      style={{
        width: "100%",
        background: "#f0f2f5",
        border: "2px dashed #d0d5dd",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#aab",
        fontSize: "0.8em",
        letterSpacing: "0.04em",
        ...placeholderStyle,
      }}
    >
      [ ảnh ]
    </div>
  );
};

const App = () => {
  // ── Global styles ─────────────────────────────────────────
  useEffect(() => {
    preloadAllImages();

    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; }
      html { font-size: 16px; -webkit-text-size-adjust: 100%; }
      body { margin: 0; padding: 0; background: #0f2027;
             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      button { font-family: inherit; touch-action: manipulation; }
      input, textarea { font-family: inherit; }

      button, a { -webkit-tap-highlight-color: transparent; }

      .page-wrap {
        min-height: 100dvh;
        padding: env(safe-area-inset-top, 0) 0 env(safe-area-inset-bottom, 12px);
      }

      @keyframes fadeBg  { from { opacity:0 } to { opacity:1 } }
      @keyframes slideUp { from { transform:translateY(60px);opacity:0 }
                           to   { transform:translateY(0);opacity:1 } }

      .opt-btn {
        background: #fff; border: 2px solid #e4e7ec;
        border-radius: 14px; padding: 14px;
        font-size: 0.97em; line-height: 1.5;
        cursor: pointer; text-align: left;
        transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
        color: #1a1a2e; display: flex; align-items: center; gap: 12px;
        width: 100%; min-height: 52px;
      }
      .opt-btn.selected {
        border-color: #0072ff; background: #f0f6ff;
        box-shadow: 0 2px 10px rgba(0,114,255,0.12);
      }
      .opt-btn:active { transform: scale(0.985); }

      .primary-btn {
        background: linear-gradient(135deg, #00c6ff 0%, #0072ff 100%);
        color: #fff; border: none; border-radius: 14px;
        padding: 17px 24px; font-size: 1.05em; font-weight: 700;
        cursor: pointer; width: 100%;
        box-shadow: 0 6px 20px rgba(0,114,255,0.32);
        transition: opacity 0.2s, transform 0.15s;
        min-height: 54px;
      }
      .primary-btn:active { opacity: 0.88; transform: scale(0.98); }
      .primary-btn:disabled {
        background: #e4e7ec; color: #aaa;
        box-shadow: none; cursor: not-allowed;
      }

      .prog-track {
        flex: 1; height: 8px; background: #e4e7ec;
        border-radius: 8px; overflow: hidden;
      }
      .prog-fill {
        height: 100%;
        background: linear-gradient(90deg, #00c6ff, #0072ff);
        border-radius: 8px;
        transition: width 0.4s ease;
      }

      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #d0d5dd; border-radius: 4px; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // ── State ─────────────────────────────────────────────────
  const [gameState, setGameState] = useState("start");
  const [gender, setGender] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const INITIAL_SCORES = {
    kvtn_visinh: 0,
    kvtn_kysinh: 0,
    kvtn_giaiphaubenh: 0,
    kvtn_hoasinh: 0,
    kvtn_huyethoc: 0,
    kvtn_sinhhocphanttu: 0,
  };
  const INITIAL_TRAITS = {
    detail_oriented: 0,
    analytical: 0,
    curious: 0,
    patient: 0,
    systematic: 0,
    independent: 0,
    creative: 0,
    fast_paced: 0,
  };

  const [scores, setScores] = useState(INITIAL_SCORES);
  const [personalityTraits, setPersonalityTraits] = useState(INITIAL_TRAITS);

  // ── Questions ─────────────────────────────────────────────
  const questions = [
    {
      id: 1,
      qKey: "q1",
      question: "Trời mưa, không ai rủ đi đâu — bạn sẽ làm gì? 🌧️",
      multiple: true,
      options: [
        {
          text: "Mở tab mới, đọc bài viết hoặc xem video về thứ mình đang tò mò",
          scores6: {
            kvtn_visinh: 100,
            kvtn_kysinh: 78,
            kvtn_giaiphaubenh: 60,
            kvtn_hoasinh: 45,
            kvtn_huyethoc: 32,
            kvtn_sinhhocphanttu: 20,
          },
          traits: { curious: 2, independent: 2, analytical: 1 },
        },
        {
          text: "Dọn phòng, sắp xếp lại đồ đạc — làm xong thấy cực kỳ thoải mái",
          scores6: {
            kvtn_kysinh: 100,
            kvtn_giaiphaubenh: 78,
            kvtn_hoasinh: 60,
            kvtn_huyethoc: 45,
            kvtn_sinhhocphanttu: 32,
            kvtn_visinh: 20,
          },
          traits: { detail_oriented: 3, patient: 2, systematic: 2 },
        },
        {
          text: "Thử làm gì đó bằng tay — pha chế, lắp ráp, mày mò một mình",
          scores6: {
            kvtn_giaiphaubenh: 100,
            kvtn_hoasinh: 78,
            kvtn_huyethoc: 60,
            kvtn_sinhhocphanttu: 45,
            kvtn_visinh: 32,
            kvtn_kysinh: 20,
          },
          traits: { curious: 2, creative: 2, analytical: 1 },
        },
        {
          text: "Ra ban công nhìn mưa, quan sát kiến bò, cây cối, côn trùng",
          scores6: {
            kvtn_hoasinh: 100,
            kvtn_huyethoc: 78,
            kvtn_sinhhocphanttu: 60,
            kvtn_visinh: 45,
            kvtn_kysinh: 32,
            kvtn_giaiphaubenh: 20,
          },
          traits: { curious: 3, patient: 2, detail_oriented: 1 },
        },
        {
          text: "Nằm sofa bật phim, hoàn toàn không làm gì — recharge đi đã",
          scores6: {
            kvtn_huyethoc: 100,
            kvtn_sinhhocphanttu: 78,
            kvtn_visinh: 60,
            kvtn_kysinh: 45,
            kvtn_giaiphaubenh: 32,
            kvtn_hoasinh: 20,
          },
          traits: { patient: 2, independent: 2, fast_paced: 1 },
        },
      ],
    },
    {
      id: 2,
      qKey: "q2",
      question: "Khi làm bài tập nhóm, bạn thường đóng vai nào? 📚",
      multiple: true,
      options: [
        {
          text: "Người gom số liệu, ngồi phân tích rồi đưa ra kết luận cuối",
          scores6: {
            kvtn_sinhhocphanttu: 100,
            kvtn_visinh: 78,
            kvtn_kysinh: 60,
            kvtn_giaiphaubenh: 45,
            kvtn_hoasinh: 32,
            kvtn_huyethoc: 20,
          },
          traits: { analytical: 3, systematic: 2, detail_oriented: 1 },
        },
        {
          text: "Người ngồi một góc, ít nói nhưng làm phần của mình rất kỹ",
          scores6: {
            kvtn_visinh: 100,
            kvtn_giaiphaubenh: 78,
            kvtn_hoasinh: 60,
            kvtn_huyethoc: 45,
            kvtn_sinhhocphanttu: 32,
            kvtn_kysinh: 20,
          },
          traits: { independent: 3, detail_oriented: 3, patient: 2 },
        },
        {
          text: "Người hay đề xuất cách làm mới, thích thử phương án khác",
          scores6: {
            kvtn_kysinh: 100,
            kvtn_hoasinh: 78,
            kvtn_huyethoc: 60,
            kvtn_sinhhocphanttu: 45,
            kvtn_visinh: 32,
            kvtn_giaiphaubenh: 20,
          },
          traits: { creative: 3, curious: 3, independent: 2 },
        },
        {
          text: "Người review lại cuối — kiểm tra từng dòng xem có lỗi không",
          scores6: {
            kvtn_giaiphaubenh: 100,
            kvtn_huyethoc: 78,
            kvtn_sinhhocphanttu: 60,
            kvtn_visinh: 45,
            kvtn_kysinh: 32,
            kvtn_hoasinh: 20,
          },
          traits: { detail_oriented: 4, systematic: 2, patient: 2 },
        },
      ],
    },
    {
      id: 3,
      qKey: "q3",
      question: "Khoảnh khắc nào khiến bạn thấy mình đang sống nhất? 🌟",
      multiple: true,
      options: [
        {
          text: "Khi hoàn thành việc gì đó mà biết chắc không sai chỗ nào",
          scores6: {
            kvtn_hoasinh: 100,
            kvtn_visinh: 78,
            kvtn_kysinh: 60,
            kvtn_giaiphaubenh: 45,
            kvtn_huyethoc: 32,
            kvtn_sinhhocphanttu: 20,
          },
          traits: { detail_oriented: 3, systematic: 2, patient: 1 },
        },
        {
          text: "Khi tình cờ phát hiện ra điều gì đó mà chưa ai để ý",
          scores6: {
            kvtn_huyethoc: 100,
            kvtn_kysinh: 78,
            kvtn_giaiphaubenh: 60,
            kvtn_hoasinh: 45,
            kvtn_sinhhocphanttu: 32,
            kvtn_visinh: 20,
          },
          traits: { curious: 3, creative: 2, independent: 2 },
        },
        {
          text: "Khi vật lộn với bài khó, cuối cùng tìm ra chỗ mắc kẹt",
          scores6: {
            kvtn_sinhhocphanttu: 100,
            kvtn_giaiphaubenh: 78,
            kvtn_hoasinh: 60,
            kvtn_huyethoc: 45,
            kvtn_visinh: 32,
            kvtn_kysinh: 20,
          },
          traits: { analytical: 3, curious: 2, systematic: 1 },
        },
        {
          text: "Khi nhìn thấy rõ thứ gì đó mà mắt thường không thể thấy",
          scores6: {
            kvtn_visinh: 100,
            kvtn_huyethoc: 78,
            kvtn_sinhhocphanttu: 60,
            kvtn_kysinh: 45,
            kvtn_giaiphaubenh: 32,
            kvtn_hoasinh: 20,
          },
          traits: { curious: 2, detail_oriented: 3, patient: 2 },
        },
        {
          text: "Khi có con số, báo cáo rõ ràng trên tay — biết chính xác đang xảy ra gì",
          scores6: {
            kvtn_kysinh: 100,
            kvtn_sinhhocphanttu: 78,
            kvtn_visinh: 60,
            kvtn_giaiphaubenh: 45,
            kvtn_hoasinh: 32,
            kvtn_huyethoc: 20,
          },
          traits: { systematic: 2, detail_oriented: 2, analytical: 2 },
        },
      ],
    },
    {
      id: 4,
      qKey: "q4",
      question: "Điều nào dưới đây khiến bạn mất hứng nhất? 😤",
      multiple: true,
      options: [
        {
          text: "Bị thúc làm gấp khi chưa kịp chuẩn bị — kết quả kiểu gì cũng tệ",
          scores6: {
            kvtn_giaiphaubenh: 100,
            kvtn_visinh: 78,
            kvtn_kysinh: 60,
            kvtn_hoasinh: 45,
            kvtn_huyethoc: 32,
            kvtn_sinhhocphanttu: 20,
          },
          traits: { detail_oriented: 2, patient: 3, systematic: 2 },
        },
        {
          text: "Việc cứ lặp đi lặp lại mãi, không có gì mới để học hỏi",
          scores6: {
            kvtn_hoasinh: 100,
            kvtn_kysinh: 78,
            kvtn_giaiphaubenh: 60,
            kvtn_huyethoc: 45,
            kvtn_sinhhocphanttu: 32,
            kvtn_visinh: 20,
          },
          traits: { curious: 3, creative: 3, fast_paced: 2 },
        },
        {
          text: "Bị ép phải chốt ngay khi chưa hiểu rõ đủ thông tin",
          scores6: {
            kvtn_huyethoc: 100,
            kvtn_giaiphaubenh: 78,
            kvtn_hoasinh: 60,
            kvtn_sinhhocphanttu: 45,
            kvtn_visinh: 32,
            kvtn_kysinh: 20,
          },
          traits: { patient: 3, analytical: 2, systematic: 1 },
        },
        {
          text: "Dụng cụ cùi, thiếu thiết bị — làm gì cũng không ra hồn",
          scores6: {
            kvtn_sinhhocphanttu: 100,
            kvtn_hoasinh: 78,
            kvtn_huyethoc: 60,
            kvtn_visinh: 45,
            kvtn_kysinh: 32,
            kvtn_giaiphaubenh: 20,
          },
          traits: {
            systematic: 2,
            analytical: 2,
            fast_paced: 2,
            independent: 2,
          },
        },
      ],
    },
    {
      id: 5,
      qKey: "q5",
      question: "Trong phim hoặc game, bạn ấn tượng nhất kiểu nhân vật nào? 🎮",
      multiple: true,
      options: [
        {
          text: "Thám tử — nhặt từng manh mối nhỏ, suy luận ra toàn bộ sự thật",
          scores6: {
            kvtn_visinh: 100,
            kvtn_kysinh: 78,
            kvtn_giaiphaubenh: 60,
            kvtn_hoasinh: 45,
            kvtn_huyethoc: 32,
            kvtn_sinhhocphanttu: 20,
          },
          traits: { detail_oriented: 3, analytical: 3, curious: 2 },
        },
        {
          text: "Nhà phát minh — một mình ngồi tạo ra thứ chưa ai nghĩ tới",
          scores6: {
            kvtn_kysinh: 100,
            kvtn_giaiphaubenh: 78,
            kvtn_hoasinh: 60,
            kvtn_huyethoc: 45,
            kvtn_sinhhocphanttu: 32,
            kvtn_visinh: 20,
          },
          traits: { curious: 3, analytical: 2, independent: 2 },
        },
        {
          text: "Chuyên gia kỹ thuật — làm chủ hệ thống phức tạp, ai hỏi gì cũng biết",
          scores6: {
            kvtn_giaiphaubenh: 100,
            kvtn_hoasinh: 78,
            kvtn_huyethoc: 60,
            kvtn_sinhhocphanttu: 45,
            kvtn_visinh: 32,
            kvtn_kysinh: 20,
          },
          traits: { systematic: 3, analytical: 2, fast_paced: 2 },
        },
        {
          text: "Nhà thám hiểm — đặt chân vào vùng chưa có bản đồ, khám phá sinh vật lạ",
          scores6: {
            kvtn_hoasinh: 100,
            kvtn_huyethoc: 78,
            kvtn_sinhhocphanttu: 60,
            kvtn_visinh: 45,
            kvtn_kysinh: 32,
            kvtn_giaiphaubenh: 20,
          },
          traits: { curious: 3, patient: 3, independent: 2 },
        },
      ],
    },
    {
      id: 6,
      qKey: "q6",
      question: "Câu nào mô tả đúng nhất cách bạn tiếp thu kiến thức? 📖",
      multiple: true,
      options: [
        {
          text: "Thích hiểu tại sao một thứ nhỏ xíu lại quyết định cả hệ thống lớn",
          scores6: {
            kvtn_huyethoc: 100,
            kvtn_visinh: 78,
            kvtn_kysinh: 60,
            kvtn_giaiphaubenh: 45,
            kvtn_hoasinh: 32,
            kvtn_sinhhocphanttu: 20,
          },
          traits: { curious: 2, analytical: 1, patient: 2 },
        },
        {
          text: "Thích những thứ kết hợp với nhau — thay đổi một chút là ra kết quả khác",
          scores6: {
            kvtn_sinhhocphanttu: 100,
            kvtn_kysinh: 78,
            kvtn_giaiphaubenh: 60,
            kvtn_hoasinh: 45,
            kvtn_huyethoc: 32,
            kvtn_visinh: 20,
          },
          traits: { analytical: 2, systematic: 2, creative: 2 },
        },
        {
          text: "Thích biết cái này hoạt động như thế nào, cơ chế bên trong là gì",
          scores6: {
            kvtn_visinh: 100,
            kvtn_hoasinh: 78,
            kvtn_huyethoc: 60,
            kvtn_sinhhocphanttu: 45,
            kvtn_kysinh: 32,
            kvtn_giaiphaubenh: 20,
          },
          traits: { analytical: 2, systematic: 2, fast_paced: 2 },
        },
        {
          text: "Thích nhìn tổng thể trước — hiểu cấu trúc rồi mới đi vào chi tiết",
          scores6: {
            kvtn_kysinh: 100,
            kvtn_huyethoc: 78,
            kvtn_sinhhocphanttu: 60,
            kvtn_visinh: 45,
            kvtn_giaiphaubenh: 32,
            kvtn_hoasinh: 20,
          },
          traits: { detail_oriented: 2, patient: 2, curious: 2 },
        },
        {
          text: 'Hay tự hỏi "nếu đổi biến này thì sao?" rồi tự đi tìm đáp án',
          scores6: {
            kvtn_giaiphaubenh: 100,
            kvtn_sinhhocphanttu: 78,
            kvtn_visinh: 60,
            kvtn_kysinh: 45,
            kvtn_hoasinh: 32,
            kvtn_huyethoc: 20,
          },
          traits: { analytical: 2, systematic: 2, creative: 2, independent: 2 },
        },
      ],
    },
    {
      id: 7,
      qKey: "q7",
      question: "Công việc lý tưởng của bạn trông như thế nào? 💼",
      multiple: true,
      options: [
        {
          text: "Có quy trình rõ ràng — làm sai một bước là biết ngay, sửa được ngay",
          scores6: {
            kvtn_hoasinh: 100,
            kvtn_visinh: 78,
            kvtn_kysinh: 60,
            kvtn_giaiphaubenh: 45,
            kvtn_huyethoc: 32,
            kvtn_sinhhocphanttu: 20,
          },
          traits: { systematic: 3, detail_oriented: 3, patient: 2 },
        },
        {
          text: "Kết quả mình làm ra ảnh hưởng đến quyết định quan trọng của người khác",
          scores6: {
            kvtn_huyethoc: 100,
            kvtn_kysinh: 78,
            kvtn_giaiphaubenh: 60,
            kvtn_hoasinh: 45,
            kvtn_sinhhocphanttu: 32,
            kvtn_visinh: 20,
          },
          traits: { systematic: 2, detail_oriented: 2, fast_paced: 2 },
        },
        {
          text: "Không bao giờ bí — luôn có câu hỏi mới chờ mình khám phá",
          scores6: {
            kvtn_sinhhocphanttu: 100,
            kvtn_giaiphaubenh: 78,
            kvtn_hoasinh: 60,
            kvtn_huyethoc: 45,
            kvtn_visinh: 32,
            kvtn_kysinh: 20,
          },
          traits: { curious: 3, analytical: 2, independent: 3 },
        },
        {
          text: "Nhìn thấy kết quả cụ thể ngay trong ngày — không phải chờ lâu",
          scores6: {
            kvtn_visinh: 100,
            kvtn_huyethoc: 78,
            kvtn_sinhhocphanttu: 60,
            kvtn_kysinh: 45,
            kvtn_giaiphaubenh: 32,
            kvtn_hoasinh: 20,
          },
          traits: { fast_paced: 3, systematic: 2, detail_oriented: 2 },
        },
        {
          text: "Đối mặt với thứ chưa ai hiểu rõ — mỗi ngày là một bí ẩn mới",
          scores6: {
            kvtn_kysinh: 100,
            kvtn_sinhhocphanttu: 78,
            kvtn_visinh: 60,
            kvtn_giaiphaubenh: 45,
            kvtn_hoasinh: 32,
            kvtn_huyethoc: 20,
          },
          traits: { curious: 3, detail_oriented: 2, patient: 2 },
        },
      ],
    },
    {
      id: 8,
      qKey: "q8",
      question: "Bạn hay xem loại nội dung nào khi lướt mạng? 🎥",
      multiple: true,
      options: [
        {
          text: 'Video hoặc podcast kiểu "phá án" — lần theo từng dữ kiện để tìm thủ phạm',
          scores6: {
            kvtn_giaiphaubenh: 100,
            kvtn_visinh: 78,
            kvtn_kysinh: 60,
            kvtn_hoasinh: 45,
            kvtn_huyethoc: 32,
            kvtn_sinhhocphanttu: 20,
          },
          traits: { analytical: 2, curious: 2, detail_oriented: 2 },
        },
        {
          text: "Clip về tương lai — công nghệ chưa ai tưởng tượng được",
          scores6: {
            kvtn_hoasinh: 100,
            kvtn_kysinh: 78,
            kvtn_giaiphaubenh: 60,
            kvtn_huyethoc: 45,
            kvtn_sinhhocphanttu: 32,
            kvtn_visinh: 20,
          },
          traits: { curious: 3, creative: 3, independent: 2 },
        },
        {
          text: "Phim tài liệu về thế giới tự nhiên — con vật lạ, hệ sinh thái kỳ bí",
          scores6: {
            kvtn_huyethoc: 100,
            kvtn_giaiphaubenh: 78,
            kvtn_hoasinh: 60,
            kvtn_sinhhocphanttu: 45,
            kvtn_visinh: 32,
            kvtn_kysinh: 20,
          },
          traits: { curious: 2, patient: 2, detail_oriented: 2 },
        },
        {
          text: "Video behind-the-scenes trong lab, nhà máy — xem người ta làm việc thật",
          scores6: {
            kvtn_sinhhocphanttu: 100,
            kvtn_hoasinh: 78,
            kvtn_huyethoc: 60,
            kvtn_visinh: 45,
            kvtn_kysinh: 32,
            kvtn_giaiphaubenh: 20,
          },
          traits: { analytical: 2, curious: 2, systematic: 2 },
        },
        {
          text: "Nội dung nhanh, nhiều ý — cần kịch tính và tốc độ, không thích chậm",
          scores6: {
            kvtn_visinh: 100,
            kvtn_sinhhocphanttu: 78,
            kvtn_kysinh: 60,
            kvtn_giaiphaubenh: 45,
            kvtn_hoasinh: 32,
            kvtn_huyethoc: 20,
          },
          traits: { fast_paced: 4, independent: 2 },
        },
      ],
    },
  ];

  // ── Endings ───────────────────────────────────────────────
  const endings = {
    kvtn_visinh: {
      title: "Kỹ thuật viên Vi sinh 🦠",
      description:
        "Bạn phù hợp làm kỹ thuật viên xét nghiệm vi sinh, chuyên phát hiện vi khuẩn và virus gây bệnh. Công việc đòi hỏi sự tỉ mỉ và kiến thức sâu về vi sinh vật học.",
      career: "Kỹ thuật viên xét nghiệm",
      specialty: "Vi sinh",
      vanLangValue:
        "Tại Văn Lang, bạn học chuỗi 3 học phần Vi sinh: Vi sinh Y học đại cương → Vi sinh vật gây bệnh → Quy trình Vi sinh lâm sàng, kết hợp học phần Thực hành bệnh viện – Kỹ thuật Vi sinh – Ký sinh trùng tại cơ sở y tế thực tế. Khu Kỹ thuật Xét nghiệm Y học với 15+ phòng lab chức năng, áp dụng phương pháp Learning by Doing từ năm nhất. Đội ngũ giảng viên Thạc sĩ, Tiến sĩ có kinh nghiệm lâm sàng sẽ đồng hành sát sao cùng bạn. Sau tốt nghiệp, 93% sinh viên có việc làm trong vòng 1 năm tại bệnh viện, phòng khám hoặc trung tâm kiểm soát bệnh tật.",
    },
    kvtn_kysinh: {
      title: "Kỹ thuật viên Ký sinh trùng 🔍",
      description:
        "Bạn có khả năng phát hiện và nhận dạng các loại ký sinh trùng gây bệnh. Óc quan sát tinh tường và sự kiên nhẫn của bạn rất phù hợp với công việc này.",
      career: "Kỹ thuật viên xét nghiệm",
      specialty: "Ký sinh trùng",
      vanLangValue:
        "Tại Văn Lang, bạn học chuỗi 3 học phần Ký sinh trùng: Giun sán và đơn bào → Tiết túc y học → Vi nấm y học, kết hợp Thực hành bệnh viện – Kỹ thuật Vi sinh – Ký sinh trùng. Chương trình tích hợp học qua tình huống lâm sàng và mô phỏng thực tế, giúp bạn nhận diện ký sinh trùng gây bệnh ngay từ năm 2. Hệ sinh thái học tập với 15+ phòng lab hiện đại và đội ngũ chuyên gia đầu ngành đồng hành. Cơ hội nghề nghiệp rộng mở tại các bệnh viện, viện nghiên cứu và trung tâm kiểm chuẩn chất lượng xét nghiệm.",
    },
    kvtn_giaiphaubenh: {
      title: "Kỹ thuật viên Giải phẫu bệnh 🧫",
      description:
        "Bạn thích tìm ra câu trả lời từ những manh mối nhỏ nhặt và có khả năng nhận diện pattern tốt. Công việc nghiên cứu mô bệnh học, phát hiện bệnh qua quan sát tế bào là lý tưởng cho bạn.",
      career: "Kỹ thuật viên xét nghiệm",
      specialty: "Giải phẫu bệnh",
      vanLangValue:
        "Tại Văn Lang, bạn học chuỗi 2 học phần chuyên sâu: Kỹ thuật Giải phẫu bệnh – Tế bào học 1 và 2, kết hợp các học phần Mô phôi và Sinh lý bệnh – Miễn dịch từ năm đầu. Chương trình chú trọng đọc tiêu bản và phân tích tế bào bệnh học qua hệ thống kính hiển vi số hiện đại tại khu lab chuyên dụng. Sinh viên được thực hành tích hợp công nghệ thông minh trong phân tích dữ liệu y tế. Triển vọng nghề nghiệp đa dạng: kỹ thuật viên xét nghiệm tế bào học, chuyên viên kiểm định và phân tích y sinh, nghiên cứu viên dự án y học.",
    },
    kvtn_hoasinh: {
      title: "Kỹ thuật viên Hóa sinh 🧪",
      description:
        "Bạn giỏi phân tích các chỉ số hóa sinh trong máu và dịch cơ thể. Khả năng làm việc với máy móc hiện đại và xử lý dữ liệu số là điểm mạnh của bạn.",
      career: "Kỹ thuật viên xét nghiệm",
      specialty: "Hóa sinh",
      vanLangValue:
        "Tại Văn Lang, bạn học chuỗi 3 học phần Hóa sinh: Hóa sinh cơ sở → Hóa sinh lâm sàng → Hóa sinh chuyên đề, kết hợp Thực hành bệnh viện – Kỹ thuật xét nghiệm Hóa sinh. Nền tảng từ học phần Hóa phân tích và Vật lý – Lý sinh được áp dụng thực tế ngay vào phân tích chỉ số máu và dịch cơ thể. Chương trình sử dụng công nghệ tự động hóa và AI trong xét nghiệm y học. Sau tốt nghiệp, bạn có thể làm kỹ thuật viên xét nghiệm, chuyên viên xét nghiệm công nghệ cao hoặc điều phối viên phòng lab.",
    },
    kvtn_huyethoc: {
      title: "Kỹ thuật viên Huyết học 🩸",
      description:
        "Bạn chuyên về xét nghiệm máu, phát hiện các bệnh lý về máu. Khả năng làm việc nhanh nhưng vẫn đảm bảo độ chính xác cao là thế mạnh nổi bật của bạn.",
      career: "Kỹ thuật viên xét nghiệm",
      specialty: "Huyết học",
      vanLangValue:
        "Tại Văn Lang, bạn học chuỗi học phần Huyết học toàn diện: Huyết học cơ sở → Huyết học tế bào → Huyết học đông máu → Huyết học truyền máu, kết hợp Thực hành bệnh viện – Kỹ thuật xét nghiệm Huyết học. Chương trình tích hợp công nghệ phân tích máu tự động và hệ thống quản lý chất lượng xét nghiệm đạt chuẩn. Học tăng cường với chuyên gia xử lý các tình huống cấp cứu huyết học gắn với thực tiễn. Cơ hội nghề nghiệp rộng mở: kỹ thuật viên huyết học – truyền máu, chuyên viên sàng lọc di truyền, quản lý phòng phân tích.",
    },
    kvtn_sinhhocphanttu: {
      title: "Kỹ thuật viên Sinh học phân tử 🧬",
      description:
        "Bạn phù hợp với công nghệ cao, nghiên cứu gen và DNA. Tính tò mò và niềm đam mê khám phá điều mới mẻ là đặc điểm nổi bật của bạn trong lĩnh vực tiên tiến này.",
      career: "Kỹ thuật viên xét nghiệm",
      specialty: "Sinh học phân tử",
      vanLangValue:
        "Tại Văn Lang, bạn học học phần Y sinh học phân tử và Sinh học phân tử chuyên sâu – một trong những lĩnh vực mũi nhọn của chương trình – ứng dụng công nghệ tự động hóa và trí tuệ nhân tạo trong xét nghiệm y học. Sinh viên được tiếp cận sớm các kỹ thuật hiện đại như PCR, giải trình tự gen, phân tích dữ liệu lớn y tế. Chương trình định hướng đào tạo nhân lực tham gia dự án nghiên cứu tế bào học, dịch tễ học và phát triển thiết bị chuyên khoa. Sau tốt nghiệp, bạn có thể tiếp tục học CKI, Thạc sĩ, Tiến sĩ hoặc làm nghiên cứu viên tại viện, trung tâm y học tiên tiến.",
    },
  };

  // ── Score helpers ─────────────────────────────────────────
  const calculateEnding = () => {
    let maxScore = -1,
      selected = "kvtn_visinh";
    Object.keys(scores).forEach((k) => {
      if (scores[k] > maxScore) {
        maxScore = scores[k];
        selected = k;
      }
    });
    return selected;
  };

  const generateDynamicInsight = () => {
    const sorted = Object.entries(personalityTraits)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .filter(([, v]) => v > 0);
    if (!sorted.length)
      return "Bạn có phong cách làm việc linh hoạt, dễ dàng thích nghi với nhiều môi trường khác nhau.";
    const desc = {
      detail_oriented:
        "Bạn có khả năng chú ý đến những chi tiết nhỏ nhất – điều cực kỳ quan trọng trong xét nghiệm",
      analytical:
        "Tư duy phân tích giúp bạn hiểu rõ bản chất của từng kết quả xét nghiệm",
      curious:
        "Sự tò mò thôi thúc bạn không ngừng học hỏi và khám phá điều mới trong y học",
      patient:
        "Sự kiên nhẫn giúp bạn hoàn thành tốt những quy trình cần nhiều thời gian và tỉ mỉ",
      systematic:
        "Bạn thích làm việc theo quy trình có hệ thống, đảm bảo chất lượng nhất quán",
      independent:
        "Bạn có khả năng làm việc độc lập và tự giải quyết vấn đề rất tốt",
      creative:
        "Tư duy sáng tạo giúp bạn tìm ra những giải pháp mới trong nghiên cứu",
      fast_paced:
        "Bạn làm việc hiệu quả trong môi trường năng động, xử lý nhiều mẫu cùng lúc",
    };
    const parts = sorted.map(([k]) => desc[k]).filter(Boolean);
    if (parts.length === 1) return parts[0] + ".";
    if (parts.length === 2) return parts[0] + ". " + parts[1] + ".";
    return (
      parts[0] +
      ", đồng thời " +
      parts[1][0].toLowerCase() +
      parts[1].slice(1) +
      ". " +
      parts[2] +
      "."
    );
  };

  // ── Handlers ──────────────────────────────────────────────
  const handleAnswer = (idx, isMultiple) => {
    if (isMultiple) {
      setSelectedAnswers((prev) =>
        prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
      );
    } else {
      applyAnswers([idx]);
    }
  };

  const applyAnswers = (indices) => {
    const newScores = { ...scores };
    const newTraits = { ...personalityTraits };
    indices.forEach((idx) => {
      const opt = questions[currentQuestion].options[idx];
      Object.keys(opt.scores6).forEach((k) => {
        if (k in newScores) newScores[k] += opt.scores6[k];
      });
      if (opt.traits)
        Object.keys(opt.traits).forEach((k) => {
          if (k in newTraits) newTraits[k] += opt.traits[k];
        });
    });
    setScores(newScores);
    setPersonalityTraits(newTraits);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((q) => q + 1);
        setSelectedAnswers([]);
      } else {
        setCurrentQuestion(0);
        setGameState("result");
      }
    }, 280);
  };

  const confirmMultiple = () => {
    if (selectedAnswers.length > 0) applyAnswers(selectedAnswers);
  };

  const resetQuiz = () => {
    setGameState("start");
    setGender("");
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setGalleryIndex(0);
    setScores(INITIAL_SCORES);
    setPersonalityTraits(INITIAL_TRAITS);
  };

  // ── Shared layout ─────────────────────────────────────────
  const PageWrap = ({ children }) => (
    <div
      className="page-wrap"
      style={{
        background:
          "linear-gradient(160deg,#0f2027 0%,#203a43 55%,#2c5364 100%)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "12px 12px 24px",
      }}
    >
      {children}
    </div>
  );

  const Card = ({ children, style }) => (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "20px 16px",
        maxWidth: 520,
        width: "100%",
        boxShadow: "0 16px 48px rgba(0,0,0,0.38)",
        marginTop: 6,
        ...style,
      }}
    >
      {children}
    </div>
  );

  const GradText = ({ children, style }) => (
    <span
      style={{
        background: "linear-gradient(135deg,#00c6ff,#0072ff)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: 800,
        ...style,
      }}
    >
      {children}
    </span>
  );

  // ── START ─────────────────────────────────────────────────
  const renderStart = () => (
    <PageWrap>
      <Card>
        <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 18 }}>
          <ImgOrPlaceholder
            src={HERO_IMAGE}
            alt="Hero"
            style={{ borderRadius: 14, height: "auto" }}
            placeholderStyle={{ height: 120, borderRadius: 14 }}
          />
        </div>

        <h1
          style={{
            fontSize: "1.75em",
            margin: "0 0 10px",
            lineHeight: 1.25,
            textAlign: "center",
          }}
        >
          <GradText>Khám phá ngành KTVXN</GradText>
        </h1>
        <p
          style={{
            fontSize: "0.97em",
            color: "#555",
            marginBottom: 18,
            lineHeight: 1.7,
            textAlign: "center",
          }}
        >
          Cùng <strong>Đại học Văn Lang</strong> tìm chuyên ngành{" "}
          <strong>Kỹ thuật Xét nghiệm Y học</strong> (mã ngành 7720601) phù hợp
          nhất với bạn!
        </p>

        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {[
            ["15+", "Phòng lab"],
            ["93%", "Có việc làm"],
            ["1500+", "Sinh viên"],
          ].map(([num, lbl]) => (
            <div
              key={lbl}
              style={{
                flex: 1,
                textAlign: "center",
                background: "#f0f6ff",
                borderRadius: 12,
                padding: "12px 8px",
              }}
            >
              <div
                style={{ fontSize: "1.4em", fontWeight: 800, color: "#0072ff" }}
              >
                {num}
              </div>
              <div style={{ fontSize: "0.72em", color: "#666", marginTop: 2 }}>
                {lbl}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          {[
            "🦠 Vi sinh",
            "🔍 Ký sinh trùng",
            "🧫 Giải phẫu bệnh",
            "🧪 Hóa sinh",
            "🩸 Huyết học",
            "🧬 Sinh học phân tử",
          ].map((n) => (
            <span
              key={n}
              style={{
                background: "#f0f6ff",
                color: "#0072ff",
                borderRadius: 20,
                padding: "5px 12px",
                fontSize: "0.82em",
                fontWeight: 600,
              }}
            >
              {n}
            </span>
          ))}
        </div>

        <button className="primary-btn" onClick={() => setGameState("gender")}>
          Bắt đầu ngay! 🚀
        </button>
      </Card>
    </PageWrap>
  );

  // ── GENDER ────────────────────────────────────────────────
  const renderGender = () => (
    <PageWrap>
      <Card style={{ textAlign: "center" }}>
        <div style={{ fontSize: "2.4em", marginBottom: 6 }}>👤</div>
        <h2 style={{ fontSize: "1.6em", margin: "0 0 8px", color: "#111" }}>
          Bạn là...?
        </h2>
        <p style={{ color: "#888", marginBottom: 28, fontSize: "0.97em" }}>
          Để hiển thị hình ảnh phù hợp ở kết quả
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          {[
            {
              g: "male",
              emoji: "👨",
              label: "Nam",
              bg: "#1565C0",
              shadow: "rgba(21,101,192,0.38)",
            },
            {
              g: "female",
              emoji: "👩",
              label: "Nữ",
              bg: "#C2185B",
              shadow: "rgba(194,24,91,0.38)",
            },
          ].map(({ g, emoji, label, bg, shadow }) => (
            <button
              key={g}
              onClick={() => {
                setGender(g);
                setGameState("quiz");
              }}
              style={{
                background: bg,
                color: "#fff",
                border: "none",
                borderRadius: 18,
                padding: "24px 28px",
                fontSize: "1.4em",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: `0 8px 24px ${shadow}`,
                flex: 1,
                maxWidth: 150,
                minHeight: 110,
              }}
            >
              {emoji}
              <br />
              <span style={{ fontSize: "0.68em" }}>{label}</span>
            </button>
          ))}
        </div>
      </Card>
    </PageWrap>
  );

  // ── QUIZ ──────────────────────────────────────────────────
  const renderQuiz = () => {
    const q = questions[currentQuestion];
    if (!q) return null;
    const pct = ((currentQuestion + 1) / questions.length) * 100;
    const qImg = QUESTION_IMAGES[q.qKey];

    return (
      <PageWrap>
        <Card>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 18,
            }}
          >
            <div className="prog-track">
              <div className="prog-fill" style={{ width: `${pct}%` }} />
            </div>
            <span
              style={{
                color: "#0072ff",
                fontSize: "0.88em",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>

          {qImg ? (
            <div
              style={{ borderRadius: 12, overflow: "hidden", marginBottom: 14 }}
            >
              <img
                src={qImg}
                alt=""
                style={{ width: "100%", display: "block", height: "auto" }}
              />
            </div>
          ) : (
            <div
              style={{
                borderRadius: 12,
                border: "2px dashed #d0d5dd",
                background: "#f7f8fa",
                height: 90,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#bbb",
                fontSize: "0.8em",
                marginBottom: 14,
              }}
            >
              [ ảnh câu hỏi {currentQuestion + 1} ]
            </div>
          )}

          <h3
            style={{
              fontSize: "1.25em",
              color: "#111",
              textAlign: "center",
              lineHeight: 1.45,
              margin: "0 0 6px",
              fontWeight: 800,
            }}
          >
            {q.question}
          </h3>

          {q.multiple && (
            <p
              style={{
                textAlign: "center",
                color: "#888",
                fontSize: "0.86em",
                margin: "0 0 16px",
              }}
            >
              💡 Chọn tất cả đáp án phù hợp với bạn
            </p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {q.options.map((opt, i) => {
              const sel = selectedAnswers.includes(i);
              return (
                <button
                  key={i}
                  className={`opt-btn${sel ? " selected" : ""}`}
                  onClick={() => handleAnswer(i, q.multiple)}
                >
                  {q.multiple && (
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 6,
                        flexShrink: 0,
                        border: `2.5px solid ${sel ? "#0072ff" : "#d0d5dd"}`,
                        background: sel ? "#0072ff" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {sel && (
                        <span
                          style={{
                            color: "#fff",
                            fontSize: "0.85em",
                            fontWeight: 700,
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </span>
                  )}
                  <span style={{ lineHeight: 1.45 }}>{opt.text}</span>
                </button>
              );
            })}
          </div>

          {q.multiple && (
            <button
              className="primary-btn"
              style={{ marginTop: 18 }}
              onClick={confirmMultiple}
              disabled={selectedAnswers.length === 0}
            >
              {selectedAnswers.length > 0
                ? `Tiếp tục (đã chọn ${selectedAnswers.length}) →`
                : "Chọn ít nhất 1 đáp án"}
            </button>
          )}
        </Card>
      </PageWrap>
    );
  };

  // ── RESULT ────────────────────────────────────────────────
  const renderResult = () => {
    const key = calculateEnding();
    const e = endings[key];
    const img =
      ENDING_IMAGES[key]?.[gender === "male" ? "male" : "female"] || "";
    const logoSrc = ENDING_IMAGES[key]?.logo || "";
    const gallery = ENDING_GALLERY[key] || [];

    const totalTrait = Object.values(personalityTraits).reduce(
      (s, v) => s + v,
      0
    );
    const traitList = Object.entries(personalityTraits)
      .map(([k, v]) => ({
        k,
        v,
        pct: totalTrait > 0 ? (v / totalTrait) * 100 : 0,
      }))
      .sort((a, b) => b.v - a.v);

    const traitNames = {
      detail_oriented: "Chú ý chi tiết",
      analytical: "Phân tích",
      curious: "Tò mò",
      patient: "Kiên nhẫn",
      systematic: "Có hệ thống",
      independent: "Độc lập",
      creative: "Sáng tạo",
      fast_paced: "Nhanh nhẹn",
    };
    const traitIcons = {
      detail_oriented: "🔎",
      analytical: "📊",
      curious: "💡",
      patient: "⏳",
      systematic: "📋",
      independent: "🦅",
      creative: "🎨",
      fast_paced: "⚡",
    };
    const traitColors = {
      detail_oriented: "#9B59B6",
      analytical: "#3F51B5",
      curious: "#FF9800",
      patient: "#00BCD4",
      systematic: "#795548",
      independent: "#607D8B",
      creative: "#E91E63",
      fast_paced: "#FF5722",
    };

    return (
      <div
        style={{
          background:
            "linear-gradient(160deg,#0f2027 0%,#203a43 55%,#2c5364 100%)",
          minHeight: "100dvh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "12px 12px 28px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "20px 16px",
              maxWidth: 520,
              width: "100%",
              boxShadow: "0 16px 48px rgba(0,0,0,0.38)",
              marginTop: 6,
            }}
          >
            <h2
              style={{
                fontSize: "1.55em",
                textAlign: "center",
                margin: "0 0 16px",
                lineHeight: 1.25,
              }}
            >
              <GradText>🎉 Kết quả dành cho bạn!</GradText>
            </h2>

            {/* ── Ảnh kết quả ── */}
            <div
              style={{
                borderRadius: 14,
                overflow: "hidden",
                margin: "0 0 0",
                boxShadow: "0 4px 20px rgba(0,0,0,0.13)",
                position: "relative",
              }}
            >
              <ImgOrPlaceholder
                src={img}
                alt={e.title}
                style={{ borderRadius: 14, height: "auto", width: "100%" }}
                placeholderStyle={{ height: 140, borderRadius: 14 }}
              />
            </div>

            {/* ── Logo ngành — nổi lên dưới ảnh ── */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "-28px 0 12px",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: 256,
                  height: 256,
                  borderRadius: "50%",
                  border: "3px solid #fff",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                  overflow: "hidden",
                  background: "#f0f6ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={`Logo ${e.specialty}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  // Fallback: emoji ngành khi chưa có logo
                  <span style={{ fontSize: "1.8em" }}>
                    {e.title.match(/[\u{1F300}-\u{1FAFF}]/u)?.[0] || "🏥"}
                  </span>
                )}
              </div>
            </div>

            <h3
              style={{
                fontSize: "1.4em",
                color: "#111",
                textAlign: "center",
                margin: "0 0 8px",
                fontWeight: 800,
                lineHeight: 1.3,
              }}
            >
              {e.title}
            </h3>
            <div
              style={{
                textAlign: "center",
                background: "#f2f6ff",
                borderRadius: 10,
                padding: "9px 14px",
                marginBottom: 14,
              }}
            >
              <span style={{ color: "#0072ff", fontWeight: 700 }}>
                {e.career}
              </span>
              <span style={{ color: "#ccc", margin: "0 8px" }}>·</span>
              <span style={{ color: "#555" }}>{e.specialty}</span>
            </div>

            <p
              style={{
                color: "#444",
                lineHeight: 1.8,
                marginBottom: 16,
                fontSize: "1em",
              }}
            >
              {e.description}
            </p>

            <button
              onClick={() => {
                setGalleryIndex(0);
                setGameState("gallery");
              }}
              style={{
                width: "100%",
                marginBottom: 18,
                background: "linear-gradient(135deg,#f8f4ff,#ede7ff)",
                border: "2.5px solid #9B59B6",
                borderRadius: 14,
                padding: "14px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <div
                  style={{ fontSize: "1em", fontWeight: 800, color: "#7B2FBE" }}
                >
                  🗺️ Xem lộ trình & đặc điểm ngành
                </div>
                <div
                  style={{ fontSize: "0.82em", color: "#9B59B6", marginTop: 3 }}
                >
                  {gallery.length} hình ảnh · Lộ trình học · Cơ hội việc làm
                </div>
              </div>
              <span style={{ fontSize: "1.5em", color: "#9B59B6" }}>›</span>
            </button>

            <div
              style={{
                background: "linear-gradient(135deg,#f5f7fa,#e8edf5)",
                borderRadius: 16,
                padding: "16px 14px",
                marginBottom: 16,
              }}
            >
              <h4
                style={{
                  textAlign: "center",
                  color: "#222",
                  fontWeight: 800,
                  margin: "0 0 12px",
                  fontSize: "1.08em",
                }}
              >
                🎯 Bản đồ tính cách của bạn
              </h4>

              <div
                style={{
                  display: "flex",
                  gap: 7,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  marginBottom: 14,
                }}
              >
                {traitList.slice(0, 3).map(({ k, pct: p }, i) => (
                  <div
                    key={k}
                    style={{
                      background: traitColors[k],
                      color: "#fff",
                      padding: "7px 11px",
                      borderRadius: 20,
                      fontSize: "0.85em",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <span>{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</span>
                    <span>{traitNames[k]}</span>
                    <span
                      style={{
                        background: "rgba(255,255,255,0.22)",
                        padding: "1px 7px",
                        borderRadius: 10,
                        fontSize: "0.83em",
                      }}
                    >
                      {p.toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: "12px 10px 8px",
                }}
              >
                {traitList.map(({ k, pct: p }) => {
                  const barPct = Math.min((p / 30) * 100, 100);
                  return (
                    <div
                      key={k}
                      style={{
                        marginBottom: 10,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          textAlign: "center",
                          fontSize: "1em",
                          flexShrink: 0,
                        }}
                      >
                        {traitIcons[k]}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            width: "100%",
                            height: 11,
                            background: "#f0f1f3",
                            borderRadius: 8,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${barPct}%`,
                              height: "100%",
                              borderRadius: 8,
                              background: `linear-gradient(90deg,${traitColors[k]}99,${traitColors[k]})`,
                              transition: "width 0.6s ease",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            fontSize: "0.72em",
                            color: "#999",
                            marginTop: 2,
                          }}
                        >
                          {traitNames[k]}
                        </div>
                      </div>
                      <div
                        style={{
                          width: 30,
                          textAlign: "right",
                          fontSize: "0.87em",
                          color: "#444",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {p.toFixed(0)}%
                      </div>
                    </div>
                  );
                })}
                <p
                  style={{
                    fontSize: "0.68em",
                    color: "#ccc",
                    textAlign: "right",
                    margin: "4px 0 0",
                  }}
                >
                  * Thang đo tối đa 30%
                </p>
              </div>
            </div>

            <div
              style={{
                background: "#f0f6ff",
                borderLeft: "4px solid #0072ff",
                padding: "12px 14px",
                borderRadius: "0 12px 12px 0",
                marginBottom: 16,
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#333",
                  lineHeight: 1.75,
                  fontSize: "0.97em",
                }}
              >
                <strong>💡 Về bạn:</strong> {generateDynamicInsight()}
              </p>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg,#0072ff,#00c6ff)",
                padding: "18px 16px",
                borderRadius: 16,
                marginBottom: 18,
                color: "#fff",
              }}
            >
              <strong
                style={{ fontSize: "1em", display: "block", marginBottom: 8 }}
              >
                🎓 Đại học Văn Lang đồng hành cùng bạn:
              </strong>
              <p style={{ margin: 0, lineHeight: 1.8, fontSize: "0.97em" }}>
                {e.vanLangValue}
              </p>
            </div>

            <button className="primary-btn" onClick={resetQuiz}>
              🔄 Khám phá thêm nghề nghiệp khác
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ── GALLERY (trang riêng) ─────────────────────────────────
  const renderGallery = () => {
    const key = calculateEnding();
    const gallery = ENDING_GALLERY[key] || [];
    const e = endings[key];

    return (
      <PageWrap>
        <Card>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 18,
            }}
          >
            <button
              onClick={() => setGameState("result")}
              style={{
                background: "#f3f4f6",
                border: "none",
                borderRadius: "50%",
                width: 40,
                height: 40,
                fontSize: "1.2em",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              ‹
            </button>
            <div>
              <div
                style={{ fontWeight: 800, fontSize: "1.05em", color: "#111" }}
              >
                🗺️ Chi tiết ngành
              </div>
              <div style={{ fontSize: "0.8em", color: "#888", marginTop: 2 }}>
                {e.title}
              </div>
            </div>
          </div>

          {/* Ảnh chính */}
          <div
            style={{ borderRadius: 12, overflow: "hidden", marginBottom: 10 }}
          >
            {gallery[galleryIndex]?.src ? (
              <img
                src={gallery[galleryIndex].src}
                alt={gallery[galleryIndex].caption}
                style={{ width: "100%", display: "block", height: "auto" }}
              />
            ) : (
              <div
                style={{
                  height: 160,
                  background: "#f0f2f5",
                  border: "2px dashed #d0d5dd",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#bbb",
                  fontSize: "0.8em",
                }}
              >
                [ ảnh {galleryIndex + 1} ]
              </div>
            )}
          </div>

          {/* Caption */}
          <p
            style={{
              textAlign: "center",
              color: "#555",
              fontSize: "0.97em",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            {gallery[galleryIndex]?.caption}
          </p>

          {/* Prev / dots / Next */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <button
              onClick={() => setGalleryIndex((i) => Math.max(0, i - 1))}
              disabled={galleryIndex === 0}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "none",
                background: galleryIndex === 0 ? "#eee" : "#0072ff",
                color: galleryIndex === 0 ? "#aaa" : "#fff",
                fontSize: "1.4em",
                cursor: galleryIndex === 0 ? "default" : "pointer",
              }}
            >
              ‹
            </button>

            <div style={{ display: "flex", gap: 7 }}>
              {gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIndex(i)}
                  style={{
                    width: i === galleryIndex ? 26 : 10,
                    height: 10,
                    padding: 0,
                    border: "none",
                    borderRadius: 5,
                    background: i === galleryIndex ? "#0072ff" : "#d1d5db",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setGalleryIndex((i) => Math.min(gallery.length - 1, i + 1))
              }
              disabled={galleryIndex === gallery.length - 1}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "none",
                background:
                  galleryIndex === gallery.length - 1 ? "#eee" : "#0072ff",
                color: galleryIndex === gallery.length - 1 ? "#aaa" : "#fff",
                fontSize: "1.4em",
                cursor:
                  galleryIndex === gallery.length - 1 ? "default" : "pointer",
              }}
            >
              ›
            </button>
          </div>

          {/* Thumbnails */}
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setGalleryIndex(i)}
                style={{
                  padding: 0,
                  border: `3px solid ${
                    i === galleryIndex ? "#0072ff" : "transparent"
                  }`,
                  borderRadius: 9,
                  overflow: "hidden",
                  cursor: "pointer",
                  width: 80,
                  flexShrink: 0,
                  transition: "border 0.15s",
                  background: "#f0f2f5",
                }}
              >
                {g.src ? (
                  <img
                    src={g.src}
                    alt={g.caption}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                ) : (
                  <div
                    style={{
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ccc",
                      fontSize: "0.65em",
                    }}
                  >
                    {i + 1}
                  </div>
                )}
              </button>
            ))}
          </div>

          <button
            className="primary-btn"
            onClick={() => setGameState("result")}
          >
            ← Quay lại kết quả
          </button>
        </Card>
      </PageWrap>
    );
  };

  // ── Render ────────────────────────────────────────────────
  return (
    <div>
      {gameState === "start" && renderStart()}
      {gameState === "gender" && renderGender()}
      {gameState === "quiz" && renderQuiz()}
      {gameState === "result" && renderResult()}
      {gameState === "gallery" && renderGallery()}
    </div>
  );
};

export default App;
