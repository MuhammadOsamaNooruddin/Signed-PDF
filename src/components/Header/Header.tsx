import file from "../../assets/file.svg";

export const Header = () => {
  return (
    <header className="bg-white shadow rounded-3xl border border-gray-300 ">
      <div className="container mx-auto p-4 flex items-center text-center gap-2">
        <div className="w-10 h-10 p-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
          <img src={file} alt="Logo" className="w-8 h-8 rounded-full" />
        </div>
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          SignPDF
        </h1>
      </div>
    </header>
  );
};
