const SearchFilters = ({ filters, setFilters, onSearch, onReset }) => {
  const categories = ['All', 'SUV', 'Sedan', 'Hatchback', 'Luxury', 'Truck']

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  return (
    <div className="bg-darkgray rounded-2xl border border-gray-800/80 p-6 mb-8 font-sans">
      <h2 className="text-white font-heading font-light text-xl mb-4 tracking-tight">Search Vehicles</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

        <div>
          <label className="text-gray-400 font-medium text-[11px] uppercase tracking-wide mb-1.5 block">Make</label>
          <input
            type="text"
            name="make"
            value={filters.make}
            onChange={handleChange}
            placeholder="e.g. Toyota"
            className="w-full bg-dark border border-gray-700 text-white px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600 font-sans"
          />
        </div>

        <div>
          <label className="text-gray-400 font-medium text-[11px] uppercase tracking-wide mb-1.5 block">Model</label>
          <input
            type="text"
            name="model"
            value={filters.model}
            onChange={handleChange}
            placeholder="e.g. Fortuner"
            className="w-full bg-dark border border-gray-700 text-white px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600 font-sans"
          />
        </div>

        <div>
          <label className="text-gray-400 font-medium text-[11px] uppercase tracking-wide mb-1.5 block">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full bg-dark border border-gray-700 text-white px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors font-sans"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat === 'All' ? '' : cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-gray-400 font-medium text-[11px] uppercase tracking-wide mb-1.5 block">Min Price</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min"
            className="w-full bg-dark border border-gray-700 text-white px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600 font-sans"
          />
        </div>

        <div>
          <label className="text-gray-400 font-medium text-[11px] uppercase tracking-wide mb-1.5 block">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max"
            className="w-full bg-dark border border-gray-700 text-white px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600 font-sans"
          />
        </div>

      </div>

      <div className="flex gap-3 mt-5">
        <button
          onClick={onSearch}
          className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-md shadow-primary/10"
        >
          Search
        </button>
        <button
          onClick={onReset}
          className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
        >
          Reset
        </button>
      </div>

    </div>
  )
}

export default SearchFilters