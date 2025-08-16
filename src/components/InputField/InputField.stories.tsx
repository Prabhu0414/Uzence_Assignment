import type { Meta, StoryObj } from "@storybook/react";
import { useState, useEffect } from "react";
import InputField from "./InputField";

// Theme decorator for Storybook
const withTheme = (Story: any, context: any) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
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

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  decorators: [withTheme],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A flexible input component with multiple variants, sizes, validation states, and theme support.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["outlined", "filled", "ghost"],
      description: "Visual style variant of the input",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the input field",
    },
    disabled: { 
      control: "boolean",
      description: "Whether the input is disabled"
    },
    invalid: { 
      control: "boolean",
      description: "Whether to show error state"
    },
    clearable: { 
      control: "boolean",
      description: "Show clear button when input has value"
    },
    passwordToggle: { 
      control: "boolean",
      description: "Show password visibility toggle"
    },
    loading: { 
      control: "boolean",
      description: "Show loading spinner"
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url", "search"],
      description: "Input type attribute"
    },
  },
};
export default meta;
type Story = StoryObj<typeof InputField>;

// Basic Stories
export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    helperText: "We'll never share your email.",
    variant: "outlined",
    size: "md",
  },
};

export const WithValue: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    value: "john_doe",
    helperText: "Your unique username",
    variant: "outlined",
    size: "md",
  },
};

// Size Variants - Make them clearly different
export const Small: Story = {
  args: {
    label: "Small Input",
    placeholder: "Small size - compact and minimal",
    size: "sm",
    variant: "outlined",
    clearable: true,
    helperText: "Small size with clear button",
  },
};

export const Medium: Story = {
  args: {
    label: "Medium Input",
    placeholder: "Medium size - balanced proportions",
    size: "md",
    variant: "outlined",
    clearable: true,
    helperText: "Medium size with clear button",
  },
};

export const Large: Story = {
  args: {
    label: "Large Input",
    placeholder: "Large size - spacious and prominent",
    size: "lg",
    variant: "outlined",
    clearable: true,
    helperText: "Large size with clear button",
  },
};

// Style Variants - Make them visually distinct
export const Filled: Story = {
  args: {
    label: "Filled Style",
    placeholder: "Filled variant with solid background",
    variant: "filled",
    size: "md",
    helperText: "Solid background with subtle shadow - great for primary forms",
    value: "Sample filled text",
  },
};

export const Outlined: Story = {
  args: {
    label: "Outlined Style",
    placeholder: "Outlined variant with clean borders",
    variant: "outlined",
    size: "md",
    helperText: "Clean border with white background - classic and modern",
    value: "Sample outlined text",
  },
};

export const Ghost: Story = {
  args: {
    label: "Ghost Style",
    placeholder: "Ghost variant with minimal design",
    variant: "ghost",
    size: "md",
    helperText: "Minimal design with hover effects - subtle and elegant",
    value: "Sample ghost text",
  },
};

// State Stories - Make states clearly visible
export const ErrorState: Story = {
  args: {
    label: "Email with Error",
    placeholder: "Enter your email",
    errorMessage: "Invalid email address - please check the format",
    invalid: true,
    variant: "outlined",
    size: "md",
    value: "invalid-email",
    helperText: "This will show error styling",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "This input is disabled",
    disabled: true,
    variant: "outlined",
    size: "md",
    value: "Cannot edit this",
    helperText: "Disabled inputs are non-interactive",
  },
};

export const Loading: Story = {
  args: {
    label: "Loading Input",
    placeholder: "Loading state active",
    loading: true,
    variant: "outlined",
    size: "md",
    value: "Loading...",
    helperText: "Shows loading spinner and disables input",
  },
};

// Feature Stories - Showcase unique features
export const WithClearButton: Story = {
  render: (args) => {
    const [value, setValue] = useState("Hello World - Click X to clear");
    return (
      <InputField
        {...args}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
    );
  },
  args: {
    label: "Clearable Input",
    placeholder: "Type something to see clear button...",
    clearable: true,
    variant: "filled",
    size: "md",
    helperText: "Clear button (X) appears when typing - click to clear",
  },
};

export const PasswordToggle: Story = {
  render: (args) => {
    const [value, setValue] = useState("secret123");
    return (
      <InputField
        {...args}
        type="password"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
    );
  },
  args: {
    label: "Password with Toggle",
    placeholder: "Enter your password",
    passwordToggle: true,
    variant: "filled",
    size: "md",
    helperText: "Eye icon toggles password visibility - click to reveal/hide",
  },
};

