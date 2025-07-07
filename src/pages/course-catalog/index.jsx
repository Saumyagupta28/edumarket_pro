import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import CourseCard from './components/CourseCard';
import FilterSidebar from './components/FilterSidebar';
import SortDropdown from './components/SortDropdown';
import CoursePreviewModal from './components/CoursePreviewModal';
import SkeletonCard from './components/SkeletonCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CourseCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSort, setCurrentSort] = useState('relevance');
  const [filters, setFilters] = useState({
    categories: [],
    price: [],
    level: [],
    rating: [],
    duration: [],
    features: []
  });
  const [activeFilters, setActiveFilters] = useState([]);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewCourse, setPreviewCourse] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  // Mock course data
  const mockCourses = [
    {
      id: 1,
      title: "Complete React Developer Course 2024",
      instructor: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        title: "Senior Frontend Developer"
      },
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
      rating: 4.8,
      reviewCount: 2847,
      enrollmentCount: 15420,
      duration: "42 hours",
      level: "Intermediate",
      price: 89.99,
      originalPrice: 199.99,
      category: "web-development",
      isWishlisted: false
    },
    {
      id: 2,
      title: "Python for Data Science and Machine Learning",
      instructor: {
        name: "Dr. Michael Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        title: "Data Science Professor"
      },
      thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=225&fit=crop",
      rating: 4.9,
      reviewCount: 1923,
      enrollmentCount: 8765,
      duration: "38 hours",
      level: "Beginner",
      price: 0,
      originalPrice: null,
      category: "data-science",
      isWishlisted: true
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: {
        name: "Emma Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        title: "Senior UX Designer"
      },
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
      rating: 4.7,
      reviewCount: 3456,
      enrollmentCount: 12890,
      duration: "28 hours",
      level: "Intermediate",
      price: 79.99,
      originalPrice: 149.99,
      category: "design",
      isWishlisted: false
    },
    {
      id: 4,
      title: "Digital Marketing Strategy 2024",
      instructor: {
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        title: "Marketing Director"
      },
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
      rating: 4.6,
      reviewCount: 2134,
      enrollmentCount: 9876,
      duration: "24 hours",
      level: "Beginner",
      price: 69.99,
      originalPrice: 129.99,
      category: "marketing",
      isWishlisted: false
    },
    {
      id: 5,
      title: "Advanced JavaScript Concepts",
      instructor: {
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        title: "Full Stack Developer"
      },
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop",
      rating: 4.8,
      reviewCount: 1876,
      enrollmentCount: 7654,
      duration: "32 hours",
      level: "Advanced",
      price: 99.99,
      originalPrice: 179.99,
      category: "web-development",
      isWishlisted: true
    },
    {
      id: 6,
      title: "Photography Fundamentals",
      instructor: {
        name: "Lisa Park",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        title: "Professional Photographer"
      },
      thumbnail: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=225&fit=crop",
      rating: 4.5,
      reviewCount: 987,
      enrollmentCount: 4321,
      duration: "18 hours",
      level: "Beginner",
      price: 49.99,
      originalPrice: 89.99,
      category: "photography",
      isWishlisted: false
    }
  ];

  // Initialize courses and handle URL search params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchParam = searchParams.get('search');
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }

    // Simulate loading
    setTimeout(() => {
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
      setIsLoading(false);
    }, 1000);
  }, [location.search]);

  // Filter and sort courses
  useEffect(() => {
    let filtered = [...courses];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(course =>
        filters.categories.includes(course.category)
      );
    }

    // Apply price filters
    if (filters.price.length > 0) {
      filtered = filtered.filter(course => {
        if (filters.price.includes('free') && course.price === 0) return true;
        if (filters.price.includes('paid') && course.price > 0) return true;
        return false;
      });
    }

    // Apply level filters
    if (filters.level.length > 0) {
      filtered = filtered.filter(course =>
        filters.level.includes(course.level.toLowerCase())
      );
    }

    // Apply rating filters
    if (filters.rating.length > 0) {
      filtered = filtered.filter(course => {
        return filters.rating.some(rating => course.rating >= parseFloat(rating));
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (currentSort) {
        case 'popularity':
          return b.enrollmentCount - a.enrollmentCount;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    setFilteredCourses(filtered);
  }, [courses, searchQuery, filters, currentSort]);

  // Update active filters display
  useEffect(() => {
    const active = [];
    
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        values.forEach(value => {
          let label = key.charAt(0).toUpperCase() + key.slice(1);
          if (key === 'categories') label = 'Category';
          if (key === 'level') label = 'Level';
          
          active.push({
            type: key,
            value: value,
            label: label,
            displayValue: value.charAt(0).toUpperCase() + value.slice(1)
          });
        });
      }
    });
    
    setActiveFilters(active);
  }, [filters]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    const searchParams = new URLSearchParams(location.search);
    if (query) {
      searchParams.set('search', query);
    } else {
      searchParams.delete('search');
    }
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  }, [location, navigate]);

  const handleFilterChange = useCallback((filterType, value, checked) => {
    if (filterType === 'clear-all') {
      setFilters({
        categories: [],
        price: [],
        level: [],
        rating: [],
        duration: [],
        features: []
      });
      return;
    }

    setFilters(prev => ({
      ...prev,
      [filterType]: checked
        ? [...prev[filterType], value]
        : prev[filterType].filter(item => item !== value)
    }));
  }, []);

  const handleRemoveFilter = useCallback((filter) => {
    setFilters(prev => ({
      ...prev,
      [filter.type]: prev[filter.type].filter(item => item !== filter.value)
    }));
  }, []);

  const handleClearAllFilters = useCallback(() => {
    setFilters({
      categories: [],
      price: [],
      level: [],
      rating: [],
      duration: [],
      features: []
    });
  }, []);

  const handlePreview = useCallback((course) => {
    setPreviewCourse(course);
    setIsPreviewModalOpen(true);
  }, []);

  const handleWishlistToggle = useCallback((courseId, isWishlisted) => {
    setCourses(prev =>
      prev.map(course =>
        course.id === courseId ? { ...course, isWishlisted } : course
      )
    );
  }, []);

  const handleEnroll = useCallback((course) => {
    navigate('/course-detail', { state: { courseId: course.id } });
  }, [navigate]);

  const loadMoreCourses = useCallback(() => {
    if (hasMore && !isLoading) {
      setIsLoading(true);
      // Simulate loading more courses
      setTimeout(() => {
        setPage(prev => prev + 1);
        setIsLoading(false);
        // For demo, stop loading after page 3
        if (page >= 2) {
          setHasMore(false);
        }
      }, 1000);
    }
  }, [hasMore, isLoading, page]);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMoreCourses();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreCourses]);

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader userRole="student" userName="John Doe" />
      <RoleBasedNavigation userRole="student" />
      
      <main className="pt-32 md:pt-28 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <BreadcrumbTrail />

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
              Course Catalog
            </h1>
            <p className="text-text-secondary text-lg">
              Discover and learn from our extensive collection of courses
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              onSearch={handleSearch}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          {/* Filter Chips */}
          <FilterChips
            activeFilters={activeFilters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAllFilters}
          />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block">
              <FilterSidebar
                isOpen={true}
                filters={filters}
                onFilterChange={handleFilterChange}
                isMobile={false}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Button & Sort */}
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterSidebarOpen(true)}
                  iconName="Filter"
                  iconPosition="left"
                >
                  Filters
                  {activeFilters.length > 0 && (
                    <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                      {activeFilters.length}
                    </span>
                  )}
                </Button>
              </div>

              {/* Sort Dropdown */}
              <SortDropdown
                currentSort={currentSort}
                onSortChange={setCurrentSort}
                resultsCount={filteredCourses.length}
              />

              {/* Course Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading && courses.length === 0 ? (
                  // Initial loading skeletons
                  [...Array(8)].map((_, index) => (
                    <SkeletonCard key={index} />
                  ))
                ) : (
                  filteredCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onPreview={handlePreview}
                      onWishlistToggle={handleWishlistToggle}
                    />
                  ))
                )}

                {/* Loading more skeletons */}
                {isLoading && courses.length > 0 && (
                  [...Array(4)].map((_, index) => (
                    <SkeletonCard key={`loading-${index}`} />
                  ))
                )}
              </div>

              {/* No Results */}
              {!isLoading && filteredCourses.length === 0 && (
                <div className="text-center py-16">
                  <Icon name="Search" size={64} className="mx-auto text-text-tertiary mb-4" />
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                    No courses found
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearAllFilters}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}

              {/* Load More Indicator */}
              {!hasMore && filteredCourses.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-text-secondary">You've reached the end of the catalog</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={() => setIsFilterSidebarOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        isMobile={true}
      />

      {/* Course Preview Modal */}
      <CoursePreviewModal
        course={previewCourse}
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onEnroll={handleEnroll}
      />
    </div>
  );
};

export default CourseCatalog;