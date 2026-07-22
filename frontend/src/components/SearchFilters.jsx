const SearchFilters = ({ filters, setFilters, onSearch, onReset }) => {
  const categories = ['All', 'SUV', 'Sedan', 'Hatchback', 'Luxury', 'Truck']

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  return (
    <div className="bg-darkgray rounded-lg p-6 mb-8">
      <h2 className="text-white font-semibold text-lg mb-4">Search Vehicles</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

        <div>
          <label className="text-gray-400 text-xs mb-1 block">Make</label>
          <input
            type="text"
            name="make"
            value={filters.make}
            onChange={handleChange}
            placeholder="e.g. Toyota"
            className="w-full bg-dark border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600"
          />
        </div>

        <div>
          <label className="text-gray-400 text-xs mb-1 block">Model</label>
          <input
            type="text"
            name="model"
            value={filters.model}
            onChange={handleChange}
            placeholder="e.g. Fortuner"
            className="w-full bg-dark border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600"
          />
        </div>

        <div>
          <label className="text-gray-400 text-xs mb-1 block">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full bg-dark border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-primary transition-colors"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat === 'All' ? '' : cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-gray-400 text-xs mb-1 block">Min Price</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min"
            className="w-full bg-dark border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600"
          />
        </div>

        <div>
          <label className="text-gray-400 text-xs mb-1 block">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max"
            className="w-full bg-dark border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600"
          />
        </div>

      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={onSearch}
          className="bg-primary hover:bg-red-700 text-white px-6 py-2 rounded text-sm font-medium transition-colors"
        >
          Search
        </button>
        <button
          onClick={onReset}
          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded text-sm font-medium transition-colors"
        >
          Reset
        </button>
      </div>

    </div>
  )
}

export default SearchFilters