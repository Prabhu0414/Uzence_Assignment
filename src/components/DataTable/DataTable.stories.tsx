import type { Meta, StoryObj } from "@storybook/react";
import { useState, useEffect } from "react";
import DataTable from "./DataTable";
import type { Column } from "./DataTable.types";

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  department: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  createdAt: string;
}

// Sample data
const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15', department: 'Engineering' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14', department: 'Marketing' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'inactive', lastLogin: '2024-01-10', department: 'Sales' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', lastLogin: '2024-01-13', department: 'HR' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-12', department: 'Engineering' },
];

const sampleProducts: Product[] = [
  { id: 'P001', name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 25, rating: 4.5, createdAt: '2024-01-01' },
  { id: 'P002', name: 'Wireless Mouse', category: 'Accessories', price: 29.99, stock: 150, rating: 4.2, createdAt: '2024-01-05' },
  { id: 'P003', name: 'Gaming Keyboard', category: 'Accessories', price: 89.99, stock: 45, rating: 4.7, createdAt: '2024-01-08' },
  { id: 'P004', name: 'Monitor 4K', category: 'Electronics', price: 399.99, stock: 12, rating: 4.6, createdAt: '2024-01-10' },
  { id: 'P005', name: 'USB Cable', category: 'Accessories', price: 9.99, stock: 300, rating: 4.0, createdAt: '2024-01-12' },
];

// Column definitions
const userColumns: Column<User>[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'email', title: 'Email', sortable: true },
  { key: 'role', title: 'Role', sortable: true },
  { 
    key: 'status', 
    title: 'Status', 
    sortable: true,
    render: (value) => (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
        value === 'active' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        {value}
      </span>
    )
  },
  { key: 'department', title: 'Department', sortable: true },
  { 
    key: 'lastLogin', 
    title: 'Last Login', 
    sortable: true,
    render: (value) => new Date(value).toLocaleDateString()
  },
];

const productColumns: Column<Product>[] = [
  { key: 'name', title: 'Product Name', sortable: true },
  { key: 'category', title: 'Category', sortable: true },
  { 
    key: 'price', 
    title: 'Price', 
    sortable: true,
    align: 'right',
    render: (value) => `$${value.toFixed(2)}`
  },
  { 
    key: 'stock', 
    title: 'Stock', 
    sortable: true,
    align: 'center',
    render: (value) => (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
        value > 50 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
        value > 20 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        {value}
      </span>
    )
  },
  { 
    key: 'rating', 
    title: 'Rating', 
    sortable: true,
    align: 'center',
    render: (value) => (
      <div className="flex items-center">
        <span className="text-yellow-400 mr-1">★</span>
        <span>{value}</span>
      </div>
    )
  },
  { 
    key: 'createdAt', 
    title: 'Created', 
    sortable: true,
    render: (value) => new Date(value).toLocaleDateString()
  },
];

// Theme decorator for Storybook
const withTheme = (Story: any, context: any) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('storybook-theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('storybook-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('storybook-theme', 'light');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Theme Toggle */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm"
        >
          {isDark ? (
            <>
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
      
      {/* Story Content */}
      <div className="p-6">
        <Story />
      </div>
    </div>
  );
};

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  decorators: [withTheme],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A flexible data table component with sorting, row selection, loading states, and theme support.",
      },
    },
  },
  argTypes: {
    loading: {
      control: "boolean",
      description: "Show loading state"
    },
    selectable: {
      control: "boolean", 
      description: "Enable row selection"
    },
    striped: {
      control: "boolean",
      description: "Alternating row colors"
    },
    hoverable: {
      control: "boolean",
      description: "Row hover effects"
    },
    compact: {
      control: "boolean",
      description: "Compact row spacing"
    },
    stickyHeader: {
      control: "boolean",
      description: "Sticky table header"
    },
  },
};
export default meta;
type Story = StoryObj<typeof DataTable>;

