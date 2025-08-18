export default function LoadingSpinner({ message = "Cargando..." }: { message?: string }) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 text-lg">{message}</p>
        </div>
      </div>
    );
  }
  