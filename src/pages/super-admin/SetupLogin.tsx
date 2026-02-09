import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Phone, Lock, ShieldCheck, Loader2, ArrowRight } from 'lucide-react';

const SetupLogin: React.FC = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSystemEntry = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== '1234') {
            setError('System Access Denied: Invalid Authentication Key.');
            setLoading(false);
            return;
        }

        try {
            // Generate a virtual email for this phone session
            const virtualEmail = `admin.${phone.replace(/\D/g, '')}@nexus.internal`;
            const virtualPass = 'NexusMasterPass123!';

            let userCredential;
            try {
                userCredential = await signInWithEmailAndPassword(auth, virtualEmail, virtualPass);
            } catch (err) {
                // Provision new master node if it doesn't exist
                userCredential = await createUserWithEmailAndPassword(auth, virtualEmail, virtualPass);
            }

            const uid = userCredential.user.uid;

            // Force Super Admin privileges in the registry
            await setDoc(doc(db, 'users', uid), {
                uid,
                email: virtualEmail,
                role: 'super_admin',
                phone: phone,
                isSystemProvisioned: true,
                createdAt: new Date().toISOString()
            }, { merge: true });

            navigate('/super-admin');
        } catch (err: any) {
            setError(`Nexus Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 selection:bg-black selection:text-white">
            <div className="w-full max-w-[400px] space-y-12">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-slate-200">
                        <ShieldCheck className="text-white" size={32} />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black tracking-tighter uppercase">Nexus Entry</h1>
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">Master Infrastructure Access</p>
                    </div>
                </div>

                <form onSubmit={handleSystemEntry} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Terminal Phone</label>
                        <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-black transition-colors" size={18} />
                            <input
                                type="tel" required placeholder="000 000 0000"
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 focus:ring-1 focus:ring-black outline-none transition-all font-bold"
                                value={phone} onChange={e => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Access Key</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-black transition-colors" size={18} />
                            <input
                                type="password" required placeholder="1234"
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 focus:ring-1 focus:ring-black outline-none transition-all font-bold"
                                value={password} onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[11px] font-black uppercase tracking-wider text-center animate-in shake duration-500">
                            {error}
                        </div>
                    )}

                    <button
                        disabled={loading}
                        className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-slate-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>Initialize System <ArrowRight size={16} /></>}
                    </button>
                </form>

                <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-widest leading-loose">
                    This terminal is for platform owners only.<br />
                    Unauthorized access attempts are logged.
                </p>
            </div>
        </div>
    );
};

export default SetupLogin;
