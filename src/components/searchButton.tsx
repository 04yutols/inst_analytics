import React from 'react';
import { Button } from 'antd';
interface SearchProps {
  onSearch: (keyword: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div>
      <input type="text" value={keyword} onChange={handleChange} />
      <Button onClick={handleSearch}>検索</Button>
    </div>
  );
};

export default Search;
