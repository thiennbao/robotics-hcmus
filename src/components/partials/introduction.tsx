import { HTMLAttributes } from "react";
import Appear from "../utils/appear";
import Image from "next/image";

const Introduction = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <section {...props}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-8">
          <div className="overflow-hidden order-1">
            <Appear variant="right">
              <p className="mt-4">
                Câu lạc bộ (CLB) Robotics & IoT, được thành lập vào tháng 7/2015, trực thuộc sự quản lý của phòng thí
                nghiệm trí tuệ nhân tạo (AILAB) - Trường Đại học Khoa học Tự nhiên - ĐHQG TPHCM. CLB ra đời với mục tiêu
                tạo nên một không gian học thuật và nghiên cứu năng động, nơi các bạn sinh viên và học sinh có thể tiếp
                cận, tìm hiểu về lĩnh vực công nghệ đang phát triển mạnh mẽ là Robotics và Internet of Things (IoT) và
                sứ mệnh truyền cảm hứng, thúc đẩy tinh thần đổi mới sáng tạo trong lĩnh vực Robot và IoT.
              </p>
            </Appear>
            <Appear variant="right">
              <p className="mt-4">
                Thông qua các hoạt động nghiên cứu và thực hành, CLB Robotics & IoT không chỉ giúp các thành viên nắm
                vững kiến thức nền tảng mà còn khuyến khích các bạn phát triển tư duy sáng tạo, kỹ năng giải quyết vấn
                đề trong môi trường công nghệ tiên tiến. Đây là nơi các bạn có thể chia sẻ, học hỏi kinh nghiệm lẫn
                nhau, cũng như phát triển các dự án cá nhân hay nhóm dưới sự hỗ trợ của các giảng viên từ AILAB.
              </p>
            </Appear>
            <Appear variant="right">
              <p className="mt-4">
                Từ 2015 - 2018, CLB Robotics & IoT đã liên tiếp đoạt giải cao nhất trong cuộc thi Robotacon và Khoa học
                ứng dụng do Sở GD-ĐT TP.HCM tổ chức. Từ đó tạo tiền đề cho CLB được đề cử tham dự giải Olympic quốc tế
                về robot (WRO) tại Qatar, Ấn Độ và Costa Rica cũng như giải First Lego League (FLL) tại Úc và Nhật Bản.
                Đặc biệt, vào tháng 11/2018, tại Chiang Mai, Thái Lan, đội tuyển CLB Robotics - IoT đã vượt qua hơn 50
                quốc gia để giành giải vô địch bảng Future Innovators của cuộc thi WRO.
              </p>
            </Appear>
          </div>
          <div className="overflow-hidden order-2">
            <Appear variant="left" className="h-full">
              <Image
                src="/about-intro-top.png"
                alt="Robotics & IoT HCMUS"
                width={900}
                height={900}
                className="h-full object-cover rounded-lg"
              />
            </Appear>
          </div>
          <div className="overflow-hidden order-4 lg:order-3">
            <Appear variant="right" className="h-full">
              <Image
                src="/about-intro-bot.png"
                alt="Robotics & IoT HCMUS"
                width={900}
                height={900}
                className="h-full object-cover rounded-lg"
              />
            </Appear>
          </div>
          <div className="overflow-hidden order-3 lg:order-4">
            <Appear variant="left">
              <p className="mt-4">
                Từ năm 2023, với mong muốn tạo ra một sân chơi sáng tạo về Robot dành cho các bạn học sinh, CLB Robotics
                & IoT đã tổ chức Cuộc thi Giải pháp Sáng tạo Robot - ROBOCUS (được tổ chức lần đầu tiên vào tháng
                07/2023). Được tổ chức thường niên, ROBOCUS không chỉ là một sân chơi kỹ thuật mà còn là một nguồn cảm
                hứng bất tận cho các bạn nhỏ - thế hệ tương lai, tiếp tục khám phá và sáng tạo.
              </p>
            </Appear>
            <Appear variant="left">
              <p className="mt-4">
                Trong suốt quá trình hoạt động, CLB vinh dự trở thành đối tác và làm việc cùng nhiều đơn vị, tổ chức uy
                tín. CLB thường xuyên phối hợp với lãnh sự quán Hoa Kỳ tại TP.HCM để tổ chức nhiều khóa học thú vị và bổ
                ích. Các buổi hội thảo chuyên đề, các khóa học như Lego Spike Prime, Lego Mindstorms, Lập trình Arduino,
                Lập trình mobile, Kỹ sư nhí WEDO, ... đã thu hút được sự quan tâm lớn.
              </p>
            </Appear>
            <Appear variant="left">
              <p className="mt-4">
                Năm 2024, nhằm lan tỏa niềm đam mê công nghệ, sáng tạo Robot đến các bạn học sinh trên khắp mọi miền đất
                nước, CLB Robotics & IoT lần đầu tiên tổ chức chương trình &qout;Ngày hội kết nối công nghệ - Lắp ráp và
                lập trình xe điều khiển&qout; với sự tài trợ của Trung tâm Hoa Kỳ thuộc Tổng lãnh sự quán Hoa Kỳ TP.HCM.
              </p>
            </Appear>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
