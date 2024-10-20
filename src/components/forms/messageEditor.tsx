import { Message } from "@prisma/client";
import { InputField } from "../utils/editorUtils";
import { messageReadAction } from "@/lib/actions";

const MessageEditor = ({ data }: { data: Message }) => {
  return (
    <form action={messageReadAction.bind(null, data.id, !data.read)} className="*:mb-4">
      <InputField label="Họ tên" name="name" data={data.name} inputAttr={{ readOnly: true }} />
      <InputField label="Email" name="email" data={data.email} inputAttr={{ readOnly: true }} />
      <InputField label="Số điện thoại" name="phone" data={data.phone} inputAttr={{ readOnly: true }} />
      <InputField textarea label="Lời nhắn" name="message" data={data.message} inputAttr={{ readOnly: true }} />
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
