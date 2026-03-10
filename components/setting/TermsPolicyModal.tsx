import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

const TERMS = `제1조 (목적)
본 약관은 본 서비스(이하 "서비스")가 제공하는 제품 리콜 정보 검색 및 AI 챗봇 서비스 이용에 관한 조건과 절차, 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (서비스의 내용)
서비스는 다음과 같은 기능을 제공합니다.
- 국내외 제품 리콜 정보 검색
- AI 챗봇을 통한 리콜 관련 질의응답
- 리콜 정보 상세 조회

제3조 (서비스 이용)
① 서비스는 로그인 없이 이용할 수 있습니다.
② 일부 기능은 카카오 소셜 로그인 후 이용 가능할 수 있습니다.
③ 이용자는 서비스를 이용함으로써 본 약관에 동의한 것으로 간주합니다.
④ 이용자는 서비스를 통해 제공되는 정보를 상업적 목적으로 무단 활용할 수 없습니다.

제4조 (정보의 정확성)
① 본 서비스에서 제공하는 리콜 정보는 공공데이터 및 관련 기관의 자료를 기반으로 하며, 정보의 최신성 및 정확성을 보장하지 않습니다.
② 이용자는 제공된 정보를 참고용으로만 활용하여야 하며, 중요한 사항은 관련 기관에 직접 확인하시기 바랍니다.

제5조 (서비스 중단)
서비스는 시스템 점검, 장애, 천재지변 등의 사유로 서비스 제공이 일시적으로 중단될 수 있으며, 이에 대해 별도의 보상을 하지 않습니다.

제6조 (면책조항)
① 서비스는 이용자가 서비스를 통해 얻은 정보를 기반으로 한 행동의 결과에 책임을 지지 않습니다.
② AI 챗봇의 응답은 참고용이며, 법적 효력이 없습니다.

제7조 (약관의 변경)
본 약관은 서비스 운영상 필요에 따라 변경될 수 있으며, 변경 시 서비스 내 공지를 통해 안내합니다.

부칙
본 약관은 2026년 3월 10일부터 시행합니다.`;

const PRIVACY = `제1조 (수집하는 개인정보)
본 서비스는 로그인 없이도 이용 가능하며, 카카오 소셜 로그인 선택 시 아래 정보가 수집됩니다.

카카오 로그인 시 수집 항목:
- 카카오 고유 식별자(ID)
- 닉네임, 프로필 이미지 (카카오에서 제공하는 경우)

서비스 이용 중 수집 항목:
- 검색어
- 상세 페이지 방문 기록
- 이용자가 업로드한 이미지 (서비스 운영 목적으로 보관될 수 있음)

제2조 (개인정보의 수집 및 이용 목적)
수집된 정보는 다음의 목적으로만 활용됩니다.
- 카카오 로그인을 통한 회원 식별
- 검색 및 방문 기록 기반 서비스 품질 개선
- 업로드 이미지를 활용한 리콜 정보 검색 기능 제공
- 부정 이용 방지 및 보안

제3조 (개인정보의 보유 및 이용 기간)
① 회원 탈퇴 시 수집된 모든 개인정보(카카오 계정 정보, 검색어, 방문 기록)는 즉시 파기합니다.
② 단, 관련 법령에 의해 보존이 필요한 경우 해당 기간 동안 보관합니다.

제4조 (제3자 제공)
① 본 서비스는 이용자의 개인정보를 외부에 제공하지 않습니다.
② 단, 카카오 로그인 이용 시 카카오의 개인정보처리방침이 별도로 적용됩니다.
③ 법령의 규정에 의거하거나 수사기관의 요청이 있는 경우는 예외로 합니다.

제5조 (개인정보의 파기)
① 회원 탈퇴 시 개인정보는 지체 없이 즉시 파기합니다.
② 업로드된 이미지는 회원 탈퇴 시 이용자와의 연결 정보만 삭제되며, 서비스 운영 목적상 스토리지에 보관될 수 있습니다.

제6조 (이용자의 권리)
① 이용자는 언제든지 회원 탈퇴를 통해 수집된 모든 정보의 즉시 삭제를 요청할 수 있습니다.
② 카카오 앱 설정에서 본 서비스의 접근 권한을 철회할 수 있습니다.

제7조 (쿠키 사용)
본 서비스는 로그인 상태 유지를 위해 쿠키를 사용할 수 있습니다. 브라우저 설정에서 쿠키 저장을 거부할 수 있으나, 일부 기능 이용이 제한될 수 있습니다.

부칙
본 방침은 2026년 3월 10일부터 시행합니다.`;

type Tab = "terms" | "privacy";

const TermsPolicyModal = () => {
  const [tab, setTab] = useState<Tab>("terms");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-4 cursor-pointer text-left">약관 및 정책</button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>약관 및 정책</DialogTitle>
        </DialogHeader>

        <div className="flex border-b" data-slot="dialog-description">
          <button
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === "terms"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setTab("terms")}
          >
            이용약관
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === "privacy"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setTab("privacy")}
          >
            개인정보처리방침
          </button>
        </div>

        <div className="overflow-y-auto flex-1 pr-1">
          <pre className="text-sm text-foreground whitespace-pre-wrap leading-relaxed font-sans">
            {tab === "terms" ? TERMS : PRIVACY}
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsPolicyModal;
