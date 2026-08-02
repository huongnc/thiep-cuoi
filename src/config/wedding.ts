// ============================================================
//  CẤU HÌNH THIỆP CƯỚI  —  chỉnh mọi thông tin ở file này
// ============================================================

export interface Person {
  name: string
  role: string // "Chú Rể" / "Cô Dâu"
  title: string // "Trưởng Nam" / "Út Nữ"
  father: string
  mother: string
  photo: string
}

export interface WeddingEvent {
  key: string
  name: string // Lễ Vu Quy / Lễ Thành Hôn / Tiệc Cưới
  side: string // Nhà Trai / Nhà Gái
  weekday: string
  date: string // "27.11.2026"
  lunar?: string // "tức ngày 18 tháng 10 năm Bính Ngọ"
  time: string
  welcomeTime?: string // giờ đón khách (chỉ tiệc cưới)
  venue: string
  address: string
  mapUrl?: string
}

export interface StoryItem {
  date: string
  title: string
  text: string
}

export interface ScheduleItem {
  time: string
  label: string
}

export interface BankAccount {
  owner: string // "Cô Dâu" / "Chú Rể"
  bank: string // mã ngân hàng VietQR, vd "VCB", "TCB", "BIDV", "ICB" (VietinBank)
  bankName: string
  account: string
  holder: string
}

export interface Wish {
  name: string
  message: string
}

