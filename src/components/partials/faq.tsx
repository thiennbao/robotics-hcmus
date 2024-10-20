import Appear from "../utils/appear";
import { HTMLAttributes } from "react";
import { BsQuestionCircle } from "react-icons/bs";

const Question = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="flex items-center gap-x-2 mb-2">
        <BsQuestionCircle className="text-2xl text-primary" /> <p className="text-xl font-bold">{question}</p>
      </div>
      <p>{answer}</p>
    </div>
  );
};

const Faq = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <section {...props}>
      <div className="container">
        <h2 className="mb-6 text-center text-primary text-3xl font-bold">CÂU HỎI THƯỜNG GẶP</h2>
        <div className="grid lg:grid-cols-2 gap-8 overflow-hidden *:flex">
          <Appear variant="right">
            <Question
              question="Ai có thể đăng ký tham gia khóa học?"
              answer="Các khóa học lập trình và robot hiện tại của CLB phù hợp với các bạn trong độ tuổi từ 06 - 21 tuổi. Bất kỳ bạn nhỏ nào có đam mê, hứng thú với robot và lập trình đều có thể đăng ký tham gia, không yêu cầu các bạn phải có kiến thức nền tảng từ trước."
            />
          </Appear>
          <Appear variant="left">
            <Question
              question="Các khóa học có tổ chức thường xuyên không?"
              answer="Các khóa học được tổ chức xuyên suốt trong năm, chủ yếu vào cuối tuần với các khung giờ học: sáng, chiều, tối. Lịch khai giảng sẽ được cập nhật liên tục trên trang web, fanpage và quý phụ huynh có thể đăng ký trước khóa học phù hợp với thời gian của con em mình."
            />
          </Appear>
          <Appear variant="right">
            <Question
              question="Làm thế nào để đăng ký khóa học?"
              answer="Quý phụ huynh có thể đăng ký trực tuyến qua trang web của chúng tôi bằng cách điền đầy đủ thông tin trong mẫu đăng ký; gọi điện đến số Hotline 0366 399 748 hoặc đến trực tiếp tại địa chỉ: Phòng I86, Tòa nhà I, Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM, 227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM để được tư vấn."
            />
          </Appear>
          <Appear variant="left">
            <Question
              question="Thời gian và địa điểm tổ chức khóa học?"
              answer="Các khóa học của CLB sẽ được tổ chức tại địa chỉ: tòa nhà I Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM, 227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM. Thời gian và phòng học cụ thể sẽ được thông báo cho phụ huynh qua tin nhắn (Zalo) hoặc qua email sau khi đăng ký khóa học thành công."
            />
          </Appear>
          <Appear variant="right">
            <Question
              question="Có chương trình học thử trải nghiệm không?"
              answer="Hiện tại CLB không có chương trình học thử trải nghiệm. Tuy nhiên, bạn có thể tham khảo tài liệu và video giới thiệu khóa học, các kênh truyền thông mạng xã hội của CLB để có cái nhìn tổng quan về nội dung và phương pháp giảng dạy trước khi đăng ký hoặc gọi đến số Hotline 0366 399 748 để được tư vấn."
            />
          </Appear>
          <Appear variant="left">
            <Question
              question="Có tổ chức khóa học online không?"
              answer="Hiện tại CLB không cung cấp khóa học online. Tất cả các khóa học đều được tổ chức trực tiếp tại địa chỉ tòa nhà I Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM, 227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM để đảm bảo học viên có thể tương tác thực hành với thiết bị và giáo viên một cách tốt nhất."
            />
          </Appear>
        </div>
      </div>
    </section>
  );
};

export default Faq;
