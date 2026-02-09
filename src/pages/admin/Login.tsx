import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../services/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const userCredential = isLogin
                ? await signInWithEmailAndPassword(auth, email, password)
                : await createUserWithEmailAndPassword(auth, email, password);

            const uid = userCredential.user.uid;
            let role = 'customer';

            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
                role = userDoc.data().role || 'customer';
            } else if (!isLogin) {
                await setDoc(doc(db, 'users', uid), {
                    uid,
                    email: userCredential.user.email,
                    role: 'customer',
                    createdAt: new Date().toISOString()
                });
            }

            if (role === 'super_admin') {
                navigate('/super-admin');
            } else if (role === 'business_admin') {
                navigate('/admin');
            } else {
                setError(`Access denied. Role "${role}" detected. Administrative privileges required.`);
                await auth.signOut();
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6">
            <div className="w-full max-w-[440px] bg-white p-12 rounded-[32px] border border-slate-200 shadow-2xl shadow-slate-200/50">
                <div className="text-center mb-10">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-6 rotate-45">
                        <div className="w-4 h-4 bg-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                    <p className="text-slate-500 mt-2 font-medium">Enter your credentials to access the nexus.</p>
                </div>

                <form onSubmit={handleAuth} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-black transition-colors" size={18} />
                            <input
                                type="email" required placeholder="name@company.com"
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 focus:ring-1 focus:ring-black outline-none transition-all font-medium"
                                value={email} onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-black transition-colors" size={18} />
                            <input
                                type="password" required placeholder="••••••••"
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 focus:ring-1 focus:ring-black outline-none transition-all font-medium"
                                value={password} onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <div className="p-4 bg-red-50 rounded-xl text-red-500 text-sm font-bold border border-red-100">{error}</div>}

                    <button
                        disabled={loading}
                        className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>{isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={20} /></>}
                    </button>
                </form>

                <p className="text-center mt-10 text-slate-400 font-medium">
                    {isLogin ? "New to the platform?" : "Already have an account?"}
                    <button onClick={() => setIsLogin(!isLogin)} className="ml-2 text-black font-bold hover:underline underline-offset-4">
                        {isLogin ? 'Join now' : 'Sign in'}
                    </button>
                </p>

                {/* Secret link for owners */}
                <button onClick={() => navigate('/nexus')} className="w-full mt-6 text-[10px] text-slate-200 hover:text-slate-400 transition-colors uppercase tracking-[0.2em] font-black">
                    Nexus Terminal
                </button>
            </div>
        </div>
    );
};

export default Login;
