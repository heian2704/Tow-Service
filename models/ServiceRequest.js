import mongoose from 'mongoose';

const ServiceRequestSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
  },
}, {
  timestamps: true,
});

export default mongoose.models.ServiceRequest || mongoose.model('ServiceRequest', ServiceRequestSchema);