export const wedding = {
  // --- Cặp đôi ---
  groom: {
    name: 'Khánh Dương',
    role: 'Chú Rể',
    title: 'Trưởng Nam',
    father: 'Ông Trần Văn Hùng',
    mother: 'Bà Nguyễn Thị Lan',
    photo: '/photos/p7.jpg',
  } as Person,
  bride: {
    name: 'Diễm Quỳnh',
    role: 'Cô Dâu',
    title: 'Út Nữ',
    father: 'Ông Lê Văn Nam',
    mother: 'Bà Phạm Thị Hoa',
    photo: '/photos/p5.jpg',
  } as Person,

  hashtag: 'duongquynh',

  // --- Ngày cưới chính (dùng cho đồng hồ đếm ngược) ---
  weddingDate: '2026-11-28T18:00:00+07:00',
  dateText: '28 · 11 · 2026',
  dateTextFull: 'Thứ Bảy, ngày 28 tháng 11 năm 2026',

  cover: {
    eyebrow: 'Save the Date',
    invite: 'Trân trọng kính mời',
  },

  quote: {
    text: 'Yêu nhau không phải là nhìn nhau, mà là cùng nhau nhìn về một hướng.',
    author: 'Antoine de Saint-Exupéry',
  },

  invitation: {
    heading: 'Trân trọng báo tin',
    body: 'Trong niềm hân hoan, hai gia đình chúng tôi trân trọng báo tin lễ thành hôn của hai con. Sự hiện diện của quý vị là niềm vinh hạnh và là lời chúc phúc ý nghĩa nhất cho ngày trọng đại của chúng tôi.',
  },

  // --- Sự kiện: Lễ Vu Quy / Lễ Thành Hôn / Tiệc Cưới ---
  events: [
    {
      key: 'vuquy',
      name: 'Lễ Vu Quy',
      side: 'Nhà Gái',
      weekday: 'Thứ Sáu',
      date: '27.11.2026',
      lunar: 'tức ngày 18 tháng 10 năm Bính Ngọ',
      time: '09:00',
      venue: 'Tư gia nhà gái',
      address: 'Thôn 2 Hiệp Thuận',
    },
    {
      key: 'thanhhon',
      name: 'Lễ Thành Hôn',
      side: 'Nhà Trai',
      weekday: 'Thứ Bảy',
      date: '28.11.2026',
      lunar: 'tức ngày 19 tháng 10 năm Bính Ngọ',
      time: '11:00',
      venue: 'Tư gia nhà trai',
      address: 'Thôn 10 Quán Hạ',
    },
    {
      key: 'tieccuoi',
      name: 'Tiệc Cưới',
      side: 'Nhà Trai',
      weekday: 'Thứ Bảy',
      date: '28.11.2026',
      lunar: 'tức ngày 19 tháng 10 năm Bính Ngọ',
      time: '18:00',
      welcomeTime: '17:30',
      venue: 'Tư gia nhà trai',
      address: 'Thôn 10 Quán Hạ',
    },
  ] as WeddingEvent[],

  // --- Câu chuyện tình yêu ---
  story: [
    {
      date: 'Mùa Thu 2008',
      title: 'Lần đầu gặp gỡ',
      text: 'Khánh Dương gặp Diễm Quỳnh lần đầu khi cả hai vừa bước chân vào giảng đường đại học. Một ánh nhìn, và câu chuyện của chúng mình bắt đầu.',
    },
    {
      date: 'Mùa Xuân 2010',
      title: 'Cái nắm tay đầu tiên',
      text: 'Sau bao ngày ngại ngùng, Khánh Dương đã lấy hết can đảm để ngỏ lời. Từ đó, hai đứa chẳng còn rời xa nhau.',
    },
    {
      date: 'Mùa Hè 2025',
      title: 'Lời cầu hôn',
      text: 'Dưới ánh hoàng hôn, một chiếc nhẫn và một lời hứa trọn đời. Diễm Quỳnh đã nói "Đồng ý".',
    },
    {
      date: 'Mùa Đông 2026',
      title: 'Về chung một nhà',
      text: 'Và giờ đây, chúng mình chính thức viết tiếp chương mới của cuộc đời — cùng nhau, mãi mãi.',
    },
  ] as StoryItem[],

  // --- Album ảnh (thay bằng ảnh của bạn) ---
  gallery: [
    '/photos/p1.jpg',
    '/photos/p6.jpg',
    '/photos/p3.jpg',
    '/photos/p5.jpg',
    '/photos/p7.jpg',
    '/photos/p2.jpg',
    '/photos/p4.jpg',
    '/photos/p8.jpg',
    '/photos/p9.jpg',
    '/photos/p10.jpg',
    '/photos/p11.jpg',
  ],

  // --- Lịch trình ngày cưới ---
  schedule: [
    { time: '17:30', label: 'Đón khách' },
    { time: '18:00', label: 'Khai tiệc' },
    { time: '18:30', label: 'Nghi thức lễ cưới' },
    { time: '19:00', label: 'Nâng ly chúc mừng' },
    { time: '20:30', label: 'Giao lưu & chụp ảnh' },
  ] as ScheduleItem[],

  // --- Hộp quà mừng (QR chuyển khoản qua VietQR) ---
  gifts: {
    note: 'Sự hiện diện của bạn là món quà quý giá nhất. Nếu muốn gửi lời chúc phúc bằng một món quà nhỏ, bạn có thể quét mã QR bên dưới.',
    accounts: [
      {
        owner: 'Chú Rể',
        bank: 'VCB',
        bankName: 'Vietcombank',
        account: '0000000000',
        holder: 'TRAN KHANH DUONG',
      },
      {
        owner: 'Cô Dâu',
        bank: 'TCB',
        bankName: 'Techcombank',
        account: '1111111111',
        holder: 'LE DIEM QUYNH',
      },
    ] as BankAccount[],
  },

  // --- Lời chúc mẫu hiển thị sẵn trong Sổ lưu bút ---
  sampleWishes: [
    { name: 'Gia đình', message: 'Chúc hai con trăm năm hạnh phúc, sắt son bền chặt!' },
    { name: 'Bạn thân', message: 'Cưới nhau rồi nhớ mời tụi này ăn cỗ dài dài nha!' },
  ] as Wish[],

  // --- Nhạc nền ---
  // Thả file nhạc của bạn vào public/music/ rồi trỏ đường dẫn ở đây.
  // Lưu ý bản quyền: dùng file bạn sở hữu/được phép.
  music: {
    src: '/music/beautiful-in-white.mp3',
    title: 'Beautiful In White',
  },

  // --- Backend: dán URL Google Apps Script (/exec) vào đây ---
  // Xem hướng dẫn deploy trong README.md. Để trống nếu chưa cấu hình.
  api: {
    endpoint: '',
  },
}

export type Wedding = typeof wedding
