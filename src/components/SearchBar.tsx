interface SearchBarProps {

  onSearch: (query: string) => void;

}

export const SearchBar = ({ onSearch }: SearchBarProps) => {



   

  return (

    <input

      type="text"

      placeholder="Search movies..."

      onChange={(e) => onSearch(e.target.value)}

      className="bg-gray-800 p-2 rounded w-full"

    />

  );

};