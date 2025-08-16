import React, { useState, useMemo, useCallback } from 'react';
import type { DataTableProps, Column, SortConfig, DataTableState } from './DataTable.types';

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  className = '',
  emptyMessage = 'No data available',
  loadingMessage = 'Loading...',
  maxHeight,
  stickyHeader = false,
  striped = false,
  hoverable = true,
  compact = false,
}: DataTableProps<T>) => {
  const [state, setState] = useState<DataTableState<T>>({
    selectedRows: new Set(),
    sortConfig: null,
    currentPage: 1,
    itemsPerPage: 10,
  });

  // Generate unique row ID (you can customize this based on your data structure)
  const getRowId = useCallback((row: T, index: number): string | number => {
    return row.id || row.key || index;
  }, []);

  // Handle sorting
  const handleSort = useCallback((key: keyof T) => {
    setState(prev => ({
      ...prev,
      sortConfig: prev.sortConfig?.key === key && prev.sortConfig.direction === 'asc'
        ? { key, direction: 'desc' }
        : { key, direction: 'asc' }
    }));
  }, []);

  // Sort data based on current sort configuration
  const sortedData = useMemo(() => {
    if (!state.sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[state.sortConfig!.key];
      const bValue = b[state.sortConfig!.key];

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      const comparison = aValue < bValue ? -1 : 1;
      return state.sortConfig!.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, state.sortConfig]);

  // Handle row selection
  const handleRowSelect = useCallback((row: T, checked: boolean) => {
    const rowId = getRowId(row, 0);
    const newSelectedRows = new Set(state.selectedRows);

    if (checked) {
      newSelectedRows.add(rowId);
    } else {
      newSelectedRows.delete(rowId);
    }

    setState(prev => ({ ...prev, selectedRows: newSelectedRows }));

    // Call parent callback with selected rows
    if (onRowSelect) {
      const selectedData = sortedData.filter(row => newSelectedRows.has(getRowId(row, 0)));
      onRowSelect(selectedData);
    }
  }, [state.selectedRows, onRowSelect, sortedData, getRowId]);

  // Handle select all
  const handleSelectAll = useCallback((checked: boolean) => {
    if (checked) {
      const allRowIds = sortedData.map((row, index) => getRowId(row, index));
      setState(prev => ({ ...prev, selectedRows: new Set(allRowIds) }));
      if (onRowSelect) onRowSelect(sortedData);
    } else {
      setState(prev => ({ ...prev, selectedRows: new Set() }));
      if (onRowSelect) onRowSelect([]);
    }
  }, [sortedData, onRowSelect, getRowId]);

  // Check if all rows are selected
  const allSelected = sortedData.length > 0 && state.selectedRows.size === sortedData.length;
  const someSelected = state.selectedRows.size > 0 && state.selectedRows.size < sortedData.length;

  // Render sort indicator
  const renderSortIndicator = (column: Column<T>) => {
    if (!column.sortable) return null;
    
    const isSorted = state.sortConfig?.key === column.key;
    const direction = state.sortConfig?.direction;

    return (
      <button
        onClick={() => handleSort(column.key as keyof T)}
        className="ml-1 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
        aria-label={`Sort by ${column.title}`}
      >
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {!isSorted && (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          )}
          {isSorted && direction === 'asc' && (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          )}
          {isSorted && direction === 'desc' && (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          )}
        </svg>
      </button>
    );
  };

  // Render cell content
  const renderCell = (column: Column<T>, row: T, index: number) => {
    const value = row[column.key];
    
    if (column.render) {
      return column.render(value, row, index);
    }

    return value !== null && value !== undefined ? String(value) : '-';
  };

  // Loading state
  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">{loadingMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (sortedData.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-600 dark:text-gray-400">{emptyMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div 
          className="overflow-auto"
          style={{ maxHeight }}
        >
          <table className="w-full">
            <thead className={`bg-gray-50 dark:bg-gray-700 ${stickyHeader ? 'sticky top-0 z-10' : ''}`}>
              <tr>
                {selectable && (
                  <th className={`px-4 py-3 text-left ${compact ? 'py-2' : 'py-3'}`}>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={input => {
                        if (input) input.indeterminate = someSelected;
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={`
                      px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider
                      ${column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600' : ''}
                      ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}
                      ${column.width ? `w-${column.width}` : ''}
                      ${compact ? 'py-2' : 'py-3'}
                      ${column.className || ''}
                    `}
                    style={column.width ? { width: column.width } : {}}
                  >
                    <div className={`flex items-center ${column.align === 'center' ? 'justify-center' : column.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                      <span>{column.title}</span>
                      {renderSortIndicator(column)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sortedData.map((row, index) => {
                const rowId = getRowId(row, index);
                const isSelected = state.selectedRows.has(rowId);
                
                return (
                  <tr
                    key={rowId}
                    className={`
                      ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                      ${striped && index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-700/50' : ''}
                      ${hoverable ? 'hover:bg-gray-50 dark:hover:bg-gray-700/50' : ''}
                      transition-colors duration-150
                    `}
                  >
                    {selectable && (
                      <td className={`px-4 py-3 ${compact ? 'py-2' : 'py-3'}`}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleRowSelect(row, e.target.checked)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={String(column.key)}
                        className={`
                          px-4 py-3 text-sm text-gray-900 dark:text-gray-100
                          ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}
                          ${compact ? 'py-2' : 'py-3'}
                          ${column.className || ''}
                        `}
                      >
                        {renderCell(column, row, index)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;