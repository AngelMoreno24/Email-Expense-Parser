import React from 'react';

const ConnectGmailButton = ({ isConnected }) => {
  const handleConnect = () => {
    window.location.href = 'http://localhost:5173/auth/google';
  };

  return (
    <div className="flex flex-col items-center p-6 border rounded-2xl shadow-lg w-full max-w-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Connect Your Gmail</h2>

      <p className="text-gray-600 text-sm text-center mb-6">
        We’ll scan your Gmail inbox for purchase receipts and automatically track your expenses. Read-only access.
      </p>

      <button
        onClick={handleConnect}
        disabled={isConnected}
        className={`w-full py-2 px-4 text-white rounded-lg transition-all font-medium ${
          isConnected
            ? 'bg-green-500 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isConnected ? '✓ Gmail Connected' : 'Login with Google'}
      </button>

      <p className="text-xs text-gray-500 mt-4 text-center">
        We never send emails or access unrelated data. Permissions are granted through Google.
      </p>
    </div>
  );
};

export default ConnectGmailButton;