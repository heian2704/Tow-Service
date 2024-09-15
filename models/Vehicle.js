import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);