export const EmailInput: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email address",
    type: "email",
    variant: "outlined",
    size: "md",
    helperText: "Email type with clear button - validates email format",
    clearable: true,
    value: "user@example.com",
  },
};

export const NumberInput: Story = {
  args: {
    label: "Age Input",
    placeholder: "Enter your age",
    type: "number",
    variant: "ghost",
    size: "md",
    helperText: "Number type input - accepts only numeric values",
    value: "25",
  },
};

// Interactive Demo Story - Show real validation
export const InteractiveDemo: Story = {
  render: () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      if (emailError) setEmailError("");
      if (value.length > 0 && !value.includes("@")) {
        setEmailError("Invalid email - must contain @ symbol");
      }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPassword(value);
      if (passwordError) setPasswordError("");
      if (value.length > 0 && value.length < 8) {
        setPasswordError("Password too short - minimum 8 characters");
      }
    };

    return (
      <div className="space-y-6 w-96">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Interactive Demo</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">Try typing in these inputs to see validation in action!</p>
        </div>
        
        <InputField
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          helperText="We'll never share your email"
          errorMessage={emailError}
          invalid={!!emailError}
          variant="outlined"
          size="md"
          clearable
        />

        <InputField
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          helperText="Must be at least 8 characters"
          errorMessage={passwordError}
          invalid={!!passwordError}
          variant="filled"
          size="md"
          passwordToggle
        />

        <InputField
          label="Loading State"
          placeholder="Fetching data..."
          value="Processing request..."
          disabled
          loading
          variant="ghost"
          size="lg"
          helperText="This input is in loading state"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive demo showing real-time validation, error states, and different variants working together. Try typing invalid emails or short passwords!",
      },
    },
  },
};

// Size Comparison Story - Side by side with different content
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-2xl">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Size Comparison</h3>
        <p className="text-sm text-blue-700 dark:text-blue-300">Notice the dramatic height, padding, text size, and icon size differences</p>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <div className="border-l-4 border-blue-500 pl-4 bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-r-lg">
          <div className="mb-2">
            <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">
              Small (sm) - 32px height
            </span>
          </div>
          <InputField
            label="Small Input (sm) - 32px height"
            placeholder="Small size input"
            size="sm"
            variant="outlined"
            clearable
            value="Small text"
            helperText="Compact and minimal - 32px height, 12px text, 8px padding"
          />
        </div>
        
        <div className="border-l-4 border-green-500 pl-4 bg-green-50/50 dark:bg-green-900/10 p-4 rounded-r-lg">
          <div className="mb-2">
            <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-medium rounded">
              Medium (md) - 48px height
            </span>
          </div>
          <InputField
            label="Medium Input (md) - 48px height"
            placeholder="Medium size input"
            size="md"
            variant="outlined"
            clearable
            value="Medium text"
            helperText="Balanced proportions - 48px height, 16px text, 16px padding"
          />
        </div>
        
        <div className="border-l-4 border-purple-500 pl-4 bg-purple-50/50 dark:bg-purple-900/10 p-4 rounded-r-lg">
          <div className="mb-2">
            <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs font-medium rounded">
              Large (lg) - 64px height
            </span>
          </div>
          <InputField
            label="Large Input (lg) - 64px height"
            placeholder="Large size input"
            size="lg"
            variant="outlined"
            clearable
            value="Large text"
            helperText="Spacious and prominent - 64px height, 20px text, 24px padding"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Side-by-side comparison of all three sizes. Notice the dramatic height, padding, text size, and icon size differences. Each size has a different colored border and background for easy identification.",
      },
    },
  },
};

// Variant Comparison Story - Side by side with different content
export const VariantComparison: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Style Variants</h3>
        <p className="text-sm text-green-700 dark:text-green-300">Compare the visual differences between styles</p>
      </div>
      
      <InputField
        label="Filled Variant"
        placeholder="Filled style input"
        variant="filled"
        size="md"
        helperText="Solid background with subtle shadow - great for primary forms"
        value="Filled text"
        clearable
      />
      
      <InputField
        label="Outlined Variant"
        placeholder="Outlined style input"
        variant="outlined"
        size="md"
        helperText="Clean border with white background - classic and modern"
        value="Outlined text"
        clearable
      />
      
      <InputField
        label="Ghost Variant"
        placeholder="Ghost style input"
        variant="ghost"
        size="md"
        helperText="Minimal design with hover effects - subtle and elegant"
        value="Ghost text"
        clearable
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Side-by-side comparison of all three style variants. Notice the background, border, and hover effect differences.",
      },
    },
  },
};
