import mongoose from 'mongoose';

const ServiceRequestSchema = new mongoose.Schema({
  description: { type: String, required: true },
  location: { type: String, required: true },
  requestType: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  image: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure userId is required
}, { timestamps: true });

const ServiceRequest = mongoose.models.ServiceRequest || mongoose.model('ServiceRequest', ServiceRequestSchema);

export default ServiceRequest;
