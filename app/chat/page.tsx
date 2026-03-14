import Chat from "@/components/chatbot/Chat";
import Header from "@/components/common/Header";

const ChatbotPage = () => {
  return (
    <div className="h-full">
      <Header title="챗봇" type="back" />
      <Chat />
    </div>
  );
};

export default ChatbotPage;
