
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface MarketplaceFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
}

const MarketplaceFilters = ({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  sortOption,
  setSortOption
}: MarketplaceFiltersProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm mb-6 transition-all duration-300 hover:shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Input
            placeholder="Search for items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 transition-all duration-300 focus:ring-2 focus:ring-ustp-yellow"
          />
        </div>
        <div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full transition-all duration-300 hover:border-ustp-blue">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="school supplies">School Supplies</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-full transition-all duration-300 hover:border-ustp-blue">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceFilters;
