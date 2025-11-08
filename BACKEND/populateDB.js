require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModels');
const Doctor = require('./models/doctor');
const Appointment = require('./models/appointment');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Hash password helper
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Clear existing data
const clearDatabase = async () => {
  try {
    await User.deleteMany({});
    await Doctor.deleteMany({});
    await Appointment.deleteMany({});
    console.log('Database cleared');
  } catch (err) {
    console.error('Error clearing database:', err);
    throw err;
  }
};

// Create sample users
const createUsers = async () => {
  const users = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: await hashPassword('admin123'),
      role: 'admin'
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: await hashPassword('password123'),
      role: 'user'
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: await hashPassword('password123'),
      role: 'user'
    },
    {
      name: 'Dr. Sarah Johnson',
      email: 'sarah@example.com',
      password: await hashPassword('doctor123'),
      role: 'doctor'
    },
    {
      name: 'Dr. Michael Brown',
      email: 'michael@example.com',
      password: await hashPassword('doctor123'),
      role: 'doctor'
    }
  ];

  try {
    const createdUsers = await User.insertMany(users);
    console.log('Users created:', createdUsers.length);
    return createdUsers;
  } catch (err) {
    console.error('Error creating users:', err);
    throw err;
  }
};

// Create sample doctors
const createDoctors = async (users) => {
  const doctors = [
    {
      name: 'Dr. Sarah Johnson',
      qualification: 'MD, Cardiology',
      title: 'Senior Cardiologist',
      experience: '12 years',
      languages: 'English, Spanish',
      location: 'New York',
      fees: 200,
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      KnowYourDoctor: 'Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience...'
    },
    {
      name: 'Dr. Michael Brown',
      qualification: 'MD, Neurology',
      title: 'Neurology Specialist',
      experience: '8 years',
      languages: 'English, French',
      location: 'Los Angeles',
      fees: 180,
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      KnowYourDoctor: 'Dr. Michael Brown specializes in neurology and has been practicing for 8 years...'
    },
    {
      name: 'Dr. Emily Davis',
      qualification: 'MD, Pediatrics',
      title: 'Pediatrician',
      experience: '6 years',
      languages: 'English, Spanish',
      location: 'Chicago',
      fees: 150,
      imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
      KnowYourDoctor: 'Dr. Emily Davis is a dedicated pediatrician with a passion for children\'s health...'
    },
    {
      name: 'Dr. Robert Wilson',
      qualification: 'MD, Orthopedics',
      title: 'Orthopedic Surgeon',
      experience: '15 years',
      languages: 'English, German',
      location: 'Houston',
      fees: 250,
      imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
      KnowYourDoctor: 'Dr. Robert Wilson is an experienced orthopedic surgeon specializing in joint replacements...'
    },
    {
      name: 'Dr. Lisa Chen',
      qualification: 'MD, Dermatology',
      title: 'Dermatologist',
      experience: '7 years',
      languages: 'English, Mandarin',
      location: 'San Francisco',
      fees: 190,
      imageUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
      KnowYourDoctor: 'Dr. Lisa Chen is a board-certified dermatologist with expertise in medical and cosmetic dermatology...'
    }
  ];

  try {
    const createdDoctors = await Doctor.insertMany(doctors);
    console.log('Doctors created:', createdDoctors.length);
    return createdDoctors;
  } catch (err) {
    console.error('Error creating doctors:', err);
    throw err;
  }
};

// Create sample appointments
const createAppointments = async (users, doctors) => {
  const appointments = [
    {
      userId: users[1]._id, // John Doe
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St, New York',
      phoneNumber: '555-0101',
      doctorname: doctors[0].name,
      doctorId: doctors[0]._id,
      scheduledTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      status: 'approved'
    },
    {
      userId: users[2]._id, // Jane Smith
      firstName: 'Jane',
      lastName: 'Smith',
      address: '456 Oak Ave, Los Angeles',
      phoneNumber: '555-0202',
      doctorname: doctors[1].name,
      doctorId: doctors[1]._id,
      scheduledTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      status: 'pending'
    },
    {
      userId: users[1]._id, // John Doe
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St, New York',
      phoneNumber: '555-0101',
      doctorname: doctors[2].name,
      doctorId: doctors[2]._id,
      scheduledTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      status: 'change_requested',
      requestedChange: {
        date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
        time: '14:30'
      }
    }
  ];

  try {
    const createdAppointments = await Appointment.insertMany(appointments);
    console.log('Appointments created:', createdAppointments.length);
    return createdAppointments;
  } catch (err) {
    console.error('Error creating appointments:', err);
    throw err;
  }
};

// Main function to run the population
const populateDatabase = async () => {
  try {
    await connectDB();
    await clearDatabase();
    
    console.log('Creating users...');
    const users = await createUsers();
    
    console.log('Creating doctors...');
    const doctors = await createDoctors(users);
    
    console.log('Creating appointments...');
    await createAppointments(users, doctors);
    
    console.log('Database populated successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error populating database:', err);
    process.exit(1);
  }
};

// Run the population
populateDatabase();
