import { useState, useEffect } from 'react';
import InputField from './InputField';

function InputFieldDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [selectedVariant, setSelectedVariant] = useState<'filled' | 'outlined' | 'ghost'>('outlined');
  const [isClearable, setIsClearable] = useState(true);
  const [hasPasswordToggle, setHasPasswordToggle] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(value.length > 0 && !value.includes("@") ? "Invalid email" : "");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(value.length > 0 && value.length < 8 ? "Too short!" : "");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-8 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Flexible InputField Component Demo
          </h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium"
          >
            {isDark ? "Switch to Light" : "Switch to Dark"}
          </button>
        </div>

        {/* Interactive Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block mb-2 text-sm">Size</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value as 'sm' | 'md' | 'lg')}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm">Variant</label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value as 'filled' | 'outlined' | 'ghost')}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
              >
                <option value="filled">Filled</option>
                <option value="outlined">Outlined</option>
                <option value="ghost">Ghost</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm">Features</label>
              <div className="space-y-2">
                <label><input type="checkbox" checked={isClearable} onChange={e=>setIsClearable(e.target.checked)}/> Clearable</label><br/>
                <label><input type="checkbox" checked={hasPasswordToggle} onChange={e=>setHasPasswordToggle(e.target.checked)}/> Password Toggle</label><br/>
                <label><input type="checkbox" checked={isDisabled} onChange={e=>setIsDisabled(e.target.checked)}/> Disabled</label><br/>
                <label><input type="checkbox" checked={isLoading} onChange={e=>setIsLoading(e.target.checked)}/> Loading</label>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Live Preview</h2>
          <div className="space-y-6">
            <InputField
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              helperText="We'll never share your email."
              errorMessage={emailError}
              invalid={!!emailError}
              variant={selectedVariant}
              size={selectedSize}
              clearable={isClearable}
              disabled={isDisabled}
              loading={isLoading}
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              helperText="Must be at least 8 characters."
              errorMessage={passwordError}
              invalid={!!passwordError}
              variant={selectedVariant}
              size={selectedSize}
              passwordToggle={hasPasswordToggle}
              disabled={isDisabled}
              loading={isLoading}
            />
            <InputField
              label="Sample Input"
              placeholder="Type something..."
              value="Sample text for testing"
              variant={selectedVariant}
              size={selectedSize}
              disabled={isDisabled}
              loading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputFieldDemo;
