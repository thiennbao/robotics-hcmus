import { Message } from "@prisma/client";
import { InputField, TextField } from "../utils/editorUtils";
import { messageReadAction } from "@/lib/actions";

const MessageEditor = ({ data }: { data: Message }) => {
  return (
    <form action={messageReadAction.bind(null, data.id, !data.read)} className="*:mb-4">
      <InputField
        label="Họ tên"
        inputAttr={{
          name: "name",
          defaultValue: data.name,
          readOnly: true,
        }}
      />
      <div className="grid lg:grid-cols-2 gap-4">
        <InputField
          label="Email"
          inputAttr={{
            name: "email",
            defaultValue: data.email || "",
            readOnly: true,
          }}
        />
        <InputField
          label="Số điện thoại"
          inputAttr={{
            name: "phone",
            defaultValue: data.phone || "",
            readOnly: true,
          }}
        />
      </div>
      <TextField
        label="Lời nhắn"
        inputAttr={{
          name: "message",
          defaultValue: data.message,
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

export default MessageEditor;
