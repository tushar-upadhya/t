import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex items-center justify-center w-full px-4 sm:px-6 md:px-8">
      <div className="relative w-full max-w-lg">
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
          className="w-full p-5 pl-4 pr-16 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <SearchIcon
          className="absolute transform -translate-y-1/2 text-slate-900 right-3 top-1/2"
          size={20}
        />
      </div>
    </div>
  );
};

export default SearchBar;
