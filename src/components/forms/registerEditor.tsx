import { Course, Register } from "@prisma/client";
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
        {data.read ? (
          <button className="w-1/2 py-2 rounded-lg border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition">
            ĐÁNH DẤU CHƯA ĐỌC
          </button>
        ) : (
          <button className="w-1/2 py-2 rounded-lg border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition">
            ĐÁNH DẤU ĐÃ ĐỌC
          </button>
        )}
      </div>
    </form>
  );
};

export default RegisterEditor;
