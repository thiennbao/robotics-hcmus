import { Course, Register } from "@prisma/client";
import { FormSubmitButton } from "../admin/actionButton";
import { InputField } from "../utils/editorUtils";
import { registerReadAction } from "@/lib/actions";

const RegisterEditor = ({ data }: { data: Register & { course: Pick<Course, "name"> } }) => {
  return (
    <form action={registerReadAction.bind(null, data.id, !data.read)} className="*:mb-4">
      <InputField label="Khoá học" name="course" data={data.course.name} inputAttr={{ readOnly: true }} />
      <InputField label="Họ tên học sinh" name="name" data={data.name} inputAttr={{ readOnly: true }} />
      <InputField label="Họ tên phụ huynh" name="parentName" data={data.parentName} inputAttr={{ readOnly: true }} />
      <InputField label="Ngày sinh" name="dob" data={data.dob.toLocaleDateString()} inputAttr={{ readOnly: true }} />
      <InputField label="Email" name="email" data={data.email} inputAttr={{ readOnly: true }} />
      <InputField label="Số điện thoại" name="phone" data={data.phone} inputAttr={{ readOnly: true }} />
      <InputField label="Khung giờ" name="time" data={data.time} inputAttr={{ readOnly: true }} />
      <div className="text-center pt-4">
        <FormSubmitButton
          variant={data.read ? "warning" : "success"}
          loadingText="Đang cập nhật..."
          className="w-1/2"
        >
          {data.read ? "ĐÁNH DẤU CHƯA ĐỌC" : "ĐÁNH DẤU ĐÃ ĐỌC"}
        </FormSubmitButton>
      </div>
    </form>
  );
};

export default RegisterEditor;
