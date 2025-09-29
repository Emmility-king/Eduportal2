import React, { useState } from 'react';
import { Application, PaymentMethod } from '../../types';
import { CreditCard, DollarSign, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

interface PaymentSectionProps {
  application: Application;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({ application }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const fees = [
    { name: 'Application Fee', amount: 750000, required: true },
    { name: 'Processing Fee', amount: 75000, required: true },
    { name: 'Document Verification', amount: 37500, required: true }
  ];

  const totalAmount = fees.reduce((sum, fee) => sum + fee.amount, 0);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment processing logic here
    console.log('Processing payment...', { paymentMethod, cardData, amount: totalAmount });
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardData(prev => ({ ...prev, number: formatted }));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
        <p className="text-gray-600">Complete your application payment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
            
            <div className="space-y-3 mb-4">
              {fees.map((fee, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{fee.name}</span>
                  <span className="font-medium">₦{fee.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-xl text-gray-900">₦{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Payment Required</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Your application will be processed after payment confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
            </div>

            <form onSubmit={handlePayment} className="p-6">
              {/* Payment Method Selection */}
              <div className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className={`
                    border rounded-lg p-4 cursor-pointer transition duration-200 ${
                      paymentMethod === 'credit_card' 
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500' 
                        : 'border-gray-300 hover:border-gray-400'
                    }
                  `}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit_card"
                      checked={paymentMethod === 'credit_card'}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <CreditCard className="h-6 w-6 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Credit Card</p>
                        <p className="text-sm text-gray-500">Visa, Mastercard</p>
                      </div>
                    </div>
                  </label>

                  <label className={`
                    border rounded-lg p-4 cursor-pointer transition duration-200 ${
                      paymentMethod === 'bank_transfer' 
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500' 
                        : 'border-gray-300 hover:border-gray-400'
                    }
                  `}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <DollarSign className="h-6 w-6 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Bank Transfer</p>
                        <p className="text-sm text-gray-500">Direct transfer</p>
                      </div>
                    </div>
                  </label>

                  <label className={`
                    border rounded-lg p-4 cursor-pointer transition duration-200 ${
                      paymentMethod === 'paypal' 
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500' 
                        : 'border-gray-300 hover:border-gray-400'
                    }
                  `}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div className="h-6 w-6 bg-blue-600 rounded mr-3 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">P</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">PayPal</p>
                        <p className="text-sm text-gray-500">PayPal account</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'credit_card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardData.number}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.substring(0, 2) + '/' + value.substring(2, 4);
                          }
                          setCardData(prev => ({ ...prev, expiry: value }));
                        }}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cardData.cvv}
                        onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }))}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Transfer Info */}
              {paymentMethod === 'bank_transfer' && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Bank Transfer Details</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Bank:</strong> Zenith Bank</p>
                  <p><strong>Account Name:</strong> Nigerian Secondary School</p>
                  <p><strong>Account Number:</strong> 9876543210</p>
                  <p><strong>Routing Number:</strong> 057</p>
                  <p><strong>Reference:</strong> Application #{application.id}</p>
                  </div>
                </div>
              )}

              {/* PayPal Info */}
              {paymentMethod === 'paypal' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    You will be redirected to PayPal to complete your payment securely.
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-6 flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Pay ₦{totalAmount.toLocaleString()}
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Your payment information is secure and encrypted. We do not store your payment details.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};