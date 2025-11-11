export default function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-red-300 bg-red-50 text-red-800 p-3 text-sm">
      {message}
    </div>
  )
}
