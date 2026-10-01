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
  quote?: string
  outro?: string
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
    title: 'Chú Rể',
    father: 'Ông Nguyễn Đình Minh',
    mother: 'Bà Nguyễn Thị Yến',
    photo: '/photos/duong-quynh/04.jpg',
  } as Person,
  bride: {
    name: 'Diễm Quỳnh',
    role: 'Cô Dâu',
    title: 'Cô Dâu',
    father: 'Ông Nguyễn Năng Yên',
    mother: 'Bà Nguyễn Thị Duyên',
    photo: '/photos/duong-quynh/02.jpg',
  } as Person,

  hashtag: 'duongquynh',
  monogram: { groom: 'D', bride: 'Q' },
  // --- Ngày cưới chính (dùng cho đồng hồ đếm ngược) ---
  weddingDate: '2026-10-13T14:30:00+07:00',
  dateText: '13 · 10 · 2026',
  dateTextFull: 'Thứ Ba, ngày 13 tháng 10 năm 2026',

  cover: {
    eyebrow: 'Save the Date',
    invite: 'Trân trọng kính mời',
    image: '/photos/duong-quynh/hero.jpg',
    groomName: 'Khánh Dương',
    brideName: 'Diễm Quỳnh',
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
      weekday: 'Thứ Hai',
      date: '12.10.2026',
      lunar: 'tức ngày 03 tháng 09 năm Bính Ngọ',
      time: '16:00',
      venue: 'Tư gia nhà gái',
      address: 'Nhà số 1, ngõ 27 đường Ven Đồng, Hát Môn, Hà Nội',
    },
    {
      key: 'thanhhon',
      name: 'Lễ Thành Hôn',
      side: 'Nhà Trai',
      weekday: 'Thứ Ba',
      date: '13.10.2026',
      lunar: 'tức ngày 04 tháng 09 năm Bính Ngọ',
      time: '14:30',
      venue: 'Tư gia nhà trai',
      address: 'Nhà số 9, ngõ Trung thôn Quán Hạ, Hát Môn, Hà Nội',
    },
  ] as WeddingEvent[],

  // --- Câu chuyện tình yêu ---
  story: [
    {
      date: '24.05.2022',
      title: 'Ngày mình gặp nhau',
      text: 'Giữa những ngày tháng bình thường, chúng mình gặp nhau. Từ một cuộc gặp gỡ, những câu chuyện cứ thế dài thêm, và chẳng biết từ lúc nào, hai đứa đã trở thành một phần trong cuộc sống của nhau.',
    },
    {
      date: '14.06.2026',
      title: 'Ngày anh cầu hôn',
      text: 'Sau những tháng ngày cùng nhau đi qua vui buồn, anh chọn một ngày thật đẹp để hỏi em một câu thật giản dị:',
      quote: 'Em đồng ý về chung một nhà với anh nhé?',
      outro: 'Và câu trả lời ấy đã mở ra chương mới của câu chuyện chúng mình.',
    },
    {
      date: '13.10.2026',
      title: 'Ngày mình về chung một nhà',
      text: 'Từ hai người xa lạ, chúng mình trở thành một gia đình. Không cần một câu chuyện quá hoàn hảo, chỉ cần từ hôm nay và những ngày sau nữa, vẫn luôn có một người ở bên để cùng nhau đi hết chặng đường.',
    },
  ] as StoryItem[],

  // --- Album ảnh (thay bằng ảnh của bạn) ---
  gallery: [
    '/photos/duong-quynh/01.jpg',
    '/photos/duong-quynh/02.jpg',
    '/photos/duong-quynh/03.jpg',
    '/photos/duong-quynh/04.jpg',
    '/photos/duong-quynh/05.jpg',
    '/photos/duong-quynh/06.jpg',
    '/photos/duong-quynh/07.jpg',
    '/photos/duong-quynh/08.jpg',
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
    startAt: 10, // giây bắt đầu phát (tua bỏ đoạn đầu)
  },

  // --- Backend: dán URL Google Apps Script (/exec) vào đây ---
  // Xem hướng dẫn deploy trong README.md. Để trống nếu chưa cấu hình.
  api: {
    endpoint: '',
  },
}

export type Wedding = typeof wedding
