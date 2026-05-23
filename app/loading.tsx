export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        role="status"
        aria-label="페이지를 불러오는 중"
        className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-transparent"
      />
    </div>
  );
}
