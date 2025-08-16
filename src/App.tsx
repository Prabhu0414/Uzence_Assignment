
import './App.css';
import DataTable from './components/DataTable';
import InputFieldDemo from './components/InputField/InputFieldDemo';

// Sample data and columns (copied from DataTable.stories.tsx)
const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15', department: 'Engineering' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14', department: 'Marketing' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'inactive', lastLogin: '2024-01-10', department: 'Sales' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', lastLogin: '2024-01-13', department: 'HR' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-12', department: 'Engineering' },
];

const userColumns = [
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
    ),
  },
  { key: 'department', title: 'Department', sortable: true },
  {
    key: 'lastLogin',
    title: 'Last Login',
    sortable: true,
    render: (value) => new Date(value).toLocaleDateString(),
  },
];

function App() {
  return (
    <>
      <InputFieldDemo />
      <div style={{ margin: '2rem 0' }}>
        <DataTable data={sampleUsers} columns={userColumns} selectable striped hoverable />
      </div>
    </>
  );
}

export default App;
