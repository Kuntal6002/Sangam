import React, { useState } from 'react';
import { useUser, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const { user } = useUser();
  const [bio, setBio] = useState(user.publicMetadata?.bio || '');
  
  const saveProfile = async () => {
    try {
      await user.update({
        publicMetadata: {
          ...user.publicMetadata,
          bio,
        },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Your Profile</h1>
        <Link to="/" className="back-link">Back to Chat</Link>
      </div>
      <div className="profile-content">
        <div className="profile-avatar">
          <UserButton />
        </div>
        <div className="profile-details">
          <h2>{user.fullName || user.username}</h2>
          <p>User ID: {user.id}</p>
          <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
          
          <div className="profile-bio">
            <h3>About Me</h3>
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
            />
          </div>
          
          <button onClick={saveProfile} className="save-button">Save Profile</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;