import { HTMLAttributes } from "react";
import Appear from "../utils/appear";
import Image from "next/image";
import Link from "next/link";

const Brief = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <section {...props}>
      <div className="container flex flex-wrap justify-between gap-y-8">
        <div className="lg:w-1/2 flex items-center">
          <div>
            <h2 className="mb-4 text-3xl text-primary font-bold">
              <Link href="/about">GIỚI THIỆU</Link>
            </h2>
            <Appear variant="right">
              <p className="mt-4">
                Câu lạc bộ &#40;CLB&#41; Robotics & IoT, được thành lập vào tháng 7/2015, trực thuộc sự quản lý của
                phòng thí nghiệm trí tuệ nhân tạo &#40;AILAB&#41; - Trường Đại học Khoa học Tự nhiên - ĐHQG TPHCM. CLB
                ra đời với mục tiêu tạo nên một không gian học thuật và nghiên cứu năng động, nơi các bạn sinh viên và
                học sinh có thể tiếp cận, tìm hiểu về lĩnh vực công nghệ đang phát triển mạnh mẽ là Robotics và Internet
                of Things &#40;IoT&#41; và sứ mệnh truyền cảm hứng, thúc đẩy tinh thần đổi mới sáng tạo trong lĩnh vực
                Robot và IoT.
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
            <Appear variant="right" className="flex justify-end">
              <Link href="/about">
                <button className="w-32 h-10 mt-8 border-2 border-primary text-primary transition rounded hover:bg-primary hover:text-white">
                  Xem thêm
                </button>
              </Link>
            </Appear>
          </div>
        </div>
        <div className="lg:w-5/12 overflow-hidden">
          <Appear variant="left" className="h-full">
            <Image
              src="/home-brief.png"
              alt="Robotics & IoT HCMUS"
              width={900}
              height={900}
              className="w-auto h-full aspect-video lg:aspect-square object-cover rounded-lg"
            />
          </Appear>
        </div>
      </div>
    </section>
  );
};

export default Brief;
