import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './editProfile.css'; // Importing CSS styles

const EditProfile = () => {
  const [email, setEmail] = useState('');
  const [profileData, setProfileData] = useState({
    education: {
      tenth: '',
      inter: '',
      graduate: ''
    },
    fullName: '',
    phone: '',
    workExperience: '',
    professionalSummary: '',
    skill: '',
    achievements: '',
    certifications: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  // Fetch profile data
  useEffect(() => {
    if (!isEmailSubmitted) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://my-elegant-node-mongodb-api.onrender.com/api/profile/${email}`
        );
        setProfileData(response.data);
        setError('');
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('Email not found. You can update your details now.');
          setProfileData({
            education: {
              tenth: '',
              inter: '',
              graduate: ''
            },
            fullName: '',
            phone: '',
            workExperience: '',
            professionalSummary: '',
            skill: '',
            achievements: '',
            certifications: ''
          });
        } else {
          setError('Failed to fetch profile data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [email, isEmailSubmitted]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('education')) {
      const key = name.split('.')[1];
      setProfileData((prevState) => ({
        ...prevState,
        education: {
          ...prevState.education,
          [key]: value
        }
      }));
    } else {
      setProfileData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  // Handle email submission
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      setError('Email is required');
      return;
    }
    setError('');
    setIsEmailSubmitted(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `https://my-elegant-node-mongodb-api.onrender.com/api/profile/${email}`,
        profileData
      );
      setSuccess('Profile updated successfully!');
      setError('');
    } catch (err) {
      setError('Failed to update profile');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {!isEmailSubmitted ? (
        <form onSubmit={handleEmailSubmit} className="email-form">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit</button>
          <p className="info">Enter your email to fetch or update your profile details.</p>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={profileData.fullName}
              onChange={handleChange}
            />
          </label>

          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
            />
          </label>

          <label>
            Work Experience:
            <input
              type="text"
              name="workExperience"
              value={profileData.workExperience}
              onChange={handleChange}
            />
          </label>

          <label>
            Professional Summary:
            <textarea
              name="professionalSummary"
              value={profileData.professionalSummary}
              onChange={handleChange}
            />
          </label>

          <label>
            Skills:
            <select
              name="skill"
              value={profileData.skill}
              onChange={handleChange}
            >
              <option value="">Select a skill</option>
              <option value="Head of Sales">Head of Sales</option>
              <option value="Channel Partner">Channel Partner</option>
              <option value="Sales Executives">Sales Executives</option>
              <option value="HR & Operations">HR & Operations</option>
              <option value="C.E.O/Directors">C.E.O/Directors</option>
              <option value="Marketing">Marketing</option>
              <option value="Digital">Digital</option>
              <option value="Accounts">Accounts</option>
            </select>
          </label>

          <label>
            Achievements:
            <textarea
              name="achievements"
              value={profileData.achievements}
              onChange={handleChange}
            />
          </label>

          <label>
            Certifications:
            <textarea
              name="certifications"
              value={profileData.certifications}
              onChange={handleChange}
            />
          </label>

          <fieldset>
            <legend>Education</legend>

            <label>
              Tenth Grade:
              <input
                type="text"
                name="education.tenth"
                value={profileData.education.tenth}
                onChange={handleChange}
              />
            </label>

            <label>
              Intermediate:
              <input
                type="text"
                name="education.inter"
                value={profileData.education.inter}
                onChange={handleChange}
              />
            </label>

            <label>
              Graduation:
              <input
                type="text"
                name="education.graduate"
                value={profileData.education.graduate}
                onChange={handleChange}
              />
            </label>
          </fieldset>

          <button type="submit">Update Profile</button>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
