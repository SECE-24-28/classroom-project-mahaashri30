// Search and Filter System
class ProductSearch {
    constructor() {
        this.products = [];
        this.filters = {
            search: '',
            category: '',
            brand: '',
            minPrice: 0,
            maxPrice: 100000
        };
    }

    async loadProducts() {
        try {
            const response = await fetch('http://localhost:3000/api/products');
            this.products = await response.json();
            return this.products;
        } catch (error) {
            console.error('Failed to load products:', error);
            return [];
        }
    }

    setFilter(key, value) {
        this.filters[key] = value;
    }

    applyFilters() {
        return this.products.filter(product => {
            const matchesSearch = !this.filters.search || 
                product.name.toLowerCase().includes(this.filters.search.toLowerCase()) ||
                product.description.toLowerCase().includes(this.filters.search.toLowerCase());
            
            const matchesCategory = !this.filters.category || 
                product.category === this.filters.category;
            
            const matchesBrand = !this.filters.brand || 
                product.brand === this.filters.brand;
            
            const matchesPrice = product.price >= this.filters.minPrice && 
                product.price <= this.filters.maxPrice;
            
            return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
        });
    }

    getCategories() {
        return [...new Set(this.products.map(p => p.category))];
    }

    getBrands() {
        return [...new Set(this.products.map(p => p.brand))];
    }
}

// Initialize search
const productSearch = new ProductSearch();

// Search bar functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchInput) {
        searchInput.addEventListener('input', async (e) => {
            const query = e.target.value;
            if (query.length > 2) {
                await productSearch.loadProducts();
                productSearch.setFilter('search', query);
                const results = productSearch.applyFilters();
                displaySearchResults(results);
            }
        });
    }
});

function displaySearchResults(results) {
    console.log('Search results:', results);
    // Implement UI display logic here
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductSearch;
}
