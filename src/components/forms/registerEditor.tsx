import { Course, Register } from "@prisma/client";
import { InputField } from "../utils/editorUtils";
import { registerReadAction } from "@/lib/actions";

const RegisterEditor = ({ data }: { data: Register & { course: Pick<Course, "name"> } }) => {
  return (
    <form action={registerReadAction.bind(null, data.id, !data.read)} className="*:mb-4">
      <InputField
        label="Khoá học"
        inputAttr={{
          name: "course",
          defaultValue: data.course.name,
          readOnly: true,
        }}
      />
      <InputField
        label="Họ tên học sinh"
        inputAttr={{
          name: "name",
          defaultValue: data.name,
          readOnly: true,
        }}
      />
      <InputField
        label="Họ tên phụ huynh"
        inputAttr={{
          name: "parentName",
          defaultValue: data.parentName,
          readOnly: true,
        }}
      />
      <InputField
        label="Ngày sinh"
        inputAttr={{
          name: "dob",
          defaultValue: data.dob.toLocaleDateString(),
          readOnly: true,
        }}
      />
      <InputField
        label="Email"
        inputAttr={{
          name: "email",
          defaultValue: data.email,
          readOnly: true,
        }}
      />
      <InputField
        label="Số điện thoại"
        inputAttr={{
          name: "phone",
          defaultValue: data.phone,
          readOnly: true,
        }}
      />
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
