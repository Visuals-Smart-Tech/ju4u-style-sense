
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserProfile, updateUserProfile, addUserAddress, deleteUserAddress } from '@/services/userService';
import { toast } from 'sonner';
import { User, Mail, MapPin, CreditCard, Heart, ShoppingBag, Trash2 } from 'lucide-react';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    displayName: '',
    phone: '',
    email: ''
  });
  const [addressForm, setAddressForm] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    isDefault: false
  });

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser) {
        try {
          setLoading(true);
          const profileData = await getUserProfile(currentUser.uid);
          
          // If profile exists, populate form data
          if (profileData) {
            setProfile(profileData);
            setFormData({
              displayName: profileData.displayName || '',
              email: profileData.email || currentUser.email || '',
              phone: profileData.phone || ''
            });
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          toast.error('Failed to load profile data');
        } finally {
          setLoading(false);
        }
      } else {
        navigate('/login');
      }
    };
    
    fetchProfile();
  }, [currentUser, navigate]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const updatedProfile = await updateUserProfile(currentUser.uid, formData);
      setProfile(updatedProfile);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const updatedProfile = await addUserAddress(currentUser.uid, addressForm);
      setProfile(updatedProfile);
      setAddressForm({
        name: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: '',
        isDefault: false
      });
      toast.success('Address added successfully');
    } catch (error) {
      console.error('Error adding address:', error);
      toast.error('Failed to add address');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      setLoading(true);
      const updatedProfile = await deleteUserAddress(currentUser.uid, addressId);
      setProfile(updatedProfile);
      toast('Address removed successfully');
    } catch (error) {
      console.error('Error removing address:', error);
      toast.error('Failed to remove address');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      toast('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      {loading && !profile ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse">Loading profile...</div>
        </div>
      ) : (
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                      <Input
                        id="displayName"
                        value={formData.displayName}
                        onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                        className="pl-10"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="pl-10"
                        readOnly={currentUser?.providerData[0]?.providerId !== 'password'}
                        disabled={currentUser?.providerData[0]?.providerId !== 'password'}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full mt-4" disabled={loading}>
                    Save Changes
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" onClick={handleLogout}>
                  Log Out
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Address List */}
              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>Your saved shipping and billing addresses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile?.addresses?.length > 0 ? (
                    profile.addresses.map((address) => (
                      <div key={address.id} className="border rounded-md p-4 relative group">
                        {address.isDefault && (
                          <Badge variant="outline" className="absolute top-2 right-2">Default</Badge>
                        )}
                        <h3 className="font-medium">{address.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {address.addressLine1}<br />
                          {address.addressLine2 && <>{address.addressLine2}<br /></>}
                          {address.city}, {address.state} {address.zipCode}<br />
                          {address.country}
                        </p>
                        <p className="text-sm mt-1">{address.phone}</p>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDeleteAddress(address.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <MapPin className="mx-auto mb-2" />
                      <p>No saved addresses</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Add New Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Add New Address</CardTitle>
                  <CardDescription>Add a new shipping or billing address</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="addressName">Full Name</Label>
                      <Input
                        id="addressName"
                        value={addressForm.name}
                        onChange={(e) => setAddressForm({...addressForm, name: e.target.value})}
                        required
                        placeholder="Recipient's full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="addressLine1">Address Line 1</Label>
                      <Input
                        id="addressLine1"
                        value={addressForm.addressLine1}
                        onChange={(e) => setAddressForm({...addressForm, addressLine1: e.target.value})}
                        required
                        placeholder="Street address, P.O. box"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                      <Input
                        id="addressLine2"
                        value={addressForm.addressLine2}
                        onChange={(e) => setAddressForm({...addressForm, addressLine2: e.target.value})}
                        placeholder="Apartment, suite, unit, building, floor, etc."
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={addressForm.state}
                          onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={addressForm.zipCode}
                          onChange={(e) => setAddressForm({...addressForm, zipCode: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={addressForm.country}
                          onChange={(e) => setAddressForm({...addressForm, country: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={addressForm.phone}
                        onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})}
                        required
                        placeholder="For delivery questions"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <input
                        type="checkbox"
                        id="isDefault"
                        checked={addressForm.isDefault}
                        onChange={(e) => setAddressForm({...addressForm, isDefault: e.target.checked})}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <Label htmlFor="isDefault" className="text-sm font-normal cursor-pointer">Set as default address</Label>
                    </div>
                    
                    <Button type="submit" className="w-full mt-4" disabled={loading}>
                      Save Address
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your recent orders and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <ShoppingBag className="mx-auto mb-2" />
                  <p>No order history yet</p>
                  <Button variant="link" onClick={() => navigate('/catalog')}>
                    Continue Shopping
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>Wishlist</CardTitle>
                <CardDescription>Your saved items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Heart className="mx-auto mb-2" />
                  <p>Your wishlist is empty</p>
                  <Button variant="link" onClick={() => navigate('/catalog')}>
                    Discover Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ProfilePage;
