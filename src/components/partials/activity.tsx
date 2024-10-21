import { HTMLAttributes } from "react";
import Carousel from "../utils/carousel";
import FirebaseImage from "../utils/firebaseImage";

const Activity = async (props: HTMLAttributes<HTMLDivElement>) => {
  const activities = [
    {
      image: "static/act-01.png",
      title:
        "Bạn Ngô Huỳnh Ngọc Khánh trình bày dự án Máy cắt laser nghệ thuật của mình với Tổng thống Mỹ Obama - 2016",
    },
    {
      image: "static/act-02.png",
      title: "Nhóm 10X tham gia Cuộc thi World Robot Olympiad 2016 tại New Delhi, Ấn Độ - 2016",
    },
    {
      image: "static/act-03.png",
      title:
        "Đội tuyển CLB Robotics-IoT, trường ĐHKHTN và The American Center, LSQ Hoa Kỳ tại cuộc thi Robotacon - 2017",
    },
    {
      image: "static/act-04.png",
      title: "Đội Mushroom giành giải thưởng xuất sắc nhất dành cho bảng 10-11 tuổi cuộc thi Khoa học Ứng dụng - 2017",
    },
    {
      image: "static/act-05.png",
      title:
        "Đội UNIFESH đạt được giải VÔ ĐỊCH bảng Future Innovators - cuộc thi World Robot Olympiad tại Chiang Mai, Thái Lan - 2018",
    },
    {
      image: "static/act-06.png",
      title:
        "Tổ chức thành công cuộc thi ERC2019 - Emotion Recognition, Tìm kiếm giải pháp tiên phong cho Nhận diện Cảm xúc - 2019",
    },
    {
      image: "static/act-07.png",
      title: "Đội KIWI giành giải vô địch bảng Open Category khối THPT (B4-03) tại cuộc thi Robotacon - 2019",
    },
    {
      image: "static/act-08.png",
      title:
        "Trường ĐH KHTN, ĐHQG-HCM và trường ĐH Quốc gia Pusan (PNU) tổ chức chương trình giao lưu và tập huấn kỹ năng - 2019",
    },
    {
      image: "static/act-09.png",
      title: "Đội HADA giành giải vô địch bảng Explore tại cuộc thi Khoa học Ứng dụng FLL - 2021",
    },
    {
      image: "static/act-10.png",
      title: "Tổ chức cuộc thi (thường niên) giải pháp sáng tạo robot ROBOCUS - 2023",
    },
    {
      image: "static/act-11.png",
      title:
        "Phối hợp cùng American Center TPHCM tổ chức Ngày hội kết nối công nghệ tại trường trường THCS Nguyễn Văn Tre, tỉnh Đồng Tháp - 2024",
    },
    {
      image: "static/act-12.png",
      title:
        "Phối hợp cùng American Center TPHCM tổ chức Ngày hội kết nối công nghệ tại trường THPT Lai Vung 2, tỉnh Đồng Tháp - 2024",
    },
  ];

  return (
    <section {...props}>
      <div className="container">
        <h2 className="mb-4 text-3xl text-primary font-bold text-center">HOẠT ĐỘNG NỔI BẬT</h2>
        <Carousel auto={4000} withPrevNext itemsOnScreen={{ df: 1, md: 2, xl: 3 }} className="-mx-4">
          {activities.map((item) => (
            <div key={item.image} className="p-[6px]">
              <FirebaseImage
                fileName={item.image}
                alt={item.title}
                width={800}
                height={450}
                className="h-full w-full aspect-video object-cover rounded-md"
              />
              <p className="text-center p-2 w-3/4 m-auto italic text-sm">{item.title}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Activity;