// Basic Stories
export const Default: Story = {
  render: () => <DataTable<User> data={sampleUsers} columns={userColumns} />, 
};

export const WithSelection: Story = {
  render: () => <DataTable<User> data={sampleUsers} columns={userColumns} selectable />, 
  parameters: {
    docs: {
      description: {
        story: "DataTable with row selection enabled. Check individual rows or use the header checkbox to select all.",
      },
    },
  },
};

export const ProductsTable: Story = {
  render: () => <DataTable<Product> data={sampleProducts} columns={productColumns} selectable striped />, 
  parameters: {
    docs: {
      description: {
        story: "Product inventory table with custom cell rendering for status indicators and formatted values.",
      },
    },
  },
};

// Feature Stories
export const LoadingState: Story = {
  render: () => <DataTable<User> data={[]} columns={userColumns} loading loadingMessage="Fetching users..." />, 
  parameters: {
    docs: {
      description: {
        story: "Loading state with spinner and custom message.",
      },
    },
  },
};

export const EmptyState: Story = {
  render: () => <DataTable<User> data={[]} columns={userColumns} emptyMessage="No users found. Try adjusting your search criteria." />, 
  parameters: {
    docs: {
      description: {
        story: "Empty state with custom message and icon.",
      },
    },
  },
};

export const CompactTable: Story = {
  render: () => <DataTable<User> data={sampleUsers} columns={userColumns} compact striped />, 
  parameters: {
    docs: {
      description: {
        story: "Compact table with reduced padding for dense data display.",
      },
    },
  },
};

export const StickyHeader: Story = {
  render: () => <DataTable<User> data={sampleUsers} columns={userColumns} stickyHeader maxHeight="400px" striped />, 
  parameters: {
    docs: {
      description: {
        story: "Table with sticky header and scrollable body. Useful for long tables.",
      },
    },
  },
};

// Interactive Demo Story
export const InteractiveDemo: Story = {
  render: () => {
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleRowSelect = (rows: User[]) => {
      setSelectedUsers(rows);
      console.log('Selected users:', rows);
    };

    const simulateLoading = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <div className="space-y-6 w-full max-w-6xl">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Interactive Demo</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Try sorting columns, selecting rows, and toggling loading state!
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={simulateLoading}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Simulate Loading'}
          </button>
          
          <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <span className="text-sm font-medium">Selected: {selectedUsers.length} users</span>
          </div>
        </div>

        {/* Table */}
        <DataTable
          data={sampleUsers}
          columns={userColumns}
          selectable={true}
          loading={isLoading}
          onRowSelect={handleRowSelect}
          striped={true}
          hoverable={true}
        />

        {/* Selected Users Display */}
        {selectedUsers.length > 0 && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
              Selected Users ({selectedUsers.length}):
            </h4>
            <div className="text-sm text-green-700 dark:text-green-300">
              {selectedUsers.map(user => user.name).join(', ')}
            </div>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive demo showcasing sorting, row selection, loading states, and real-time updates.",
      },
    },
  },
};

// Comparison Stories
export const TableVariants: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-6xl">
      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Table Variants</h3>
        <p className="text-sm text-purple-700 dark:text-purple-300">
          Compare different table configurations and styling options.
        </p>
      </div>

      {/* Default Table */}
      <div>
        <h4 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">Default Table</h4>
        <DataTable
          data={sampleUsers.slice(0, 3)}
          columns={userColumns}
        />
      </div>

      {/* Striped Table */}
      <div>
        <h4 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">Striped Table</h4>
        <DataTable
          data={sampleUsers.slice(0, 3)}
          columns={userColumns}
          striped={true}
        />
      </div>

      {/* Compact Table */}
      <div>
        <h4 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">Compact Table</h4>
        <DataTable
          data={sampleUsers.slice(0, 3)}
          columns={userColumns}
          compact={true}
          striped={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Side-by-side comparison of different table styling variants.",
      },
    },
  },
};