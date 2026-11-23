// Fictional examples for the development-only course preview. Never persisted.
const illustration = (background: string, accent: string, shape: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="${background}"/><circle cx="650" cy="110" r="140" fill="${accent}" opacity=".18"/><path d="M0 410 Q200 340 400 410 T800 390 V500 H0Z" fill="${accent}" opacity=".18"/>${shape}</svg>`)}`;

const robot = '<g fill="none" stroke="#174783" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"><rect x="265" y="145" width="270" height="210" rx="48" fill="#fff"/><path d="M400 145V90m-24 0h48M265 230h-45m315 0h45M320 355v35m160-35v35"/><circle cx="345" cy="230" r="16" fill="#ffb64d"/><circle cx="455" cy="230" r="16" fill="#ffb64d"/><path d="M350 290q50 35 100 0"/></g>';
const garden = '<g fill="none" stroke="#236d5b" stroke-width="14" stroke-linecap="round"><path d="M400 390V200m0 110q-85 0-105-90 90 0 105 90Zm0-65q75 0 95-80-80 0-95 80Z" fill="#a7dfb5"/><path d="M260 390h280M300 390l25 55h150l25-55" fill="#fff"/><circle cx="400" cy="150" r="45" fill="#ffd879"/></g>';
const space = '<g fill="none" stroke="#443b88" stroke-width="14" stroke-linejoin="round"><path d="M400 75q-100 65-100 220l100 55 100-55Q500 140 400 75Z" fill="#fff"/><circle cx="400" cy="215" r="40" fill="#8ccbea"/><path d="M300 265l-70 70 70-10m200-60 70 70-70-10M355 350l45 90 45-90" fill="#ffb968"/><path d="M170 130h35m-17-18v36m400 10h35m-17-18v36"/></g>';

export const demoCourses = [
  {
    id: "demo", title: "Khám phá robot sáng tạo", subject: "Robotics", age: "8 – 12 tuổi", duration: "8 tuần", level: "Cơ bản", levelBars: 1,
    brief: "Lắp ráp người bạn robot và lập trình những chuyển động đầu tiên.",
    overview: "Học viên khám phá cấu tạo robot qua các thử thách lắp ráp và điều khiển chuyển động bằng lệnh trực quan.",
    faq: [["Khóa học minh họa này phù hợp với ai?", "Ví dụ này dành cho học viên 8 – 12 tuổi muốn làm quen với robot và lập trình trực quan."], ["Dự án cuối khóa là gì?", "Trong kịch bản giả lập, học viên tạo robot có thể di chuyển và phản hồi với vật cản."], ["Tôi có thể đăng ký khóa học này không?", "Không. Đây là nội dung giả lập, không phải khóa học nhận đăng ký."]],
    skills: ["Lắp ráp robot", "Lập trình trực quan", "Tư duy logic", "Làm việc nhóm"],
    outcome: "Hoàn thành một mô hình robot di chuyển và phản hồi với vật cản trong thử thách nhóm.",
    topics: [ ["Khám phá robot", "Nhận biết các bộ phận và lắp mô hình đầu tiên."], ["Điều khiển chuyển động", "Ghép lệnh để robot đi theo một hành trình."], ["Robot tránh vật cản", "Kết hợp cảm biến vào dự án cuối khóa."] ],
    images: [illustration('#e4f2ff', '#4d99df', robot), illustration('#fff3da', '#e6a443', robot), illustration('#e7f8ee', '#61b797', robot)],
    imageAlt: "Minh họa robot với hai mắt tròn",
  },
  {
    id: "demo-vuon-thong-minh", title: "Khu vườn thông minh", subject: "IoT & môi trường", age: "10 – 14 tuổi", duration: "6 tuần", level: "Trung cấp", levelBars: 2,
    brief: "Tìm hiểu cảm biến qua mô hình chăm sóc cây xanh tự động.",
    faq: [["Học viên tìm hiểu điều gì về khu vườn?", "Ví dụ này giới thiệu cách đo độ ẩm và thiết kế quy tắc tưới cho một mô hình cây xanh."], ["Sản phẩm cuối khóa là gì?", "Học viên trong kịch bản giả lập hoàn thành mô hình báo độ ẩm và mô phỏng tưới."], ["Tôi có thể đăng ký khóa học này không?", "Không. Đây là nội dung giả lập, không phải khóa học nhận đăng ký."]],
    overview: "Từ nhu cầu của một chậu cây, học viên tìm hiểu độ ẩm, thu thập dữ liệu và thiết kế hệ thống tưới mô phỏng.",
    skills: ["Cảm biến độ ẩm", "Thu thập dữ liệu", "Thiết kế hệ thống", "Quan sát môi trường"],
    outcome: "Tạo mô hình vườn nhỏ có thể báo độ ẩm và mô phỏng tưới khi đất khô.",
    topics: [["Cây cần gì?", "Quan sát và ghi lại điều kiện sống của cây."], ["Đọc dữ liệu cảm biến", "Kết nối cảm biến và khám phá số đo độ ẩm."], ["Vườn tự chăm sóc", "Thiết kế quy tắc tưới và trình bày mô hình."]],
    images: [illustration('#e4f5e9', '#56a77a', garden), illustration('#fff4dd', '#e3ab4f', garden), illustration('#e0f4f3', '#50a5a3', garden)],
    imageAlt: "Minh họa chậu cây trong khu vườn thông minh",
  },
  {
    id: "demo-khong-gian", title: "Sứ mệnh không gian", subject: "Lập trình & mô phỏng", age: "12 – 16 tuổi", duration: "10 tuần", level: "Nâng cao", levelBars: 3,
    faq: [["Sứ mệnh không gian đề cập đến những kỹ năng nào?", "Ví dụ này kết hợp thuật toán, mô phỏng và thử nghiệm để điều hướng một hành trình."], ["Học viên tạo ra sản phẩm gì?", "Trong kịch bản giả lập, học viên tạo mô phỏng có lộ trình và chướng ngại."], ["Tôi có thể đăng ký khóa học này không?", "Không. Đây là nội dung giả lập, không phải khóa học nhận đăng ký."]],
    brief: "Lập trình và thử nghiệm hành trình khám phá các hành tinh.",
    overview: "Học viên xây dựng mô phỏng sứ mệnh không gian, từ định hướng tàu đến xử lý các tình huống trên hành trình.",
    skills: ["Thuật toán", "Mô phỏng", "Giải quyết vấn đề", "Thử nghiệm"],
    outcome: "Hoàn thành một mô phỏng sứ mệnh có lộ trình, chướng ngại và báo cáo kết quả.",
    topics: [["Thiết kế sứ mệnh", "Phác thảo hành trình và xác định mục tiêu."], ["Lập trình điều hướng", "Sử dụng điều kiện và vòng lặp để dẫn đường."], ["Thử nghiệm chuyến bay", "Kiểm tra tình huống và cải tiến mô phỏng."]],
    images: [illustration('#eae9fa', '#786dcc', space), illustration('#e3efff', '#709bd7', space), illustration('#fff0e5', '#e79b69', space)],
    imageAlt: "Minh họa tên lửa trong chuyến thám hiểm không gian",
  },
];

export type DemoCourse = (typeof demoCourses)[number];
