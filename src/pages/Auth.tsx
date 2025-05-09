
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import traillogo from '../image/traillogo.png';
import ustplogo from '../image/ustpbg.jpg';


const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userType: 'student',
    password: '',
    confirmPassword: ''
  });

  // Handle field changes for register
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleUserTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, userType: value }));
  };

  // Check if user is already logged in, and set up auth change
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/marketplace');
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          navigate('/marketplace');
          toast({
            title: "Success!",
            description: "You have successfully logged in.",
          });
        }
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // --- LOGIN ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) throw error;
      // Login redirect handled in effect
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // --- REGISTER ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate fields
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields.",
      });
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match.",
      });
      setLoading(false);
      return;
    }
    if (
      formData.userType === 'student' &&
      !formData.email.endsWith('@ustp.edu.ph')
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Students must use a USTP email (@ustp.edu.ph).",
      });
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            user_type: formData.userType,
          },
        },
      });
      if (error) throw error;
      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account. If you don't see email verification in your Supabase settings, you can log in right away.",
      });
      setIsLogin(true); // Ready to login
      // Optionally auto-fill login email
      setLoginEmail(formData.email);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center modern-gradient px-4"
      style={{background: `
        linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
        url(${ustplogo}) center/cover no-repeat
      `, }}>
      <div className="w-full max-w-md">
        <div className="bg-white p-8 " style={{ borderRadius: '1px', boxShadow: isLogin ? '10px 10px 0px 0px #1F1B4F' : ' 10px 10px 0px 0px #F9BF3B', }}>
          <h2 className="text-2xl font-bold text-center mb-6" style={{ color: "#1F1B4F" }}>
            {isLogin ? 'Welcome Back!' : 'Create an Account'}
          </h2>
          <div className="flex justify-center mb-8">
            <img 
              src={traillogo} 
              alt="USTP Logo" 
              className="object-contain"
              style={{height: '100px', width: '120px' }} 
            />
          </div>
          
          <p className="text-center text-gray-600 mb-4">
            {isLogin ? 'Login to your account' : 'Sign up to get started'}
          </p>
          <form 
            onSubmit={isLogin ? handleLogin : handleRegister} 
            className="space-y-4"
            autoComplete="off"
          >
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      autoComplete="off"
                      required
                      className="w-full"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      autoComplete="off"
                      required
                      className="w-full"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    className="w-full"
                    placeholder="Enter your email"
                  />
                  {formData.userType === 'student' && (
                    <span className="block text-xs text-gray-500 mt-1">Use your USTP email (example@ustp.edu.ph)</span>
                  )}
                </div>
                <div>
                  <Label htmlFor="userType">User Type</Label>
                  <Select value={formData.userType} onValueChange={handleUserTypeChange}>
                    <SelectTrigger id="userType" className="w-full">
                      <SelectValue>{formData.userType === "student" ? "Student" : "Employer"}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="employer">Employer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    className="w-full"
                    placeholder="Password"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    className="w-full"
                    placeholder="Confirm Password"
                  />
                </div>
              </>
            )}
            {isLogin && (
              <>
                <div>
                  <Label htmlFor="loginEmail">Email</Label>
                  <Input
                    id="loginEmail"
                    type="email"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    required
                    autoComplete="username"
                    className="w-full"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="loginPassword">Password</Label>
                  <Input
                    id="loginPassword"
                    type="password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full"
                    placeholder="Enter your password"
                  />
                </div>
              </>
            )}
            <Button 
              type="submit" 
              className="w-full"
              style={{
                background: isLogin ? '#F9BF3B' : '#1F1B4F',
                color: isLogin ? 'white' : 'white',
                fontWeight: 600,
              }}
              disabled={loading}
            >
              {loading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#1F1B4F] hover:underline font-medium"
              type="button"
            >
              {isLogin 
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Login'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
