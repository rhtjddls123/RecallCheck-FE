import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface SuspenseWithErrorBoundaryProps {
  loadingFallback: ReactNode;
  errorFallback?: ReactNode;
  children: ReactNode;
}

const SuspenseWithErrorBoundary = ({
  loadingFallback,
  errorFallback,
  children
}: SuspenseWithErrorBoundaryProps) => {
  return (
    <ErrorBoundary fallback={errorFallback || <DefaultErrorMsg />}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

const DefaultErrorMsg = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="text-14_B text-red-400">데이터를 불러오는데 실패하였습니다.</p>
    </div>
  );
};

export default SuspenseWithErrorBoundary;
