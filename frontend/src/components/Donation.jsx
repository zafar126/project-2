import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Handshake, Droplet, Banknote, FileText, CheckCircle } from 'lucide-react'; // ✅ 'Bloodtype' ko 'Droplet' se badla
import { toast } from 'react-toastify';

export default function Donation() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('blood');
  
  // Blood Donation State
  const [bloodGroup, setBloodGroup] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorAddress, setDonorAddress] = useState('');
  const [isBloodRegistered, setIsBloodRegistered] = useState(false);

  // Financial Donation State
  const [amount, setAmount] = useState('');
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [isFinancialRegistered, setIsFinancialRegistered] = useState(false);
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [incomeFile, setIncomeFile] = useState(null);

  const handleBloodRegister = async (e) => {
    e.preventDefault();
    if (!bloodGroup || !donorName || !donorAddress) {
      toast.error(t("Please fill all required fields."));
      return;
    }
    setIsBloodRegistered(true);
    toast.success(t("You have been registered as a blood donor!"));
  };

  const handleFinancialRegister = async (e) => {
    e.preventDefault();
    if (!amount || !beneficiaryName || !aadhaarFile) {
      toast.error(t("Please fill all required fields."));
      return;
    }
    setIsFinancialRegistered(true);
    toast.success(t("Thank you for your donation!"));
  };

  return (
    <div className="min-h-screen p-4 pt-20 bg-[url('/bg-donation.jpg')] bg-cover bg-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">{t("Donation")}</h2>

        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setActiveTab('blood')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition ${activeTab === 'blood' ? 'bg-red-500 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            <Droplet size={20} /> {t("Blood Donation")}
          </button>
          <button
            onClick={() => setActiveTab('financial')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition ${activeTab === 'financial' ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            <Banknote size={20} /> {t("Financial Help")}
          </button>
        </div>

        {activeTab === 'blood' && (
          <div className="p-6 bg-red-50 rounded-lg">
            <h3 className="text-2xl font-bold text-red-700 mb-4">{t("Donate Blood")}</h3>
            {!isBloodRegistered ? (
              <form onSubmit={handleBloodRegister} className="space-y-4">
                <p className="text-sm text-gray-600">{t("Fill out this form to register as a donor and help save lives.")}</p>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">{t("Your Name")}</label>
                  <input type="text" value={donorName} onChange={e => setDonorName(e.target.value)} className="w-full p-2 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">{t("Your Address")}</label>
                  <input type="text" value={donorAddress} onChange={e => setDonorAddress(e.target.value)} className="w-full p-2 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">{t("Blood Group")}</label>
                  <select value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} className="w-full p-2 border rounded-lg" required>
                    <option value="">{t("Select Group")}</option>
                    <option value="A+">A+</option><option value="B+">B+</option><option value="O+">O+</option><option value="AB+">AB+</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition">
                  <Handshake size={20} className="inline-block mr-2" /> {t("Register as a Donor")}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-700">{t("Thank you for registering!")}</h3>
                <p className="text-gray-600 mt-2">{t("We will notify you if a nearby recipient needs blood.")}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="p-6 bg-green-50 rounded-lg">
            <h3 className="text-2xl font-bold text-green-700 mb-4">{t("Financial Help")}</h3>
            {!isFinancialRegistered ? (
              <div className="space-y-6">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-700 mb-2">{t("I want to donate")}</h4>
                  <form onSubmit={handleFinancialRegister} className="space-y-3">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">{t("Donation Amount")}</label>
                      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="Rs. 500" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition">
                      <Banknote size={20} className="inline-block mr-2" /> {t("Donate Now")}
                    </button>
                  </form>
                </div>

                <div className="bg-purple-100 p-4 rounded-lg">
                  <h4 className="font-bold text-purple-700 mb-2">{t("I need help")}</h4>
                  <p className="text-sm text-gray-600 mb-3">{t("To receive help, please verify your identity.")}</p>
                  <form className="space-y-3">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">{t("Your Name")}</label>
                      <input type="text" value={beneficiaryName} onChange={e => setBeneficiaryName(e.target.value)} className="w-full p-2 border rounded-lg" required />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">{t("Upload Documents")}</label>
                      <p className="text-xs text-gray-500 mb-1">{t("Income Certificate, Aadhaar Card, PAN Card")}</p>
                      <input type="file" onChange={e => setAadhaarFile(e.target.files[0])} className="w-full text-sm" required />
                      <input type="file" onChange={e => setPanFile(e.target.files[0])} className="w-full text-sm mt-2" />
                      <input type="file" onChange={e => setIncomeFile(e.target.files[0])} className="w-full text-sm mt-2" />
                    </div>
                    <button type="submit" className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700 transition">
                      <FileText size={20} className="inline-block mr-2" /> {t("Submit for Verification")}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-700">{t("Your donation was successful!")}</h3>
                <p className="text-gray-600 mt-2">{t("Thank you for your generosity.")}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}