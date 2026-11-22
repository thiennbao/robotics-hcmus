import { Message } from "@prisma/client";
import { FormSubmitButton } from "../admin/actionButton";
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

export default MessageEditor;
